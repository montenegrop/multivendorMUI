import { CategoryListUrlSortField } from "@saleor/categories/urls";
import { createGetSortQueryVariables } from "@saleor/utils/sort";

export function getSortQueryField(sort: CategoryListUrlSortField): any {
  switch (sort) {
    case CategoryListUrlSortField.name:
      return "name";
    case CategoryListUrlSortField.productCount:
      return "products";
    case CategoryListUrlSortField.subcategoryCount:
      return "subcategories";
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(
  getSortQueryField
);
