import { useMemo, useState } from "react";
import { FaGamepad, FaClock, FaTrophy, FaFilter } from "react-icons/fa";

import { Game, GameGenre } from "../types";

export type GameTier = "S" | "A" | "B" | "C" | "D" | "playing";

interface GenreStatsProps {
    games: Game[];
}

interface GenreMetric {
    genre: GameGenre;
    totalHours: number;
    gameCount: number;
}

export const GenreStats: React.FC<GenreStatsProps> = ({ games }) => {
    const [selectedYear, setSelectedYear] = useState<string>("all");

    // Extrai os anos disponíveis a partir da data de término dos jogos
    const availableYears = useMemo(() => {
        const yearsSet = new Set<number>();
        games.forEach((game) => {
            if (game.endDate) {
                const year = new Date(game.endDate).getUTCFullYear();
                if (!isNaN(year)) yearsSet.add(year);
            }
        });
        return Array.from(yearsSet).sort((a, b) => b - a);
    }, [games]);

    // Processa os dados calculando contagem e horas por gênero conforme o ano filtrado
    const stats = useMemo(() => {
        const filteredGames = games.filter((game) => {
            if (selectedYear === "all") return true;
            if (!game.endDate) return false;
            return (
                new Date(game.endDate).getUTCFullYear().toString() ===
                selectedYear
            );
        });

        const metricsMap: Partial<
            Record<GameGenre, { hours: number; count: number }>
        > = {};

        filteredGames.forEach((game) => {
            if (!game.genres || game.genres.length === 0) return;

            game.genres.forEach((genre) => {
                if (!metricsMap[genre]) {
                    metricsMap[genre] = { hours: 0, count: 0 };
                }
                metricsMap[genre]!.hours += game.hours || 0;
                metricsMap[genre]!.count += 1;
            });
        });

        const result: GenreMetric[] = Object.entries(metricsMap).map(
            ([genre, data]) => ({
                genre: genre as GameGenre,
                totalHours: data.hours,
                gameCount: data.count,
            }),
        );

        // Ordena por maior quantidade de horas jogadas
        return result.sort((a, b) => b.totalHours - a.totalHours);
    }, [games, selectedYear]);

    // Calcula o valor máximo de horas para proporção da barra visual
    const maxHours = useMemo(() => {
        return stats.length > 0
            ? Math.max(...stats.map((s) => s.totalHours))
            : 1;
    }, [stats]);

    return (
        <div className="w-full bg-gray-900/80 border border-gray-800 rounded-2xl p-4 md:p-6 backdrop-blur-md shadow-xl">
            {/* Header com Filtro de Ano */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-800 mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl">
                        <FaTrophy className="text-xl" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            Gêneros Mais Jogados
                        </h2>
                        <p className="text-xs text-gray-400">
                            Estatísticas acumuladas de horas e títulos
                        </p>
                    </div>
                </div>

                {/* Filtro por Ano */}
                <div className="flex items-center gap-2 bg-gray-950 px-3 py-1.5 rounded-xl border border-gray-800 self-end sm:self-auto">
                    <FaFilter className="text-gray-400 text-xs" />
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="bg-transparent text-sm text-gray-200 focus:outline-none cursor-pointer font-medium"
                    >
                        <option value="all" className="bg-gray-900 text-white">
                            Todos os anos
                        </option>
                        {availableYears.map((year) => (
                            <option
                                key={year}
                                value={year.toString()}
                                className="bg-gray-900 text-white"
                            >
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Lista de Gêneros */}
            {stats.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-sm">
                    Nenhum registro encontrado para este período.
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {stats.map((item, index) => {
                        const percentage = (item.totalHours / maxHours) * 100;

                        return (
                            <div
                                key={item.genre}
                                className="flex flex-col gap-1.5"
                            >
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-gray-500 w-5">
                                            #{index + 1}
                                        </span>
                                        <span className="font-semibold text-gray-200">
                                            {item.genre}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs">
                                        <span className="flex items-center gap-1 text-gray-400">
                                            <FaGamepad className="text-blue-400" />
                                            <strong className="text-gray-200">
                                                {item.gameCount}
                                            </strong>{" "}
                                            {item.gameCount === 1
                                                ? "jogo"
                                                : "jogos"}
                                        </span>
                                        <span className="flex items-center gap-1 text-gray-400">
                                            <FaClock className="text-indigo-400" />
                                            <strong className="text-gray-200">
                                                {item.totalHours.toFixed(1)}
                                            </strong>
                                            h
                                        </span>
                                    </div>
                                </div>

                                {/* Barra de Progresso Visual */}
                                <div className="w-full bg-gray-950 h-3 rounded-full overflow-hidden border border-gray-800/80 p-0.5">
                                    <div
                                        className="h-full bg-linear-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${Math.max(percentage, 3)}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
