import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";

interface ILink {
  href: string;
  name: string;
}

const page = () => {
  const links: ILink[] = [
    {
      href: "",
      name: "Home",
    },
    {
      href: "/tour",
      name: "Tour",
    },
    {
      href: "/diary",
      name: "Diary",
    },
    {
      href: "/mypage",
      name: "My Page",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between px-4 py-2 bg-green-500 dark:bg-gray-800 text-lg">
        <Link className="flex items-center gap-2" href="#">
          <MapIcon />
          <span className="text-lg font-semibold text-white">Subway Tour</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          {links.map((link) => (
            <Link
              className="text-white hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-50"
              key={link.href}
              href={link.href}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="md:hidden" size="icon" variant="outline">
              <MenuIcon />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6">
              {links.map((link) => (
                <Link
                  className="text-black hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-50"
                  key={link.href}
                  href={link.href}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <main className="flex items-center justify-center h-screen flex-col">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white my-10">
          Welcome to Subway Tour
        </h1>
        <h2 className="text-2xl">Let's have an exciting trip by subway!</h2>
      </main>
    </div>
  );
};

function MapIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 text-white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

export default page;
