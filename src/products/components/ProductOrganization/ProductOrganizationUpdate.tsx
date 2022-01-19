import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CardTitle from "@saleor/components/CardTitle";
import { FormSpacer } from "@saleor/components/FormSpacer";
import Hr from "@saleor/components/Hr";
import { MultiAutocompleteChoiceType } from "@saleor/components/MultiAutocompleteSelectField";
import { SingleAutocompleteChoiceType } from "@saleor/components/SingleAutocompleteSelectField";
import { ProductErrorFragment } from "@saleor/fragments/types/ProductErrorFragment";
import { ChangeEvent } from "@saleor/hooks/useForm";
import { FetchMoreProps } from "@saleor/types";
import { getFormErrors } from "@saleor/utils/errors";
import React, { useState } from "react";
import { useIntl } from "react-intl";

// import {
//   defaultProductTypeId,
//   newBaseProductTypeId
// } from "../../../../constants";

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
  category: string;
  subcategory: string;
  baseProduct: string;
}

const ProductOrganizationUpdate: React.FC<ProductOrganizationProps> = props => {
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
    onProductTypeChange,
    category,
    subcategory,
    baseProduct
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  const formErrors = getFormErrors(
    ["productType", "category", "collections"],
    errors
  );

  return (
    <Card className={classes.card}>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Organize Product",
          description: "section header"
        })}
      />
      <CardContent>
        <TextField
          disabled
          id="filled-disabled1"
          label="Categoría"
          value={category}
          variant="filled"
          fullWidth
        />
        <FormSpacer />
        <Hr />
        <FormSpacer />
        <TextField
          disabled
          id="filled-disabled2"
          label="Subcategoría"
          value={subcategory}
          variant="filled"
          fullWidth
        />
        <FormSpacer />
        <Hr />
        <FormSpacer />
        <TextField
          disabled
          id="filled-disabled3"
          label="Producto Base"
          value={baseProduct}
          variant="filled"
          fullWidth
        />
      </CardContent>
    </Card>
  );
};
ProductOrganizationUpdate.displayName = "ProductOrganizationUpdate";
export default ProductOrganizationUpdate;
