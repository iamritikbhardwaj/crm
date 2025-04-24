import React, { use } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { CustomTable } from "../customTable/CustomTable";
import { MdDelete, MdEdit } from "react-icons/md";
import IssueForm from "../Form/issueForm";
import { fetchIssues } from "../apiCalls/fetchData";
import { deleteIssue } from "../apiCalls/deleteData";

function IssuesAccordian({ active, setActive, tripId }) {
  const [issues, setIssues] = React.useState(
    React.useMemo(() => [
      {
        date: Date.now(),
        description: (
          <p className="whitespace-normal w-[400px]">
            customer is asking to go to the hotel from bali safari however the
            initial; sheet does not contain this, hence the driver is not
            aggring on that
          </p>
        ),
        resolution: (
          <p className="whitespace-normal w-[400px]">
            we had spoken to the supplier and asked him to convince the driver
            that he needs to take the detour via hotyel; to the candele light
            dinner, If he wants to ask for extra money we ar willing to pay for
            tebhe same. The supplier agreed for tghis preposition.
          </p>
        ),
        responsible: "Your's truely",
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
    console.log(data, "issues from request");
    const rows = data.map((row) => ({
      date:
        Date(row.date).split(" ")[2] +
        " " +
        Date(row.date).split(" ")[1] +
        " " +
        Date(row.date).split(" ")[0] +
        " " +
        Date(row.date).split(" ")[3] +
        " ",
      description: row.description,
      resolution: row.resolution,
      responsible: row.resolution,
      action: (
        <div className="flex justify-around">
          <MdEdit className="text-blue-500" />
          <MdDelete
            onClick={async () => {
              const deleted = await deleteIssue(row.issue_id);
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
    <div className="mb-2 relative">
      <h2 className="text-lg font-semibold bg-gray-200 p-2 rounded flex justify-between">
        Issues Overview
        <span onClick={() => setActive(active === 6 ? null : 6)}>
          <IoIosArrowDropdownCircle />
        </span>
      </h2>
      <div className={`p-4 ${active === 6 ? "block" : "hidden"}`}>
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
