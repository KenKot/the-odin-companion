"use client";

import { signIn } from "next-auth/react";

export default function SigninBtn() {
  return(
    // <button onClick={() => signIn("github")}>Sign In</button>
    <button onClick={() => signIn()}>Sign In</button>
    // <div className="">Sign In btn</div>
  ) 
  
}