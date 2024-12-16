import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from 'chart.js/auto';
import BackToHome from '../components/BackToHome';

function Dashboard() {
  const chartRef = useRef(null); // Reference to keep track of the chart instance

  useEffect(() => {
    loadDashboardData();
  }, []);

  const dashboardData = {
    totalBookings: 26000,
    activeAgents: 6200,
    totalGMV: 44,
    conversionRate: 2.49,
    organicSearch: [191235, 51223, 37564, 27319],
    sources: ['Organic Search', 'Facebook', 'Twitter', 'LinkedIn'],
  };

  const loadDashboardData = () => {
    document.getElementById('totalBookings').innerText = '26K (-12.4%)';
    document.getElementById('activeAgents').innerText = '$6,200 (40.9% ↑)';
    document.getElementById('totalGMV').innerText = '44K (-23.6%)';
    document.getElementById('conversionRate').innerText = '2.49% (84.7% ↑)';

    // Initialize or update the chart
    createChart('chartOrganicSearch', dashboardData.organicSearch, dashboardData.sources);
  };

  const createChart = (canvasId, data, labels) => {
    const canvas = document.getElementById(canvasId);

    // Destroy the previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create a new chart instance and store it in the reference
    chartRef.current = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Traffic Source',
            data: data,
            backgroundColor: ['#28a745', '#007bff', '#17a2b8', '#6c757d'],
          },
        ],
      },
    });
  };

  return (
    <div className="container-fluid mt-4">
      {/* Header */}
      <div className="row">
        <BackToHome />
        {/* <div className="col-12 text-center text-white py-3" style={{ backgroundColor: '#343a40' }}>
          <h1>Dashboard</h1>
        </div> */}
      </div>

      {/* Cards Section */}
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Users</h5>
              <p id="totalBookings" className="card-text">Loading...</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-info mb-3">
            <div className="card-body">
              <h5 className="card-title">Income</h5>
              <p id="activeAgents" className="card-text">Loading...</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title">Sessions</h5>
              <p id="totalGMV" className="card-text">Loading...</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Conversion Rate</h5>
              <p id="conversionRate" className="card-text">Loading...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Traffic Sources</h5>
              <canvas id="chartOrganicSearch" height="100"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
