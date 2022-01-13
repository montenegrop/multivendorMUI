import { pageInfoFragment } from "@saleor/fragments/pageInfo";
import makeTopLevelSearch from "@saleor/hooks/makeTopLevelSearch";
import gql from "graphql-tag";

import {
  SearchCategories,
  SearchCategoriesVariables
} from "./types/SearchCategories";

export const searchCategories = gql`
  ${pageInfoFragment}
  query SearchCategories($after: String, $first: Int!, $query: String!) {
    search: categories(
      level: 0
      after: $after
      first: $first
      filter: { search: $query }
    ) {
      pageInfo {
        ...PageInfoFragment
      }
      edges {
        node {
          id
          name
          level
          children(first: 20) {
            edges {
              node {
                id
                name
                level
              }
            }
          }
        }
      }
    }
  }
`;

export default makeTopLevelSearch<SearchCategories, SearchCategoriesVariables>(
  searchCategories
);
