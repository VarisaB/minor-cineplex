export function ShowDates() {
  const date: Date[] = [];
  const today: Date = new Date();

  for (let i: number = 0; i < 7; i++) {
    let newDate: Date = new Date(today);
    newDate.setDate(newDate.getDate() + i);
    date.push(newDate);
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const dayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
  };
  //   console.log(date, today);

  return (
    <div className="p-4 h-24 w-fit bg-[#070C1B] flex flex-row gap-2">
      {date.map((d, index) => (
        <button
          key={d.valueOf()}
          className={`rounded w-28 xl:w-40 h-16 flex flex-col items-center justify-center ${
            index === 0 ? "bg-[#21263F]" : ""
          } `}
        >
          <h3
            className={`text-2xl font-bold ${
              index === 0 ? "text-white" : "text-[#8B93B0]"
            }`}
          >
            {index === 0 ? "TODAY" : d.toLocaleDateString("en-GB", dayOptions)}
          </h3>
          <p className={`${index === 0 ? "text-[#C8CEDD]" : "text-[#565F7E]"}`}>
            {d.toLocaleDateString("en-GB", dateOptions)}
          </p>
        </button>
      ))}
    </div>
  );
}
