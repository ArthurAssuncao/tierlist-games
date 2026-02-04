import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Game } from "../types";

import ChartDataLabels from "chartjs-plugin-datalabels";

// Registrar o plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

interface GraficoGamesProps {
  games: Game[];
}

function GraficoGames(props: GraficoGamesProps) {
  const excludedYears = [2010];
  // Processar os dados dos jogos
  const dadosPorAno = props.games.reduce(
    (acc: Record<number, number>, game) => {
      const ano = new Date(game.startDate).getUTCFullYear();
      if (excludedYears.includes(ano)) return acc;
      acc[ano] = (acc[ano] || 0) + game.hours;
      return acc;
    },
    {},
  );

  const anos = Object.keys(dadosPorAno).sort();
  const horas = anos.map((ano: string) => dadosPorAno[Number(ano)]);

  const data = {
    labels: anos,
    datasets: [
      {
        label: "Horas Jogadas",
        data: horas,
        backgroundColor: "rgba(246, 246, 246, 0.9)", // Cinza muito claro
        borderColor: "rgba(200, 200, 200, 1)", // Cinza claro para borda
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 255, 255, 1)", // Cinza claro no hover
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#fff", // Texto da legenda cinza escuro
        },
      },
      datalabels: {
        color: "#fff", // Cor do texto
        anchor: "end" as const, // 'end' = acima, 'center' = dentro
        align: "top" as const, // 'top' = acima, 'center' = centro
        font: {
          weight: "bold" as const,
          size: 12,
        },
        formatter: (value: number) => {
          return value.toFixed(1) + "h";
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#fff", // Texto do eixo Y cinza escuro
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Linhas de grade sutis
        },
      },
      x: {
        ticks: {
          color: "#fff", // Texto do eixo X cinza escuro
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}

export { GraficoGames };
