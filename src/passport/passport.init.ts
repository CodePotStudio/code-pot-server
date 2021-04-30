import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import { GITHUB_CONFIG } from "./github";

// Oauth에서 사용하는 콜백
const OauthCallback = (_: String, __: String, profile: any, cb: any) =>
	cb(null, profile);

export default () => {
  // authenticate가 끝나면 request에 user를 추가해줌
	passport.serializeUser((user, cb) => cb(null, user));
	passport.deserializeUser((obj: any, cb) => cb(null, obj));
	passport.use(new GithubStrategy(GITHUB_CONFIG, OauthCallback));
};
