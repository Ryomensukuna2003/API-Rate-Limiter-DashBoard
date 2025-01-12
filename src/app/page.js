"use client";
import Navbar from "@/components/Layout/navBar";
import LoginForm from "@/components/Auth/page";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.dir("Session Data-> " + JSON.stringify(session));
  return (
    <div>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Navbar />
        {session ? (
          <div>Helo form Home Page {session?.user?.name}</div>
        ) : (
          <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
            <LoginForm />
          </div>
        )}
      </div>
    </div>
  );
}
