import passport from "passport";
import { environment } from "../config";
import { createRefreshToken } from "../utils/auth";
import { PrismaClient } from "@prisma/client";

const GITHUB_CONFIG = {
	clientID: environment.githubClientID,
	clientSecret: environment.githubSecret,
	callbackURL: environment.serverURL + "/auth/github/callback",
	scope: ["user:email"],
};

const prisma = new PrismaClient();

const githubAuthenticate = passport.authenticate("github", {
	scope: ["user:email"],
});

const githubCallback = async (req: any, res: any) => {
	const githubId = req.user.id;
	const photo = req.user.photos[0].value;
	const email = req.user.emails[0].value;
	const githubUrl = req.user.profileUrl;
	let user;
	const userExists = await prisma.user.findUnique({
		where: {
			email,
		},
	});
	const refreshToken = createRefreshToken();
	if (userExists) {
		if (userExists.githubId !== githubId) {
			res.status(500).json({
				error: "이미 다른 소셜 로그인으로 회원 가입이 되어있는 이메일입니다.",
			});
		} else {
			// 로그인 시, refresh token 신규 생성
			user = userExists;
			await prisma.user.update({
				where: { id: user.id },
				data: {
					refreshToken,
				},
			});
		}
	} else {
		try {
			// 회원 가입 시, 유저 생성
			user = await prisma.user.create({
				data: {
					email,
					githubId,
					isActive: false,
					refreshToken,
					profile: {
						create: {
							avatar: photo,
							githubUrl: githubUrl,
						},
					},
				},
			});
		} catch (e) {
			res.status(500).json({
				error: e.message,
			});
			res.end();
		}
	}
	// 하루동안 refresh 토큰이 유효하도록 설정
	res.cookie("refreshToken", refreshToken, {
		maxAge: 6 * 60 * 60 * 1000,
		httpOnly: true,
	});
	res.redirect(302, `${environment.clientURL}/register/activate`);
	res.end();
};

export { githubAuthenticate, githubCallback, GITHUB_CONFIG };
