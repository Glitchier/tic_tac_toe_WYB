import React, { useState } from "react";
import { Card } from "../ui/card";
import TileSquare from "../TileSquare";
import { Button } from "../ui/button";
import WinnerBanner from "../WinnerBanner";
import { toast } from "@/hooks/use-toast";

interface PlayerProps {
  name: string;
  symbol: "X" | "O";
}

interface GameProps {
  p1: PlayerProps;
  p2: PlayerProps;
  gridSize: number;
  wStreak: number;
  winReqStreak: number;
}

const Game = ({ p1, p2, gridSize, wStreak, winReqStreak }: GameProps) => {
  const [squares, setSquares] = useState(Array(gridSize * gridSize).fill(null));
  const [curPlayer, setCurPlayer] = useState<PlayerProps>(
    Math.round(Math.random() * 1) === 1
      ? { name: p1.name, symbol: p1.symbol }
      : { name: p2.name, symbol: p2.symbol }
  );
  const [winner, setWinner] = useState<string | null>(null);
  const [p1States, setP1States] = useState<number>(0);
  const [p2States, setP2States] = useState<number>(0);

  const resetFun = () => {
    setSquares(Array(gridSize * gridSize).fill(null));
    setCurPlayer(
      Math.round(Math.random() * 1) === 1
        ? { name: p1.name, symbol: p1.symbol }
        : { name: p2.name, symbol: p2.symbol }
    );
    setWinner(null);
  };

  // Helper function to check for a win with dynamic wStreak
  const checkWinner = (
    newSquares: string[],
    row: number,
    col: number
  ): string | null => {
    const index = (r: number, c: number) => r * gridSize + c;

    // Check in a specific direction for matches
    const checkDirection = (dr: number, dc: number): boolean => {
      let count = 1; // Include the current tile
      for (let step = 1; step < wStreak; step++) {
        const r = row + dr * step;
        const c = col + dc * step;
        if (
          r < 0 ||
          r >= gridSize ||
          c < 0 ||
          c >= gridSize ||
          newSquares[index(r, c)] !== curPlayer.symbol
        )
          break;
        count++;
      }
      for (let step = 1; step < wStreak; step++) {
        const r = row - dr * step;
        const c = col - dc * step;
        if (
          r < 0 ||
          r >= gridSize ||
          c < 0 ||
          c >= gridSize ||
          newSquares[index(r, c)] !== curPlayer.symbol
        )
          break;
        count++;
      }
      return count >= wStreak;
    };

    // Check all directions: horizontal, vertical, diagonal (two)
    const directions = [
      [0, 1], // Horizontal
      [1, 0], // Vertical
      [1, 1], // Diagonal (top-left to bottom-right)
      [1, -1], // Diagonal (top-right to bottom-left)
    ];

    for (const [dr, dc] of directions) {
      if (checkDirection(dr, dc)) {
        return curPlayer.symbol;
      }
    }
    return null;
  };

  const setTileValue = (index: number) => {
    if (squares[index] || winner) return;

    const newSquares = [...squares];
    newSquares[index] = curPlayer.symbol;
    setSquares(newSquares);

    const row = Math.floor(index / gridSize);
    const col = index % gridSize;

    const gameWinner = checkWinner(newSquares, row, col);
    if (gameWinner) {
      setWinner(gameWinner);
      if (gameWinner === p1.symbol) {
        setP1States((prev) => prev + 1);
        toast({ title: `${p1.name} win this round.` });
      } else {
        toast({ title: `${p2.name} win this round.` });
        setP2States((prev) => prev + 1);
      }
    } else {
      setCurPlayer((prev) =>
        prev.name === p1.name
          ? { name: p2.name, symbol: p2.symbol }
          : { name: p1.name, symbol: p1.symbol }
      );
    }
  };

  const checkDraw = () => {
    return squares.every((square) => square !== null);
  };

  return (
    <section className="min-w-[360px] flex flex-col gap-4 justify-center items-center pb-14">
      <div className="grid grid-cols-2 text-nowrap justify-center items-center gap-4 mx-auto">
        <Card className="px-8 py-6 flex flex-col justify-center items-center gap-4 overflow-hidden">
          <p className="font-semibold tracking-wider">{p1.name}</p>
          <p className="text-4xl font-bold">{p1States}</p>
        </Card>
        <Card className="px-8 py-6 flex flex-col justify-center items-center gap-4 overflow-hidden">
          <p className="font-semibold tracking-wider">{p2.name}</p>
          <p className="text-4xl font-bold">{p2States}</p>
        </Card>
      </div>
      <div className="flex justify-center items-center gap-2 tracking-wider mt-4">
        <p className="text-xl font-medium"> Win Streak:</p>
        <p className="text-xl font-bold">{wStreak}</p>
      </div>
      <div className="flex justify-center items-center gap-2 tracking-wider">
        <p className="text-4xl">🎯</p>
        <p className="text-2xl font-medium"> Win Required:</p>
        <p className="text-2xl font-bold">{winReqStreak}</p>
      </div>
      <div className="flex justify-center items-center gap-8 mb-4">
        <p className="text-xl text-nowrap tracking-wider">
          It&apos;s <b>{curPlayer.name}</b>&apos;s turn
        </p>
        <Button
          onClick={resetFun}
          className="text-lg font-semibold tracking-widest w-full max-w-sm p-6"
        >
          Reset
        </Button>
      </div>
      <Card
        style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
        className="grid justify-center items-center p-4 sm:p-8 w-full max-w-4xl"
      >
        {squares.map((value, i) => (
          <TileSquare
            key={i}
            winner={winner}
            onClick={() => setTileValue(i)}
            value={value}
          />
        ))}
      </Card>
      {winner ? (
        <WinnerBanner
          winner={winner}
          p1={p1}
          p2={p2}
          p1Score={p1States}
          p2Score={p2States}
          winReqStreak={winReqStreak}
        />
      ) : checkDraw() ? (
        <div className="fixed h-[100vh] w-full top-0 left-0 right-0 min-w-[400px] flex justify-center items-center px-4 sm:px-8 md:px-[4vw] lg:px-[6vw] backdrop-blur-sm">
          <Card className="w-full h-[40dvh] max-w-lg relative flex flex-col gap-8 justify-center items-center">
            <p className="text-5xl">😞</p>
            <p className="text-xl">It&apos;s a draw!</p>
            <div className="w-full px-8 flex justify-center items-center">
              <Button
                className="text-lg font-bold w-full max-w-sm"
                onClick={resetFun}
              >
                Restart
              </Button>
            </div>
          </Card>
        </div>
      ) : null}
    </section>
  );
};

export default Game;
