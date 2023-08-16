"use client";
import { BeatLoader } from "react-spinners";

export default function LoadingDots() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <BeatLoader color="#0e76a8" size={50} />
    </div>
  );
}
