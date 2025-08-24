import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback } from "react";

export const useAuth = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const isAuthenticated = status === "authenticated";
    const isLoading = status === "loading";
    const isUnauthenticated = status === "unauthenticated";

    const logout = useCallback(() => {
        signOut({ redirect: true });
    }, []);

    const requireAuth = useCallback((redirectTo: string = "/signin") => {
        if (isUnauthenticated) {
            router.push(redirectTo);
            return false;
        }
        return true;
    }, [isUnauthenticated, router]);

    const requireGuest = useCallback((redirectTo: string = "/") => {
        if (isAuthenticated) {
            router.push(redirectTo);
            return false;
        }
        return true;
    }, [isAuthenticated, router]);

    return {
        session,
        status,
        isAuthenticated,
        isLoading,
        isUnauthenticated,
        logout,
        requireAuth,
        requireGuest,
    };
};
