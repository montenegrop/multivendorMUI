import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import { Reorder } from "@material-ui/icons";
import { CategoryListUrlSortField } from "@saleor/categories/urls";
import Checkbox from "@saleor/components/Checkbox";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import TableCellHeader from "@saleor/components/TableCellHeader";
import TableHead from "@saleor/components/TableHead";
import { CategoryFragment } from "@saleor/fragments/types/CategoryFragment";
import { maybe } from "@saleor/misc";
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
      backgroundColor: "#2E2F31",
      cursor: "pointer"
    }
  }),
  { name: "CategoryList" }
);

const handleStyle = makeStyles(
  {
    active: {
      "&:active": {
        cursor: "grabbing"
      }
    },
    handle: {
      "&:active": {
        cursor: "grabbing"
      },
      cursor: "pointer"
    },
    hover: {
      "&:hover": {
        cursor: isDragging => (isDragging ? "grabbing !important" : "pointer")
      }
    },
    noPointer: {
      cursor: isDragging =>
        isDragging ? "grabbing !important" : "default !important"
    }
  },
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

const numberOfColumns = 5;

const CategoryList: React.FC<CategoryListProps> = props => {
  const {
    categories,
    disabled,
    sort,
    isChecked,
    isRoot,
    selected,
    toggle,
    toggleAll,
    toolbar,
    onRowClick
  } = props;
  const [items, setItems] = React.useState([]);
  const [isDisabled, setIsDisabled] = React.useState(false);

  let level;
  let parent;

  useEffect(() => {
    if (categories?.length) {
      setItems(categories.map(category => category.id));
      level = categories[0].level;
      parent =
        categories[0].parent === null ? "parent" : categories[0].parent.name;
      if (
        JSON.parse(localStorage.getItem(`myOrder${level}${parent}`)) &&
        JSON.parse(localStorage.getItem(`myOrder${level}${parent}`)).length > 0
      ) {
        setItems(JSON.parse(localStorage.getItem(`myOrder${level}${parent}`)));
      }
    }
    checkChanges();
  }, [categories, setItems]);

  const classes = useStyles(props);

  const checkChanges = () => {
    const itemsOnStorage: string = localStorage.getItem(
      `myOrder${level}${parent}`
    );
    return setIsDisabled(itemsOnStorage === JSON.stringify(items));
  };

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
    checkChanges();
  };

  const onSaveChanges = () => {
    level = categories[0].level;
    parent =
      categories[0].parent === null ? "parent" : categories[0].parent.name;
    localStorage.setItem(`myOrder${level}${parent}`, JSON.stringify(items));
    checkChanges();
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
        <TableCellHeader className={classes.colName} disableClick={!isRoot}>
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
        >
          <FormattedMessage
            defaultMessage="No. of Products"
            description="number of products"
          />
        </TableCellHeader>
        <TableCellHeader />
      </TableHead>
      <TableFooter>
        <TableRow>
          <TableCell />
          <TableCell colSpan={numberOfColumns} align="right">
            <Button
              onClick={() => onSaveChanges()}
              variant="contained"
              color="primary"
              disabled={isDisabled}
            >
              Guardar Cambios
            </Button>
          </TableCell>
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
                    id={category.id}
                  >
                    {(provided, snapshot) => {
                      const handleClass = handleStyle(snapshot.isDragging);
                      return (
                        <TableRow
                          className={`${classes.tableRow} ${handleClass.hover}`}
                          hover={!!category}
                          onClick={
                            category ? onRowClick(category.id) : undefined
                          }
                          key={category ? category.id : "skeleton"}
                          selected={isSelected}
                          data-test="id"
                          data-test-id={maybe(() => category.id)}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          id={category.id}
                        >
                          <TableCell
                            id={`${category.id}1`}
                            style={
                              snapshot.isDragging
                                ? {
                                    width: getComputedStyle(
                                      document.getElementById(
                                        `${category.id}1`
                                      ),
                                      null
                                    ).width
                                  }
                                : undefined
                            }
                            padding="checkbox"
                          >
                            <Checkbox
                              checked={isSelected}
                              disabled={disabled}
                              disableClickPropagation
                              onChange={() => toggle(category.id)}
                            />
                          </TableCell>
                          <TableCell
                            id={`${category.id}2`}
                            style={
                              snapshot.isDragging
                                ? {
                                    width: getComputedStyle(
                                      document.getElementById(
                                        `${category.id}2`
                                      ),
                                      null
                                    ).width
                                  }
                                : undefined
                            }
                            className={classes.colName}
                            data-test="name"
                          >
                            {category && category.name ? (
                              category.name
                            ) : (
                              <Skeleton />
                            )}
                          </TableCell>
                          <TableCell
                            id={`${category.id}3`}
                            style={
                              snapshot.isDragging
                                ? {
                                    width: getComputedStyle(
                                      document.getElementById(
                                        `${category.id}3`
                                      ),
                                      null
                                    ).width
                                  }
                                : undefined
                            }
                            className={classes.colSubcategories}
                          >
                            {category &&
                            category.children &&
                            category.children.totalCount !== undefined ? (
                              category.children.totalCount
                            ) : (
                              <Skeleton />
                            )}
                          </TableCell>
                          <TableCell
                            id={`${category.id}4`}
                            style={
                              snapshot.isDragging
                                ? {
                                    width: getComputedStyle(
                                      document.getElementById(
                                        `${category.id}4`
                                      ),
                                      null
                                    ).width
                                  }
                                : undefined
                            }
                            className={classes.colProducts}
                          >
                            {category &&
                            category.products &&
                            category.products.totalCount !== undefined ? (
                              category.products.totalCount
                            ) : (
                              <Skeleton />
                            )}
                          </TableCell>
                          <TableCell
                            className={`${handleClass.noPointer} ${handleClass.hover}`}
                            id={`${category.id}5`}
                            style={
                              snapshot.isDragging
                                ? {
                                    cursor: "grabbing",
                                    width: getComputedStyle(
                                      document.getElementById(
                                        `${category.id}5`
                                      ),
                                      null
                                    ).width
                                  }
                                : undefined
                            }
                          >
                            <div {...provided.dragHandleProps}>
                              <Reorder className={handleClass.handle} />
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    }}
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
