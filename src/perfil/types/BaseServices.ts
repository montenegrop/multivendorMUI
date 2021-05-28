/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BaseServices
// ====================================================

export interface BaseServices_baseProducts_edges_node {
  __typename: "BaseProduct";
  id: string;
  name: string;
}

export interface BaseServices_baseProducts_edges {
  __typename: "BaseProductCountableEdge";
  node: BaseServices_baseProducts_edges_node;
}

export interface BaseServices_baseProducts {
  __typename: "BaseProductCountableConnection";
  edges: BaseServices_baseProducts_edges[];
}

export interface BaseServices {
  baseProducts: BaseServices_baseProducts | null;
}
