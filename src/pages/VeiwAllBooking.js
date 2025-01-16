import React, { use, useEffect, useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import BackToHome from "../components/BackToHome";
import { CustomTable } from "../components/customTable/CustomTable";
import ExcelToTable from "../components/customTable/ExcelToTable";
import { useLocation } from "react-router-dom";
import { getTravelMonthRange } from "./Booking";
import { API_URL } from "../AppConstant";
import axios from "axios";
import FileUpload from "../components/Input/FileUpload";
import ReconForm from "../components/Form/ReconForm";

function VeiwAllBooking() {
  const location = useLocation();
  const item = location.state;
  console.log(item, "data");
  const [active, setActive] = useState(0); // Section toggle
  const [doc, setDoc] = useState(item.documents);
  console.log(doc, "doc");
  const [supp, setSupp] = useState(item.supplier);

  const handleAddEdit = () => {
    const editForm = document.querySelector("#editForm");
    if (editForm.classList.contains("hidden")) {
      editForm.classList.remove("hidden");
    } else {
      editForm.classList.add("hidden");
    }
  };

  // Predefined booking data
  const [opsSpoc, setOpsSpoc] = useState(item.opsSpoc);
  const [inputData, setInputData] = useState({
    ...item,
    documents: doc,
    opsSpoc: "",
  });
  const [recon, setRecon] = useState({
    online: "True",
    offline: "False",
    land: "",
    remarks: "",
    validatedBy: "",
    add: <button onClick={handleAddEdit}>add</button>,
    action: <button onClick={handleAddEdit}>Edit</button>,
  });

  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(`${API_URL}users/getAllUsers`, {
          allowCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          console.log(
            response.data.OUTPUT.filter(
              (user) => user.profile === "Operations"
            ),
            "opsSpoc"
          );
          setOpsSpoc(
            response.data.OUTPUT.filter((user) => user.profile === "Operations")
          );
          console.log(opsSpoc, "ops");
        }

        const destRes = await axios.get(`${API_URL}users/getAllDestinations`, {
          withCredentials: true,
          headers: {
            "content-type": "application/json",
          },
        });

        // fetching destination data to match destination_id in supplier table
        const destData = await destRes.data.OUTPUT.filter(
          (dest) => dest.destination === item.destination
        );

        const supRes = await axios.get(`${API_URL}users/getAllSuppliers`, {
          withCredentials: true,
          headers: {
            "content-type": "application/json",
          },
        });

        console.log(destData, "destData");

        const supData = destData.map((dest) => {
          // setSupp((prevValue) => [...prevValue, ...supRes.data.OUTPUT.filter((sup) => sup.destination_id === dest.destination_id)]);
        });
        // setSupp(supData);
        console.log(supp, "supplier data");
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const columns = [
    {
      Header: "HEAD",
      accessor: "head",
    },
    {
      Header: "DATE",
      accessor: "date",
    },
    {
      Header: "DESCRIPTION",
      accessor: "description",
    },
    {
      Header: "PICKUP LOCATION",
      accessor: "pickupLocation",
    },
    {
      Header: "DROP LOCATION",
      accessor: "dropLocation",
    },
    {
      Header: "PRICE (A)",
      accessor: "priceA",
    },
    {
      Header: "PRICE (T)/MYR",
      accessor: "priceMYR",
    },
    {
      Header: "PRICE (T)/USD",
      accessor: "priceUSD",
    },
    {
      Header: "SUPPLIER",
      accessor: "supplier",
    },
  ];

  // Example data based on the table in the image
  const data = [
    {
      head: "HOTEL",
      date: "19 DEC || 21 DEC",
      description: "VILLAGE HOTEL SENTOSA BY FAR EAST HOSPITALITY",
      pickupLocation: "BOOKED BY AGENT",
      dropLocation: "BOOKED BY AGENT",
      priceA: "USD 0.00",
      priceMYR: "",
      priceUSD: "USD 0.00",
      supplier: "SELF BOOKED",
    },
    {
      head: "ETICKET",
      date: "20-Dec",
      description: "UNIVERSAL STUDIOS NORMAL ADMISSION - TICKETS ONLY",
      pickupLocation: "=",
      dropLocation: "=",
      priceA: "SGD 505.10",
      priceMYR: "",
      priceUSD: "USD 373.77",
      supplier: "GLOBALTIX",
    },
    {
      head: "TRANSFERS",
      date: "25-Dec",
      description: "DEPARTURE",
      pickupLocation: "HILTON GARDEN INN SERAGON",
      dropLocation: "CHANGI AIRPORT",
      priceA: "",
      priceMYR: "",
      priceUSD: "USD 33.30",
      supplier: "TDMC",
    },
    // Add more rows as needed based on the table in the image
  ];

  // Handle file upload
  const addDoc = (e, catagory) => {
    const files = e.target.files;
    console.log(files, "files");

    if (files.length > 0) {
      Array.from(files).forEach((file) => {
        const fileURL = URL.createObjectURL(file);
        if (doc) {
          setDoc((prevDoc) => [
            ...prevDoc,
            { file, url: fileURL, catagory: catagory },
          ]);
        } else {
          setDoc([{ file, url: fileURL, catagory: catagory }]);
        }
      });
    }
  };

  const removeDoc = (index) => {
    const updatedDoc = doc.filter((_, i) => i !== index);
    setDoc(updatedDoc);
  };
  return (
    <div className="p-4">
      <BackToHome path={"/schedule"} />
      <div className="max-w-7xl 89 mx-auto p-4 md:p-6 bg-white shadow-lg rounded-lg mt-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          View Confirmed Booking
        </h1>

        {/* Booking Details */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold bg-gray-200 p-2 rounded flex justify-between">
            Booking Details
            <span onClick={() => setActive(active === 0 ? null : 0)}>
              <IoIosArrowDropdownCircle />
            </span>
          </h2>
          <div
            className={`${
              active === 0 ? "block" : "hidden"
            } grid grid-cols-2 gap-4 p-4`}
          >
            {[
              ["Destination", item.destination],
              ["Sales Spoc", item.salesSpoc],
              ["Agent", item.agent],
              ["Customer Name", item.customerName],
              ["Number of Pax", item.pax.A + item.pax.C],
              [
                "Travel Month",
                getTravelMonthRange(item.arrivalDate, item.departureDate),
              ],
              ["Arrival Date", item.arrivalDate.slice(0, 10)],
              ["Departure Date", item.departureDate.slice(0, 10)],
              ["Booking Date", item.bookingDate.slice(0, 10)],
              ["WhatsApp Number", item.countryCode + " " + item.whatsappNumber],
              [
                "Ops Spoc",
                item.opsSpoc,
                <select
                  onChange={(e) => {
                    setInputData({ ...inputData, opsSpoc: e.target.value });
                    console.log(inputData, "inputData");
                  }}
                >
                  {opsSpoc.length > 0 &&
                    opsSpoc.map((user, index) => (
                      <option key={index} value={user.name}>
                        {user.name}
                      </option>
                    ))}
                </select>,
              ], // ask client where will this come from
            ].map(([label, value], index) => (
              <div key={index} className="flex space-x-3">
                <label className="font-semibold">{label}:</label>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Document Upload */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold bg-gray-200 p-2 rounded flex justify-between">
            Document Upload
            <span onClick={() => setActive(active === 1 ? null : 1)}>
              <IoIosArrowDropdownCircle />
            </span>
          </h2>
          <div className={`p-4 ${active === 1 ? "block" : "hidden"}`}>
            <div className="flex">
              {/* Document Upload List */}
              <div className="w-1/2 border-r border-gray-300 px-2 space-y-2">
                <FileUpload
                  label={"Air Ticket"}
                  id={"airTicket"}
                  onChange={addDoc}
                  onRemove={removeDoc}
                  files={doc}
                  catagory={"airTicket"}
                />
                <FileUpload
                  label={"Passport"}
                  id={"passport"}
                  onChange={addDoc}
                  onRemove={removeDoc}
                  files={doc}
                  catagory={"passport"}
                />
                <FileUpload
                  label={"PAN"}
                  id={"pan"}
                  onChange={addDoc}
                  onRemove={removeDoc}
                  files={doc}
                  catagory={"pan"}
                />
                <FileUpload
                  label={"Misceleanious"}
                  id={"misc"}
                  onChange={addDoc}
                  onRemove={removeDoc}
                  files={doc}
                  catagory={"misc"}
                />
                <FileUpload
                  label={"Email Confirmation"}
                  id={"emailConf"}
                  onChange={addDoc}
                  onRemove={removeDoc}
                  files={doc}
                  catagory={"emailConf"}
                />
              </div>

              {/* Document Preview */}
              <div className="w-1/2 pl-4">
                <ul>
                  {doc
                    ? doc.map(
                        (file, index) =>
                          file.catagory !== "freezeQuotation" && file.catagory !== "voucher" && (
                            <li className="space-x-2" key={index}>
                              <a
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {file.file.name}
                              </a>
                              <button
                                className="text-red-400 rounded-lg cursor-pointer hover:text-red-700"
                                onClick={() => removeDoc(index)}
                              >
                                Remove
                              </button>
                            </li>
                          )
                      )
                    : "No documents uploaded"}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Commercials */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold bg-gray-200 p-2 rounded flex justify-between">
            Commercials
            <span onClick={() => setActive(active === 2 ? null : 2)}>
              <IoIosArrowDropdownCircle />
            </span>
          </h2>
          <div className={`p-4 ${active === 2 ? "block" : "hidden"}`}>
            <div className="flex justify-between">
              <p className="font-semibold">
                Order Value (USD): {inputData.orderValue}
              </p>
              <p className="font-semibold">Transfer Price(USD): 2000</p>
            </div>
            {/* Payment Details Table */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Payment Details</h3>
              <CustomTable
                dataa={[
                  {
                    installment: "First Installment",
                    date: "",
                    amount: "",
                    mode: "",
                    status: "",
                    remarks: "",
                    action: (
                      <button
                        onClick={() => {
                          document
                            .getElementById("paymentForm")
                            .classList.remove("hidden");
                        }}
                      >
                        Edit
                      </button>
                    ),
                  },
                ]}
                columnss={[
                  { Header: " ", accessor: "installment" },
                  { Header: "Date/Payment", accessor: "date" },
                  { Header: "Mode", accessor: "mode" },
                  { Header: "Conv: Rate", accessor: "convertionRate" },
                  { Header: "Amount (USD)", accessor: "amount" },
                  { Header: "CONV: Fee", accessor: "convfee" },
                  { Header: "Amount (INR)", accessor: "amtinr" },
                  { Header: "Status", accessor: "status" },
                  { Header: "Action", accessor: "action" },
                ]}
                size={"text-xs"}
                hideFilter={true}
              />
              {/* Payment Edit Form */}
              <div
                className="relative w-fit inset-0 bg-black bg-opacity-50 items-center justify-center hidden"
                id="paymentForm"
              >
                <div className="bg-white p-6 rounded-lg w-96">
                  <h3 className="font-semibold mb-4">Edit Payment Details</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        className="w-full border rounded p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Amount
                      </label>
                      <input
                        type="number"
                        className="w-full border rounded p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Payment Mode
                      </label>
                      <select className="w-full border rounded p-2">
                        <option>Cash</option>
                        <option>Credit Card</option>
                        <option>Bank Transfer</option>
                        <option>UPI</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Status
                      </label>
                      <select className="w-full border rounded p-2">
                        <option>Pending</option>
                        <option>Completed</option>
                        <option>Failed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Remarks
                      </label>
                      <textarea className="w-full border rounded p-2"></textarea>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          document
                            .getElementById("paymentForm")
                            .classList.add("hidden");
                        }}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Booking Reconciliation Table */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Booking Reconciliation</h3>
              <CustomTable
                dataa={[recon]}
                columnss={[
                  { Header: "Online Booking", accessor: "online" },
                  {
                    Header: "Offline Booking(only Hotels)",
                    accessor: "offline",
                  },
                  { Header: "Land Combo", accessor: "land" },
                  { Header: "Add", accessor: "add" },
                ]}
                size={"text-xs"}
                hideFilter={true}
              />
              {/* Edit Form */}
              <div
                className="relative w-fit inset-0 bg-black bg-opacity-50 items-center justify-center hidden"
                id="editForm"
              >
                <div className="bg-white p-6 rounded-lg w-96">
                  <h3 className="font-semibold mb-4">
                    Edit Reconciliation Details
                  </h3>
                  <ReconForm />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Freeze Quotation */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold bg-gray-200 p-2 rounded flex justify-between">
            Freeze Quotation
            <span onClick={() => setActive(active === 3 ? null : 3)}>
              <IoIosArrowDropdownCircle />
            </span>
          </h2>
          <div className={`p-4 ${active === 3 ? "flex-col" : "hidden"} h-fit`}>
            <div className="flex gap-4">
              <div className="w-1/2">
                <FileUpload
                  label={"Sales Sheet"}
                  id={"salesSheet"}
                  onChange={addDoc}
                  onRemove={removeDoc}
                  files={doc}
                  catagory={"freezeQuotation"}
                  toAccept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                />
              </div>
              <div className="w-1/2">
                <ul>
                  {doc
                    ? doc.map(
                        (file, index) =>
                          file.catagory === "freezeQuotation" && (
                            <li className="space-x-2" key={index}>
                              <a
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {file.file.name}
                              </a>
                              <button
                                className="text-red-400 rounded-lg cursor-pointer hover:text-red-700"
                                onClick={() => removeDoc(index)}
                              >
                                Remove
                              </button>
                            </li>
                          )
                      )
                    : "No documents uploaded"}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* vendor details */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold bg-gray-200 p-2 rounded flex justify-between">
            Vendor Details
            <span onClick={() => setActive(active === 4 ? null : 4)}>
              <IoIosArrowDropdownCircle />
            </span>
          </h2>
          <div className={`p-4 ${active === 4 ? "block" : "hidden"}`}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vendor Name
              </label>
              <select
                id="vendor"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search vendor..."
                list="vendorList"
              >
                <option value="">Select a vendor</option>
                {/* {supp.map((sup) => (
                  <option key={sup.supplier_id} value={sup.name}>{sup.name}</option>
                ))} */}
              </select>
              <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-700">
                Add Vendor
              </button>
            </div>
            <table className="w-full border border-slate-400 text-sm mb-4">
              <thead>
                <tr>
                  <th className="text-left p-2">Vendor Name</th>
                  <th className="text-left p-2">Destination</th>
                  <th className="text-left p-2">Booking Status</th>
                  <th className="text-left p-2">Payment Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">Vendor Name</td>
                  <td className="p-2">Bali</td>
                  <td className="p-2">
                    <select className="border rounded px-2 py-1">
                      <option value="pending">Pending</option>
                      <option value="in-progress">In-Progress</option>
                    </select>
                  </td>
                  <td className="p-2">
                    <select className="border rounded px-2 py-1">
                      <option value="unpaid">Unpaid</option>
                      <option value="part-paid">Part-Paid</option>
                      <option value="completed">Payment Completed</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Voucher details */}
        <div className="mb-6"></div>
        <h2 className="text-lg font-semibold bg-gray-200 p-2 rounded flex justify-between">
          Voucher Details
          <span onClick={() => setActive(active === 5 ? null : 5)}>
            <IoIosArrowDropdownCircle />
          </span>
        </h2>
        <div className={`p-4 ${active === 5 ? "flex" : "hidden"} min-h-36`}>
          <div className="w-1/2 my-auto h-full border-r-[1px] border-slate-400">
            <div className="flex gap-4 align-middle">
              <FileUpload
                label={"Hotel Voucher"}
                id={"hotel-voucher"}
                onChange={addDoc}
                onRemove={removeDoc}
                files={doc}
                catagory={"voucher"}
              />
            </div>
            <div className="flex gap-4 align-middle">
              <FileUpload
                label={"Activities Voucher"}
                id={"activities-voucher"}
                onChange={addDoc}
                onRemove={removeDoc}
                files={doc}
                catagory={"voucher"}
              />
            </div>
            <div className="flex gap-4 align-middle">
              <FileUpload
                label={"Miscellaneous Voucher"}
                id={"misc-voucher"}
                onChange={addDoc}
                onRemove={removeDoc}
                files={doc}
                catagory={"voucher"}
              />
            </div>
          </div>
          <div className="w-1/2">
            <ul>
              {doc.length > 0
                ? doc.map(
                    (file, index) =>
                      file.catagory === "voucher" && (
                        <li className="space-x-2" key={index}>
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {file.file.name}
                          </a>
                          <button
                            className="text-red-400 cursor-pointer hover:text-red-700"
                            onClick={() => removeDoc(index)}
                          >
                            Remove
                          </button>
                        </li>
                      )
                  )
                : "No documents uploaded"}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VeiwAllBooking;
