/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: vendorPastExperiences
// ====================================================

export interface vendorPastExperiences_vendor_pastExperiences_edges_node_pastExperienceImages_edges_node {
  __typename: "PastExperienceImage";
  url: string;
}

export interface vendorPastExperiences_vendor_pastExperiences_edges_node_pastExperienceImages_edges {
  __typename: "PastExperienceImageCountableEdge";
  node: vendorPastExperiences_vendor_pastExperiences_edges_node_pastExperienceImages_edges_node;
}

export interface vendorPastExperiences_vendor_pastExperiences_edges_node_pastExperienceImages {
  __typename: "PastExperienceImageCountableConnection";
  edges: vendorPastExperiences_vendor_pastExperiences_edges_node_pastExperienceImages_edges[];
}

export interface vendorPastExperiences_vendor_pastExperiences_edges_node {
  __typename: "PastExperience";
  id: string;
  descriptionShort: string;
  pastExperienceImages: vendorPastExperiences_vendor_pastExperiences_edges_node_pastExperienceImages;
}

export interface vendorPastExperiences_vendor_pastExperiences_edges {
  __typename: "PastExperienceCountableEdge";
  node: vendorPastExperiences_vendor_pastExperiences_edges_node;
}

export interface vendorPastExperiences_vendor_pastExperiences {
  __typename: "PastExperienceCountableConnection";
  edges: vendorPastExperiences_vendor_pastExperiences_edges[];
}

export interface vendorPastExperiences_vendor {
  __typename: "Vendor";
  pastExperiences: vendorPastExperiences_vendor_pastExperiences | null;
}

export interface vendorPastExperiences {
  vendor: vendorPastExperiences_vendor | null;
}

export interface vendorPastExperiencesVariables {
  vendorId: string;
}
