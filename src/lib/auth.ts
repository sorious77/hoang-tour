import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOption } from "@/pages/api/auth/[...nextauth]";

export const getServerSideSession = async (context: GetServerSidePropsContext) => {
    try {
        const session = await getServerSession(context.req, context.res, nextAuthOption);
        return { session, error: null };
    } catch (error) {
        console.error("Session error:", error);
        return { session: null, error: "Failed to get session" };
    }
};

export const requireServerSideAuth = async (context: GetServerSidePropsContext) => {
    const { session, error } = await getServerSideSession(context);
    
    if (error || !session) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
        };
    }
    
    return { session };
};

export const requireServerSideGuest = async (context: GetServerSidePropsContext) => {
    const { session } = await getServerSideSession(context);
    
    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    
    return { session: null };
};

