import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

import {
  userVendorData,
  userVendorDataVariables
} from "./types/userVendorData";

const perfilVendorData = gql`
  query userVendorData($id: ID!) {
    vendor(id: $id) {
      images {
        url
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
