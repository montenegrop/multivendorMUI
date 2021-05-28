/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: vendorLocationCreateOrUpdate
// ====================================================

export interface vendorLocationCreateOrUpdate_vendorLocationCreateOrUpdate_vendorLocation {
  __typename: "VendorLocation";
  province: string;
  city: string;
  postalCode: string;
  lat: string;
  lon: string;
}

export interface vendorLocationCreateOrUpdate_vendorLocationCreateOrUpdate {
  __typename: "VendorLocationCreateOrUpdate";
  vendorLocation: vendorLocationCreateOrUpdate_vendorLocationCreateOrUpdate_vendorLocation | null;
}

export interface vendorLocationCreateOrUpdate {
  vendorLocationCreateOrUpdate: vendorLocationCreateOrUpdate_vendorLocationCreateOrUpdate | null;
}

export interface vendorLocationCreateOrUpdateVariables {
  province?: string | null;
  city?: string | null;
  postalCode?: string | null;
  lat?: string | null;
  lon?: string | null;
}
