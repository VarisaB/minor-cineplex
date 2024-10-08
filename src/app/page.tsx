import Cinemas from "@/components/Cinemas";
import FilterFunction from "@/components/FilterFunction";
import Header from "@/components/Header";
import Movies from "@/components/Movies";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-[#070C1B]">
      <Header />
      <FilterFunction />
      <Movies />
      <Cinemas />
    </main>
  );
}
