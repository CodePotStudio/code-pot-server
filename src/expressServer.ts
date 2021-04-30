import serverless from "serverless-http";
import express from "express";
import initPassport from "./passport/passport.init";
import cookieParser from "cookie-parser";
import passport from "passport";
import { githubAuthenticate, githubCallback } from "./passport/github";

const app = express();
// 사용할 strategy 초기화
initPassport();
// express에서 passport 사용할 수 있도록 설정
app.use(passport.initialize());
// request에 req.cookies 만들어주는 미들웨어
app.use(cookieParser());

// github Oauth 설정
app.get("/auth/github", githubAuthenticate);
app.get("/auth/github/callback", githubAuthenticate, githubCallback);

export const expressHandler = serverless(app);
