/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: vendorServiceContracts
// ====================================================

export interface vendorServiceContracts_vendor_serviceContracts_edges_node {
  __typename: "ServiceContract";
  id: string;
  firstName: string | null;
  fullName: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  datetime: string | null;
  service: string | null;
  message: string;
}

export interface vendorServiceContracts_vendor_serviceContracts_edges {
  __typename: "ServiceContractCountableEdge";
  node: vendorServiceContracts_vendor_serviceContracts_edges_node;
}

export interface vendorServiceContracts_vendor_serviceContracts {
  __typename: "ServiceContractCountableConnection";
  edges: vendorServiceContracts_vendor_serviceContracts_edges[];
}

export interface vendorServiceContracts_vendor {
  __typename: "Vendor";
  id: string;
  name: string;
  email: string | null;
  serviceContracts: vendorServiceContracts_vendor_serviceContracts | null;
}

export interface vendorServiceContracts {
  vendor: vendorServiceContracts_vendor | null;
}

export interface vendorServiceContractsVariables {
  vendorId: string;
}
