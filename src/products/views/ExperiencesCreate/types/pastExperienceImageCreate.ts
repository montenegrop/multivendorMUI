/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: pastExperienceImageCreate
// ====================================================

export interface pastExperienceImageCreate_pastExperienceImageCreate_pastExperience {
  __typename: "PastExperience";
  id: string;
}

export interface pastExperienceImageCreate_pastExperienceImageCreate_image {
  __typename: "PastExperienceImage";
  url: string;
}

export interface pastExperienceImageCreate_pastExperienceImageCreate {
  __typename: "PastExperienceImageCreate";
  position: string | null;
  pastExperience: pastExperienceImageCreate_pastExperienceImageCreate_pastExperience | null;
  image: pastExperienceImageCreate_pastExperienceImageCreate_image | null;
}

export interface pastExperienceImageCreate {
  pastExperienceImageCreate: pastExperienceImageCreate_pastExperienceImageCreate | null;
}

export interface pastExperienceImageCreateVariables {
  position: string;
  image: any;
  expId: string;
}
