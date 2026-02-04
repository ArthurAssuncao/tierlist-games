import React from "react";
import { Game, GamePlaying } from "../types";

interface GameCardProps {
  game: Game | GamePlaying;
  onClick: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  const isPlaying = game.tier === "playing";

  const getRatingColor = (rating: number) => {
    // if (rating >= 9) return "text-green-500";
    // if (rating >= 7) return "text-yellow-500";
    // if (rating >= 5) return "text-orange-500";
    // return "text-red-500";
    if (rating >= 9) return "text-gray-800";
    return "text-gray-700";
  };

  return (
    <div
      className="relative w-24 h-32 cursor-pointer transition-transform duration-200 hover:scale-105 hover:z-10 border border-gray-300"
      onClick={onClick}
    >
      <div className="w-full h-full bg-gray-700 animate-pulse flex items-center justify-center">
        <span className="text-white text-xs">Carregando...</span>
      </div>

      <div className="absolute inset-0  overflow-hidden">
        <img
          src={game.imageUrl}
          alt={game.name}
          className="w-full h-full object-top"
          onError={(e) => {
            e.currentTarget.src = "/placeholder-game.png";
          }}
        />
      </div>
      {!isPlaying && (
        <>
          {/* Rating badge */}
          <div className="absolute top-0 right-0 bg-yellow-300 bg-opacity-75 rounded-bl-sm w-6 h-6 flex items-center justify-center">
            <span
              className={`text-[0.7rem] font-bold ${getRatingColor(game.rating)}`}
            >
              {game.rating.toFixed(1)}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default GameCard;
