import Link from "next/link";
import {
    BaggageClaimIcon,
    CircleUserRoundIcon,
    CompassIcon,
    MapIcon,
    SquarePenIcon
} from "lucide-react";
import React from "react";
import {useRouter} from "next/navigation";
import Button from "@/components/button";

const Navbar = ({children}: { children: React.ReactNode }) => {
    const isLogin = true // TODO isLogin 처리

    const router = useRouter();

    return (
        <div className="grid min-h-screen w-full relative">
            {isLogin && <div
                className="hidden md:flex flex-col gap-2 md:items-center lg:items-start fixed md:w-[50px] lg:w-[230px] bg-gray-100/40 dark:bg-gray-800/40 border-r min-h-screen">
                <div className="flex h-[80px] items-center px-6">
                    <Link className="flex items-center gap-2 font-semibold" href="/">
                        <span className="hidden lg:inline text-2xl">Hoang Tour2</span>
                        <BaggageClaimIcon className="w-6 h-6 lg:hidden md:inline"/>
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-4 text-sm font-medium">
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-50"
                            href="/"
                        >
                            <CompassIcon className="h-6 w-6"/>
                            <span className="hidden lg:inline">홈</span>
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-50"
                            href="/pick"
                        >
                            <MapIcon className="h-6 w-6"/>
                            <span className="hidden lg:inline">여행지 뽑기</span>
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-50"
                            href="/feed"
                        >
                            <SquarePenIcon className="h-6 w-6"/>
                            <span className="hidden lg:inline">후기</span>
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-50"
                            href="/profile/hi"
                        >
                            <CircleUserRoundIcon className="h-6 w-6"/>
                            <span className="hidden lg:inline">프로필</span>
                        </Link>
                    </nav>
                </div>
                {/*<div className="h-[80px] grid items-start px-4">*/}
                {/*    <div*/}
                {/*        className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-50">*/}
                {/*        <MenuIcon/>*/}
                {/*        <span className="hidden lg:inline">더보기</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>}
            <div
                className={`flex flex-col w-full h-full ${isLogin && "md:w-screen-minus-50 lg:w-screen-minus-230 md:left-[50px] lg:left-[230px]"} absolute top-0 overflow-x-hidden`}>
                <header
                    className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-2 lg:px-6 dark:bg-gray-800/40">
                    <div className="flex-1">
                        <h1 className="font-semibold text-lg hidden lg:block">Hoang Tour</h1>
                    </div>
                    {isLogin ||
                        <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                            <div className="ml-auto flex-1 sm:flex-initial flex gap-4">
                                <Button value="로그인" onClick={() => router.push("/signin")}/>
                                <Button value="가입하기" variant="outline"  onClick={() => router.push("/signup")}/>
                            </div>
                        </div>
                    }
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <section className="w-full relative h-[60vh] sm:h-[70vh] lg:h-[80vh]">
                        <div
                            className="relative h-full flex flex-col items-center px-4 text-center space-y-4">
                            {children}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default Navbar;