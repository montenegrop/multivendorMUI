import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// import Typography from "@material-ui/core/Typography";
import CancelIcon from "@material-ui/icons/Cancel";
import Autocomplete from "@material-ui/lab/Autocomplete";
// import CardSpacer from "@saleor/components/CardSpacer";
import CardTitle from "@saleor/components/CardTitle";
import { FormSpacer } from "@saleor/components/FormSpacer";
import Hr from "@saleor/components/Hr";
import { MultiAutocompleteChoiceType } from "@saleor/components/MultiAutocompleteSelectField";
import { SingleAutocompleteChoiceType } from "@saleor/components/SingleAutocompleteSelectField";
import { ProductErrorFragment } from "@saleor/fragments/types/ProductErrorFragment";
import { ChangeEvent } from "@saleor/hooks/useForm";
// import { maybe } from "@saleor/misc";
import { FetchMoreProps } from "@saleor/types";
import { getFormErrors } from "@saleor/utils/errors";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import {
  defaultProductTypeId,
  newBaseProductTypeId
} from "../../../../constants";

interface ProductType {
  hasVariants: boolean;
  id: string;
  name: string;
}

const useStyles = makeStyles(
  theme => ({
    card: {
      overflow: "visible"
    },
    cardSubtitle: {
      fontSize: "1rem",
      marginBottom: theme.spacing(0.5)
    },
    label: {
      marginBottom: theme.spacing(0.5)
    }
  }),
  { name: "ProductOrganization" }
);

interface ProductOrganizationProps {
  baseProducts: any;
  potentialNewBaseProduct: any;
  canChangeType: boolean;
  categories?: any;
  categoryInputDisplayValue: string;
  collections?: MultiAutocompleteChoiceType[];
  collectionsInputDisplayValue: MultiAutocompleteChoiceType[];
  data: {
    category: string;
    collections: string[];
    productType?: ProductType;
  };
  disabled: boolean;
  errors: ProductErrorFragment[];
  productType?: ProductType;
  productTypeInputDisplayValue?: string;
  productTypes?: SingleAutocompleteChoiceType[];
  fetchCategories: (query: string) => void;
  fetchCollections: (query: string) => void;
  fetchMoreCategories: FetchMoreProps;
  fetchMoreCollections: FetchMoreProps;
  fetchMoreProductTypes?: FetchMoreProps;
  fetchProductTypes?: (data: string) => void;
  onCategoryChange: (value: any) => void;
  onCollectionChange: (event: ChangeEvent) => void;
  onProductTypeChange?: (value: any) => void;
  onBaseProductChange?: (value: any) => void;
  onNewBaseProductChange?: (value: any) => void;
}

