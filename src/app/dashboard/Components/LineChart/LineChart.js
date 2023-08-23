import React from "react";
import Chart from "react-apexcharts";

const LineChart = () => {
  const options = {
    chart: {
      id: "basic-line",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: true,
        color: "#000000", // Black color for Y-axis
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 4,
      labels: {
        formatter: (val) => {
          return val.toFixed(0);
        },
      },
      axisBorder: {
        show: true,
        color: "#000000", // Black color for Y-axis
      },
    },
    grid: {
      show: false,
    },
    colors: ["#3AB65C"],
    toolbar: {
      show: false,
    },
    stroke: {
      width: 3,
    },
    responsive: [
      {
        breakpoint: 576,
        options: {
          chart: {
            width: "100%",
          },
        },
      },
    ],
  };

  const series = [
    {
      name: "Payout",
      data: [56, 50, 55, 50, 49, 59, 54, 51, 60, 55, 58, 59],
    },
  ];

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="line"
        // width={500}
        height={300}
      />
    </div>
  );
};

export default LineChart;
