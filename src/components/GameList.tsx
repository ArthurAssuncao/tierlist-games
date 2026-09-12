// components/GameList.tsx
import { useMemo, useState } from "react";

import { BiCategory } from "react-icons/bi";
import { FaGamepad } from "react-icons/fa";
import {
    FaCalendarAlt,
    FaClock,
    FaSortAlphaDown,
    FaStar,
} from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { LuCalendarArrowDown, LuCalendarArrowUp } from "react-icons/lu";
import type { Game } from "../types";
import { formatDate, formatHours } from "../util/util";
import GameModal from "./GameModal";

interface GameListProps {
    games: Game[];
}

type SortOption = "alphabetical" | "rating" | "dateStarted" | "dateFinished";

interface GameGroup {
    title: string;
    games: Game[];
}

const GameList: React.FC<GameListProps> = ({ games }) => {
    const [sortOption, setSortOption] = useState<SortOption>("dateFinished");

    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Agrupa jogos baseado na opção de ordenação
    const groupedGames = useMemo(() => {
        const sortedGames = [...games].sort((a, b) => {
            switch (sortOption) {
                case "alphabetical":
                    return a.name.localeCompare(b.name);
                case "rating":
                    return b.rating - a.rating;
                case "dateStarted":
                    return (
                        new Date(b.startDate).getTime() -
                        new Date(a.startDate).getTime()
                    );
                case "dateFinished":
                    return (
                        new Date(b.endDate).getTime() -
                        new Date(a.endDate).getTime()
                    );
                default:
                    return 0;
            }
        });

        if (sortOption === "alphabetical") {
            const groups: GameGroup[] = [];
            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

            alphabet.forEach((letter) => {
                const letterGames = sortedGames.filter((game) =>
                    game.name.toUpperCase().startsWith(letter),
                );

                if (letterGames.length > 0) {
                    groups.push({
                        title: letter,
                        games: letterGames,
                    });
                }
            });

            // Jogos que começam com números ou outros caracteres
            const otherGames = sortedGames.filter(
                (game) =>
                    !alphabet.some((letter) =>
                        game.name.toUpperCase().startsWith(letter),
                    ),
            );

            if (otherGames.length > 0) {
                groups.push({
                    title: "#",
                    games: otherGames,
                });
            }

            return groups;
        } else if (sortOption === "rating") {
            // Agrupa por faixa de nota
            const groups: GameGroup[] = [
                { title: "9.0 - 10.0 ⭐", games: [] },
                { title: "7.0 - 8.9 ⭐", games: [] },
                { title: "5.0 - 6.9 ⭐", games: [] },
                { title: "0.0 - 4.9 ⭐", games: [] },
            ];

            sortedGames.forEach((game) => {
                if (game.rating >= 9) {
                    groups[0].games.push(game);
                } else if (game.rating >= 7) {
                    groups[1].games.push(game);
                } else if (game.rating >= 5) {
                    groups[2].games.push(game);
                } else {
                    groups[3].games.push(game);
                }
            });

            return groups.filter((group) => group.games.length > 0);
        } else if (
            sortOption === "dateStarted" ||
            sortOption === "dateFinished"
        ) {
            // Agrupa por ano
            const groups: GameGroup[] = [];
            const yearMap = new Map<number, Game[]>();

            sortedGames.forEach((game) => {
                const date =
                    sortOption === "dateStarted"
                        ? game.startDate
                        : game.endDate;
                const year = new Date(date).getUTCFullYear();

                if (!yearMap.has(year)) {
                    yearMap.set(year, []);
                }
                yearMap.get(year)!.push(game);
            });

            // Ordena os anos em ordem decrescente
            const sortedYears = Array.from(yearMap.keys()).sort(
                (a, b) => b - a,
            );

            sortedYears.forEach((year) => {
                groups.push({
                    title: year.toString(),
                    games: yearMap.get(year)!,
                });
            });

            return groups;
        }

        return [
            {
                title: "Todos os Jogos",
                games: sortedGames,
            },
        ];
    }, [games, sortOption]);

    const handleGameClick = (game: Game) => {
        setSelectedGame(game);
        setIsModalOpen(true);
    };

    const getRatingColor = (rating: number) => {
        if (rating >= 9) return "text-green-500";
        if (rating >= 7) return "text-yellow-500";
        if (rating >= 5) return "text-orange-500";
        return "text-red-500";
    };

    const getSortIcon = () => {
        switch (sortOption) {
            case "alphabetical":
                return <FaSortAlphaDown className="mr-2 text-white" />;
            case "rating":
                return <FaStar className="mr-2 text-white" />;
            case "dateStarted":
                return <FaCalendarAlt className="mr-2 text-white" />;
            case "dateFinished":
                return <FaClock className="mr-2 text-white" />;
            default:
                return null;
        }
    };

    const getSortLabel = () => {
        switch (sortOption) {
            case "alphabetical":
                return "A-Z";
            case "rating":
                return "Nota";
            case "dateStarted":
                return "Data de Início";
            case "dateFinished":
                return "Data de Término";
            default:
                return "";
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-950 text-gray-100 p-4 md:p-8">
            <div className="max-w-8xl mx-auto flex flex-col gap-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-gray-800">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">
                            Jogos Zerados
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">
                            Sua biblioteca de conquistas e avaliações
                        </p>
                    </div>

                    {/* Controles de Ordenação */}
                    <div className="relative">
                        <div className="bg-gray-900 hover:bg-gray-800 border border-gray-700/80 rounded-xl px-4 py-2.5 flex items-center gap-3 cursor-pointer transition-all shadow-md hover:border-blue-500/50">
                            {getSortIcon()}
                            <span className="text-sm font-medium text-gray-200">
                                Ordenar:{" "}
                                <strong className="text-blue-400">
                                    {getSortLabel()}
                                </strong>
                            </span>
                            <select
                                value={sortOption}
                                onChange={(e) =>
                                    setSortOption(e.target.value as SortOption)
                                }
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            >
                                <option
                                    value="alphabetical"
                                    className="bg-gray-900 text-gray-200"
                                >
                                    Ordem Alfabética
                                </option>
                                <option
                                    value="rating"
                                    className="bg-gray-900 text-gray-200"
                                >
                                    Nota
                                </option>
                                <option
                                    value="dateStarted"
                                    className="bg-gray-900 text-gray-200"
                                >
                                    Data de Início
                                </option>
                                <option
                                    value="dateFinished"
                                    className="bg-gray-900 text-gray-200"
                                >
                                    Data de Término
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Lista de Grupos de Jogos */}
                <div className="flex flex-col gap-8">
                    {groupedGames.map((group, groupIndex) => (
                        <div
                            key={`${group.title}-${groupIndex}`}
                            className="flex flex-col gap-4"
                        >
                            {/* Título do Grupo */}
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span className="w-2 h-6 bg-blue-500 rounded-full inline-block"></span>
                                    {group.title}
                                </h2>
                                <span className="bg-gray-800 text-gray-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-gray-700">
                                    {group.games.length}{" "}
                                    {group.games.length === 1
                                        ? "jogo"
                                        : "jogos"}
                                </span>
                            </div>

                            {/* Grid de Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {group.games.map((game) => (
                                    <div
                                        key={game.name
                                            .replaceAll(" ", "-")
                                            .replaceAll(":", "")
                                            .replaceAll("'", "")}
                                        onClick={() => handleGameClick(game)}
                                        className="group relative bg-gray-900/80 hover:bg-gray-850 border border-gray-800 hover:border-blue-500/40 rounded-xl p-3 flex gap-3.5 items-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1 overflow-hidden"
                                    >
                                        {/* Capa do Jogo (Frente) */}
                                        <div className="w-20 h-28 shrink-0 rounded-lg overflow-hidden bg-gray-800 shadow-md relative">
                                            {game.imageUrl ? (
                                                <img
                                                    src={game.imageUrl}
                                                    alt={game.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-linear-to-br from-gray-800 to-gray-700 flex flex-col items-center justify-center p-2 text-center">
                                                    <FaGamepad className="text-gray-500 text-xl mb-1" />
                                                    <span className="text-gray-400 text-[10px] font-bold line-clamp-2 leading-tight">
                                                        {game.name}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Informações do Jogo */}
                                        <div className="flex-1 min-w-0 flex flex-col justify-between h-28 py-0.5">
                                            <div>
                                                {/* Nome */}
                                                <h3
                                                    className="text-base font-bold text-white truncate group-hover:text-blue-400 transition-colors"
                                                    title={game.name}
                                                >
                                                    {game.name}
                                                </h3>

                                                {/* Tag de Gênero */}
                                                {game.genres && (
                                                    <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 max-w-full truncate">
                                                        <BiCategory />
                                                        <span className="truncate">
                                                            {game.genres.join(
                                                                ", ",
                                                            )}
                                                        </span>
                                                    </span>
                                                )}
                                            </div>

                                            {/* Metadados: Nota e Tempo */}
                                            <div className="flex items-center gap-2 mt-2">
                                                <div
                                                    className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold ${getRatingColor(game.rating)}`}
                                                >
                                                    <FaStar className="text-yellow-400 text-xs" />
                                                    <span>
                                                        {game.rating.toFixed(1)}
                                                        /10
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700/50">
                                                    <IoTimeSharp className="text-gray-400 text-xs" />
                                                    <span>
                                                        {formatHours(
                                                            game.hours,
                                                        )}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Datas */}
                                            <div className="flex items-center  gap-1 text-[11px] text-gray-400 mt-1">
                                                {game.startDate && (
                                                    <span className="flex items-center gap-0.5">
                                                        <LuCalendarArrowDown className="text-gray-500" />
                                                        {formatDate(
                                                            game.startDate,
                                                        )}
                                                    </span>
                                                )}
                                                {game.startDate &&
                                                    game.endDate && (
                                                        <span>•</span>
                                                    )}
                                                {game.endDate && (
                                                    <span className="flex items-center gap-0.5">
                                                        <LuCalendarArrowUp className="text-gray-500" />
                                                        {formatDate(
                                                            game.endDate,
                                                        )}
                                                    </span>
                                                )}
                                                {!game.finished && (
                                                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                                                        <div>
                                                            <span className="inline-flex items-center gap-1  px-2 py-0.5 rounded-md text-[10px] font-medium bg-red-500/10 text-red-400 border border-blue-500/20 max-w-full truncate">
                                                                <BiCategory />
                                                                <span className="truncate">
                                                                    Não
                                                                    Finalizado
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <GameModal
                game={selectedGame}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedGame(null);
                }}
            />
        </div>
    );
};

export default GameList;
