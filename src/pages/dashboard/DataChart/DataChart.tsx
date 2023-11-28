import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  Legend,
  registerables,
} from "chart.js";
import { subgrades } from "@/helper/Util";

interface DataItem {
  agency: string;
  totalAnnualComp: number;
}

interface DataChartProps {
  data: DataItem[];
}

const DataChart: React.FC<DataChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current && data && data.length > 0) {
      const agencyMap = new Map<string, string>();
      const anonymizedAgencies = data.map((item) => {
        if (!agencyMap.has(item.agency)) {
          agencyMap.set(item.agency, `Agency ${agencyMap.size + 1}`);
        }
        return {
          ...item,
          agency: agencyMap.get(item.agency) || "",
        };
      });

      const agencies = [
        ...new Set(anonymizedAgencies.map((item) => item.agency)),
      ];

      const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };

      const latestAgency = agencies[agencies.length - 1];

      const datasets = agencies.map((agency) => ({
        label: agency === latestAgency ? "Your Agency" : agency,
        data: anonymizedAgencies
          .filter((item) => item.agency === agency)
          .map((item) => item.totalAnnualComp),
        fill: false,
        borderColor: getRandomColor(),
        borderWidth: agency === latestAgency ? 3 : 2, // Highlight the latest agency with a thicker line
      }));

      // Hardcoded benchmark data array
      const benchmarkData = [85000, 100000, 110000, 160000, 190000, 230000];

      // Add a drop shadow and glow to the benchmark line
      const benchmarkLine = {
        label: "Benchmark",
        data: benchmarkData,
        fill: false,
        borderColor: "rgba(0, 0, 255, 0.5)", // Blue with reduced opacity
        borderWidth: 3,
        shadowColor: "rgba(0, 0, 255, 0.5)", // Blue with reduced opacity
        shadowOffsetX: 0,
        shadowOffsetY: 4,
        shadowBlur: 8,
      };

      datasets.push(benchmarkLine);

      const chartData = {
        labels: subgrades,
        datasets: datasets,
      };

      const chartOptions = {
        scales: {
          x: {
            type: "category",
            labels: subgrades,
          },
          y: {
            beginAtZero: true,
          },
        },
      };

      const chart = new Chart(chartRef.current, {
        type: "line",
        data: chartData,
        options: chartOptions,
      });

      return () => {
        chart.destroy();
      };
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

Chart.register(
  LineController,
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  Legend,
  ...registerables
);

export default DataChart;
