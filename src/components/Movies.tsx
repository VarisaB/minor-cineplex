import Link from "next/link";

export default function Movies() {
  return (
    <div>
      Movies
      <Link
        href="/now"
        className="h-10 hover:text-white focus:text-white hover:border-b focus:border-b hover:-[#565F7E] focus:border-[#565F7E]"
      >
        Now Showing
      </Link>
      <Link
        href="/soon"
        className="h-10 hover:text-white focus:text-white hover:border-b focus:border-b hover:-[#565F7E] focus:border-[#565F7E]"
      >
        Comming Soon
      </Link>
    </div>
  );
}
