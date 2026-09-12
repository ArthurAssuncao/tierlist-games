import {
    FaRegStar,
    FaStar,
    FaStarHalfAlt,
    FaTimes,
    FaCalendarAlt,
    FaClock,
} from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { Game, GamePlaying } from "../types";
import { formatDate, formatHours } from "../util/util";

interface GameModalProps {
    game: Game | GamePlaying | null;
    isOpen: boolean;
    onClose: () => void;
}

const GameModal: React.FC<GameModalProps> = ({
    game,
    isOpen,
    onClose,
}: GameModalProps) => {
    if (!isOpen || !game) return null;

    const isPlaying = "tier" in game && game.tier === "playing";

    // Renderizador de estrelas corrigido (suporta meia estrela)
    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating / 2);
        const hasHalfStar = rating % 2 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<FaStar key={i} className="text-amber-400" />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <FaStarHalfAlt key={i} className="text-amber-400" />,
                );
            } else {
                stars.push(<FaRegStar key={i} className="text-gray-600" />);
            }
        }
        return stars;
    };

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all"
            onClick={onClose}
        >
            {/* Modal Container */}
            <div
                className="relative bg-gray-900 border border-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] shadow-2xl overflow-hidden flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botão Fechar */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 z-20 bg-gray-950/80 hover:bg-gray-800 text-gray-400 hover:text-white rounded-full p-2.5 transition-all border border-gray-800"
                    aria-label="Fechar modal"
                >
                    <FaTimes size={18} />
                </button>

                {/* Capa do Jogo */}
                <div className="w-full md:w-1/2 h-64 md:h-auto shrink-0 relative bg-gray-950">
                    <img
                        src={game.imageUrl}
                        alt={game.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent md:hidden" />
                </div>

                {/* Conteúdo com Scroll Próprio */}
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-[85vh]">
                    <div className="flex flex-col gap-4">
                        {/* Header: Nome e Gênero */}
                        <div>
                            {game.genres && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
                                    <BiCategory />
                                    {game.genres.join(", ")}
                                </span>
                            )}
                            <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                                {game.name}
                            </h2>
                        </div>

                        {/* Avaliação e Horas (Se não estiver jogando no momento) */}
                        {!isPlaying && (
                            <div className="flex flex-wrap items-center gap-4 bg-gray-950/60 p-3 rounded-xl border border-gray-800">
                                <div className="flex flex-row justify-between items-center w-full gap-4 text-sm">
                                    <div className="flex items-center gap-1 ">
                                        {renderStars(game.rating)}
                                    </div>
                                    <span className=" text-gray-400  mt-0.5">
                                        Nota:{" "}
                                        <strong className="text-white">
                                            {game.rating.toFixed(1)}
                                        </strong>
                                        /10
                                    </span>
                                </div>
                            </div>
                        )}
                        {/* Horas */}
                        {!isPlaying && (
                            <div className="flex flex-wrap items-center gap-4 bg-gray-950/60 p-3 text-sm rounded-xl border border-gray-800">
                                <div className="flex items-center gap-2 text-gray-300">
                                    <span className="inline-flex items-center gap-1">
                                        <FaClock className="text-indigo-400" />
                                        Tempo de jogo:{" "}
                                    </span>
                                    <span className="text-sm font-semibold">
                                        {formatHours(game.hours)}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Datas */}
                        <div className="flex items-center gap-2.5 text-sm text-gray-400 bg-gray-950/40 p-3 rounded-xl border border-gray-800/80">
                            <FaCalendarAlt className="text-blue-400 text-sm shrink-0" />
                            {!isPlaying ? (
                                <span>
                                    Jogado entre{" "}
                                    <strong className="text-gray-200">
                                        {formatDate(game.startDate)}
                                    </strong>{" "}
                                    e{" "}
                                    <strong className="text-gray-200">
                                        {formatDate(game.endDate)}
                                    </strong>
                                </span>
                            ) : (
                                <span>
                                    Jogando desde{" "}
                                    <strong className="text-gray-200">
                                        {formatDate(game.startDate)}
                                    </strong>
                                </span>
                            )}
                        </div>

                        {/* Comentário */}
                        {game.comment && (
                            <div className="flex flex-col gap-2 mt-2">
                                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                                    <span>💭</span> Análise / Comentário
                                </h3>
                                <div className="p-4 bg-gray-950/80 border border-gray-800 rounded-xl">
                                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap italic">
                                        "{game.comment}"
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameModal;
