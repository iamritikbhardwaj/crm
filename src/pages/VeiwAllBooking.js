import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import BackToHome from "../components/BackToHome";
import { CustomTable } from "../components/customTable/CustomTable";
import { useLocation } from "react-router-dom";
import { getTravelMonthRange } from "./Booking";
import FileUpload from "../components/Input/FileUpload";
import ReconForm from "../components/Form/ReconForm";
import { MdAddCircle, MdDelete, MdEdit, MdModeEdit } from "react-icons/md";
import PaymentForm from "../components/Form/PaymentForm";
import {
  fetchDestinations,
  fetchPayment,
  fetchRecon,
  fetchSuppliers,
  fetchUsers,
} from "../components/apiCalls/fetchData";
import { deletePayment, deleteRecon } from "../components/apiCalls/deleteData";

function VeiwAllBooking() {
  const location = useLocation();
  const item = location.state;
  const [active, setActive] = useState(0); // Section toggle
  const [doc, setDoc] = useState(item.documents);
  const [supp, setSupp] = useState([]);
  const [vendor, setVendor] = useState({
    name: "",
    destination: item.destination,
    bookingStatus: "",
    paymentStatus: "",
  });
  const [vendorTable, setVendorTable] = useState([]);
  const inpRef = useRef(null);
  const editForm = useRef(null);
  const [payment, setPayment] = useState([]);

  // Predefined booking data
  const [opsSpoc, setOpsSpoc] = useState([]);
  const [inputData, setInputData] = useState(null);
  const [recon, setRecon] = useState([]);

  const refetchCom = async () => {
    const reconData = await fetchRecon();
    if (reconData) {
      setRecon(reconData);
      console.log(recon, "recon");
    }

    const payData = await fetchPayment();
    if (payData) {
      setPayment(payData);
    }
  };

  useEffect(() => {
    try {
      (async () => {
        const data = await fetchUsers();
        if (data) {
          setOpsSpoc(data.filter((user) => user.profile === "Operations"));
        }

        refetchCom();

        const destOut = await fetchDestinations();
        const destData = destOut.filter(
          (dest) => dest.destination === item.destination
        );

        const supData = await fetchSuppliers();
        const final = supData.filter(
          (sup) => sup.destination_id === destData[0].destination_id
        );

        setSupp(final);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChange = (e) => {
    // console.log(e.target.value);
  };

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
                <select
                  defaultChecked={item.opsSpoc}
                  onChange={(e) => {
                    item.opsSpoc = e.target.value;
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
                          file.catagory !== "freezeQuotation" &&
                          file.catagory !== "voucher" && (
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
                Order Value (USD): {item.orderValue}
              </p>
              <p className="font-semibold">Transfer Price(USD): 2000</p>
            </div>
            {/* Payment Details Table */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Payment Details</h3>
              {/* Payment Edit Form */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit inset-0 bg-black bg-opacity-50 items-center justify-center hidden"
                id="payForm"
                ref={inpRef}
              >
                <div className="bg-white p-6 rounded-lg w-96">
                  <h3 className="font-semibold mb-4">Edit Payment Details</h3>
                  <PaymentForm
                    refetch={refetchCom}
                    inputData={inputData}
                    tripId={item.tripId}
                    handlehide={() => {
                      inpRef.current.style.display = "none";
                    }}
                  />
                </div>
              </div>
              <button
                className="text-blue-600 ml-[90%] text-3xl"
                onClick={() => {
                  setInputData(null);
                  inpRef.current.style.display = "block";
                }}
              >
                <MdAddCircle />
              </button>
              <CustomTable
                dataa={payment.map((item, index) => ({
                  installment: "installment" + " " + parseInt(index + 1),
                  amount: item.amount,
                  date: item.date.slice(0, 10),
                  mode: item.paymentMode,
                  convertionRate: item.convRate,
                  amtinr: parseFloat(item.conFee + item.amount * item.convRate),
                  convfee: item.conFee,
                  remarks: item.remarks,
                  action: (
                    <div className="flex justify-around">
                      <button
                        className="text-blue-900"
                        onClick={() => {
                          setInputData(item);
                          inpRef.current.style.display = "block";
                        }}
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() => {deletePayment(item.payment_id); refetchCom();}}
                        className="text-red-600"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  ),
                }))}
                columnss={[
                  { Header: " ", accessor: "installment" },
                  { Header: "Date/Payment", accessor: "date" },
                  { Header: "Mode", accessor: "mode" },
                  { Header: "Conv: Rate", accessor: "convertionRate" },
                  { Header: "Amount (USD)", accessor: "amount" },
                  { Header: "CONV: Fee", accessor: "convfee" },
                  { Header: "Amount (INR)", accessor: "amtinr" },
                  { Header: "Remarks", accessor: "remarks" },
                  { Header: "Action", accessor: "action" },
                ]}
                size={"text-xs"}
                hideFilter={true}
              />
            </div>

            {/* Booking Reconciliation Table */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Booking Reconciliation</h3>
              {/* Edit Form */}
              <div
                className="absolute w-fit left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 bg-black bg-opacity-50 items-center justify-center hidden"
                ref={editForm}
              >
                <div className="bg-white p-6 rounded-lg w-96">
                  <h3 className="font-semibold mb-4">
                    Edit Reconciliation Details
                  </h3>
                  <ReconForm
                    refetch={refetchCom}
                    tripId={item.tripId}
                    inputData={inputData}
                    handleHide={() => (editForm.current.style.display = "none")}
                  />
                </div>
              </div>
              <button
                className="text-blue-600 ml-[90%] text-3xl"
                onClick={() => {
                  setInputData(null);
                  editForm.current.style.display = "block";
                }}
              >
                <MdAddCircle />
              </button>

              <CustomTable
                dataa={recon.map((item, index) => ({
                  online: item.online,
                  offline: item.offline,
                  land: item.land,
                  action: (
                    <div className="flex justify-around">
                      <button
                        className="text-blue-900"
                        onClick={() => {
                          setInputData(item);
                          editForm.current.style.display = "block";
                        }}
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() => {
                          deleteRecon(item.recon_id);
                          refetchCom();
                        }}
                        className="text-red-600"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  ),
                }))}
                columnss={[
                  { Header: "Online Booking", accessor: "online" },
                  {
                    Header: "Offline Booking(only Hotels)",
                    accessor: "offline",
                  },
                  { Header: "Land Combo", accessor: "land" },
                  { Header: "Action", accessor: "action" },
                ]}
                size={"text-xs"}
                hideFilter={true}
              />
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
                onChange={(e) => {
                  setVendor({ ...vendor, name: e.target.value });
                }}
              >
                <option value="">Select a vendor</option>
                {supp &&
                  supp.map((supplier, index) => {
                    return (
                      <option key={index} value={supplier}>
                        {supplier.name}
                      </option>
                    );
                  })}
              </select>
              <button
                onClick={() => {
                  setVendorTable(...vendorTable, vendor);
                  setVendor({ ...vendor, name: "" });
                }}
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-700"
              >
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
                  {vendorTable.length > 0 &&
                    vendorTable.map((ven, index) => (
                      <div>
                        <td className="p-2">{ven.supplier}</td>
                        <td className="p-2">{item.destination}</td>
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
                      </div>
                    ))}
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
