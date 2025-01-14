import Image from "next/image";

export default function Footer() {
  return (
    <div className="w-full h-52 bg-[#070C1B] flex items-center justify-center">
      <Image src="/footer/logo.png" width={185} height={85} alt="Header" />
    </div>
  );
}
