import gql from "graphql-tag";

import { TypedQuery } from "../../queries";
import { vendorServiceContracts } from "./types/vendorServiceContracts";
// aca importa los tipos

const ActiveServicesList = gql`
  query vendorServiceContracts($vendorId: ID!) {
    vendor(id: $vendorId) {
      id
      name
      email
      serviceContracts(first: 15) {
        edges {
          node {
            id
            firstName
            fullName
            email
            phone
            address
            city
            datetime
            service
            message
          }
        }
      }
    }
  }
`;

export const ActiveServicesListQuery = TypedQuery<vendorServiceContracts, any>(
  ActiveServicesList
);
