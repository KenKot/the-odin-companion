import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

import { useSession } from "next-auth/react";


export async function POST(request) {
  const { data: session } = useSession();

  const { name, email } = await request.json();
  console.log("!!!!!!!", "user/route.js fired");
  await connectMongoDB();
  await User.create({ name, email });
  return NextResponse.json({ message: "User Registered" }, { status: 201 });
}
