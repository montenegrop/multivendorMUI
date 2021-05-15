import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

import {
  userVendorData,
  userVendorDataVariables
} from "./types/userVendorData";

const perfilVendorData = gql`
  query userVendorData($id: ID!) {
    vendor(id: $id) {
      mainImage {
        url
      }
      images {
        url
        title
        position
      }
      description
      foundingYear
      location {
        country
        province
        city
        postalCode
      }
    }
  }
`;

export const usePerfilVendorData = makeQuery<
  userVendorData,
  userVendorDataVariables
>(perfilVendorData);
