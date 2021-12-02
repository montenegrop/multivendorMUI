import gql from "graphql-tag";

import { TypedQuery } from "../../queries";
// aca importa los tipos

const ActiveServicesList = gql`
  query vendorPastExperiences($vendorId: ID!) {
    vendor(id: $vendorId) {
      id
      name
      email
      serviceContacts {
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
`;

export const ActiveServicesListQuery = TypedQuery<any, any>(ActiveServicesList);
