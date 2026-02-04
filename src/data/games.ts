import { Game, GamePlaying, TierList, validateGameRating } from "../types";

const horasMinutosToHoras = (horas: number, minutos: number): number => {
  return horas + minutos / 60;
};

export const tiers: TierList[] = [
  {
    id: "obra-de-arte",
    name: "Obra de Arte",
    icon: "🎨",
    color: "#8B4513", // Sienna
    order: 1,
    games: [],
  },
  {
    id: "incrivel",
    name: "Incrível",
    icon: "🎉",
    color: "#FFD700", // Gold
    order: 2,
    games: [],
  },
  {
    id: "otimo",
    name: "Ótimo",
    icon: "⭐",
    color: "#FF6347", // Tomato
    order: 3,
    games: [],
  },
  {
    id: "muito-bom",
    name: "Muito Bom",
    icon: "👍",
    color: "#1E90FF", // DodgerBlue
    order: 4,
    games: [],
  },
  {
    id: "bom",
    name: "Bom",
    icon: "✅",
    color: "#32CD32", // LimeGreen
    order: 5,
    games: [],
  },
  {
    id: "ruim",
    name: "Ruim",
    icon: "👎",
    color: "#808080", // Gray
    order: 6,
    games: [],
  },
  {
    id: "horrivel",
    name: "Horrível",
    icon: "💀",
    color: "#2F4F4F", // DarkSlateGray
    order: 7,
    games: [],
  },
];
// https://gamesdb.launchbox-app.com/
//www.steamgriddb.com/grid/623097
export const gamesPlaying: GamePlaying[] = [
  {
    name: "Final Fantasy XIII",
    imageUrl:
      "https://images.launchbox-app.com//90578bfa-e537-4345-8e1a-7301228b12f1.jpg",
    startDate: new Date("2025-05-06"),
    tier: "playing",
  },
  {
    name: "Anomaly Agent",
    imageUrl:
      "https://gamesdb-images.launchbox.gg/r2_64c06f40-57bd-4bf0-9b6a-5ab6f458a756.jpg",
    startDate: new Date("2026-02-04"),
    tier: "playing",
  },
];

