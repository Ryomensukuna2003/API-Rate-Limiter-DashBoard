import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // const { name, email, image } = params;
    const { name, email, image } = await request.json();

    let user = await prisma.User.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      user = await prisma.User.create({
        data: {
          name: name,
          email: email,
          image: image,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      console.log("User-> " + user);
    } else
      return NextResponse.json(
        { message: "User already  exists" },
        { status: 400 }
      );
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.error("Error adding user", error.stack);
    return new Response("Error adding user", { status: 500 });
  }
}
