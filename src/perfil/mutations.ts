import makeMutation from "@saleor/hooks/makeMutation";
import gql from "graphql-tag";

import {
  userDataMutation,
  userDataMutationVariables
} from "./types/userDataMutation";
import {
  VendorAvatarUpdate,
  VendorAvatarUpdateVariables
} from "./types/VendorAvatarUpdate";
import {
  vendorLocationCreateOrUpdate,
  vendorLocationCreateOrUpdateVariables
} from "./types/vendorLocationCreateOrUpdate";
import {
  VendorMainImageCreateOrUpdate,
  VendorMainImageCreateOrUpdateVariables
} from "./types/VendorMainImageCreateOrUpdate";
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

export const useVendorUpdate = makeMutation<
  vendorLocationCreateOrUpdate,
  vendorLocationCreateOrUpdateVariables
>(userVendorUpdate);

const userVendorMainImage = gql`
  mutation VendorMainImageCreateOrUpdate($vendorId: ID!, $mainImage: Upload!) {
    vendorImageCreateOrUpdate(
      input: { vendorId: $vendorId, image: $mainImage }
    ) {
      vendor {
        mainImage {
          url
        }
      }
    }
  }
`;

export const useVendorMainImage = makeMutation<
  VendorMainImageCreateOrUpdate,
  VendorMainImageCreateOrUpdateVariables
>(userVendorMainImage);

const vendorAvatar = gql`
  mutation VendorAvatarUpdate($vendorId: ID!, $image: Upload!) {
    vendorImageCreateOrUpdate(
      input: { vendorId: $vendorId, image: $image }
      isAvatar: true
    ) {
      imageUrl
    }
  }
`;
export const useVendorAvatarImage = makeMutation<
  VendorAvatarUpdate,
  VendorAvatarUpdateVariables
>(vendorAvatar);

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
    $cellphone: String
  ) {
    accountUpdate(
      input: {
        firstName: $firstName
        lastName: $lastName
        identification: $identification
        typeOfIdentification: $typeOfIdentification
        phone: $phone
        email: $email
        cellphone: $cellphone
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
        cellphone
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
  mutation VendorSocialMediaUpdate($code: String!, $userString: String!) {
    vendorSocialMediaUpdate(
      socialMedia: [{ code: $code, userString: $userString }]
    ) {
      socialMedia {
        url
      }
    }
  }
`;

export const useSocialMediaUpdate = makeMutation<any, any>(socialMediaUpdate);
