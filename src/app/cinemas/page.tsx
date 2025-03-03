import Cinemas from "@/components/Cinemas";
import FilterFunction from "@/components/FilterFunction";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Movies from "@/components/Movies";

export default function CinemasList() {
  return (
    <main className="bg-[#070C1B]">
      <Header />
      <Cinemas />
      <Footer />
    </main>
  );
}
