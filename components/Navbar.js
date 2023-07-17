"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const { status } = useSession();

  return (
    <>
      <nav class="flex items-center justify-between p-6 border border-black border-4 rounded">
        <div class="flex items-center space-x-6">
          <Image
            src="/magni.png" // Path to your image
            alt="Description of the image"
            width={150} // Desired width
            height={150} // Desired height
            className="rounded-full"
          />
          <h1 className="text-5xl  font-semibold">The Odin Companion!</h1>
        </div>
        <div>
          {status === "authenticated" ? (
            <button
              className="px-4 py-2 font-semibold text-blue-500 bg-white rounded"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          ) : (
            <button
              className="px-4 py-2 font-semibold text-blue-500 bg-white rounded"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