export const games: Game[] = [
  {
    name: "Nier:Automata Game of the YoRHa Edition",
    imageUrl:
      "https://images.launchbox-app.com//e7260e41-b12f-4c8a-b351-d44ee559e1ca.jpg",
    rating: 9.9,
    hours: 59,
    startDate: new Date("2024-04-20"),
    endDate: new Date("2024-05-03"),
    tier: "obra-de-arte",
  },
  {
    name: "Katana Zero",
    imageUrl:
      "https://images.launchbox-app.com//3ba33970-9d8c-4d54-9d64-b727afbcc06c.jpg",
    rating: 9.5,
    hours: 7,
    startDate: new Date("2023-10-07"),
    endDate: new Date("2023-10-10"),
    tier: "incrivel",
  },
  {
    name: "Dragon's Dogma: Dark Arisen",
    imageUrl:
      "https://images.launchbox-app.com//8c78579f-09d5-49a3-bf02-00ef6137f46d.jpg",
    rating: 8.5,
    hours: 170,
    startDate: new Date("2023-10-11"),
    endDate: new Date("2023-12-26"),
    tier: "otimo",
  },
  {
    name: "Halo: Reach",
    imageUrl:
      "https://images.launchbox-app.com//d493eed5-145e-4972-a2a1-5822b81f97a7.png",
    rating: 8.5,
    hours: 15,
    startDate: new Date("2023-09-08"),
    endDate: new Date("2023-09-26"),
    tier: "otimo",
  },
  {
    name: "Metal Gear Rising: Revengeance",
    imageUrl:
      "https://images.launchbox-app.com//94802483-f2e6-490f-a43a-2fccee248e21.jpg",
    rating: 8.4,
    hours: horasMinutosToHoras(13, 53),
    startDate: new Date("2023-09-08"),
    endDate: new Date("2023-09-26"),
    tier: "otimo",
  },
  {
    name: "ENDER LILIES: Quietus of the Knights",
    imageUrl:
      "https://images.launchbox-app.com//a3006949-fac2-4adf-ab35-dc61960ff6f5.jpg",
    rating: 8.6,
    hours: horasMinutosToHoras(26, 16),
    startDate: new Date("2024-12-08"),
    endDate: new Date("2024-12-21"),
    tier: "otimo",
  },
  {
    name: "ENDER MAGNOLIA: Bloom in the Mist",
    imageUrl:
      "https://images.launchbox-app.com//ce2eb237-7b66-4cca-bdb7-27a39e2b5efe.jpg",
    rating: 8,
    hours: horasMinutosToHoras(23, 33),
    startDate: new Date("2024-09-23"),
    endDate: new Date("2025-10-30"),
    tier: "otimo",
  },
  {
    name: "Titanfall 2",
    imageUrl:
      "https://images.launchbox-app.com//691c1358-6d96-440b-9c23-c7aa9186c3c9.jpg",
    rating: 8.3,
    hours: 9.4,
    startDate: new Date("2025-12-22"),
    endDate: new Date("2026-01-04"),
    tier: "otimo",
  },
  {
    name: "Diablo III",
    imageUrl:
      "https://images.launchbox-app.com//ab1c3f38-b087-43c3-904a-679cc19fe5e3.jpg",
    rating: 7,
    hours: horasMinutosToHoras(30, 0),
    startDate: new Date("2023"),
    endDate: new Date("2023"),
    tier: "muito-bom",
  },
  {
    name: "Halo: Combat Evolved",
    imageUrl:
      "https://images.launchbox-app.com//6d91d38f-12a0-4420-a893-776d654af4c3.jpg",
    rating: 7,
    hours: horasMinutosToHoras(12, 0),
    startDate: new Date("2010"),
    endDate: new Date("2010"),
    tier: "muito-bom",
  },
  {
    name: "Halo 3",
    imageUrl:
      "https://gamesdb-images.launchbox.gg/r2_b19db69e-0d1b-4bcc-929d-41f283e402d1.jpg",
    rating: 7.5,
    hours: horasMinutosToHoras(6, 30),
    startDate: new Date("2024"),
    endDate: new Date("2024"),
    tier: "muito-bom",
  },
  {
    name: "Halo 4",
    imageUrl:
      "https://gamesdb-images.launchbox.gg/r2_08d49d5c-88df-400d-af91-d145933ff44f.jpg",
    rating: 7.4,
    hours: 14.4,
    startDate: new Date("2024"),
    endDate: new Date("2024"),
    tier: "muito-bom",
  },
  {
    name: "CRYMACHINA",
    imageUrl:
      "https://images.launchbox-app.com//1f30e0f2-a35a-41cb-bb21-f046f99d9fd2.jpg",
    rating: 7.8,
    hours: horasMinutosToHoras(25, 17),
    startDate: new Date("2024"),
    endDate: new Date("2024"),
    tier: "muito-bom",
  },
  {
    name: "Astral Chain",
    imageUrl:
      "https://images.launchbox-app.com//827f545a-d9d9-4a14-8bd0-eacffeae00b2.jpg",
    rating: 7.5,
    hours: horasMinutosToHoras(37, 47),
    startDate: new Date("2025"),
    endDate: new Date("2025"),
    tier: "muito-bom",
  },
  {
    name: "Ultra Age",
    imageUrl:
      "https://images.launchbox-app.com//b142d511-3009-4644-b731-8d6cb69717d0.jpg",
    rating: 7.4,
    hours: 12.4,
    startDate: new Date("2025"),
    endDate: new Date("2025-11-20"),
    tier: "muito-bom",
  },
  {
    name: "Soulstice",
    imageUrl:
      "https://gamesdb-images.launchbox.gg/r2_8233e262-2bb8-4eca-8bfb-91dbd7c8c96e.jpg",
    rating: 7.6,
    hours: 12.4,
    startDate: new Date("2025-12-21"),
    endDate: new Date("2025-11-21"),
    tier: "muito-bom",
  },
  {
    name: "Afterimage",
    imageUrl:
      "https://images.launchbox-app.com//2f051afe-6e78-43a4-a248-414aa4ccdb13.png",
    rating: 7,
    hours: horasMinutosToHoras(42 + 1, 25 + 19),
    startDate: new Date("2025"),
    endDate: new Date("2025-04-07"),
    tier: "muito-bom",
  },
  {
    name: "The Devil Within: Satgat",
    imageUrl:
      "https://images.launchbox-app.com//26784299-eaab-49dc-ae39-b59b3710b74a.jpg",
    rating: 7.1,
    hours: 22.9,
    startDate: new Date("2026-02-03"),
    endDate: new Date("2026-01-24"),
    tier: "muito-bom",
  },
  {
    name: "Dynasty Warriors 8 Empires",
    imageUrl:
      "https://images.launchbox-app.com//42edc2e2-aea8-4ad0-ad52-b2a8e66aa79f.jpg",
    rating: 6,
    hours: 20,
    startDate: new Date("2023"),
    endDate: new Date("2023"),
    tier: "bom",
  },
  {
    name: "Mortal Kombat 11",
    imageUrl:
      "https://images.launchbox-app.com//57877895-5ca7-4a8b-98bd-cc74f5a670f5.png",
    rating: 6,
    hours: 6,
    startDate: new Date("2023"),
    endDate: new Date("2023"),
    tier: "bom",
  },
  {
    name: "Halo 3: ODST",
    imageUrl:
      "https://images.launchbox-app.com//59b494b6-34ee-49dc-aa74-32a5f148375e.jpg",
    rating: 6.2,
    hours: 10,
    startDate: new Date("2024"),
    endDate: new Date("2024"),
    tier: "bom",
  },
  {
    name: "Megaman X4",
    imageUrl:
      "https://cdn2.steamgriddb.com/thumb/60f2ed2c0c897d831f8c3feb435a4018.png",
    rating: 6,
    hours: 7,
    startDate: new Date("2024"),
    endDate: new Date("2024"),
    tier: "bom",
  },
  {
    name: "Tower Hunter: Erza's Trial",
    imageUrl:
      "https://images.launchbox-app.com//1988d10c-30bd-43cc-9613-8a0198d3470c.jpg",
    rating: 6,
    hours: 7.5,
    startDate: new Date("2024"),
    endDate: new Date("2024"),
    tier: "bom",
  },
  {
    name: "Lost Epic",
    imageUrl:
      "https://images.launchbox-app.com//2747f48e-0fe0-4d45-9fb5-4687d72834ce.jpg",
    rating: 6.8,
    hours: 20,
    startDate: new Date("2024"),
    endDate: new Date("2024"),
    tier: "bom",
  },
  {
    name: "Mass Effect",
    imageUrl:
      "https://images.launchbox-app.com//7a90eb15-e051-4a7f-a023-86523ba8d173.jpg",
    rating: 6.9,
    hours: 36.8,
    startDate: new Date("2026-01-06"),
    endDate: new Date("2026-01-24"),
    tier: "bom",
  },

  {
    name: "Halo 2",
    imageUrl:
      "https://images.launchbox-app.com//91e0c700-306d-4c82-b296-3f02312abccd.jpg",
    rating: 5,
    hours: 20,
    startDate: new Date("2024"),
    endDate: new Date("2024"),
    tier: "ruim",
  },
  {
    name: "Devil May Cry",
    imageUrl:
      "https://images.launchbox-app.com//1575a285-7070-4897-81d4-6ab1086f1645.jpg",
    rating: 5.5,
    hours: horasMinutosToHoras(14, 52),
    startDate: new Date("2025"),
    endDate: new Date("2025-03-16"),
    tier: "ruim",
  },
  {
    name: "Megaman X",
    imageUrl: "https://m.media-amazon.com/images/I/71RKjZUwdRS._AC_SY879_.jpg",
    rating: 5,
    hours: 4,
    startDate: new Date("2025"),
    endDate: new Date("2025"),
    tier: "ruim",
  },
  {
    name: "Digimon World 3",
    imageUrl:
      "https://gamesdb-images.launchbox.gg/r2_d539e8e0-6b27-4ef4-8c93-a92490c6ce8b.jpg",
    rating: 4,
    hours: 24,
    startDate: new Date("2025"),
    endDate: new Date("2025"),
    tier: "ruim",
  },
  {
    name: "Kingdoms of Amalur: Reckoning",
    imageUrl:
      "https://images.launchbox-app.com//b559b1aa-14e2-4f17-8de2-3cd51320a023.jpg",
    rating: 1,
    hours: 35,
    startDate: new Date("2024-04-16"),
    endDate: new Date("2024-04-04"),
    tier: "horrivel",
  },
];

const validarGames = (): void => {
  games.forEach((game) => {
    if (!validateGameRating(game)) {
      console.log("Game rating não é válido:", game.name);
    }
  });
};

validarGames();

// Função para distribuir os jogos nas tiers
export const getGamesByTier = (): TierList[] => {
  const tiersCopy = JSON.parse(JSON.stringify(tiers)) as TierList[];
  const playingGames: Game[] = [];

  games.forEach((game) => {
    if (game.tier === "playing") {
      playingGames.push(game);
    } else {
      const tier = tiersCopy.find((t) => t.id === game.tier);
      if (tier) {
        tier.games.push(game);
      }
    }
  });

  return tiersCopy;
};

export const getPlayingGames = (): GamePlaying[] => {
  return gamesPlaying;
};
