import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto"; // Required for Chart.js v3+ compatibility
import BackToHome from "../components/BackToHome";
import UserActivityTable from "../components/charts/userVsActivity";
import { fetchDashboard, userSpecificDashboard } from "../components/apiCalls/fetchData";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const Dashboard = () => {

  const auth = useSelector((state) => state.auth);
  const user = auth.user;
  console.log(user, "user");
  const [fromDate, setFromDate] = useState(Date.now());
  const [toDate, setToDate] = useState(Date.now() + 86400000);
  const [data, setData] = useState({
    noOfBookings: 120,
    activeAgents: 25,
    totalGMV: 500000,
    totalGPV: 450000,
  });
  const [bookingsVsSalesSPOC, setBookingsVsSalesSPOC] = useState({
    labels: ["Sales SPOC 1", "Sales SPOC 2", "Sales SPOC 3"],
    datasets: [
      {
        label: "Bookings",
        data: [15, 25, 30],
        backgroundColor: "#36A2EB",
      },
    ],
  });
  const [statusChart, setStatusChart] = useState({
    labels: ["Cancelled", "Confirmed", "On tour", "Travelled"],
    datasets: [
      {
        label: "Bookings Status",
        data: [10, 50, 40, 20],
        backgroundColor: ["#FF6384", "#4CAF50", "#FFCE56", "#808080"],
      },
    ],
  });
  const [bookingsVsOpsSPOC, setBookingsVsOpsSPOC] = useState({
    labels: ["Ops SPOC 1", "Ops SPOC 2", "Ops SPOC 3"],
    datasets: [
      {
        label: "Bookings",
        data: [20, 18, 25],
        backgroundColor: "#FF6384",
      },
    ],
  });
  const [users, setUsers] = useState([
    {
      name: "Yiorgos Avraamu",
      status: "New",
      registered: "Jan 1, 2023",
      activity: "10 sec ago",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
      name: "Avram Tasarios",
      status: "Recurring",
      registered: "Jan 1, 2023",
      activity: "5 minutes ago",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    {
      name: "Quintin Ed",
      status: "New",
      registered: "Jan 1, 2023",
      activity: "1 hour ago",
      avatar: "https://i.pravatar.cc/40?img=3",
    },
  ]);

  const [GMVData, setGMVData] = useState({
    labels: ["SPOC A", "SPOC B", "SPOC C"],
    datasets: [
      {
        label: "GMV",
        data: [1200, 1500, 900],
        backgroundColor: "#4CAF50", // Green
      },
    ],
  });

  const [GPVData, setGPVData] = useState({
    labels: ["SPOC A", "SPOC B", "SPOC C"],
    datasets: [
      {
        label: "GPV",
        data: [800, 1000, 700],
        backgroundColor: "#F87171", // Red
      },
    ],
  });


  const search = async()=>{
    Swal.fire({
      title: "Fetching...",
      text: "Please wait while we fetch Data.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const res = user.profile !== "Sales" ? await fetchDashboard(fromDate, toDate) : await userSpecificDashboard(fromDate, toDate, user);
    console.log(res, 'res');
    setData({
      noOfBookings: res.OUTPUT?.noOfBookings || 0,
      activeAgents: res.OUTPUT?.activeAgents || 0,
      totalGMV: res.OUTPUT?.gmv || 0,
      totalGPV: res.OUTPUT?.gpv || 0,
    });
    setBookingsVsSalesSPOC({
      labels: res.bvss.sales,
      datasets: [{
        label: "Bookings",
        data: res.bvss.bookings,
        backgroundColor: "#36A2EB",
      }]
    });
    user.profile !== "Sales" && setBookingsVsOpsSPOC({
      labels: res.bvso.ops,
      datasets: [{
        label: "Bookings",
        data: res.bvso.bookings,
        backgroundColor: "#FF6384",
      }]
    });
    setStatusChart({
      labels: ["Cancelled", "Confirmed", "On tour", "Travelled"],
      datasets: [{
        label: "Bookings Status",
        data: res.chart,
        backgroundColor: ["#FF6384", "#4CAF50", "#FFCE56", "#808080"],
      }]
    });
    user.profile !== "Sales" && setGMVData({
      labels: res.sales,
      datasets: [{
        label: "GMV",
        data: res.gvss,
        backgroundColor: "#4CAF50", // Green
      }]
    });
    user.profile !== "Sales" && setGPVData({
      labels: res.sales,
      datasets: [{
        label: "GPV",
        data: res.gpvs,
        backgroundColor: "#4CAF50", // Green
      }]
    });
    user.profile !== "Sales" && setUsers(res.user);
    Swal.close();
  }

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
          <label htmlFor="fromDate" className="block mb-1">From Date</label>
          <input
            name="fromDate"
            type="date"
            placeholder={Date(fromDate)}
            // value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="toDate" className="block mb-1">To Date</label>
          <input
            name="toDate"
            type="date"
            placeholder={toDate}
            // value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
        <div>
          <button onClick={search} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8" type="button">
            Filter
          </button>
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
          <p className="text-3xl font-bold">USD {data.totalGMV}</p>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          <h2 className="text-xl font-semibold">Total GPV</h2>
          <p className="text-3xl font-bold">USD {data.totalGPV}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Status Chart */}
        <div className={`bg-white p-4 rounded shadow`}>
          <h3 className="text-lg font-semibold mb-4">Status Chart vs Number</h3>
          <Pie data={statusChart} />
        </div>

       {/* Bookings vs Sales SPOC */}
       <div className={`${user.profile === "Sales" ? "hidden": ''} bg-white p-4 rounded shadow`}>
          <h3 className="text-lg font-semibold mb-4">Bookings vs Sales SPOC</h3>
          <Bar vertical data={bookingsVsSalesSPOC} options={options} />
        </div>

        {/* GPV vs Sales SPOC */}
        <div className={`${user.profile === "Sales" ? "hidden": ''} bg-white p-4 rounded shadow`}>
          <h3 className="text-lg font-semibold mb-4 text-center">GPV vs Sales SPOC</h3>
          <Bar data={GPVData} options={options} />
        </div>

        {/* GMV vs Sales SPOC */}
        <div className={`${user.profile === "Sales" ? "hidden": ''} bg-white p-4 rounded shadow`}>
          <h3 className="text-lg font-semibold mb-4 text-center">GMV vs Sales SPOC</h3>
          <Bar data={GMVData} options={options} />
        </div>

        <div className={`${user.profile === "Sales" ? "hidden": ''} bg-white p-4 rounded shadow`}>
           {/* Bookings vs Ops SPOC */}
          <h3 className="text-lg font-semibold mb-4 ">Bookings vs Ops SPOC</h3>
          <Bar  data={bookingsVsOpsSPOC} />
         </div>

        <div className={`${user.profile === "Sales" ? "hidden": ''}`} >
        <UserActivityTable users={users} className={`${user.profile === "Sales" ? "hidden": ''} w-1/2`} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
