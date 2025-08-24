import React from "react";
import {useRouter} from "next/router";
import Button from "@/components/button";
import {useAuth} from "@/hooks/useAuth";

const Header = () => {
    const {status} = useAuth();
    const router = useRouter();

    return (
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-2 lg:px-6 dark:bg-gray-800/40">
            {status === "unauthenticated" && (
                <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <div className="ml-auto flex-1 sm:flex-initial flex gap-4">
                        <Button value="로그인" onClick={() => router.push("/signin")}/>
                        <Button value="가입하기" variant="none" onClick={() => router.push("/signup")}/>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
