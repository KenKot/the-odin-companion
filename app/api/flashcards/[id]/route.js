import { connectMongoDB } from "@/lib/mongodb";
import UserFlashcardRelation from "@/models/userFlashcard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export const PATCH = async (request, { params }) => {
  try {
    await connectMongoDB();

    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    let flashcardId = params.id;

    console.log("flashcardId", flashcardId);
    console.log("userId", userId);

    // Find the UserFlashcardRelation for the given user and flashcard
    let userFlashcard = await UserFlashcardRelation.findOne({
      user: userId,
      flashcard: flashcardId,
    });

    // If the relation does not exist, create a new one
    if (!userFlashcard) {
      userFlashcard = new UserFlashcardRelation({
        user: userId,
        flashcard: flashcardId,
        isMastered: false,
      });
    }

    // Toggle the isMastered property
    userFlashcard.isMastered = !userFlashcard.isMastered;

    // Save the updated UserFlashcardRelation
    await userFlashcard.save();

    console.log("nextResponse flashcardId", flashcardId);
    return NextResponse.json(flashcardId, { status: 201 });
    // return NextResponse.json(strippedFlashcard, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update flashcard" },
      { status: 500 }
    );
  }
};

// import { connectMongoDB } from "@/lib/mongodb";
// import UserFlashcardRelation from "@/models/userFlashcard";
// import Flashcard from "@/models/flashcard";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/route";
// import { NextResponse } from "next/server";

// export const PATCH = async (request, { params }) => {
//   try {
//     await connectMongoDB();

//     const session = await getServerSession(authOptions);
//     const userId = session.user.id;
//     let flashcardId = params.id;
//     console.log("fc is");

//     // const fc = await Flashcard.findById("64d461997188764fd79e3469");
//     // console.log("fc is");
//     // console.log("fc is", fc);

//     // return NextResponse.json(
//     //   { message: "Failed to update flashcard" },
//     //   { status: 500 }
//     // );

//     console.log("userId is", userId);
//     console.log("flashcardId is", flashcardId);

//     let testuserFlashcard = await UserFlashcardRelation.findOne({
//       user: "64d4618a7188764fd79e3266",
//       flashcard: "64d4619c7188764fd79e34f7",
//     });

//     console.log("testuserFlashcard is", testuserFlashcard);

//     // Find the UserFlashcardRelation for the given user and flashcard
//     let userFlashcard = await UserFlashcardRelation.findOne({
//       user: userId,
//       flashcard: flashcardId,
//     });

//     if (!userFlashcard) {
//       console.log("!!!!!!!!!!!!!");
//       console.log("userId is", userId);
//       console.log("flashcardId is", flashcardId);
//       console.log("!!!!!!!!!!!!!");
//       return NextResponse.json(
//         { message: "UserFlashcardRelation not found." },
//         { status: 404 }
//       );
//     }

//     // Toggle the isMastered property
//     userFlashcard.isMastered = !userFlashcard.isMastered;

//     // Save the updated UserFlashcardRelation
//     await userFlashcard.save();

//     // Fetch the actual flashcard
//     const flashcard = await Flashcard.findById(flashcardId).select([
//       "question",
//       "answer",
//       "_id",
//     ]);
//     if (!flashcard) {
//       return NextResponse.json(
//         { message: "Flashcard not found." },
//         { status: 404 }
//       );
//     }

//     // Merge the UserFlashcardRelation's isMastered attribute into the flashcard
//     const flashcardWithUserData = {
//       ...flashcard._doc,
//       isMastered: userFlashcard.isMastered,
//     };

//     return NextResponse.json(flashcardWithUserData, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Failed to update flashcard" },
//       { status: 500 }
//     );
//   }
// };
