import gql from "graphql-tag";

import { TypedQuery } from "../../queries";
// aca importa los tipos

const ActiveServicesList = gql`
  query vendorPastExperiences($vendorId: ID!) {
    vendor(id: $vendorId) {
      pastExperiences(last: 15) {
        edges {
          node {
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
    }
  }
`;

export const ActiveServicesListQuery = TypedQuery<any, any>(ActiveServicesList);
