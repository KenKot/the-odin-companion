import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import Course from "@/models/course";
import Lesson from "@/models/lesson";
import Flashcard from "@/models/flashcard";
import UserFlashcard from "@/models/userFlashcard";

import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

import flashcardJSONData from "@/misc/flashcardData";

import seedDatabase from "@/misc/seed";

const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ user, account }) {
      if (account.provider === "github") {
        const { name, email } = user;
        try {
          await connectMongoDB();
          let userDoc = await User.findOne({ email });

          // seedDatabase(); // SEED DATABASE

          if (!userDoc) {
            userDoc = await User.create({ name, email });

            // Get all flashcards
            const flashcards = await Flashcard.find();

            // Create UserFlashcard relations for this user
            for (let flashcard of flashcards) {
              await UserFlashcard.create({
                user: userDoc._id,
                flashcard: flashcard._id,
                isMastered: false,
                starred: false,
              });
            }

            // Update the user object with the user document from MongoDB
            user.id = userDoc._id;
          }

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

export { handler as GET, handler as POST, authOptions };
