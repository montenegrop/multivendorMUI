import makeMutation from "@saleor/hooks/makeMutation";
import gql from "graphql-tag";

import {
  userDataMutation,
  userDataMutationVariables
} from "./types/userDataMutation";
import {
  VendorServicesUpdate,
  VendorServicesUpdateVariables
} from "./types/VendorServicesUpdate";

const userVendorUpdate = gql`
  mutation vendorLocationCreateOrUpdate(
    $province: String
    $city: String
    $postalCode: String
    $lat: String
    $lon: String
  ) {
    vendorLocationCreateOrUpdate(
      input: {
        province: $province
        city: $city
        postalCode: $postalCode
        lat: $lat
        lon: $lon
      }
    ) {
      vendorLocation {
        province
        city
        postalCode
        lat
        lon
      }
    }
  }
`;

export const useVendorUpdate = makeMutation(userVendorUpdate);

const userVendorMainImage = gql`
  mutation VendorMainImageCreateOrUpdate($vendorId: ID!, $mainImage: Upload!) {
    vendorImageCreateOrUpdate(
      input: { vendorId: $vendorId, image: $mainImage }
    ) {
      vendor {
        id
        name
      }
    }
  }
`;

export const useVendorMainImage = makeMutation(userVendorMainImage);

const vendorAvatar = gql`
mutation VendorAvatarUpdate ($vendorId: ID, $image:Upload) {
  vendorImageCreateOrUpdate(
    input: {
      vendorId: $vendorId
      image: $Upload
    }
   	isAvatar: true 
  ) {
    imageUrl
  }
}`
export const useVendorAvatarImage = makeMutation(vendorAvatar);


const userVendorServiceImage = gql`
  mutation VendorServiceImageCreateOrUpdate(
    $vendorId: ID!
    $serviceImage: Upload!
    $title: String
    $position: String
  ) {
    vendorImageCreateOrUpdate(
      input: {
        vendorId: $vendorId
        image: $serviceImage
        title: $title
        position: $position
      }
    ) {
      vendor {
        id
        name
        serviceImages {
          url
          title
          position
        }
      }
    }
  }
`;

export const useVendorServiceImage = makeMutation(userVendorServiceImage);

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

export const updateServices = gql`
  mutation VendorServicesUpdate($services: [ID]!) {
    vendorServicesUpdate(services: $services) {
      vendorErrors {
        message
      }
      services
    }
  }
`;
export const useUpdateServices = makeMutation<
  VendorServicesUpdate,
  VendorServicesUpdateVariables
>(updateServices);

export const socialMediaUpdate = gql`
  mutation VendorSocialMediaUpdate($IG: String, $FB: String, $TW: String) {
    vendorSocialMediaUpdate(
      socialMedia: [
        { code: "IG", userString: $IG }
        { code: "FB", userString: $FB }
        { code: "TW", userString: $TW }
      ]
    ) {
      socialMedia{
        url
      }
    }
  }
`;

export const useSocialMediaUpdate = makeMutation<any, any>(socialMediaUpdate);
