import React from "react";
import { FaRegStar, FaStar, FaTimes } from "react-icons/fa";
import { Game, GamePlaying } from "../types";

interface GameModalProps {
  game: Game | GamePlaying | null;
  isOpen: boolean;
  onClose: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ game, isOpen, onClose }) => {
  if (!isOpen || !game) return null;

  const isPlaying = "tier" in game && game.tier === "playing";

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 1;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-400" />);
      }
    }
    return stars;
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Não informada";
    return new Date(date).toLocaleDateString("pt-BR", { timeZone: "UTC" });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            aria-label="Fechar modal"
          >
            <FaTimes size={24} />
          </button>

          {/* Game Cover */}
          <div className="h-64 overflow-hidden rounded-t-xl">
            <img
              src={game.imageUrl}
              alt={game.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Game Info */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {game.name}
                </h2>
                {!isPlaying && (
                  <div className="flex items-center gap-4 text-gray-300">
                    <span>Nota: {game.rating.toFixed(1)}/10</span>
                    <span>Horas: {game.hours}h</span>
                  </div>
                )}
              </div>
              {!isPlaying && (
                <div className="flex gap-1 ml-4">
                  {renderStars(game.rating)}
                </div>
              )}
            </div>

            {/* Game Dates */}
            <div className="mb-6 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">
                📅 Datas de Jogo
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Data de Início</p>
                  <p className="text-white">{formatDate(game.startDate)}</p>
                </div>
                {!isPlaying && (
                  <div>
                    <p className="text-gray-400 text-sm">Data de Término</p>
                    <p className="text-white">{formatDate(game.endDate)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Comment */}
            {game.comment && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  💭 Comentário
                </h3>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <p className="text-white whitespace-pre-wrap">
                    {game.comment}
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
