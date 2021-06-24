/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userPerfilVendorData
// ====================================================

export interface userPerfilVendorData_vendor_serviceImages {
  __typename: "VendorServiceImage";
  title: string;
  position: number;
  url: string | null;
}

export interface userPerfilVendorData_vendor_mainImage {
  __typename: "VendorMainImage";
  url: string | null;
}

export interface userPerfilVendorData_vendor_avatarImage {
  __typename: "VendorAvatarImage";
  url: string | null;
}

export interface userPerfilVendorData_vendor_socialMedia {
  __typename: "VendorSocialMedia";
  code: string | null;
  userString: string | null;
  url: string | null;
}

export interface userPerfilVendorData_vendor_location {
  __typename: "VendorLocation";
  country: string;
  province: string;
  city: string;
  postalCode: string;
  lat: string;
  lon: string;
}

export interface userPerfilVendorData_vendor_services_edges_node {
  __typename: "BaseProduct";
  name: string;
  id: string;
}

export interface userPerfilVendorData_vendor_services_edges {
  __typename: "BaseProductCountableEdge";
  node: userPerfilVendorData_vendor_services_edges_node;
}

export interface userPerfilVendorData_vendor_services {
  __typename: "BaseProductCountableConnection";
  edges: userPerfilVendorData_vendor_services_edges[];
}

export interface userPerfilVendorData_vendor {
  __typename: "Vendor";
  serviceImages: (userPerfilVendorData_vendor_serviceImages | null)[] | null;
  mainImage: userPerfilVendorData_vendor_mainImage | null;
  avatarImage: userPerfilVendorData_vendor_avatarImage | null;
  socialMedia: (userPerfilVendorData_vendor_socialMedia | null)[] | null;
  location: userPerfilVendorData_vendor_location | null;
  services: userPerfilVendorData_vendor_services;
}

export interface userPerfilVendorData {
  vendor: userPerfilVendorData_vendor | null;
}

export interface userPerfilVendorDataVariables {
  id: string;
}
