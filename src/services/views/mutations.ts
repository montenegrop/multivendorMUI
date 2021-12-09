import makeMutation from "@saleor/hooks/makeMutation";
import gql from "graphql-tag";

const ActiveServiceImageCreate = gql`
  mutation ServiceContractImageCreate(
    $position: String!
    $image: Upload!
    $contractId: ID!
  ) {
    serviceContractImageCreate(
      input: {
        position: $position
        image: $image
        service_contract: $contractId
      }
    ) {
      position
      image {
        url
      }
    }
  }
`;

export const ActiveServiceImageCreateMutation = makeMutation<any, any>(
  ActiveServiceImageCreate
);
