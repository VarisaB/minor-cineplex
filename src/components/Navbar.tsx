"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 w-full z-50 flex justify-between p-4 border-b-2 border-[#21263F] ${
        isScrolled ? "bg-[#21263F]" : "bg-navbar-bg"
      }`}
    >
      {/* Use img tag for static assets from the public directory */}
      <Link href={"/"}>
        <img src="/header/logo.svg" alt="Logo" className="h-8" />
      </Link>
      <img src="/header/hamburger.svg" alt="Hambugermenu" className="h-8" />
    </div>
  );
}
