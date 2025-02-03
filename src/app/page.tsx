import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Movies from "@/components/Movies";
import SearchMovies from "@/components/SearchMovies";

export default function Home() {
  return (
    <main className="bg-[#070C1B] h-full w-full *:box-border flex flex-col items-center">
      <Header />
      <SearchMovies />
      <Movies />
      <Footer />
    </main>
  );
}
