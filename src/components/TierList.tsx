import React, { useState } from "react";
import { BsNintendoSwitch } from "react-icons/bs";
import { FaPlaystation, FaSteam } from "react-icons/fa";
import { getGamesByTier, getPlayingGames } from "../data/games";

import { Game, GamePlaying } from "../types";
import CurrentlyPlaying from "./CurrentlyPlaying";
import GameList from "./GameList";
import GameModal from "./GameModal";
import { GraficoGames } from "./GraficoGames";
import ScrollToTopButton from "./ScrollToTopButton";
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

  // function getHoursByYear(tiers: TierList[]) {
  //   const hoursByYear = tiers.reduce(
  //     (acc, tier) => {
  //       tier.games.forEach((game: Game) => {
  //         const year = new Date(game.startDate).getUTCFullYear();
  //         console.log(game.name, year);
  //         acc[year] = (acc[year] || 0) + game.hours;
  //       });
  //       return acc;
  //     },
  //     {} as Record<number, number>,
  //   );

  //   return Object.entries(hoursByYear)
  //     .map(([year, hours]) => ({ year: Number(year), hours }))
  //     .sort((a, b) => b.year - a.year);
  // }

  return (
    <div className="w-full min-h-screen bg-gray-800 p-1 md:p-4">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex flex-col items-center">
          <span className="text-4xl text-white flex items-center gap-8">
            <FaSteam />
            <BsNintendoSwitch />
            <FaPlaystation />
          </span>
          <span>Melhores Jogos</span>
        </h1>
        <p className="text-white">Minha tierlist pessoal de jogos</p>
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
        <section className="">
          <h2 className="text-2xl font-bold text-white text-center">
            🏆 Tier List
          </h2>

          <div className="flex flex-col gap-4 md:gap-1.5  bg-gray-800 rounded-2xl">
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
        </section>

        {/* Stats Section */}
        <section className="mt-2 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-400 rounded-lg p-4 text-center flex flex-col items-center justify-center">
            <p className="text-white">Total de Jogos</p>
            <p className="text-2xl font-bold text-white">
              {tiers.reduce((acc, tier) => acc + tier.games.length, 0)}
            </p>
          </div>
          <div className="bg-blue-400 rounded-lg p-4 text-center  flex flex-col items-center justify-center">
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
          <div className="bg-blue-400 rounded-lg p-4  flex flex-col items-center justify-center">
            <div className="flex gap-4 flex-wrap items-center justify-center text-white">
              <GraficoGames games={tiers.flatMap((tier) => tier.games)} />
            </div>
          </div>
          <div className="bg-blue-400 rounded-lg p-4 text-center flex flex-col items-center justify-center">
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
        </section>

        {/* game list */}
        <section className="">
          <GameList
            games={tiers.flatMap((tier) =>
              tier.games.filter((game) => {
                if ([2010].includes(new Date(game.startDate).getUTCFullYear()))
                  return false;
                return true;
              }),
            )}
          />
        </section>
      </main>

      {/* Modal */}
      <GameModal
        game={modalState.game}
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
      />
      <ScrollToTopButton />
    </div>
  );
};

export default TierListComp;
