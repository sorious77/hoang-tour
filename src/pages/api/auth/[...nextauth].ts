import NextAuth, {NextAuthOptions, Session, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import apiClient from "@/lib/apiClient";
import {JWT} from "next-auth/jwt";

export const nextAuthOption: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Custom Server",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials, req) {
                try {
                    if (!credentials) return null;

                    const response: User = await apiClient.post("/api/v1/members/signIn",
                        {
                            email: credentials.email,
                            password: credentials.password
                        }
                    )

                    if (response.accessToken) {
                        return response;
                    }

                    return null;
                } catch (error) {
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.email = user.email;
                token.nickname = user.nickname;
                token.introduction = user.introduction;
            }
            return token;
        },
        async session({session, token}: { session: Session, token: JWT }) {
            session.user = {
                id: token.email as string,
                accessToken: token.accessToken as string,
                refreshToken: token.refreshToken as string,
                email: token.email as string,
                nickname: token.nickname as string,
                profileImage: (token.profileImage || "") as string,
                introduction: token.introduction as string
            };

            return session;
        },
    },
    pages: {
        signIn: "/signin"
    },
    secret: process.env.JWT_SECRET
};

export default NextAuth(nextAuthOption);