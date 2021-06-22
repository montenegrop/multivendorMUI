/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VendorServiceImageCreateOrUpdate
// ====================================================

export interface VendorServiceImageCreateOrUpdate_vendorImageCreateOrUpdate_vendor_serviceImages {
  __typename: "VendorServiceImage";
  url: string | null;
  title: string;
  position: number;
}

export interface VendorServiceImageCreateOrUpdate_vendorImageCreateOrUpdate_vendor {
  __typename: "Vendor";
  id: string;
  name: string;
  serviceImages: (VendorServiceImageCreateOrUpdate_vendorImageCreateOrUpdate_vendor_serviceImages | null)[] | null;
}

export interface VendorServiceImageCreateOrUpdate_vendorImageCreateOrUpdate {
  __typename: "VendorImageCreate";
  vendor: VendorServiceImageCreateOrUpdate_vendorImageCreateOrUpdate_vendor | null;
}

export interface VendorServiceImageCreateOrUpdate {
  vendorImageCreateOrUpdate: VendorServiceImageCreateOrUpdate_vendorImageCreateOrUpdate | null;
}

export interface VendorServiceImageCreateOrUpdateVariables {
  vendorId: string;
  serviceImage: any;
  title?: string | null;
  position?: string | null;
}
