import gql from "graphql-tag";

import { TypedQuery } from "../../../queries";
import {
  vendorPastExperiences,
  vendorPastExperiencesVariables
} from "./types/vendorPastExperiences";

const pastExperiencesList = gql`
  query vendorPastExperiences($vendorId: ID!) {
    vendor(id: $vendorId) {
      pastExperiences {
        id
        descriptionShort
        pastExperienceImages(first: 1) {
          edges {
            node {
              url
            }
          }
        }
      }
    }
  }
`;

export const PastExperiencesListQuery = TypedQuery<
  vendorPastExperiences,
  vendorPastExperiencesVariables
>(pastExperiencesList);
