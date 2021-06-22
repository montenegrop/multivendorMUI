/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VendorMainImageCreateOrUpdate
// ====================================================

export interface VendorMainImageCreateOrUpdate_vendorImageCreateOrUpdate_vendor {
  __typename: "Vendor";
  id: string;
  name: string;
}

export interface VendorMainImageCreateOrUpdate_vendorImageCreateOrUpdate {
  __typename: "VendorImageCreate";
  vendor: VendorMainImageCreateOrUpdate_vendorImageCreateOrUpdate_vendor | null;
}

export interface VendorMainImageCreateOrUpdate {
  vendorImageCreateOrUpdate: VendorMainImageCreateOrUpdate_vendorImageCreateOrUpdate | null;
}

export interface VendorMainImageCreateOrUpdateVariables {
  vendorId: string;
  mainImage: any;
}
