"use client"

import SigninBtn from "./SigninBtn";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function UserInfo() { 
    const {status, data: session} = useSession();


    if (status === "authenticated") {
        return (
                <div>
                    <Image src={session?.user?.image} width={50} height={50} /> 
                    </div>)
    } else {
        return <SigninBtn />
        
    }


}   