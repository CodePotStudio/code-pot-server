import { v4 as uuidv4 } from "uuid";
import * as jwt from "jsonwebtoken";
import { environment } from "../../config";

const createRefreshToken = () => {
	const secret = uuidv4();
	return secret;
};

const createJWTToken = (id: number, email: string): string => {
	const JWT_SECRET = environment.jwtSecret;
	return jwt.sign({ id, email }, JWT_SECRET, { expiresIn: "1h" });
};

export { createRefreshToken, createJWTToken };
