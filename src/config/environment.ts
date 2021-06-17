type Environment = {
	jwtSecret: string;
	env: string;
	databaseURL: string;
	githubClientID: string;
	githubSecret: string;
};

const environment: Environment = {
	jwtSecret: process.env.JWT_SECRET as string,
	env: process.env.ENV as string,
	databaseURL: process.env.DATABASE_URL as string,
	githubClientID: process.env.GH_CLIENT_ID as string,
	githubSecret: process.env.GH_SECRET as string,
};

export default environment;
