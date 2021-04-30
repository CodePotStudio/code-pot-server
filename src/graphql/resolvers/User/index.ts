import user from "./user.resolvers";
import me from "./me.resolvers";
import createAuthToken from "./createAuthToken.resolvers";
import logout from "./logout.resolvers";
import registerRefundAccount from "./registerRefundAccount.resolvers";
import activateUser from "./activateUser.resolvers";
const resolverArray = [
	user,
	me,
	createAuthToken,
	logout,
	registerRefundAccount,
	activateUser,
];
export default resolverArray;
