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

export interface userVendorData_vendor_services_edges_node {
  __typename: "BaseProduct";
  name: string;
  id: string;
}

export interface userVendorData_vendor_services_edges {
  __typename: "BaseProductCountableEdge";
  node: userVendorData_vendor_services_edges_node;
}

export interface userVendorData_vendor_services {
  __typename: "BaseProductCountableConnection";
  edges: userVendorData_vendor_services_edges[];
}

export interface userVendorData_vendor {
  socialMedia: any;
  __typename: "Vendor";
  serviceImages: (userVendorData_vendor_serviceImages | null)[] | null;
  mainImage: userVendorData_vendor_mainImage | null;
  location: userVendorData_vendor_location | null;
  services: userVendorData_vendor_services;
}

export interface userVendorData {
  vendor: userVendorData_vendor | null;
}

export interface userVendorDataVariables {
  id: string;
}
