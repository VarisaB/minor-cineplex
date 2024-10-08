export default function Tags({ contents }: { contents: string[] }) {
  return (
    <div className="tags flex flex-row flex-wrap gap-1.5">
      {contents.map((content, index) => (
        <p
          key={index}
          className="tag bg-[#21263F] h-8 px-3 py-1.5 rounded-md text-[#8B93B0] text-sm font-normal"
        >
          {content}
        </p>
      ))}
    </div>
  );
}
