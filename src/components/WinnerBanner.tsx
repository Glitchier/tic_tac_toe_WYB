import React, { useState } from "react";
import { Card } from "./ui/card";
import { IoClose } from "react-icons/io5";
import { PlayerProps } from "./pages/Start";
import { Button } from "./ui/button";

type Props = {
  winner: string | null;
  p1: PlayerProps;
  p2: PlayerProps;
  wStreak: number;
  p1Score: number;
  p2Score: number;
};

const WinnerBanner = ({ winner, p1, p2, wStreak, p1Score, p2Score }: Props) => {
  const [visible, setVisible] = useState<boolean>(true);

  if (
    visible &&
    (p1Score === wStreak || p2Score === wStreak) &&
    Boolean(winner)
  ) {
    return (
      <div className="fixed h-[100vh] w-full top-0 left-0 right-0 min-w-[400px] flex justify-center items-center px-4 sm:px-8 md:px-[4vw] lg:px-[6vw] backdrop-blur-sm">
        <Card className="w-full h-[40dvh] max-w-lg relative flex flex-col gap-8 justify-center items-center">
          <p className="text-5xl">🎉🎉🎉</p>
          <p className="text-xl">
            <span className="text-3xl">🏅</span>{" "}
            {p1Score > p2Score ? p1.name : p2.name} Wins{" "}
            <span className="text-3xl">🏅</span>
          </p>
          <div className="absolute top-0 right-0">
            <IoClose
              className="m-4 cursor-pointer hover:scale-110"
              size={"1.5rem"}
              onClick={() => setVisible(false)}
            />
          </div>
          <div className="w-full px-8 flex justify-center items-center">
            <Button
              onClick={() => window.location.reload()}
              className="text-lg font-bold w-full max-w-sm"
            >
              Restart
            </Button>
          </div>
        </Card>
      </div>
    );
  }
  return null; // Ensure to return null when not rendering
};

export default WinnerBanner;
