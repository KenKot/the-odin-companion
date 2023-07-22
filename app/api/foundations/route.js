import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";

// import { getServerSession } from "next-auth/next"
// import { authOptions } from "../auth/[...nextauth]"


export async function GET(req) {
    // const session = await getServerSession(request, res, authOptions)
    const session = await getSession({ req })

    console.log(session,'!22!11!')

    // const {status, session} = useSession();
//   const { name, email } = await request.json();
//   await connectMongoDB();
//   await User.create({ name, email });
//   return NextResponse.json({ message: "User Registered" }, { status: 201 });

return NextResponse.json([{
    // text: session
        text: "weee data"
}])
}