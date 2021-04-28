import { PrismaClient } from "@prisma/client";
import { User } from "./user";

export interface Context {
	prisma: PrismaClient;
	user: User | null;
	cookies?: {
		[key: string]: string;
	};
}
