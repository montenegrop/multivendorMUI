/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VendorAvatarUpdate
// ====================================================

export interface VendorAvatarUpdate_vendorImageCreateOrUpdate {
  __typename: "VendorImageCreate";
  imageUrl: string | null;
}

export interface VendorAvatarUpdate {
  vendorImageCreateOrUpdate: VendorAvatarUpdate_vendorImageCreateOrUpdate | null;
}

export interface VendorAvatarUpdateVariables {
  vendorId?: string | null;
  image?: any | null;
}
