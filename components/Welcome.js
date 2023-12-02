"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Welcome() {
  return (
    <div className="mt-10 sm:mt-16 md:mt-20 flex flex-col items-center justify-center">
      <h1 className="text-6xl text-center sm:text-7xl md:text-8xl gradient-text">
        The Odin Companion
      </h1>
      <Image
        src="/magni.png"
        alt="Odin Companion Dog Logo"
        width={120}
        height={120}
        className="border-2 border-white rounded-full mt-4 mb-4"
      />
      <h2 className="mt-4 text-xl text-center sm:text-2xl">
        Welcome to the flashcard app designed to complement The Odin
        Project&apos;s curriculum.
      </h2>
      <h2 className="hidden mt-4 mb-6 text-2xl text-center sm:block">
        Ready to accelerate your learning? Sign in with your GitHub account now!
      </h2>
      <button
        aria-label="Sign in"
        className="flex items-center px-5 py-2 font-semibold text-black transition-colors duration-150 bg-white rounded cursor-pointer md:px-6 md:py-3 hover:bg-blue-500 hover:text-white"
        onClick={() => signIn()}
      >
        Sign In
        <span className="ml-3">
          <Image
            src="/github-cat.jpg"
            alt="Github logo"
            height={40}
            width={40}
          />
        </span>
      </button>
    </div>
  );
}
