import React from "react";
import { ModeToggle } from "@/components/ui/themeToggle";
import Image from "next/image";
import { Card } from "./ui/card";
import { IoLogoGithub } from "react-icons/io";

const Navbar = () => {
  return (
    <Card className="flex justify-between items-center gap-8 w-full mx-auto min-w-[360px] rounded-xl px-6 h-20 mt-4">
      <div className="flex justify-center items-center gap-4">
        <Image src="/tictactoe.svg" alt="logo" height={28} width={28} />
        <p className="text-xl tracking-wider font-medium">TicTacToe</p>
      </div>
      <div className="flex justify-center items-center gap-4">
        <IoLogoGithub
          size={"1.5rem"}
          className="cursor-pointer hover:scale-105"
        />
        <ModeToggle />
      </div>
    </Card>
  );
};

export default Navbar;
