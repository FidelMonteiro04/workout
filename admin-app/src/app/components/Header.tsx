"use client";

import Image from "next/image";

const Header = () => {
  return (
    <header className="w-full py-4 px-6">
      <Image src="./logo.svg" width={140} height={140} alt="Workout logo" />
    </header>
  );
};

export default Header;
