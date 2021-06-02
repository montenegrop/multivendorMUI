import gql from "graphql-tag";

const pastExperiencesList = gql`
  query vendorPastExperiences {
    vendor(id: "VmVuZG9yOjI=") {
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
