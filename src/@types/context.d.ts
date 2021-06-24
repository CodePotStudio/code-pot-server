import { PrismaClient } from "@prisma/client";
import { User } from "./graphql";

export interface Context {
	prisma: PrismaClient;
	user: User | null;
	cookies?: {
		[key: string]: string;
	};
	setCookies: { name?: string; value?: string; options?: {} }[];
}
