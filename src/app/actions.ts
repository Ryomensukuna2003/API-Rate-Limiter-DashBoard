"use server";
import { prisma } from "@/lib/prisma";

export async function createApiKey() {
  "use server";

  // Generate API key (you might want to use a more secure method)
  const key =
    Math.random().toString(36).substring(2) +
    Math.random().toString(36).substring(2);

  try {
    const newKey = await prisma.apiKey.create({
      data: {
        key,
        status: "active",
      },
    });
    return { success: true, key: newKey };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteApiKey() {
  "use server";
  try {
    await prisma.apiKey.delete({
    //   where: { id: keyId },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
