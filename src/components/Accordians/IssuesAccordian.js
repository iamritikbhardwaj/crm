import React, { use } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { CustomTable } from "../customTable/CustomTable";
import { MdDelete, MdEdit } from "react-icons/md";
import IssueForm from "../Form/issueForm";
import { fetchIssues } from "../apiCalls/fetchData";
import { deleteIssue } from "../apiCalls/deleteData";
import { FaExclamationCircle } from "react-icons/fa";
import { date } from "zod";

function IssuesAccordian({ active, setActive, tripId }) {
  const [issues, setIssues] = React.useState(
    React.useMemo(() => [
      {
        date: "",
        description: (
          <p className="whitespace-normal w-[400px]">
          </p>
        ),
        resolution: (
          <p className="whitespace-normal w-[400px]">
          </p>
        ),
        responsible: "",
        action: (
          <div className="flex justify-around">
            <MdEdit className="text-blue-500" />
            <MdDelete className="text-red-500" />
          </div>
        ),
      },
    ])
  ); // replace with your actual data
  const [showForm, setShowForm] = React.useState(false);

  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Resolution",
        accessor: "resolution",
      },
      {
        Header: "Responsible",
        accessor: "responsible",
      },
      {
        Header: "Action",
        accessor: "action",
      },
    ],
    []
  );

  const refetch = async () => {
    const data = await fetchIssues(tripId);
    const rows = data.map((row) => ({
      date: String(row?.date).slice(0, 10).split("-").reverse().join("-"),
      description: row?.description,
      resolution: row?.resolution,
      responsible: row?.responsible,
      action: (
        <div className="flex justify-around">
          <MdEdit className="text-blue-500" />
          <MdDelete
            onClick={async () => {
              await deleteIssue(row?.issue_id);
              refetch();
            }}
            className="text-red-500"
          />
        </div>
      ),
    }));
    setIssues(rows);
  };

  React.useEffect(() => {
    refetch();
  }, [tripId]);

  return (
    <div className="mb-6 relative">
      <div className='bg-gradient-to-r from-yellow-100 to-yellow-300 text-black p-3 rounded-lg flex justify-between items-center shadow-md'>
        <h2 className="text-lg font-bold text-black flex items-center gap-2">
          <FaExclamationCircle />
          Issues Overview
        </h2>
        <button
          className="text-black hover:text-yellow-300 transition-colors duration-300"
          onClick={() => setActive(active === 7 ? null : 7)}>
          <IoIosArrowDropdownCircle size={24} />
        </button>
      </div>

      <div className={`p-4 ${active === 7 ? "block" : "hidden"} bg-gradient-to-b from-slate-200 to-slate-400 rounded-b-lg shadow-inner`}>
        <IssueForm hidden={showForm} tripId={tripId} refetch={refetch} />
        <div className="overflow-x-auto h-48">
          <CustomTable columnss={columns} dataa={issues} hideFilter={true} />
        </div>
        <div className="flex justify-end">
          <button
            className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={() => setShowForm(!showForm)}
          >
            Add Issue
          </button>
        </div>
      </div>
    </div>
  );
}

export default IssuesAccordian;
