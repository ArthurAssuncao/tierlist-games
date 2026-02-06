// components/GameList.tsx
import React, { useMemo, useState } from "react";
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
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          );
        case "dateFinished":
          return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
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
    } else if (sortOption === "dateStarted" || sortOption === "dateFinished") {
      // Agrupa por ano
      const groups: GameGroup[] = [];
      const yearMap = new Map<number, Game[]>();

      sortedGames.forEach((game) => {
        const date =
          sortOption === "dateStarted" ? game.startDate : game.endDate;
        const year = new Date(date).getUTCFullYear();

        if (!yearMap.has(year)) {
          yearMap.set(year, []);
        }
        yearMap.get(year)!.push(game);
      });

      // Ordena os anos em ordem decrescente
      const sortedYears = Array.from(yearMap.keys()).sort((a, b) => b - a);

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
    <div className="w-full min-h-screen">
      {/* Header */}
      <div className="mx-auto flex flex-col items-center justify-center w-full">
        <div className="flex flex-col justify-between items-start md:items-center gap-2">
          <div className="flex flex-col items-center w-full">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Jogos zerados
            </h1>
          </div>

          {/* Controles */}
          <div className="flex flex-wrap gap-4 border border-blue-700 rounded-lg items-center justify-center">
            {/* Dropdown de ordenação */}
            <div className="relative ">
              <div className="bg-gray-800 rounded-lg border p-2 border-blue-700 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-700 transition-colors">
                {getSortIcon()}
                <span className="text-white">Ordenar: {getSortLabel()}</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-black"
                >
                  <option value="alphabetical">Ordem Alfabética</option>
                  <option value="rating">Nota</option>
                  <option value="dateStarted">Data de Início</option>
                  <option value="dateFinished">Data de Término</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Jogos */}
        <div className="flex flex-col gap-4 ">
          {groupedGames.map((group, groupIndex) => (
            <div
              key={`${group.title}-${groupIndex}`}
              className="bg-gray-800 rounded-t-xl flex flex-col border-2 border-blue-500"
            >
              <h2 className="text-2xl font-bold text-white pb-1 border-b border-gray-700 gap-1 flex bg-blue-500 p-2 pt-1 rounded-t-xl ">
                {group.title}
                <span className="ml-3 text-gray-400 text-lg">
                  ({group.games.length}{" "}
                  {group.games.length === 1 ? "jogo" : "jogos"})
                </span>
              </h2>

              <div className=" flex flex-wrap gap-4">
                {group.games.map((game) => (
                  <div
                    key={game.name
                      .replaceAll(" ", "-")
                      .replaceAll(":", "")
                      .replaceAll("'", "")}
                    className="flex gap-2 bg-gray-900 rounded-lg hover:bg-gray-850 cursor-pointer min-w-88 h-23  transition-all md:hover:scale-105 w-full md:w-auto"
                    onClick={() => handleGameClick(game)}
                  >
                    {/* Imagem */}
                    <div className="w-auto h-23 shrink-0">
                      {game.imageUrl ? (
                        <img
                          src={game.imageUrl}
                          alt={game.name}
                          className="w-auto h-23 object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {game.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Informações */}
                    <div className="h-full min-w-0 ">
                      <div className="h-full flex flex-col justify-around ">
                        <h3
                          className={`text-lg font-semibold text-white truncate ${game.name.length > 20 ? "text-sm" : ""}`}
                        >
                          {game.name}
                        </h3>
                        <div className="flex items-start justify-start gap-3 flex-wrap text-xs text-gray-400">
                          <div className="flex items-start justify-start gap-3 flex-wrap">
                            <div
                              className={`flex gap-1 items-center rounded text-xs font-bold ${getRatingColor(game.rating)}`}
                            >
                              <FaStar className="text-yellow-400" />
                              <span className="mt-0.5">
                                {game.rating % 1 !== 0
                                  ? game.rating.toFixed(1)
                                  : game.rating}
                                /10
                              </span>
                            </div>
                            <div className="flex gap-1 items-center rounded text-xs font-bold bg-gray-800 text-white">
                              <IoTimeSharp className="" />
                              <span className="mt-0.5">
                                {formatHours(game.hours)}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Datas */}
                        <div className="flex flex-wrap gap-1 text-xs text-gray-400">
                          {game.startDate && (
                            <span className="flex gap-1">
                              <LuCalendarArrowDown />
                              <span>{formatDate(game.startDate)}</span>
                            </span>
                          )}
                          <span> a </span>
                          {game.endDate && (
                            <span className="flex gap-1">
                              <LuCalendarArrowUp />
                              <span>{formatDate(game.endDate)}</span>
                            </span>
                          )}
                          {/*verifica se a data final é maior ou igual a data inicial */}
                          {game.endDate &&
                            game.startDate &&
                            new Date(game.endDate).getTime() <
                              new Date(game.startDate).getTime() && (
                              <span className="text-red-500">
                                Data incorreta
                              </span>
                            )}
                        </div>
                      </div>

                      {/* Preview do comentário */}
                      {game.comment && (
                        <p className="text-gray-500 text-sm mt-2 line-clamp-1">
                          "
                          {game.comment.length > 80
                            ? game.comment.substring(0, 80) + "..."
                            : game.comment}
                          "
                        </p>
                      )}
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
