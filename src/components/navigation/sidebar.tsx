import Link from "next/link";
import {
    BaggageClaimIcon,
    CircleUserRoundIcon,
    CompassIcon,
    MapIcon,
    SquarePenIcon,
    DoorOpenIcon
} from "lucide-react";
import React from "react";
import {useAuth} from "@/hooks/useAuth";

const Sidebar = () => {
    const {session, logout} = useAuth();

    if (!session) return null;

    return (
        <div className="hidden md:flex flex-col gap-2 md:items-center lg:items-start fixed md:w-[50px] lg:w-[230px] bg-gray-100/40 dark:bg-gray-800/40 border-r min-h-screen">
            <div className="flex h-[80px] items-center px-6">
                <Link className="flex items-center gap-2 font-semibold" href="/">
                    <span className="hidden lg:inline text-2xl">Hoang Tour</span>
                    <BaggageClaimIcon className="w-6 h-6 lg:hidden md:inline"/>
                </Link>
            </div>
            <div className="flex-1">
                <nav className="grid items-start px-4 text-sm font-medium">
                    <Link
                        className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-50"
                        href="/pick"
                    >
                        <MapIcon className="h-6 w-6"/>
                        <span className="hidden lg:inline">여행지 뽑기</span>
                    </Link>
                    <Link
                        className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-50"
                        href="/review"
                    >
                        <SquarePenIcon className="h-6 w-6"/>
                        <span className="hidden lg:inline">후기</span>
                    </Link>
                    <Link
                        className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-50"
                        href={`/profile/${session.user.nickname}`}
                    >
                        <CircleUserRoundIcon className="h-6 w-6"/>
                        <span className="hidden lg:inline">프로필</span>
                    </Link>
                </nav>
            </div>
                            <div
                    className="mb-10 w-full sm:px-4 lg:px-7 font-medium flex items-center gap-3 rounded-lg py-2 transition-all hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-50 cursor-pointer"
                    onClick={logout}
                >
                    <DoorOpenIcon/>
                    <span className="hidden lg:inline">로그아웃</span>
                </div>
        </div>
    );
};

export default Sidebar;
