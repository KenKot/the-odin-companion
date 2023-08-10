import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

export default function BackButton() {
  return (
    <button className="bg-gray-200 p-2 rounded text-black">
      <Link href="..">
        <FiArrowLeft size={24} />
      </Link>
    </button>
  );
}
