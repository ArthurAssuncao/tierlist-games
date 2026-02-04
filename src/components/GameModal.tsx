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
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-xs w-full">
      <div className=" rounded-xl  max-h-[90vh] shadow-lg shadow-blue-500">
        <div className="relative ">
          <button
            onClick={onClose}
            className="absolute top-0 md:top-4 right-0 md:right-4 text-white hover:text-gray-300 z-10 bg-black rounded-full p-2"
            aria-label="Fechar modal"
          >
            <FaTimes size={24} />
          </button>

          {/* Game Cover */}
          <div className="h-[90vh] md:h-[80vh] w-auto rounded-t-xl">
            <img
              src={game.imageUrl}
              alt={game.name}
              className="w-full h-full object-cover rounded-t-xl"
            />
          </div>

          {/* Game Info */}
          <div className="absolute bottom-0 bg-black/75 bg-linear-to-t rounded-b-xl w-full p-2 overflow-hidden">
            <div className="flex justify-between items-start flex-col md:flex-row">
              <div className="flex-1">
                <h2
                  className={`text-2xl font-bold text-white mb-2 ${game.name.length > 20 ? "text-xl" : "text-3xl"}`}
                >
                  {game.name}
                </h2>
              </div>
              <div className="flex flex-col md:items-end items-start justify-center">
                {!isPlaying && (
                  <>
                    <div className="flex gap-1">{renderStars(game.rating)}</div>
                    <div className=" text-gray-300">
                      Nota: {game.rating.toFixed(1)}/10
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Game Dates */}
            <div className="rounded-lg">
              {!isPlaying && (
                <>
                  <div className="text-gray-300">
                    Horas jogadas: {game.hours}h
                  </div>
                </>
              )}
              <div className="flex gap-1 items-center">
                <h3 className="text-lg font-semibold text-white">📅</h3>
                <div>
                  <p className="text-white">{formatDate(game.startDate)}</p>
                </div>
                <div className="text-white"> até </div>
                {!isPlaying && (
                  <div>
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
