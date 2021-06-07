import cookie from "cookie";

const customHeadersPlugin = {
	requestDidStart() {
		return {
			willSendResponse(requestContext: any) {
				const { setCookies = [] } = requestContext.context;

				setCookies.forEach(({ name, value, options }: any) => {
					const cookieString = cookie.serialize(name, value, {
						path: "/",
						...options,
					});
					requestContext?.response?.http?.headers.set(
						"Set-Cookie",
						cookieString
					);
				});

				return requestContext;
			},
		};
	},
};

export default customHeadersPlugin;
