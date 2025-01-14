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
    <div className="my-12 h-24 bg-[#070C1B] flex flex-row gap-2 items-center justify-center">
      {date.map((d, index) => (
        <div
          key={index}
          className="border rounded-md h-16 w-40 flex flex-col items-center justify-center"
        >
          <div>
            {index === 0 ? "TODAY" : d.toLocaleDateString("en-GB", dayOptions)}
          </div>
          <div>{d.toLocaleDateString("en-GB", dateOptions)}</div>
        </div>
      ))}
    </div>
  );
}
