/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ServiceContractImageCreate
// ====================================================

export interface ServiceContractImageCreate_serviceContractImageCreate_image {
  __typename: "ServiceContractImage";
  url: string;
}

export interface ServiceContractImageCreate_serviceContractImageCreate {
  __typename: "ServiceContractImageCreate";
  position: string | null;
  image: ServiceContractImageCreate_serviceContractImageCreate_image | null;
}

export interface ServiceContractImageCreate {
  serviceContractImageCreate: ServiceContractImageCreate_serviceContractImageCreate | null;
}

export interface ServiceContractImageCreateVariables {
  position: string;
  image: any;
  contractId: string;
}
