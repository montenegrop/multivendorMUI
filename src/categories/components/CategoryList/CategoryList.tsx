import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import { CategoryListUrlSortField } from "@saleor/categories/urls";
import Checkbox from "@saleor/components/Checkbox";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import TableCellHeader from "@saleor/components/TableCellHeader";
import TableHead from "@saleor/components/TableHead";
import TablePagination from "@saleor/components/TablePagination";
import { CategoryFragment } from "@saleor/fragments/types/CategoryFragment";
import { maybe, renderCollection } from "@saleor/misc";
import { ListActions, ListProps, SortPage } from "@saleor/types";
import { getArrowDirection } from "@saleor/utils/sort";
import React, { useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colName: {
        width: 840
      },
      colProducts: {
        width: 160
      },
      colSubcategories: {
        width: 160
      }
    },
    colName: {
      paddingLeft: 0
    },
    colProducts: {
      textAlign: "center"
    },
    colSubcategories: {
      textAlign: "center"
    },
    tableRow: {
      cursor: "pointer",
      width: "80vw"
    }
  }),
  { name: "CategoryList" }
);

interface CategoryListProps
  extends ListProps,
    ListActions,
    SortPage<CategoryListUrlSortField> {
  categories?: CategoryFragment[];
  isRoot: boolean;
  onAdd?();
}

const numberOfColumns = 4;

const CategoryList: React.FC<CategoryListProps> = props => {
  const {
    categories,
    disabled,
    settings,
    sort,
    pageInfo,
    isChecked,
    isRoot,
    selected,
    toggle,
    toggleAll,
    toolbar,
    onNextPage,
    onPreviousPage,
    onUpdateListSettings,
    onRowClick,
    onSort
  } = props;
  const [items, setItems] = React.useState([]);

  useEffect(() => {
    if (categories?.length) {
      setItems(categories.map(category => category.id));
    }
  }, [categories, setItems]);

  const classes = useStyles(props);

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.index === source.index) {
      return;
    }
    const newItems = items;

    newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, draggableId);

    setItems(newItems);
  };

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={categories}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader
          direction={
            isRoot && sort.sort === CategoryListUrlSortField.name
              ? getArrowDirection(sort.asc)
              : undefined
          }
          arrowPosition="right"
          className={classes.colName}
          disableClick={!isRoot}
          onClick={() => isRoot && onSort(CategoryListUrlSortField.name)}
        >
          <FormattedMessage defaultMessage="Category Name" />
        </TableCellHeader>
        <TableCellHeader
          direction={
            isRoot && sort.sort === CategoryListUrlSortField.subcategoryCount
              ? getArrowDirection(sort.asc)
              : undefined
          }
          className={classes.colSubcategories}
          disableClick={!isRoot}
          onClick={() =>
            isRoot && onSort(CategoryListUrlSortField.subcategoryCount)
          }
        >
          <FormattedMessage
            defaultMessage="Subcategories"
            description="number of subcategories"
          />
        </TableCellHeader>
        <TableCellHeader
          direction={
            isRoot && sort.sort === CategoryListUrlSortField.productCount
              ? getArrowDirection(sort.asc)
              : undefined
          }
          className={classes.colProducts}
          disableClick={!isRoot}
          onClick={() =>
            isRoot && onSort(CategoryListUrlSortField.productCount)
          }
        >
          <FormattedMessage
            defaultMessage="No. of Products"
            description="number of products"
          />
        </TableCellHeader>
      </TableHead>
      <TableFooter>
        <TableRow>
          <TablePagination
            colSpan={numberOfColumns}
            settings={settings}
            hasNextPage={pageInfo && !disabled ? pageInfo.hasNextPage : false}
            onNextPage={onNextPage}
            onUpdateListSettings={onUpdateListSettings}
            hasPreviousPage={
              pageInfo && !disabled ? pageInfo.hasPreviousPage : false
            }
            onPreviousPage={onPreviousPage}
          />
        </TableRow>
      </TableFooter>
      <DragDropContext onDragEnd={res => onDragEnd(res)}>
        <Droppable droppableId="droppable">
          {provided => (
            <TableBody ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((catId, indx) => {
                if (
                  categories === undefined ||
                  (categories && categories.length === 0)
                ) {
                  return (
                    <TableRow key={catId}>
                      <TableCell colSpan={numberOfColumns}>
                        {isRoot ? (
                          <FormattedMessage defaultMessage="No categories found" />
                        ) : (
                          <FormattedMessage defaultMessage="No subcategories found" />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                }
                const category = categories.find(({ id }) => id === catId);
                const isSelected = category ? isChecked(category.id) : false;
                return (
                  <Draggable
                    key={category.id}
                    draggableId={category.id}
                    index={indx}
                  >
                    {provided => (
                      <TableRow
                        className={classes.tableRow}
                        hover={!!category}
                        onClick={category ? onRowClick(category.id) : undefined}
                        key={category ? category.id : "skeleton"}
                        selected={isSelected}
                        data-test="id"
                        data-test-id={maybe(() => category.id)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected}
                            disabled={disabled}
                            disableClickPropagation
                            onChange={() => toggle(category.id)}
                          />
                        </TableCell>
                        <TableCell className={classes.colName} data-test="name">
                          {category && category.name ? (
                            category.name
                          ) : (
                            <Skeleton />
                          )}
                        </TableCell>
                        <TableCell className={classes.colSubcategories}>
                          {category &&
                          category.children &&
                          category.children.totalCount !== undefined ? (
                            category.children.totalCount
                          ) : (
                            <Skeleton />
                          )}
                        </TableCell>
                        <TableCell className={classes.colProducts}>
                          {category &&
                          category.products &&
                          category.products.totalCount !== undefined ? (
                            category.products.totalCount
                          ) : (
                            <Skeleton />
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </TableBody>
          )}
        </Droppable>
      </DragDropContext>
    </ResponsiveTable>
  );
};

CategoryList.displayName = "CategoryList";
export default CategoryList;
