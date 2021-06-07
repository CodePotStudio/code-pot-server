import { mergeTypeDefs } from "@graphql-tools/merge";
import UserTypeDefs from "./User.types";
import ChallangeTypeDefs from "./Challange.types";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";

// custom scalaType 추가
const typesArray = [...scalarTypeDefs, UserTypeDefs, ChallangeTypeDefs];
export default mergeTypeDefs(typesArray);
