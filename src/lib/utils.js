import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const handleAddUser = async (name, email, image, session) => {
  try {
    const response = await fetch("/api/add_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        image,
      }),
    });
    if (response.ok) {
      console.log("User added successfully");
    } else if (response.status === 409) {
      toast("Email already exists", "error");
      console.error("Failed to add user", await response.text());
    } else {
      toast("Failed to add user", "error");
      console.error("Failed to add user", await response.text());
    }
  } catch (error) {
    console.error("Error adding user", error);
  }
};
