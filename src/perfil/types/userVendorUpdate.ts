/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: userVendorUpdate
// ====================================================

export interface userVendorUpdate_vendorCreate_vendor_mainImage {
  __typename: "Image";
  url: string;
}

export interface userVendorUpdate_vendorCreate_vendor {
  __typename: "Vendor";
  id: string;
  name: string;
  mainImage: userVendorUpdate_vendorCreate_vendor_mainImage | null;
}

export interface userVendorUpdate_vendorCreate {
  __typename: "VendorRegisterOrUpdate";
  vendor: userVendorUpdate_vendorCreate_vendor | null;
}

export interface userVendorUpdate {
  vendorCreate: userVendorUpdate_vendorCreate | null;
}

export interface userVendorUpdateVariables {
  vendorID: string;
  image: any;
}
