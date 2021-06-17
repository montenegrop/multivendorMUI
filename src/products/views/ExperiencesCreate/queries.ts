import gql from "graphql-tag";

import { TypedQuery } from "../../../queries";

const vendorData = gql`
  query userVendorData($id: ID!) {
    vendor(id: $id) {
      name
      location {
        country
        province
        city
        postalCode
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

export const VendorDataQuery = TypedQuery(vendorData);
