/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: relevanciaCate
// ====================================================

export interface relevanciaCate_categoryBulkRelevanceSort {
  __typename: "CategoryBulkRelevanceSort";
  success: boolean | null;
  errors: (string | null)[] | null;
}

export interface relevanciaCate {
  categoryBulkRelevanceSort: relevanciaCate_categoryBulkRelevanceSort | null;
}

export interface relevanciaCateVariables {
  relevance: (string | null)[];
}
