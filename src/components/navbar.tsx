import React, {useEffect} from "react";
import {useRouter} from "next/router";
import Sidebar from "@/components/navigation/sidebar";
import Header from "@/components/navigation/header";
import {ERROR_MESSAGES} from "@/lib/constants";
import {useAuth} from "@/hooks/useAuth";

const Navbar = ({children}: { children: React.ReactNode }) => {
    const {session, status, requireAuth} = useAuth();

    const router = useRouter();

    useEffect(() => {
        const urlList = ["/", "/signin", "/signup"]

        if (!urlList.includes(router.pathname)) {
            if (!requireAuth()) {
                alert(ERROR_MESSAGES.LOGIN_REQUIRED);
            }
        }
    }, [router, requireAuth]);

    return (
        <div className="grid min-h-screen w-full relative">
            <Sidebar />
            <div
                className={`flex flex-col w-full h-full ${status === "authenticated" && "md:w-screen-minus-50 lg:w-screen-minus-230 md:left-[50px] lg:left-[230px]"} absolute top-0 overflow-x-hidden`}>
                <Header />
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <section className="w-full relative h-[60vh] sm:h-[70vh] lg:h-[80vh]">
                        <div
                            className="relative h-full flex flex-col items-center px-4 text-center space-y-4">
                            {children}
                        </div>
                    </section>
                </main>
                <div className="fixed flex items-center justify-center bg-white border-t border-t-gray-200 h-10 w-full md:hidden bottom-0">

                </div>
            </div>
        </div>
    )
}

export default Navbar;