import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer w-full bg-[#292759]">
      <div className="container mx-auto px-24 py-8 text-white">
        <hr className="mb-4 mt-8 border-gray-600" />
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/NHC.svg" alt="NHC Logo" width={60} height={40} />
            <Image
              src="/Vision2030 White.svg"
              alt="Vision 2030"
              width={80}
              height={40}
              className="ml-4"
            />
          </div>
          <div className="text-sm">
            All rights reserved © 2022 - Developed and operated by National
            Housing
          </div>
        </div>
      </div>
    </footer>
  );
}