const ProductOrganization: React.FC<ProductOrganizationProps> = props => {
  const {
    baseProducts,
    potentialNewBaseProduct,
    onBaseProductChange,
    onNewBaseProductChange,
    canChangeType,
    categories,
    categoryInputDisplayValue,
    collections,
    collectionsInputDisplayValue,
    data,
    disabled,
    errors,
    fetchCategories,
    fetchCollections,
    fetchMoreCategories,
    fetchMoreCollections,
    fetchMoreProductTypes,
    fetchProductTypes,
    productType,
    productTypeInputDisplayValue,
    productTypes,
    onCategoryChange,
    onCollectionChange,
    onProductTypeChange
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  const formErrors = getFormErrors(
    ["productType", "category", "collections"],
    errors
  );

  const mainCategories = categories
    .filter(category => category.level === 0)
    .map(cate => ({ label: cate.label, value: cate.value }))
    .concat({ label: "", value: "" });

  const [existingBaseProduct, setExistingBaseProduct] = useState({});
  const [newBaseProduct, setNewBaseProduct] = useState("nuevo");
  const [mainCategoryValue, setMainCategoryValue] = useState("");
  const [subCategoryValue, setSubCategoryValue] = useState("");
  const [subCategories, setSubCategories] = useState(null);
  const [mainCategory, setMainCategory] = useState({ label: "", value: "" });

  const updateSubcategories = value => {
    setSubCategories(
      categories
        .find(category => category.value === value)
        .children.edges.map(element => ({ ...element.node }))
    );
  };

  return (
    <Card className={classes.card}>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Organize Product",
          description: "section header"
        })}
      />
      <CardContent>
        <>
          <Autocomplete
            disabled={false}
            id="main-category"
            options={mainCategories}
            renderInput={params => (
              <TextField {...params} label="Seleccionar categoria principal" />
            )}
            loadingText="cargando"
            getOptionLabel={option => (option as any).label || ""}
            onChange={(event, value) => {
              setMainCategoryValue((value as any).value);
              updateSubcategories((value as any).value);
            }}
          />
          <FormSpacer />
          <Hr />
          <FormSpacer />
          <Autocomplete
            disabled={false}
            autoSelect
            id="sub-category"
            key={mainCategoryValue}
            options={subCategories}
            renderInput={params => (
              <TextField {...params} label="Seleccionar subcatgoria" />
            )}
            getOptionLabel={option => (option as any).name || ""}
            onChange={(event, value) => {
              onProductTypeChange({ target: { value: defaultProductTypeId } });
              onCategoryChange({
                target: { name: "category", value: (value as any).id }
              });
              setSubCategoryValue(mainCategoryValue);
            }}
          />
          <FormSpacer />
          <Hr />
          <FormSpacer />
          <Autocomplete
            value={existingBaseProduct}
            disabled={subCategoryValue === "" || subCategoryValue === null}
            autoSelect
            id="select-base-product"
            options={
              baseProducts?.map(node => node.node) || [
                { name: "cargando opciones..." }
              ]
            }
            renderInput={params => (
              <TextField {...params} label="Seleccionar Producto Base" />
            )}
            getOptionLabel={option => (option as any).name || ""}
            onChange={(event, value) => {
              setNewBaseProduct("");
              setExistingBaseProduct(value);
              onBaseProductChange(value);
            }}
          />
          <FormSpacer />
          <Hr />
          <FormSpacer />
          <TextField
            value={newBaseProduct}
            disabled={subCategoryValue === "" || subCategoryValue === null}
            onInput={event => {
              setNewBaseProduct((event.target as any).value);
            }}
            id="new-base-product"
            label="Nuevo Producto Base"
            variant="standard"
            InputProps={{ endAdornment: <CancelIcon /> }}
            onBlur={event => {
              onNewBaseProductChange({
                name: event.target.value,
                id: potentialNewBaseProduct.id,
                slug: "nuevo-slug",
                productType: newBaseProductTypeId
              });
              if (newBaseProduct != null) {
                setExistingBaseProduct("");
              }
            }}
            fullWidth
          />
          {/* <FormSpacer />
          <Hr />
          <FormSpacer /> */}
          {/* {canChangeType ? (
            <>
              <SingleAutocompleteSelectField
                displayValue={productTypeInputDisplayValue}
                error={!!formErrors.productType}
                helperText={getProductErrorMessage(
                  formErrors.productType,
                  intl
                )}
                name="productType"
                disabled={disabled}
                label={intl.formatMessage({
                  defaultMessage: "Product Type"
                })}
                choices={productTypes}
                value={newBaseProductTypeId}
                onChange={onProductTypeChange}
                fetchChoices={fetchProductTypes}
                data-test="product-type"
                {...fetchMoreProductTypes}
              />
            </>
          ) : (
            <>
              <Typography className={classes.label} variant="caption">
                <FormattedMessage defaultMessage="Product Type" />
              </Typography>
              <Typography>{maybe(() => productType.name, "...")}</Typography>
              <CardSpacer />
              <Typography className={classes.label} variant="caption">
                <FormattedMessage defaultMessage="Product Type" />
              </Typography>
              <Typography>
                {maybe(
                  () =>
                    productType.hasVariants
                      ? intl.formatMessage({
                          defaultMessage: "Configurable",
                          description: "product is configurable"
                        })
                      : intl.formatMessage({
                          defaultMessage: "Simple",
                          description: "product is not configurable"
                        }),
                  "..."
                )}
              </Typography>
            </>
          )} */}

          {/* <SingleAutocompleteSelectField
          displayValue={categoryInputDisplayValue}
          error={!!formErrors.category}
          helperText={getProductErrorMessage(formErrors.category, intl)}
          disabled={disabled}
          label={intl.formatMessage({
            defaultMessage: "Category"
          })}
          choices={disabled ? [] : categories}
          name="category"
          value={data.category}
          onChange={onCategoryChange}
          fetchChoices={fetchCategories}
          data-test="category"
          {...fetchMoreCategories}
        /> */}
          {/* <FormSpacer />
          <Hr />
          <FormSpacer /> */}
          {/* <MultiAutocompleteSelectField
            displayValues={collectionsInputDisplayValue}
            error={!!formErrors.collections}
            label={intl.formatMessage({
              defaultMessage: "Collections"
            })}
            choices={disabled ? [] : collections}
            name="collections"
            value={data.collections}
            helperText={
              getProductErrorMessage(formErrors.collections, intl) ||
              intl.formatMessage({
                defaultMessage:
                  "*Optional. Adding product to collection helps users find it.",
                description: "field is optional"
              })
            }
            onChange={onCollectionChange}
            fetchChoices={fetchCollections}
            data-test="collections"
            {...fetchMoreCollections}
          /> */}
        </>
      </CardContent>
    </Card>
  );
};
ProductOrganization.displayName = "ProductOrganization";
export default ProductOrganization;
