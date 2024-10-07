import { fetchMovieDetail } from "@/functions/getMovies";

export default async function MovieDetailPage({
  params,
}: {
  params: { movieId: string };
}) {
  console.log(params.movieId);

  const movie = await fetchMovieDetail(params.movieId);
  return <div></div>;
}
