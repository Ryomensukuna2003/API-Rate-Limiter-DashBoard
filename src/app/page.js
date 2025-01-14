"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Navbar from "@/components/Layout/navBar";
import LoginForm from "@/components/Auth/page";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (session) {
    return null; // or a loading spinner
  }

  return (
    <div>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Navbar />
        <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
