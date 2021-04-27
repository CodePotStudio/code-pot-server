type Environment = {
	jwtSecret: string;
	env: string;
};

const environment: Environment = {
	jwtSecret: process.env.JWT_SECRET as string,
	env: process.env.ENV as string,
};

export default environment;
