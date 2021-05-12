import makeMutation from "@saleor/hooks/makeMutation";
import gql from "graphql-tag";

const uploadImage = gql`
  mutation userVendorUpdate($vendorID: ID!, $image: Upload!) {
    vendorCreate(id: $vendorID, input: { mainImage: $image }) {
      vendor {
        id
        name
        mainImage {
          url
        }
      }
    }
  }
`;

export const useUploadImage = makeMutation(uploadImage);
