import makeMutation from "@saleor/hooks/makeMutation";
import gql from "graphql-tag";

import {
  userDataMutation,
  userDataMutationVariables
} from "./types/userDataMutation";

const uploadImage = gql`
  mutation userVendorUpdate($vendorID: ID!, $image: Upload!) {
    vendorCreate(id: $vendorID, input: { mainImage: $image }) {
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

export const useUploadImage = makeMutation(uploadImage);

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
