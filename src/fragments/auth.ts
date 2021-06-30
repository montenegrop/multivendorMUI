import gql from "graphql-tag";

export const fragmentUser = gql`
  fragment User on User {
    id
    email
    firstName
    lastName
    phone
    typeOfIdentification
    identification
    vendorId
    userPermissions {
      code
      name
    }
    avatar {
      url
    }
    cellphone
  }
`;
