/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userVendorData
// ====================================================

export interface userVendorData_vendor_serviceImages {
  __typename: "VendorServiceImage";
  title: string;
  position: number;
  url: string | null;
}

export interface userVendorData_vendor_mainImage {
  __typename: "VendorMainImage";
  url: string | null;
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
  serviceImages: (userVendorData_vendor_serviceImages | null)[] | null;
  mainImage: userVendorData_vendor_mainImage | null;
  location: userVendorData_vendor_location | null;
}

export interface userVendorData {
  vendor: userVendorData_vendor | null;
}

export interface userVendorDataVariables {
  id: string;
}
