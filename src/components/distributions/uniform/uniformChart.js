import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const UniformChart = ({ input }) =>
{

  const data = useMemo(() => 
  {
    if(!input) return null;
  
    const {a, b} = input;
    const diff = b - a; 

    return (
      {
        options: 
        {
          plugins: {
            legend: {
              display: false
            }
          },
          tooltips: 
          {
            mode: 'index',
            intersect: false,
          },
          hover: 
          {
            mode: 'nearest',
            intersect: true
          },
          scales: 
          {
            y: 
            {

              beginAtZero: true
            },
          },
        },
        data: {
          datasets: [
            {
              label: 'Chart 1',
              data: [{x: a, y: 10}, {x: b, y: 10}],
              showLine: true,
              fill: true,
              borderColor: 'rgba(0, 200, 0, 1)'
            },
            {
              label: 'Chart 2',
              data: [{x: (a-(diff/5)), y: 20}, {x: (b+(diff/5)), y: 20}],
              showLine: false,
              fill: false,
              borderColor: 'rgba(0, 0, 0, 0)'
            }
          ]
        }
      }
    );
  }, [ input ])

    return (
      data && <Scatter options={data.options} data={data.data} />
    );
}

export default UniformChart;

/*

var ctx = document.getElementById("myChart");

var myChart = new Chart(ctx, {
  type: 'scatter',
  data: {
    datasets: [
    	{
        label: 'Chart 1',
        data: [{x: 1, y: 2}, {x: 2, y: 4}, {x: 3, y: 8},{x: 4, y: 16}],
        showLine: true,
        fill: true,
        borderColor: 'rgba(0, 200, 0, 1)'
    	},
      {
        label: 'Chart 2',
        data: [{x: 1, y: 3}, {x: 3, y: 4}, {x: 4, y: 6}, {x: 6, y: 9}],
        showLine: true,
        fill: false,
        borderColor: 'rgba(200, 0, 0, 1)'
    	}
    ]
  },
  options: {
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
    	xAxes: [
      	{
          ticks: {
            beginAtZero:true
          }
        }
      ],
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    },
  }
});

*/