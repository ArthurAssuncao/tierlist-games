import { useState } from "react";

import { getGamesByTier, getPlayingGames } from "../data/games";

import {
    FaSteam,
    FaPlaystation,
    FaGamepad,
    FaClock,
    FaStar,
} from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";

import { Game, GamePlaying } from "../types";
import CurrentlyPlaying from "./CurrentlyPlaying";
import GameList from "./GameList";
import GameModal from "./GameModal";
import { GraficoGames } from "./GraficoGames";
import ScrollToTopButton from "./ScrollToTopButton";
import TierRow from "./TierRow";
import { GenreStats } from "./GenreStats";

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
        <div className="w-full min-h-screen bg-gray-950 text-gray-100 p-3 md:p-8">
            <div className="max-w-8xl mx-auto flex flex-col gap-8">
                {/* Header */}
                <header className="flex flex-col items-center justify-center text-center gap-3 pt-4 pb-6 border-b border-gray-800">
                    <div className="flex items-center gap-6 text-3xl md:text-4xl text-gray-400">
                        <FaSteam className="hover:text-blue-400 hover:scale-110 transition-all duration-300 cursor-pointer" />
                        <BsNintendoSwitch className="hover:text-red-500 hover:scale-110 transition-all duration-300 cursor-pointer" />
                        <FaPlaystation className="hover:text-blue-600 hover:scale-110 transition-all duration-300 cursor-pointer" />
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-500">
                            Melhores Jogos
                        </h1>
                        <p className="text-gray-400 text-sm md:text-base mt-1 font-medium">
                            Minha tierlist pessoal de jogos zerados
                        </p>
                    </div>
                </header>

                <main className="flex flex-col gap-8">
                    {/* Currently Playing Section */}
                    {playingGames.length > 0 && (
                        <section className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 md:p-6 shadow-xl backdrop-blur-sm">
                            <CurrentlyPlaying
                                games={playingGames}
                                onGameClick={handleGameClick}
                            />
                        </section>
                    )}

                    {/* Tier List Section */}
                    <section className="flex flex-col gap-4">
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-2xl">🏆</span>
                            <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
                                Tier List
                            </h2>
                        </div>

                        <div className="flex flex-col gap-3 bg-gray-900/70 border border-gray-800/80 p-2 md:p-4 rounded-2xl shadow-2xl backdrop-blur-md">
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

                    <section className="bg-gray-900/40 border border-gray-800/60 rounded-2xl p-4 md:p-6 shadow-xl">
                        <div className="flex flex-col gap-6 p-4">
                            {/* Outros componentes como TierList, Cards, etc. */}

                            {/* Componente de Estatísticas por Gênero */}
                            <GenreStats
                                games={tiers.flatMap((tier) => tier.games)}
                            />
                        </div>
                    </section>

                    {/* Stats Section */}
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Total de Jogos */}
                        <div className="bg-gray-900/80 border border-gray-800 hover:border-blue-500/40 rounded-xl p-5 text-center flex flex-col items-center justify-center gap-2 transition-all shadow-md group">
                            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg group-hover:scale-110 transition-transform">
                                <FaGamepad className="text-xl" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Total de Jogos
                                </p>
                                <p className="text-3xl font-extrabold text-white mt-1">
                                    {tiers.reduce(
                                        (acc, tier) => acc + tier.games.length,
                                        0,
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Horas Totais */}
                        <div className="bg-gray-900/80 border border-gray-800 hover:border-indigo-500/40 rounded-xl p-5 text-center flex flex-col items-center justify-center gap-2 transition-all shadow-md group">
                            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-lg group-hover:scale-110 transition-transform">
                                <FaClock className="text-xl" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Horas Totais
                                </p>
                                <p className="text-3xl font-extrabold text-white mt-1">
                                    {tiers
                                        .reduce(
                                            (acc, tier) =>
                                                acc +
                                                tier.games.reduce(
                                                    (sum, game) =>
                                                        sum + game.hours,
                                                    0,
                                                ),
                                            0,
                                        )
                                        .toFixed(1)}
                                    <span className="text-lg font-normal text-gray-400 ml-1">
                                        h
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Gráfico */}
                        <div className="bg-gray-900/80 border border-gray-800 hover:border-purple-500/40 rounded-xl p-4 flex flex-col items-center justify-center transition-all shadow-md">
                            <div className="w-full flex items-center justify-center text-white">
                                <GraficoGames
                                    games={tiers.flatMap((tier) => tier.games)}
                                />
                            </div>
                        </div>

                        {/* Nota Média */}
                        <div className="bg-gray-900/80 border border-gray-800 hover:border-amber-500/40 rounded-xl p-5 text-center flex flex-col items-center justify-center gap-2 transition-all shadow-md group">
                            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg group-hover:scale-110 transition-transform">
                                <FaStar className="text-xl" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Nota Média
                                </p>
                                <p className="text-3xl font-extrabold text-white mt-1">
                                    {(() => {
                                        const allGames = tiers.flatMap(
                                            (tier) => tier.games,
                                        );
                                        if (allGames.length === 0) return "0.0";
                                        const avg =
                                            allGames.reduce(
                                                (acc, game) =>
                                                    acc + game.rating,
                                                0,
                                            ) / allGames.length;
                                        return avg.toFixed(1);
                                    })()}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Game List */}
                    <section className="bg-gray-900/40 border border-gray-800/60 rounded-2xl p-4 md:p-6 shadow-xl">
                        <GameList
                            games={tiers.flatMap((tier) =>
                                tier.games.filter((game) => {
                                    if (
                                        [2010].includes(
                                            new Date(
                                                game.startDate,
                                            ).getUTCFullYear(),
                                        )
                                    )
                                        return false;
                                    return true;
                                }),
                            )}
                        />
                    </section>
                </main>

                {/* Modal & Auxiliary Components */}
                <GameModal
                    game={modalState.game}
                    isOpen={modalState.isOpen}
                    onClose={handleCloseModal}
                />
                <ScrollToTopButton />
            </div>
        </div>
    );
};

export default TierListComp;
