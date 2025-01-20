"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import HambugerMenu from "./HamburgerMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      console.log(status);

      if (window.innerWidth >= 1280 && status === "unauthenticated") {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div
        className={`fixed top-0 h-16 w-full z-50 flex justify-between items-center p-4 xl:px-20 border-b-2 border-[#21263F] backdrop-blur-lg `}
      >
        <Link href={"/"}>
          <img src="/header/logo.svg" alt="Logo" className="h-8" />
        </Link>

        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <img
            src="/header/hamburger.svg"
            alt="Hambugermenu"
            className="h-8 xl:hidden"
          />
        </button>

        {status === "authenticated" ? (
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="hidden xl:flex xl:flex-row xl:items-center xl:gap-2 "
          >
            {/* <div className="bg-white rounded-full w-10 h-10"></div> */}
            {session?.user?.name}
            <Image
              src="/header/Vector.png"
              alt="dropdown icon"
              width={12}
              height={24}
            />
          </button>
        ) : (
          <div
            className={` text-[#C8CEDD] hidden xl:flex xl:flex-row gap-6 justify-center items-center`}
          >
            <Link href={"/login"} className="py-3 px-6 ">
              Login
            </Link>
            <Link
              href={"/register"}
              className="border rounded border-[#8B93B0] py-3 px-10 font-bold"
            >
              Register
            </Link>
          </div>
        )}
      </div>
      {isOpen && <HambugerMenu />}
    </div>
  );
}
