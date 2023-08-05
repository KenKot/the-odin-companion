import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import Course from "@/models/course";
import Lesson from "@/models/lesson";
import Flashcard from "@/models/flashcard";
import Path from "@/models/path";

import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

import flashcardJSONData from "@/misc/flashcardData";

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

            // Create two paths for the new user
            const paths = Array.from({ length: 2 }, async (_, i) => {
              const path = new Path({ title: `Path ${i + 1}` });

              // Create two courses for each path
              const courses = Array.from({ length: 2 }, async (_, j) => {
                const course = new Course({ title: `Course ${j + 1}` });

                // Create two lessons for each course
                const lessons = Array.from({ length: 2 }, async (_, k) => {
                  lessonCounter += 1; // Increment the lesson counter
                  const lesson = new Lesson({
                    title: `Lesson ${lessonCounter}`,
                  });

                  // Create three flashcards for each lesson
                  const flashcards = Array.from({ length: 3 }, async (_, l) => {
                    const flashcard = new Flashcard({
                      question: `Question ${l + 1}`,
                      answer: `Answer ${l + 1}`,
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
                path.courses.push(course._id);
              });

              await Promise.all(courses);
              await path.save();
              return path._id;
            });

            userDoc.paths = await Promise.all(paths);
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
