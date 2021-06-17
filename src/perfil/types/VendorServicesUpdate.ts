/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VendorServicesUpdate
// ====================================================

export interface VendorServicesUpdate_vendorServicesUpdate_vendorErrors {
  __typename: "VendorError";
  message: string | null;
}

export interface VendorServicesUpdate_vendorServicesUpdate {
  __typename: "VendorServicesUpdate";
  vendorErrors: VendorServicesUpdate_vendorServicesUpdate_vendorErrors[];
  services: (string | null)[] | null;
}

export interface VendorServicesUpdate {
  vendorServicesUpdate: VendorServicesUpdate_vendorServicesUpdate | null;
}

export interface VendorServicesUpdateVariables {
  services: (string | null)[];
}
