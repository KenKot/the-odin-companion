import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import Course from "@/models/course";
import Lesson from "@/models/lesson";
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

          let lessonCounter = 0; // Initialize a lesson counter

          if (!userDoc) {
            userDoc = await User.create({ name, email }); // Directly create the user using MongoDB

            // Create two courses for the new user
            const courses = Array.from({ length: 2 }, async (_, i) => {
              const course = new Course({ title: `Course ${i + 1}` });

              // Create two lessons for each course
              const lessons = Array.from({ length: 2 }, async (_, j) => {
                lessonCounter += 1; // Increment the lesson counter
                const lesson = new Lesson({ title: `Lesson ${lessonCounter}` });

                // Create three flashcards for each lesson
                const flashcards = Array.from({ length: 3 }, async (_, k) => {
                  const flashcard = new Flashcard({
                    question: `Question ${k + 1}`,
                    answer: `Answer ${k + 1}`,
                    isMastered: false,
                  });

                  await flashcard.save();
                  lesson.flashcards.push(flashcard._id);
                });

                await Promise.all(flashcards);
                await lesson.save();
                course.lessons.push(lesson._id);
              });

              await Promise.all(lessons);
              await course.save();
              return course._id;
            });

            userDoc.courses = await Promise.all(courses);
            await userDoc.save();
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

export { handler as GET, handler as POST, authOptions };
