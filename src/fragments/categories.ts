import gql from "graphql-tag";

import { metadataFragment } from "./metadata";

export const categoryFragment = gql`
  fragment CategoryFragment on Category {
    id
    name
    level
    parent {
      name
    }
    children {
      totalCount
    }
    products {
      totalCount
    }
  }
`;
export const categoryDetailsFragment = gql`
  ${metadataFragment}
  fragment CategoryDetailsFragment on Category {
    id
    ...MetadataFragment
    backgroundImage {
      alt
      url
    }
    name
    slug
    descriptionJson
    seoDescription
    seoTitle
    parent {
      id
    }
  }
`;
