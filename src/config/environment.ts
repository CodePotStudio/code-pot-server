type Environment = {
	jwtSecret: string;
	env: string;
	databaseURL: string;
	githubClientID: string;
	githubSecret: string;
	clientURL: string;
	serverURL: string;
};

const environment: Environment = {
	jwtSecret: process.env.JWT_SECRET as string,
	env: process.env.ENV as string,
	databaseURL: process.env.DATABASE_URL as string,
	githubClientID: process.env.GITHUB_CLIENT_ID as string,
	githubSecret: process.env.GITHUB_SECRET as string,
	clientURL: process.env.CLIENT_URL as string,
	serverURL: process.env.SERVER_URL as string,
};

export default environment;
