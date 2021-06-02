/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: pastExperienceUpdate
// ====================================================

export interface pastExperienceUpdate_pastExperienceCreate_pastExperience {
  __typename: "PastExperience";
  id: string;
  descriptionShort: string;
  yearPerformed: number | null;
}

export interface pastExperienceUpdate_pastExperienceCreate {
  __typename: "PastExperienceCreate";
  pastExperience: pastExperienceUpdate_pastExperienceCreate_pastExperience | null;
}

export interface pastExperienceUpdate {
  pastExperienceCreate: pastExperienceUpdate_pastExperienceCreate | null;
}

export interface pastExperienceUpdateVariables {
  serviceId: string;
  province?: string | null;
  city?: string | null;
  descriptionShort?: string | null;
  descriptionLong?: string | null;
  expId: string;
  year?: string | null;
}
