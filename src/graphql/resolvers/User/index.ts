import me from "./me.resolvers";
import createAuthToken from "./createAuthToken.resolvers";
import logout from "./logout.resolvers";
import registerRefundAccount from "./registerRefundAccount.resolvers";
import activateUser from "./activateUser.resolvers";
import createUser from "./createUser.resolvers";

// TODO: Resover 합칠 때 생기는 문제 해결 필요
const resolverArray = [
	me,
	createAuthToken,
	logout,
	registerRefundAccount,
	activateUser,
	createUser,
];

export default resolverArray;
