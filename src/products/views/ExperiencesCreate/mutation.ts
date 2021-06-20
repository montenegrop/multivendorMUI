import makeMutation from "@saleor/hooks/makeMutation";
import gql from "graphql-tag";

import {
  pastExperienceImageCreate,
  pastExperienceImageCreateVariables
} from "./types/pastExperienceImageCreate";
import {
  pastExperienceUpdate,
  pastExperienceUpdateVariables
} from "./types/pastExperienceUpdate";

const createEmptyExperience = gql`
  mutation emptyPastExperienceCreate {
    pastExperienceCreate(input: {}) {
      pastExperience {
        id
      }
    }
  }
`;

export const useCreateEmptyExperience = makeMutation<any, any>(
  createEmptyExperience
);

const createExperience = gql`
  mutation pastExperienceUpdate(
    $serviceId: ID!
    $province: String
    $city: String
    $descriptionShort: String
    $descriptionLong: String
    $expId: ID!
    $year: Int
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
        yearPerformed: $year
      }
    ) {
      pastExperience {
        id
        descriptionShort
        yearPerformed
      }
    }
  }
`;

export const useCreateExperience = makeMutation<
  pastExperienceUpdate,
  pastExperienceUpdateVariables
>(createExperience);

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
      pastExperience {
        id
      }
      image {
        url
      }
    }
  }
`;

export const useUploadExperienceImage = makeMutation<
  pastExperienceImageCreate,
  pastExperienceImageCreateVariables
>(imageExperienceUpload);
