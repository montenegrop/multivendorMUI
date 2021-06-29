/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VendorSocialMediaUpdate
// ====================================================

export interface VendorSocialMediaUpdate_vendorSocialMediaUpdate_socialMedia {
  __typename: "VendorSocialMedia";
  url: string | null;
}

export interface VendorSocialMediaUpdate_vendorSocialMediaUpdate {
  __typename: "VendorSocialMediaUpdate";
  socialMedia: (VendorSocialMediaUpdate_vendorSocialMediaUpdate_socialMedia | null)[] | null;
}

export interface VendorSocialMediaUpdate {
  vendorSocialMediaUpdate: VendorSocialMediaUpdate_vendorSocialMediaUpdate | null;
}

export interface VendorSocialMediaUpdateVariables {
  code: string;
  userString: string;
}
