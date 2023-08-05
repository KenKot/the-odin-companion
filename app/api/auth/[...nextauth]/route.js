import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import Course from "@/models/course";
import Lesson from "@/models/lesson";
import Flashcard from "@/models/flashcard";
import Path from "@/models/path";

import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

import allDataJSON from "@/misc/flashcardData";

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

          if (!userDoc) {
            userDoc = await User.create({ name, email }); // Directly create the user using MongoDB

            // Iterate over each path in the JSON
            const paths = allDataJSON.paths.map(async (pathData) => {
              const path = new Path({ title: pathData.title });

              // Iterate over each course in the path
              const courses = pathData.courses.map(async (courseData) => {
                const course = new Course({ title: courseData.title });

                // Iterate over each lesson in the course
                const lessons = courseData.lessons.map(async (lessonData) => {
                  const lesson = new Lesson({ title: lessonData.title });

                  // Iterate over each flashcard in the lesson
                  const flashcards = lessonData.flashcards.map(
                    async (flashcardData) => {
                      const flashcard = new Flashcard({
                        question: flashcardData.question,
                        answer: flashcardData.answer,
                        isMastered: flashcardData.isMastered,
                      });

                      await flashcard.save();
                      lesson.flashcards.push(flashcard._id);
                    }
                  );

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
