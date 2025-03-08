import {DefaultSession} from "next-auth";

declare module "next-auth" {
    interface User {
        memberId: number;
        email: string;
        nickname: string;
        profileImage: string | null;
        introduction: string;
        accessToken: string;
        refreshToken: string;
    }

    interface Session {
        user: User & DefaultSession["user"];
    }
}