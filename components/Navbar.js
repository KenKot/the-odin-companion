"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const { status } = useSession();

  return (
    <nav className="flex flex-wrap justify-between items-center p-4 md:p-6 text-white">
      <Link
        href="/"
        className="flex items-center space-x-2 md:space-x-4 cursor-pointer hover:opacity-80 transition-opacity duration-150"
      >
        <Image
          src="/magni.png"
          alt="Odin Companion Dog Logo"
          width={50}
          height={50}
          className="rounded-full border-2 border-white"
        />

        <h1 className="hidden md:block text-xl md:text-2xl font-semibold">
          The Odin Companion
        </h1>
      </Link>
      <div className="mt-2 md:mt-0">
        {status === "authenticated" ? (
          <button
            aria-label="Sign out"
            className="px-3 py-1 md:px-4 md:py-2 font-semibold text-black bg-white rounded hover:bg-blue-500 hover:text-white transition-colors duration-150 cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </button>
        ) : (
          <button
            aria-label="Sign in"
            className="flex items-center px-3 py-1 md:px-4 md:py-2 font-semibold text-black bg-white rounded hover:bg-blue-500 hover:text-white transition-colors duration-150 cursor-pointer"
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

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // return (
  //   <nav className="flex items-center justify-between p-6 border border-black border-4 rounded">
  //     <Link href="/">
  //       <div className="flex items-center space-x-6">
  //         <Image
  //           src="/magni.png" // Path to your image
  //           alt="Description of the image"
  //           width={150} // Desired width
  //           height={150} // Desired height
  //           className="rounded-full"
  //         />
  //         <h1 className="text-5xl  font-semibold">The Odin Companion</h1>
  //       </div>
  //     </Link>
  //     <div>
  //       {status === "authenticated" ? (
  //         <button
  //           className="px-4 py-2 font-semibold text-blue-500 bg-white rounded"
  //           onClick={() => signOut({ callbackUrl: "/" })}
  //         >
  //           Sign Out
  //         </button>
  //       ) : (
  //         <button
  //           className="px-4 py-2 font-semibold text-blue-500 bg-white rounded"
  //           onClick={() => signIn()}
  //         >
  //           Sign In
  //         </button>
  //       )}
  //     </div>
  //   </nav>
  // );
}
