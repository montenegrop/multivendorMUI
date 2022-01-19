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
