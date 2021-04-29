import user from "./user.resolvers";
import me from "./me.resolvers";
import createAuthToken from "./createAuthToken.resolvers";
import logout from "./logout.resolvers";
const resolverArray = [user, me, createAuthToken, logout];
export default resolverArray;
