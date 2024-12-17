import React, { useState } from "react";
import BackToHome from "../components/BackToHome";
import { CustomTable } from "../components/customTable/CustomTable";
import { destData, agentData, supplierData } from "../sampleData/sampleData";

function Setting() {
  const [activeTab, setActiveTab] = useState(1);

  // Columns for Destinations, Agents, and Suppliers tables
  const destinationColumns = [
    { Header: "Destination", accessor: "destination" },
    { Header: "Currency", accessor: "currency" },
    { Header: "Status", accessor: "status" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: () => (
        <div className="flex gap-2">
          <button className="text-blue-600 hover:underline">Edit</button>
          <button className="text-red-600 hover:underline">Delete</button>
        </div>
      ),
    },
  ];

  const agentColumns = [
    { Header: "Agent Name", accessor: "agent" },
    { Header: "Status", accessor: "status" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: () => (
        <div className="flex gap-2">
          <button className="text-blue-600 hover:underline">Edit</button>
          <button className="text-red-600 hover:underline">Delete</button>
        </div>
      ),
    },
  ];

  const supplierColumns = [
    { Header: "Supplier Name", accessor: "supplier" },
    { Header: "Status", accessor: "status" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: () => (
        <div className="flex gap-2">
          <button className="text-blue-600 hover:underline">Edit</button>
          <button className="text-red-600 hover:underline">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-around p-4 w-full h-full items-center overflow-y-auto content-center">
        {/* Back to Home Button */}
        <div className="absolute top-2 left-2">
          <BackToHome path={"/"} />
        </div>

        {/* Left Section for Forms */}
        <div className="flex-col w-[45%] h-[80vh] p-4 bg-slate-100 shadow rounded-lg">
          <div className="text-center text-lg font-semibold text-slate-50 bg-slate-800 py-2">
            {/* Tabs */}
            <ul className="flex justify-start">
              <li
                className={`border-x-2 p-2 cursor-pointer ${
                  activeTab === 1 && "bg-slate-700 text-white"
                }`}
                onClick={() => setActiveTab(1)}
              >
                Destinations
              </li>
              <li
                className={`border-x-2 p-2 cursor-pointer ${
                  activeTab === 2 && "bg-slate-700 text-white"
                }`}
                onClick={() => setActiveTab(2)}
              >
                Agents
              </li>
              <li
                className={`border-x-2 p-2 cursor-pointer ${
                  activeTab === 3 && "bg-slate-700 text-white"
                }`}
                onClick={() => setActiveTab(3)}
              >
                Suppliers
              </li>
            </ul>
          </div>

          {/* Forms for each tab */}
          {activeTab === 1 && (
            <form>
              <input
                className="w-full p-2 border-2 m-2 rounded"
                type="text"
                placeholder="Destination"
              />
              <input
                className="w-full p-2 border-2 m-2 rounded"
                type="text"
                placeholder="Currency"
              />
              <button className="w-1/2 p-2 border-2 m-2 bg-slate-700 text-white rounded hover:bg-slate-600">
                Save
              </button>
            </form>
          )}
          {activeTab === 2 && (
            <form>
              <input
                className="w-full p-2 border-2 m-2 rounded"
                type="text"
                placeholder="Agent Name"
              />
              <input
                className="w-full p-2 border-2 m-2 rounded"
                type="text"
                placeholder="Status"
              />
              <button className="w-1/2 p-2 border-2 m-2 bg-slate-700 text-white rounded hover:bg-slate-600">
                Save
              </button>
            </form>
          )}
          {activeTab === 3 && (
            <form>
              <input
                className="w-full p-2 border-2 m-2 rounded"
                type="text"
                placeholder="Supplier Name"
              />
              <input
                className="w-full p-2 border-2 m-2 rounded"
                type="text"
                placeholder="Status"
              />
              <button className="w-1/2 p-2 border-2 m-2 bg-slate-700 text-white rounded hover:bg-slate-600">
                Save
              </button>
            </form>
          )}
        </div>

        {/* Right Section for Tables */}
        <div className="flex-col w-[45%] h-[80vh] p-4 bg-slate-100 shadow rounded-lg overflow-y-auto">
          {activeTab === 1 && (
            <CustomTable
              dataa={destData}
              columnss={destinationColumns}
              button={"Add Destination"}
              path={"/destForm"}
            />
          )}
          {activeTab === 2 && (
            <CustomTable
              dataa={agentData}
              columnss={agentColumns}
              button={"Add Agent"}
              path={"/agentForm"}
            />
          )}
          {activeTab === 3 && (
            <CustomTable
              dataa={supplierData}
              columnss={supplierColumns}
              button={"Add Supplier"}
              path={"/supForm"}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Setting;
