/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VendorImageCreateOrUpdate
// ====================================================

export interface VendorImageCreateOrUpdate_vendorImageCreateOrUpdate_vendor_serviceImages {
  __typename: "VendorServiceImage";
  url: string | null;
  title: string;
  position: number;
}

export interface VendorImageCreateOrUpdate_vendorImageCreateOrUpdate_vendor {
  __typename: "Vendor";
  id: string;
  name: string;
  serviceImages: (VendorImageCreateOrUpdate_vendorImageCreateOrUpdate_vendor_serviceImages | null)[] | null;
}

export interface VendorImageCreateOrUpdate_vendorImageCreateOrUpdate {
  __typename: "VendorImageCreate";
  vendor: VendorImageCreateOrUpdate_vendorImageCreateOrUpdate_vendor | null;
}

export interface VendorImageCreateOrUpdate {
  vendorImageCreateOrUpdate: VendorImageCreateOrUpdate_vendorImageCreateOrUpdate | null;
}

export interface VendorImageCreateOrUpdateVariables {
  vendorId: string;
  serviceImage: any;
  title?: string | null;
  position?: string | null;
}
