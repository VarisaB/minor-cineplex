import Tags from "./Tags";

export default function CardHeader({
  name,
  tags,
}: {
  name: string;
  tags: string[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="movie-name text-xl font-bold">
        {/* find other way for breaking word*/}
        {name.length > 20 ? `${name.slice(0, 17)}...` : name}
      </h4>
      <Tags contents={tags} />
    </div>
  );
}
