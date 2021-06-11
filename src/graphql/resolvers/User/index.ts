import me from "./me.resolvers";
import registerRefundAccount from "./registerRefundAccount.resolvers";
import activateUser from "./activateUser.resolvers";
import createUser from "./createUser.resolvers";

// TODO: Resover 합칠 때 생기는 문제 해결 필요
const resolverArray = [me, registerRefundAccount, activateUser, createUser];

export default resolverArray;
