/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AccountErrorCode, UserTypeOfIdentification } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: userDataMutation
// ====================================================

export interface userDataMutation_accountUpdate_accountErrors {
  __typename: "AccountError";
  field: string | null;
  message: string | null;
  code: AccountErrorCode;
}

export interface userDataMutation_accountUpdate_user {
  __typename: "User";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  typeOfIdentification: UserTypeOfIdentification | null;
  identification: string;
  cellphone: string;
}

export interface userDataMutation_accountUpdate {
  __typename: "AccountUpdate";
  accountErrors: userDataMutation_accountUpdate_accountErrors[];
  user: userDataMutation_accountUpdate_user | null;
}

export interface userDataMutation {
  accountUpdate: userDataMutation_accountUpdate | null;
}

export interface userDataMutationVariables {
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  identification?: string | null;
  typeOfIdentification?: string | null;
  phone?: string | null;
  id: string;
  cellphone?: string | null;
}
