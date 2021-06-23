/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VendorMainImageCreateOrUpdate
// ====================================================

export interface VendorMainImageCreateOrUpdate_vendorImageCreateOrUpdate_vendor_mainImage {
  __typename: "VendorMainImage";
  url: string | null;
}

export interface VendorMainImageCreateOrUpdate_vendorImageCreateOrUpdate_vendor {
  __typename: "Vendor";
  mainImage: VendorMainImageCreateOrUpdate_vendorImageCreateOrUpdate_vendor_mainImage | null;
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
