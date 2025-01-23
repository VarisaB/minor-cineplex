export default function Halls() {
  const halls = [1, 2, 3];
  const times = [1, 2, 3, 4, 5];
  return (
    <div className="bg-[#070C1B] px-4 py-6 flex flex-col gap-10 xl:gap-16 xl:p-10">
      {halls.map((hall) => (
        <div className="flex flex-col gap-4">
          <h3 className="text-[#C8CEDD] text-2xl font-bold ">{`Hall ${hall}`}</h3>
          <div className="flex flex-wrap gap-4 xl:gap-6">
            {times.map((time) => (
              <h4 className="border rounded w-24 h-12 flex justify-center items-center text-xl font-bold bg-[#1E29A8]">
                {time}
              </h4>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
