import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

import {
  userVendorData,
  userVendorDataVariables
} from "./types/userVendorData";

const perfilVendorData = gql`
  query userVendorData($id: ID!) {
    vendor(id: $id) {
      serviceImages {
        title
        position
        url
      }
      mainImage {
        url
      }
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
