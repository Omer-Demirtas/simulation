import React from "react";
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
import { Chip, Stack } from "@mui/material";

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
  
const labels = ["January", "February", "March", "April", "May", "June", "July"];
  
export const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map((l, i) => (i * 100)),
        backgroundColor: "rgba(255, 99, 132, 0.5)"
      }
    ]
};
  

const CumulativeChart = ({cumulative}) => 
{

    console.log({cumulative});

    return (
    <Bar options={options} data={data} onClick={(e) => console.log({ e })} />
    );
}

export default CumulativeChart;