"use client";

import React from "react";
import { ModeToggle } from "@/components/ui/themeToggle";
import Image from "next/image";
import { Card } from "./ui/card";
import { IoLogoGithub } from "react-icons/io";
import { IoMdHome } from "react-icons/io";

const Navbar = () => {
  return (
    <Card className="flex justify-between items-center gap-8 w-full mx-auto min-w-[360px] rounded-xl px-6 h-20 mt-4">
      <div className="flex justify-center items-center gap-4 cursor-pointer">
        <Image src="/tictactoe.svg" alt="logo" height={28} width={28} />
        <p className="text-xl tracking-wider font-medium">TicTacToe</p>
      </div>
      <div className="flex justify-center items-center gap-4">
        <button onClick={() => window.location.reload()}>
          <IoMdHome
            size={"1.5rem"}
            className="cursor-pointer hover:scale-105"
          />
        </button>
        <a href="https://github.com/Glitchier/tic_tac_toe_WYB" target="_blank">
          <IoLogoGithub
            size={"1.5rem"}
            className="cursor-pointer hover:scale-105"
          />
        </a>
        <ModeToggle />
      </div>
    </Card>
  );
};

export default Navbar;
