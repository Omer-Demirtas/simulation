import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
export const options = {
    indexAxis: 'y',
responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  

const data = {
  labels: ["Jan"],
  datasets: [   
    {
        label: "Second dataset",
        data: [5, 10],
        fill: true,
        borderColor: "black"
    },
  ]
};

const UniformChart = () =>
{


    return (
        <Bar data={data} options={options} />
    );
}

export default UniformChart;