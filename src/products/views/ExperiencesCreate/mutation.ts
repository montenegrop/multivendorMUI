import makeMutation from "@saleor/hooks/makeMutation";
import gql from "graphql-tag";

const createExperience = gql`
  mutation pastExperienceCreate(
    $serviceId: ID!
    $province: String
    $city: String
    $descriptionShort: String
    $descriptionLong: String
    $year: String
  ) {
    pastExperienceCreate(
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
    $title: String
  ) {
    pastExperienceImageCreate(
      input: { position: $position, image: $image, pastExperience: $title }
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
