import React from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { setTheme } = useTheme();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card backdrop-blur supports-[backdrop-filter]:bg-card dark:bg-card dark:supports-[backdrop-filter]:bg-card">
      <div className="container mx-auto flex h-14 items-center px-4">
        <div className="mr-4 hidden md:flex">
          <a href="/" className="flex items-center space-x-2">
            <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
              API Rate Limiting Dashboard
            </span>
          </a>
          {session && (
            <nav className="ml-12 flex items-center space-x-6 text-sm font-medium text-gray-700 dark:text-gray-300">
              <a
                href="/dashboard"
                className="hover:text-gray-900 dark:hover:text-gray-100"
              >
                Dashboard
              </a>
              <a
                href="/api-keys"
                className="hover:text-gray-900 dark:hover:text-gray-100"
              >
                API Keys
              </a>
              <a
                href="/settings"
                className="hover:text-gray-900 dark:hover:text-gray-100"
              >
                Settings
              </a>
            </nav>
          )}
        </div>
        <div className="flex flex-1 items-center justify-between gap-2 space-x-2 md:justify-end">
          <nav className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Sun className="h-5 w-5 transition-transform duration-300 dark:rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 transition-transform duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          {session && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Avatar>
                    <AvatarImage src={session?.user?.image} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Button variant="ghost" onClick={() => signOut()}>
                    Sign Out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
