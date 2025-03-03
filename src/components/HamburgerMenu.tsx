import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function HambugerMenu() {
  const { data: session, status } = useSession();
  return (
    <div>
      {status === "authenticated" ? (
        <div
          className={`text-[#C8CEDD] fixed top-16 z-50 right-0 xl:right-4 p-6 w-full xl:w-48 flex flex-col items-start gap-4 border border-[#21263F] backdrop-blur-lg `}
        >
          <div className="flex flex-row items-center gap-2 xl:hidden">
            <div className="bg-white rounded-full w-10 h-10"></div>
            {session?.user?.name}
          </div>

          <Link href={"/"} className="">
            Booking history
          </Link>

          <hr className="border border-[#565F7E] w-full" />

          <button onClick={() => signOut({ callbackUrl: "/" })} className="">
            Log out
          </button>
        </div>
      ) : (
        <div
          className={`text-[#C8CEDD] fixed top-16 z-50 left-0 w-full p-6 border border-[#21263F] flex flex-col gap-6 justify-center items-center backdrop-blur-lg`}
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
  );
}
