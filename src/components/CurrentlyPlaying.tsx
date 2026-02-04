import React from "react";
import { Game, GamePlaying } from "../types";
import GameCard from "./GameCard";

interface CurrentlyPlayingProps {
  games: GamePlaying[];
  onGameClick: (game: Game | GamePlaying) => void;
}

const CurrentlyPlaying: React.FC<CurrentlyPlayingProps> = ({
  games,
  onGameClick,
}) => {
  return (
    <div className="mb-8 mt-8 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Jogando Agora</h2>
      <div className="flex gap-8 overflow-x-auto pb-4 items-center justify-center">
        {games.map((game) => (
          <div
            key={game.name
              .replaceAll(" ", "-")
              .replaceAll(":", "")
              .replaceAll("'", "")}
            className="shrink-0 flex flex-col items-center justify-center gap-2"
          >
            <GameCard game={game} onClick={() => onGameClick(game)} />
            <div className="mt-2 text-center">
              {game.startDate && (
                <p className="text-gray-400 text-xs">
                  Desde:{" "}
                  {new Date(game.startDate).toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                  })}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentlyPlaying;
