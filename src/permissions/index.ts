import { not, shield } from "graphql-shield";
import { isActivated, isAuthenticated } from "./rules";

export const permissions = shield(
  {
    Query: {
      me: isAuthenticated,
    },
    Mutation: {
      activateUser: not(isActivated),
    },
  },
  { allowExternalErrors: true }
);
