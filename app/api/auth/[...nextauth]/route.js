import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import Flashcard from "@/models/flashcard";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "github") {
        const { name, email } = user;
        try {
          await connectMongoDB();
          let userDoc = await User.findOne({ email });

          if (!userDoc) {
            userDoc = await User.create({ name, email }); // Directly create the user using MongoDB

            // Create 5 flashcards for the new user
            for (let i = 0; i < 5; i++) {
              const flashcard = new Flashcard({
                userId: userDoc._id, // Set the userId to the new user's id
                question: `Question ${i + 1}`,
                answer: `Answer ${i + 1}`,
                lesson: `lesson 1`,
                score: 0,
              });
              await flashcard.save();
            }

            // Create 5 more flashcards for w/ diff category
            for (let i = 0; i < 5; i++) {
              const flashcard = new Flashcard({
                userId: userDoc._id, // Set the userId to the new user's id
                question: `Question ${i + 1}`,
                answer: `Answer ${i + 1}`,
                lesson: `lesson 2`,
                score: 0,
              });
              await flashcard.save();
            }
          }

          // Update the user object with the user document from MongoDB
          user.id = userDoc._id;

          return user;
        } catch (error) {
          console.log(error);
        }
      }

      return user;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
