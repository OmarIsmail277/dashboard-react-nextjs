"use client";
import { useSelector } from "react-redux";

export default function HomePage() {
  const data = useSelector((state) => state.dummy.value);

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Dashboard Ready 🚀</h1>
      <p className="text-gray-600 mt-3">{data}</p>
    </div>
  );
}
