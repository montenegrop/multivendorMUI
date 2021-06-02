import gql from "graphql-tag";

import { TypedQuery } from "../../../queries";

const pastExperiencesList = gql`
  query vendorPastExperiences($vendorId: ID!) {
    vendor(id: $vendorId) {
      pastExperiences {
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

export const PastExperiencesListQuery = TypedQuery(pastExperiencesList);
