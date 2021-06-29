import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

import { BaseServices } from "./types/BaseServices";
import {
  userVendorData,
  userVendorDataVariables
} from "./types/userVendorData";

const perfilVendorData = gql`
  query userPerfilVendorData($id: ID!) {
    vendor(id: $id) {
      serviceImages {
        title
        position
        url
      }
      mainImage {
        url
      }
      avatarImage {
        url
      }
      socialMedia {
        code
        userString
        url
      }
      location {
        country
        province
        city
        postalCode
        lat
        lon
      }
      services(first: 20) {
        edges {
          node {
            name
            id
          }
        }
      }
    }
  }
`;

export const usePerfilVendorData = makeQuery<
  userVendorData,
  userVendorDataVariables
>(perfilVendorData);

const baseServices = gql`
  query BaseServices {
    baseProducts(first: 25) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const useBaseServices = makeQuery<BaseServices, null>(baseServices);
