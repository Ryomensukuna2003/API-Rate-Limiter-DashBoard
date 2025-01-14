"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Github, Mail } from "lucide-react";
export default function LoginForm() {
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user?.name && session?.user?.email && session?.user?.image) {
      handleAddUser(
        session.user.name,
        session.user.email,
        session.user.image,
        session
      );
    } else if (session) {
      console.error("Invalid user data:", session?.user);
    }
  }, [session]);

  return (
    <Card className="w-[350px]">
      <CardHeader className="space-y-1">
        {session ? (
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
        ) : (
          <CardTitle className="text-2xl text-center">SignIn</CardTitle>
        )}
        <CardDescription className="text-center">
          Choose a service to sign in with
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button
          className="w-full"
          variant="outline"
          onClick={() => signIn("google")}
        >
          <Mail className="mr-2 h-4 w-4" />
          Continue with Google
        </Button>
        <Button
          className="w-full"
          variant="outline"
          onClick={() => signIn("github")}
        >
          <Github className="mr-2 h-4 w-4" />
          Continue with GitHub
        </Button>
      </CardContent>
    </Card>
  );
}
