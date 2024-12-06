"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormEvent, useState } from "react";
import Game from "./Game";

export type PlayerProps = {
  name: string; // Player's name.
  symbol: "X" | "O"; // Player's symbol, either X or O.
};

const Start = () => {
  const [start, setStart] = useState<boolean>(false); // Tracks if the game has started.
  const [player1, setPlayer1] = useState<PlayerProps>({
    name: "Player X",
    symbol: "X",
  }); // State for Player 1.
  const [player2, setPlayer2] = useState<PlayerProps>({
    name: "Player O",
    symbol: "O",
  }); // State for Player 2.
  const [gridSize, setGridSize] = useState<number>(3); // State for the grid size (3x3 by default).
  const [streak, setStreak] = useState<number>(3); // State for the win streak required to win.

  // Handles the form submission and triggers the start of the game.
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStart(true); // Start the game when the form is submitted.
  };

  return (
    <>
      {start ? (
        // Renders the Game component with the selected settings if the game has started.
        <Game p1={player1} p2={player2} gridSize={gridSize} wStreak={streak} />
      ) : (
        // Form for entering player names, grid size, and win streak.
        <form
          onSubmit={handleSubmit}
          className="flex text-nowrap flex-col justify-center items-center gap-8 py-14 px-8 sm:px-14 border rounded-xl mx-auto w-full max-w-3xl h-full"
        >
          <Image
            src="/tictactoe.svg"
            className="mx-auto"
            alt="Logo"
            height={128}
            width={128}
            priority={false}
          />
          <h1 className="text-2xl text-wrap font-black tracking-widest mx-auto">
            Let&apos;s start the game! 🤩
          </h1>

          <div className="flex flex-col justify-center max-w-md gap-6 w-full">
            {/* Player X */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <label className="text-nowrap text-lg">Player X: </label>
              <Input
                type="text"
                placeholder="X name..."
                className="max-w-sm w-full"
                onChange={(e) =>
                  setPlayer1({ name: e.target.value, symbol: "X" })
                }
              />
            </div>
            {/* Player O */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <label className="text-nowrap text-lg">Player O: </label>
              <Input
                type="text"
                placeholder="O name..."
                className="max-w-sm w-full"
                onChange={(e) =>
                  setPlayer2({ name: e.target.value, symbol: "O" })
                }
              />
            </div>
            {/* Grid size */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <label className="text-nowrap text-lg">Grid Size: </label>
              <Select
                defaultValue="3"
                onValueChange={(e) => setGridSize(parseInt(e.toLowerCase()))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="3 x 3" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 x 3</SelectItem>
                  <SelectItem value="4">4 x 4</SelectItem>
                  <SelectItem value="5">5 x 5</SelectItem>
                  <SelectItem value="6">6 x 6</SelectItem>
                  <SelectItem value="7">7 x 7</SelectItem>
                  <SelectItem value="8">8 x 8</SelectItem>
                  <SelectItem value="9">9 x 9</SelectItem>
                  <SelectItem value="10">10 x 10</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Win Streak */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <label className="text-nowrap text-lg">Win Streak: </label>
              <Input
                type="number"
                placeholder="Number of wins"
                className="w-[180px]"
                min={3}
                defaultValue={streak}
                onChange={(e) => setStreak(parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="flex items-center justify-center mt-2 w-full">
            <Button
              type="submit"
              className="text-lg font-black tracking-widest p-6 w-full max-w-sm h-16"
            >
              Start
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default Start;
