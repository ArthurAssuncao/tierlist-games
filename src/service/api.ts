const GAMES_IMAGES_URL: Record<string, string> = {
  "The Witcher 3: Wild Hunt": "https://placehold.co/200x300/png",
};

export const getGameImage = (gameName: string): string => {
  if (gameName in GAMES_IMAGES_URL) {
    return GAMES_IMAGES_URL[gameName];
  }
  return "https://placehold.co/200x300/png";
};
