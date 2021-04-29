import user from "./user.resolvers";
import me from "./me.resolvers";
import createAuthToken from "./createAuthToken.resolvers";
const resolverArray = [user, me, createAuthToken];
export default resolverArray;
