"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
    const {status} = useSession();

    return (
        <div className="p-4 flex justify-between items-center shadow-md">
            <Link href="/">The Odin Companion</Link>


        {status === "authenticated" ? 
        (<button onClick={()=> signOut()}>Sign Out</button>) 
        : 
        (<button onClick={()=> signIn()}>Sign In</button>)
        }

            
        </div>
    )
}