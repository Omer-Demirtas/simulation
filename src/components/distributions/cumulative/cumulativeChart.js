import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
  
export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart"
      }
    }
};
  
const CumulativeChart = ({cumulative}) => 
{
  const data = useMemo(() => {
    const labels = Object.keys(cumulative);
    return (
      {
        labels,
        datasets: [
        {
          label: "data",
          data: Object.values(cumulative),
          backgroundColor: "rgba(255, 99, 132, 0.5)"
        }
        ]
      }
    );
  }, [cumulative]);

  return (
      <Bar options={options} data={data} onClick={(e) => console.log({ e })} />
    );
}

export default CumulativeChart;