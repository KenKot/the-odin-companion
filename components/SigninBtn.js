"use client";

import { signIn } from "next-auth/react";

export default function SigninBtn() {
  return <button onClick={() => signIn()}>Sign In</button>;
}
