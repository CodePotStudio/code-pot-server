import { UserGetPayload } from "prisma";

// prisma에서 User가져오기
export type User = UserGetPayload<{}>;
