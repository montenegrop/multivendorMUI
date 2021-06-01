import makeMutation from "@saleor/hooks/makeMutation";
import gql from "graphql-tag";

const createEmptyExperience = gql`
  mutation emptyPastExperienceCreate {
    pastExperienceCreate(input: {}) {
      pastExperience {
        id
      }
    }
  }
`;

export const useCreateEmptyExperience = makeMutation(createEmptyExperience);

const createExperience = gql`
  mutation pastExperienceUpdate(
    $serviceId: ID!
    $province: String
    $city: String
    $descriptionShort: String
    $descriptionLong: String
    $expId: ID!
    $year: String
  ) {
    pastExperienceCreate(
      id: $expId
      input: {
        serviceId: $serviceId
        country: "AR"
        province: $province
        city: $city
        descriptionShort: $descriptionShort
        descriptionLong: $descriptionLong
        yearPermormed: $year
      }
    ) {
      experience
    }
  }
`;

export const useCreateExperience = makeMutation(createExperience);

const imageExperienceUpload = gql`
  mutation pastExperienceImageCreate(
    $position: String!
    $image: Upload!
    $expId: ID!
  ) {
    pastExperienceImageCreate(
      input: { position: $position, image: $image, pastExperience: $expId }
    ) {
      position
      pastExperience
      image {
        url
      }
    }
  }
`;

export const useUploadExperienceImage = makeMutation(imageExperienceUpload);
