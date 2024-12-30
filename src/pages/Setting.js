import React, { useEffect, useState } from "react";
import BackToHome from "../components/BackToHome";
import { CustomTable } from "../components/customTable/CustomTable";
import { MdModeEdit, MdDelete } from "react-icons/md";
import DestForm from "../components/Form/destForm";
import AgentForm from "../components/Form/agentForm";
import SupForm from "../components/Form/supForm";
import axios from "axios";
import { API_URL } from "../AppConstant";
import { set } from "mongoose";

function Setting() {
  const [activeTab, setActiveTab] = useState(1);
  const [dData, setDestData] = useState([]);
  const [aData, setAgentData] = useState([]);
  const [sData, setSupData] = useState([]);
  const [editData, setEditData] = useState([]);

 

  // destination data

  const destData = dData.map((item) => ({
    destination: item.destination,
    currency: item.currency,
    status: <button className="p-2 rounded-lg bg-green-400">{item.status}</button>,
    actions: <><button className="align-center text-blue-400" onClick={() => {setEditData(item)
    console.log(editData);
    }}><MdModeEdit /></button>
    <button className="align-center text-red-400" onClick={() => {(async () => {
      try {
        await axios.delete(`${API_URL}users/deleteDestination/${item.destination_id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        window.location.reload();
      } catch (error) {
        console.error("Error deleting destination:", error);
      }
    })();}}><MdDelete /></button></>,
  }));

  // agent data

  const agentData = aData.map((item) => ({
    agent: item.agentName,
    status: <button className="p-2 rounded-lg bg-green-400">{item.status}</button>,
    actions: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  }));

  // supplier data

  const supplierData = sData.map((item) => ({
    supplier: item.supplierName,
    status: <button className="p-2 rounded-lg bg-green-400">{item.status}</button>,
    actions: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  }));

  // Columns for Destinations, Agents, and Suppliers tables
  
  const supplierColumns = [
    { Header: "Supplier Name", accessor: "supplier" },
    { Header: "Status", accessor: "status" },
    {
      Header: "Actions",
      accessor: "actions",
    },
  ];

  const agentColumns = [
    { Header: "Agent Name", accessor: "agent" },
    { Header: "Status", accessor: "status" },
    {
      Header: "Actions",
      accessor: "actions",
    },
  ];

  const destinationColumns = [
    { Header: "Destination", accessor: "destination" },
    { Header: "Currency", accessor: "currency" },
    { Header: "Status", accessor: "status" },
    {
      Header: "Actions",
      accessor: "actions",
    },
  ];

  useEffect(() => {
    (async () => {
    const response = axios.get(`${API_URL}users/getAllDestinations`, {
      headers: {
        "content-type": "application/json"
      }
    });
    console.log((await response).data.OUTPUT, 'response');
    setDestData((await response).data.OUTPUT);
    })();
    (async () => {
      const response = axios.get(`${API_URL}users/getAllAgents`, {
        headers: {
          "content-type": "application/json"
        }
      });
      console.log((await response).data.OUTPUT, 'response');
      setAgentData((await response).data.OUTPUT);
      })();
      (async () => {
        const response = axios.get(`${API_URL}users/getAllSuppliers`, {
          headers: {
            "content-type": "application/json"
          }
        });
        console.log((await response).data.OUTPUT, 'response');
        setSupData((await response).data.OUTPUT);
        })();
  }, []);

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
                className={`border-x-[1px] p-2 cursor-pointer ${
                  activeTab === 1 && "bg-slate-700 text-white"
                }`}
                onClick={() => setActiveTab(1)}
              >
                Destinations
              </li>
              <li
                className={`border-x-[1px] p-2 cursor-pointer ${
                  activeTab === 2 && "bg-slate-700 text-white"
                }`}
                onClick={() => setActiveTab(2)}
              >
                Agents
              </li>
              <li
                className={`border-x-[1px] p-2 cursor-pointer ${
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
            <DestForm editData={editData} />
          )}
          {activeTab === 2 && (
            <AgentForm />
          )}
          {activeTab === 3 && (
            <SupForm />
          )}
        </div>

        {/* Right Section for Tables */}
        <div className="flex-col w-[45%] h-[80vh] p-4 bg-slate-100 shadow rounded-lg overflow-y-auto">
          {activeTab === 1 && (
            <CustomTable
              dataa={destData}
              columnss={destinationColumns}
              button={false}
              path={"/destForm"}
            />
          )}
          {activeTab === 2 && (
            <CustomTable
              dataa={agentData}
              columnss={agentColumns}
              button={false}
              path={"/AgentForm"}
            />
          )}
          {activeTab === 3 && (
            <CustomTable
              dataa={supplierData}
              columnss={supplierColumns}
              button={false}
              path={"/supForm"}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Setting;
