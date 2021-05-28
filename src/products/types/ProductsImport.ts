/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ProductsImport
// ====================================================

export interface ProductsImport_productsImport {
  __typename: "ProductsImport";
  success: boolean | null;
  errors: (string | null)[] | null;
}

export interface ProductsImport {
  productsImport: ProductsImport_productsImport | null;
}

export interface ProductsImportVariables {
  file: any;
}
