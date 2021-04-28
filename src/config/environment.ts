type Environment = {
	jwtSecret: string;
	env: string;
	databaseURL: string;
};

const environment: Environment = {
	jwtSecret: process.env.JWT_SECRET as string,
	env: process.env.ENV as string,
	databaseURL: process.env.DATABASE_URL as string,
};

export default environment;
