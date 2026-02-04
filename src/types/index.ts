type GameTier =
  | "obra-de-arte"
  | "incrivel"
  | "otimo"
  | "muito-bom"
  | "bom"
  | "ruim"
  | "horrivel"
  | "playing";

type TierWithRating = Exclude<GameTier, "playing">;

const tierRatingRanges: Record<TierWithRating, { min: number; max: number }> = {
  "obra-de-arte": { min: 9.6, max: 10 },
  incrivel: { min: 9, max: 9.5 },
  otimo: { min: 8, max: 8.9 },
  "muito-bom": { min: 7, max: 7.9 },
  bom: { min: 6, max: 6.9 },
  ruim: { min: 3, max: 5.9 },
  horrivel: { min: 0, max: 2.9 },
};

// Type guard
function isTierWithRating(tier: GameTier): tier is TierWithRating {
  return tier !== "playing";
}

// Validação
export function isValidRatingForTier(tier: GameTier, rating: number): boolean {
  if (!isTierWithRating(tier)) return true;
  const range = tierRatingRanges[tier];
  return rating >= range.min && rating <= range.max;
}

export function validateGameRating(game: Game): boolean {
  if (!isTierWithRating(game.tier)) return true;
  const range = tierRatingRanges[game.tier];
  return game.rating >= range.min && game.rating <= range.max;
}

// Helper para pegar o tier baseado no rating
export function getTierFromRating(rating: number): TierWithRating {
  if (rating === 10) return "obra-de-arte";
  if (rating >= 9) return "incrivel";
  if (rating >= 8) return "otimo";
  if (rating >= 7) return "muito-bom";
  if (rating >= 6) return "bom";
  if (rating >= 3) return "ruim";
  return "horrivel";
}

export interface Game {
  id?: string;
  name: string;
  imageUrl: string;
  rating: number; // 0-10
  hours: number;
  startDate: Date;
  endDate: Date;
  comment?: string;
  tier: GameTier;
}

export interface GamePlaying {
  id?: string;
  name: string;
  imageUrl: string;
  startDate: Date;
  comment?: string;
  tier: "playing";
}

export interface TierList {
  id: GameTier;
  name: string;
  icon: string;
  color: string;
  order: number;
  games: Game[];
}

export type ModalState = {
  isOpen: boolean;
  game: Game | null;
};
