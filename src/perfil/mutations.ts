import makeMutation from "@saleor/hooks/makeMutation";
import gql from "graphql-tag";

import {
  userDataMutation,
  userDataMutationVariables
} from "./types/userDataMutation";

const userVendorUpdate = gql`
  mutation userVendorUpdate(
    $vendorID: ID!
    $province: String
    $city: String
    $postalCode: String
    $lat: String
    $lon: String
  ) {
    vendorCreate(
      id: $vendorID
      input: {
        province: $province
        city: $city
        postalCode: $postalCode
        lat: $lat
        lon: $lon
      }
    ) {
      vendor {
        id
        name
        location {
          country
          province
          city
          postalCode
        }
      }
    }
  }
`;

export const useVendorUpdate = makeMutation(userVendorUpdate);

const userVendorMainImage = gql`
  mutation userVendorUpdate($vendorID: ID!, $mainImage: Upload!) {
    vendorCreate(id: $vendorID, input: { mainImage: $mainImage }) {
      vendor {
        id
        name
        mainImage {
          url
        }
      }
    }
  }
`;

export const useVendorMainImage = makeMutation(userVendorMainImage);

const updateUserData = gql`
  mutation userDataMutation(
    $email: String
    $firstName: String
    $lastName: String
    $identification: String
    $typeOfIdentification: String
    $phone: String
    $id: ID!
  ) {
    accountUpdate(
      input: {
        firstName: $firstName
        lastName: $lastName
        identification: $identification
        typeOfIdentification: $typeOfIdentification
        phone: $phone
        email: $email
      }
      id: $id
    ) {
      accountErrors {
        field
        message
        code
        __typename
      }
      user {
        firstName
        lastName
        email
        phone
        typeOfIdentification
        identification
      }
    }
  }
`;

export const useUserUpdate = makeMutation<
  userDataMutation,
  userDataMutationVariables
>(updateUserData);
