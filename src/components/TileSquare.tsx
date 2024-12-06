import React from "react";
const TileSquare = ({
  winner,
  onClick,
  value,
}: {
  winner: string | null;
  value: "X" | "O" | null;
  onClick: () => void;
}) => {
  if (!value) {
    return (
      <button
        className="w-full h-full border-2 rounded aspect-square text-2xl sm:text-4xl font-bold uppercase hover:bg-slate-500/40"
        onClick={onClick}
        disabled={Boolean(winner)}
      />
    );
  }
  return (
    <button
      className={`w-full square_${value.toLocaleLowerCase()} h-full min-h-8 min-w-8 border-2 rounded aspect-square text-2xl sm:text-4xl font-bold uppercase`}
      disabled
    >
      {value}
    </button>
  );
};

export default TileSquare;
