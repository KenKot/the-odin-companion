"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const { status } = useSession();

  return (
    <nav className="flex flex-wrap items-center justify-between p-4 text-white md:p-6">
      <Link
        href="/"
        className="flex items-center space-x-2 transition-opacity duration-150 cursor-pointer md:space-x-4 hover:opacity-80"
      >
        <Image
          src="/magni.png"
          alt="Odin Companion Dog Logo"
          width={50}
          height={50}
          className="border-2 border-white rounded-full"
        />

        <h1 className="hidden text-xl font-semibold md:block md:text-2xl">
          The Odin Companion
        </h1>
      </Link>
      <div className="mt-2 md:mt-0">
        {status === "authenticated" ? (
          <button
            aria-label="Sign out"
            className="px-3 py-1 font-semibold text-black transition-colors duration-150 bg-white rounded cursor-pointer md:px-4 md:py-2 hover:bg-blue-500 hover:text-white"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </button>
        ) : (
          <button
            aria-label="Sign in"
            className="flex items-center px-3 py-1 font-semibold text-black transition-colors duration-150 bg-white rounded cursor-pointer md:px-4 md:py-2 hover:bg-blue-500 hover:text-white"
            onClick={() => signIn()}
          >
            Sign In
            <span className="ml-2">
              <Image
                src="https://authjs.dev/img/providers/github.svg"
                alt="Github logo"
                height={20}
                width={20}
              />
            </span>
          </button>
        )}
      </div>
    </nav>
  );
}
