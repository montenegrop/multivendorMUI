/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VendorImageCreateOrUpdateMain
// ====================================================

export interface VendorImageCreateOrUpdateMain_vendorImageCreateOrUpdate_vendor {
  __typename: "Vendor";
  id: string;
  name: string;
}

export interface VendorImageCreateOrUpdateMain_vendorImageCreateOrUpdate {
  __typename: "VendorImageCreate";
  vendor: VendorImageCreateOrUpdateMain_vendorImageCreateOrUpdate_vendor | null;
}

export interface VendorImageCreateOrUpdateMain {
  vendorImageCreateOrUpdate: VendorImageCreateOrUpdateMain_vendorImageCreateOrUpdate | null;
}

export interface VendorImageCreateOrUpdateMainVariables {
  vendorId: string;
  mainImage: any;
}
