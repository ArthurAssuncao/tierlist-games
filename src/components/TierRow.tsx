import React from "react";
import { Game, TierList } from "../types";
import GameCard from "./GameCard";

interface TierRowProps {
  tier: TierList;
  index: number;
  totalTiers: number;
  onGameClick: (game: Game) => void;
}

const TierRow: React.FC<TierRowProps> = ({
  tier,
  index,
  totalTiers,
  onGameClick,
}) => {
  const getBorderRadius = () => {
    if (index === 0) return "rounded-t-xl";
    if (index === totalTiers - 1) return "rounded-b-xl";
    return "";
  };

  return (
    <div
      className={`flex border-2 ${getBorderRadius()}`}
      style={{
        backgroundColor: tier.color,
        borderColor: "var(--border-color, #374151)",
      }}
    >
      <div className="w-32 flex flex-col items-center justify-center font-bold text-white p-2 ">
        <span className="text-center">{tier.icon}</span>
        <span className="text-center">{tier.name}</span>
      </div>
      <div
        className={`flex-1 bg-gray-800 bg-opacity-50 flex flex-wrap gap-2 ${getBorderRadius()}`}
      >
        {tier.games.map((game) => (
          <GameCard
            key={game.name
              .replaceAll(" ", "-")
              .replaceAll(":", "")
              .replaceAll("'", "")}
            game={game}
            onClick={() => onGameClick(game)}
          />
        ))}
      </div>
    </div>
  );
};

export default TierRow;
