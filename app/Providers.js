"use client";

import {SessionProvider} from "next-auth/react"

export const NextAuthProvider = ({children}) => {
        // return <SessionProvider session={session}>{children}</SessionProvider>
    return <SessionProvider>{children}</SessionProvider>;
} 