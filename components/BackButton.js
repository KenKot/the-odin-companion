"use client";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="bg-gray-200 p-2 rounded text-black"
    >
      <FiArrowLeft size={24} />
    </button>
  );
}
