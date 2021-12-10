import makeMutation from "@saleor/hooks/makeMutation";
import gql from "graphql-tag";

import { ServiceContractImageCreate } from "./types/ServiceContractImageCreate";

const ImageServiceContractUpload = gql`
  mutation ServiceContractImageCreate(
    $position: String!
    $image: Upload!
    $contractId: ID!
  ) {
    serviceContractImageCreate(
      input: { position: $position, image: $image, contractId: $contractId }
    ) {
      position
      image {
        url
      }
    }
  }
`;
export const useUploadServiceContractImage = makeMutation<
  ServiceContractImageCreate,
  any
>(ImageServiceContractUpload);
