import makeMutation from "@saleor/hooks/makeMutation";
import gql from "graphql-tag";

const ActiveServiceImageCreate = gql`
  mutation pastExperienceImageCreate(
    $position: String!
    $image: Upload!
    $contractId: ID!
  ) {
    pastExperienceImageCreate(
      input: { position: $position, image: $image, pastExperience: $expId }
    ) {
      position
      pastExperience {
        id
      }
      image {
        url
      }
    }
  }
`;

export const useUploadExperienceImage = makeMutation<any, any>(
  ActiveServiceImageCreate
);
