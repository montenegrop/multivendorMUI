import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CancelIcon from "@material-ui/icons/Cancel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CardSpacer from "@saleor/components/CardSpacer";
import CardTitle from "@saleor/components/CardTitle";
import { FormSpacer } from "@saleor/components/FormSpacer";
import Hr from "@saleor/components/Hr";
import MultiAutocompleteSelectField, {
  MultiAutocompleteChoiceType
} from "@saleor/components/MultiAutocompleteSelectField";
import SingleAutocompleteSelectField, {
  SingleAutocompleteChoiceType
} from "@saleor/components/SingleAutocompleteSelectField";
import { ProductErrorFragment } from "@saleor/fragments/types/ProductErrorFragment";
import { ChangeEvent } from "@saleor/hooks/useForm";
import { maybe } from "@saleor/misc";
import { FetchMoreProps } from "@saleor/types";
import { getFormErrors, getProductErrorMessage } from "@saleor/utils/errors";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { newBaseProductTypeId } from "../../../../constants";

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
  categories?: SingleAutocompleteChoiceType[];
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
  onCategoryChange: (event: ChangeEvent) => void;
  onCollectionChange: (event: ChangeEvent) => void;
  onProductTypeChange?: (event: ChangeEvent) => void;
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

  const [existingBaseProduct, setExistingBaseProduct] = useState({});
  const [newBaseProduct, setNewBaseProduct] = useState("nuevo");

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
            value={existingBaseProduct}
            disabled={false}
            autoSelect
            id="combo-box-demo"
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
          <TextField
            value={newBaseProduct}
            onInput={event => {
              setNewBaseProduct(event.target.value);
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
            }}
            fullWidth
          />
          {canChangeType ? (
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
                value={data.productType?.id}
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
          )}
          <FormSpacer />
          <Hr />
          <FormSpacer />
          <SingleAutocompleteSelectField
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
          />
          <FormSpacer />
          <Hr />
          <FormSpacer />
          <MultiAutocompleteSelectField
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
          />
        </>
      </CardContent>
    </Card>
  );
};
ProductOrganization.displayName = "ProductOrganization";
export default ProductOrganization;
