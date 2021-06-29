/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CategoryFragment
// ====================================================

export interface CategoryFragment_parent {
  __typename: "Category";
  name: string;
}

export interface CategoryFragment_children {
  __typename: "CategoryCountableConnection";
  totalCount: number | null;
}

export interface CategoryFragment_products {
  __typename: "ProductCountableConnection";
  totalCount: number | null;
}

export interface CategoryFragment {
  __typename: "Category";
  id: string;
  name: string;
  level: number;
  parent: CategoryFragment_parent | null;
  children: CategoryFragment_children | null;
  products: CategoryFragment_products | null;
}
