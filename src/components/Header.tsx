import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <div className="relative w-full h-72 overflow-hidden">
      {/* Image */}
      <Image
        src="/header/header-theater.jpg"
        layout="fill"
        objectFit="cover"
        alt="Header"
        className="absolute inset-0"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000]  to-[#000000] opacity-60"></div>
    </div>
  );
}
