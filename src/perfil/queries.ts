import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

const perfilVendorData = gql`
  query userVendorData($id: ID!) {
    vendor(id: $id) {
      images {
        url
      }
      description
      foundingYear
    }
  }
`;

export const usePerfilVendorData = makeQuery<any, any>(perfilVendorData);

const perfilVendorData2 = gql`
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

export const usePerfilVendorData2 = makeQuery<any, any>(perfilVendorData2);
