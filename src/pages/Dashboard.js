import React, { useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto"; // Required for Chart.js v3+ compatibility
import BackToHome from "../components/BackToHome";
import UserActivityTable from "../components/charts/userVsActivity";

const Dashboard = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Dummy Data
  const data = {
    noOfBookings: 120,
    activeAgents: 25,
    totalGMV: 500000,
    totalGPV: 450000,
  };

  const statusChart = {
    labels: ["Cancelled", "Confirmed", "In Progress", "Travelled"],
    datasets: [
      {
        label: "Bookings Status",
        data: [10, 50, 40, 20],
        backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56", "#808080"],
      },
    ],
  };

  const opsStatusChart = {
    labels: ["Red", "Orange", "Green"],
    datasets: [
      {
        label: "Ops Status",
        data: [30, 50, 40],
        backgroundColor: ["#FF0000", "#FFA500", "#008000"],
      },
    ],
  };

  const bookingsComparison = {
    labels: ["Sales SPOC 1", "Sales SPOC 2", "Sales SPOC 3"],
    datasets: [
      {
        label: "Bookings vs Sales SPOC",
        data: [15, 25, 30],
        backgroundColor: "#36A2EB",
      },
      {
        label: "Bookings vs Ops SPOC",
        data: [20, 18, 25],
        backgroundColor: "#FF6384",
      },
    ],
  };

  const bookingsVsSalesSPOC = {
    labels: ["Sales SPOC 1", "Sales SPOC 2", "Sales SPOC 3"],
    datasets: [
      {
        label: "Bookings",
        data: [15, 25, 30],
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const bookingsVsOpsSPOC = {
    labels: ["Ops SPOC 1", "Ops SPOC 2", "Ops SPOC 3"],
    datasets: [
      {
        label: "Bookings",
        data: [20, 18, 25],
        backgroundColor: "#FF6384",
      },
    ],
  };

  const operationalStatus = {
    labels: ["BNP","BO", "BC"],
    datasets: [
      {
        label: "Bookings",
        data: [20, 18, 25],
        backgroundColor: ["#FF0000","#FFA500","#4CAF50"]
      },
    ],
  };

  const userVsActivity = {
    labels: ["User 1", "User 2", "User 3", "User 4"],
    datasets: [
      {
        label: "Activities Performed",
        data: [5, 12, 8, 10],
        backgroundColor: "#4BC0C0",
      },
    ],
  };

  const GMVData = {
    labels: ["SPOC A", "SPOC B", "SPOC C"],
    datasets: [
      {
        label: "GMV",
        data: [1200, 1500, 900],
        backgroundColor: "#4CAF50", // Green
      },
    ],
  };

  // Data for GPV vs Sales SPOC
  const GPVData = {
    labels: ["SPOC A", "SPOC B", "SPOC C"],
    datasets: [
      {
        label: "GPV",
        data: [800, 1000, 700],
        backgroundColor: "#F87171", // Red
      },
    ],
  };

  const options = {
    indexAxis: "y", // Horizontal Bars
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };


  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <BackToHome />
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

      {/* Filters */}
      <div className="flex justify-center gap-4 mb-6">
        <div>
          <label className="block mb-1">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Key Data */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="p-4 bg-white shadow rounded text-center">
          <h2 className="text-xl font-semibold">No of Bookings</h2>
          <p className="text-3xl font-bold">{data.noOfBookings}</p>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          <h2 className="text-xl font-semibold">Active Agents</h2>
          <p className="text-3xl font-bold">{data.activeAgents}</p>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          <h2 className="text-xl font-semibold">Total GMV</h2>
          <p className="text-3xl font-bold">${data.totalGMV}</p>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          <h2 className="text-xl font-semibold">Total GPV</h2>
          <p className="text-3xl font-bold">${data.totalGPV}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Status Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Status Chart vs Number</h3>
          <Pie data={statusChart} />
        </div>

       {/* Bookings vs Sales SPOC */}
       <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Bookings vs Sales SPOC</h3>
          <Bar vertical data={bookingsVsSalesSPOC} options={options} />
        </div>

        {/* GPV vs Sales SPOC */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4 text-center">GPV vs Sales SPOC</h3>
          <Bar data={GPVData} options={options} />
        </div>

        {/* GMV vs Sales SPOC */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4 text-center">GMV vs Sales SPOC</h3>
          <Bar data={GMVData} options={options} />
        </div>

        
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 m-8">
         <div >
           {/* Bookings vs Ops SPOC */}
        <div className="bg-white p-4 w-1/2 m-auto mb-8  rounded shadow">
          <h3 className="text-lg font-semibold mb-4 ">Bookings vs Ops SPOC</h3>
          <Bar data={bookingsVsOpsSPOC} />
        </div>
        {/* Operational */}
        <div className="bg-white p-4 w-1/2 m-auto rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Operational Status (Bookings)</h3>
          <Bar data={operationalStatus} />
        </div>
         </div>

        <UserActivityTable className="w-1/2" />
        </div>
    </div>
  );
};

export default Dashboard;
