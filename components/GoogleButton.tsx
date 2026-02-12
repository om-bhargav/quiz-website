"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function GoogleButton() {
  return (
    <Button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      variant={"outline"}
      className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-5 h-5"
      />
      Continue with Google
    </Button>
  );
}