import Link from "next/link";
import {
    BaggageClaimIcon,
    CircleUserRoundIcon,
    CompassIcon,
    MapIcon,
    MenuIcon,
    SearchIcon,
    SquarePenIcon
} from "lucide-react";
import {Input} from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import Image from "next/image";

const Navbar = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr] md:grid-cols-[60px_1fr]">
            <div
                className="hidden md:flex flex-col gap-2 border-r bg-gray-100/40 dark:bg-gray-800/40 md:items-center lg:items-start">
                <div className="flex h-[80px] items-center px-6">
                    <Link className="flex items-center gap-2 font-semibold" href="#">
                        <span className="hidden lg:inline text-2xl">Hoang Tour</span>
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
                            className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-50"
                            href="/board"
                        >
                            <SquarePenIcon className="h-6 w-6"/>
                            <span className="hidden lg:inline">후기 작성</span>
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-50"
                            href="#"
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
            </div>
            <div className="flex flex-col">
                <header
                    className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-2 lg:px-6 dark:bg-gray-800/40">
                    <div className="flex-1">
                        <h1 className="font-semibold text-lg hidden lg:block">Hoang Tour</h1>
                    </div>
                    <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                        <form className="ml-auto flex-1 sm:flex-initial">
                            <div className="relative">
                                <SearchIcon
                                    className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"/>
                                <Input
                                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white"
                                    placeholder="Search tours, destinations..."
                                    type="search"
                                />
                            </div>
                        </form>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="rounded-full" size="icon" variant="ghost">
                                    <Image
                                        alt="Avatar"
                                        className="rounded-full"
                                        height="32"
                                        src="/placeholder.svg"
                                        style={{
                                            aspectRatio: "32/32",
                                            objectFit: "cover",
                                        }}
                                        width="32"
                                    />
                                    <span className="sr-only">Toggle user menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <section className="w-full relative h-[60vh] sm:h-[70vh] lg:h-[80vh]">
                        <div
                            className="relative h-full flex flex-col items-center justify-center px-4 text-center space-y-4">
                            {children}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default Navbar;