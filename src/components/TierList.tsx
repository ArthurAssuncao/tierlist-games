import React, { useState } from "react";
import { getGamesByTier, getPlayingGames } from "../data/games";
import { Game, GamePlaying, TierList } from "../types";
import CurrentlyPlaying from "./CurrentlyPlaying";
import GameModal from "./GameModal";
import TierRow from "./TierRow";

const TierListComp: React.FC = () => {
  const tiers = getGamesByTier();
  const playingGames = getPlayingGames();

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    game: Game | GamePlaying | null;
  }>({
    isOpen: false,
    game: null,
  });

  const handleGameClick = (game: Game | GamePlaying) => {
    setModalState({
      isOpen: true,
      game: game,
    });
  };

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      game: null,
    });
  };

  function getHoursByYear(tiers: TierList[]) {
    const hoursByYear = tiers.reduce(
      (acc, tier) => {
        tier.games.forEach((game: Game) => {
          const year = new Date(game.startDate).getFullYear();
          acc[year] = (acc[year] || 0) + game.hours;
        });
        return acc;
      },
      {} as Record<number, number>,
    );

    return Object.entries(hoursByYear)
      .map(([year, hours]) => ({ year: Number(year), hours }))
      .sort((a, b) => b.year - a.year);
  }

  return (
    <div className="w-full min-h-screen bg-white p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-black-800 mb-2">
          🎮 Melhores Jogos
        </h1>
        <p className="text-gray-600">Minha tierlist pessoal de jogos</p>
      </header>

      <main className="flex flex-col gap-4">
        {/* Currently Playing Section */}
        {playingGames.length > 0 && (
          <CurrentlyPlaying
            games={playingGames}
            onGameClick={handleGameClick}
          />
        )}

        {/* Tier List Section */}
        <div className="bg-white rounded-xl p-4 shadow-2xl ">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🏆 Tier List
          </h2>

          <div className="flex flex-col gap-1.5 bg-gray-800 rounded-2xl">
            {tiers.map((tier, index) => (
              <TierRow
                key={tier.id}
                tier={tier}
                index={index}
                totalTiers={tiers.length}
                onGameClick={handleGameClick}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-400 rounded-lg p-4 text-center">
            <p className="text-white">Total de Jogos</p>
            <p className="text-2xl font-bold text-white">
              {tiers.reduce((acc, tier) => acc + tier.games.length, 0)}
            </p>
          </div>
          <div className="bg-blue-400 rounded-lg p-4 text-center">
            <p className="text-white">Horas Totais</p>
            <p className="text-2xl font-bold text-white">
              {tiers
                .reduce(
                  (acc, tier) =>
                    acc + tier.games.reduce((sum, game) => sum + game.hours, 0),
                  0,
                )
                .toFixed(1)}
              h
            </p>
          </div>
          <div className="bg-blue-400 rounded-lg p-4">
            <p className="text-white text-center mb-2">Horas Totais por Ano</p>
            <div className="flex gap-4 flex-wrap items-center justify-center text-white">
              {getHoursByYear(tiers).map(({ year, hours }) => (
                <div key={year} className="flex justify-between text-white">
                  <span>{year}: &nbsp;</span>
                  <span className="font-bold">{hours.toFixed(1)}h</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-blue-400 rounded-lg p-4 text-center">
            <p className="text-white">Nota Média</p>
            <p className="text-2xl font-bold text-white">
              {(() => {
                const allGames = tiers.flatMap((tier) => tier.games);
                const avg =
                  allGames.reduce((acc, game) => acc + game.rating, 0) /
                  allGames.length;
                return avg.toFixed(1);
              })()}
            </p>
          </div>
        </div>
      </main>

      {/* Modal */}
      <GameModal
        game={modalState.game}
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default TierListComp;
