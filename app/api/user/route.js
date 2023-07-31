import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
  // export async function POST(request) {
  const session = await getServerSession(authOptions);

  // const { data: session } = useSession();

  const { name, email } = await request.json();
  console.log("!!!!!!!", "user/route.js fired");
  await connectMongoDB();
  await User.create({ name, email });
  return NextResponse.json({ message: "User Registered" }, { status: 201 });
}
