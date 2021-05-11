/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userVendorData
// ====================================================

export interface userVendorData_vendor_images {
  __typename: "VendorImage";
  url: string;
}

export interface userVendorData_vendor_location {
  __typename: "VendorLocation";
  country: string;
  province: string;
  city: string;
  postalCode: string;
}

export interface userVendorData_vendor {
  __typename: "Vendor";
  images: (userVendorData_vendor_images | null)[] | null;
  description: string;
  foundingYear: number | null;
  location: userVendorData_vendor_location | null;
}

export interface userVendorData {
  vendor: userVendorData_vendor | null;
}

export interface userVendorDataVariables {
  id: string;
}
