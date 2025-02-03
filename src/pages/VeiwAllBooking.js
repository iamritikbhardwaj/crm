import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import BackToHome from "../components/BackToHome";
import { CustomTable } from "../components/customTable/CustomTable";
import { data, useLocation } from "react-router-dom";
import { getTravelMonthRange } from "./Booking";
import FileUpload from "../components/Input/FileUpload";
import ReconForm from "../components/Form/ReconForm";
import { MdAddCircle, MdDelete, MdEdit, MdModeEdit } from "react-icons/md";
import PaymentForm from "../components/Form/PaymentForm";
import VendorForm from "../components/Form/VendorForm";
import {
  fetchDestinations,
  fetchPayment,
  fetchRecon,
  fetchSalesDocs,
  fetchSuppliers,
  fetchTrips,
  fetchUsers,
  fetchVendors,
} from "../components/apiCalls/fetchData";
import {
  deletePayment,
  deleteRecon,
  deleteVendor,
} from "../components/apiCalls/deleteData";
import { API_URL } from "../AppConstant";
import axios from "axios";
import Swal from "sweetalert2";
import ExcelToTable from "../components/customTable/ExcelToTable";

export default function VeiwAllBooking() {
  const location = useLocation();
  const [item, setItem] = useState(location.state);
  const [active, setActive] = useState(0); // Section toggle
  const [doc, setDoc] = useState(item?.documents);
  const [supp, setSupp] = useState([]);
  const [vendorTable, setVendorTable] = useState([]);
  const inpRef = useRef(null);
  const editForm = useRef(null);
  const [payment, setPayment] = useState([]);

  // Predefined booking data
  const [opsSpoc, setOpsSpoc] = useState([]);
  const [inputData, setInputData] = useState(null);
  const [recon, setRecon] = useState([]);

  
  const [selectedExcel, setSelectedExcel] = useState([]);

  const refetch = async () => {
    const itemData = await fetchTrips(location.state?.tripId);
    setItem(itemData);
  }

  const refetchCom = async () => {
    const reconData = await fetchRecon();
    if (reconData) {
      setRecon(reconData);
    }

    const payData = await fetchPayment();
    if (payData) {
      setPayment(payData);
    }
  };

  const editVendor = (vendor) => {
    (async () => {
      const response = await axios.post(
        `${API_URL}users/createVendor/?id=${vendor.vendor_pay_id}`,
        vendor
      );
    })();
  };

  const splitIt = (str) => {
    const data = str.split("/");
    const result = data[data.length - 1];
    return result;
  };

  const refetchSupp = async () => {
    const destOut = await fetchDestinations();
    const destData = destOut.filter(
      (dest) => dest.destination === item.destination
    );

    const vendorData = await fetchVendors();

    setVendorTable(vendorData);

    const supData = await fetchSuppliers();

    setSupp(supData);
    setInputData(destData[0]);
  };

  const handleFreezeQuotationClick = (e) => {
    e.preventDefault();
    setSelectedExcel(e.target.href);
    console.log(e.target.href);
  }

  useEffect(() => {
    try {
      (async () => {
        const data = await fetchUsers();
        if (data) {
          setOpsSpoc(data.filter((user) => user.profile === "Operations"));
        }
        const itemData = await fetchTrips();
        setItem(itemData.filter((trip) => trip.tripId === item.tripId)[0]);
        refetchCom();
        refetchSupp();
        const sdata = await fetchSalesDocs(item.tripId)
        setSelectedExcel(sdata[sdata.length - 1]);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

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

  const updateStatus = async(e) => {
    const formData = {
      status : e.target.value
    }
    const response = axios.post(`${API_URL}users/updateStatus/?id=${item.tripId}`, formData,
    {
      withCredentials: true,
      headers: {
        "content-type": "application/json"
      }
    });
    if ((await response).status === 200) {
      await refetch();
      Swal.fire({
        title: "Status updated successfully",
        timer: 2000
      })
    } else {
      Swal.fire({
        text: response.data.MESSAGE,
        timer: 2000
      })
    }
  }

  const updateOps = async(e) => {
    const formData = {
      opsSpoc : e.target.value
    }
    const response = axios.post(`${API_URL}users/updateOps/?id=${item.tripId}`, formData,
    {
      withCredentials: true,
      headers: {
        "content-type": "application/json"
      }
    });
    if ((await response).status === 200) {
      await refetch();
      Swal.fire({
        title: "Ops updated successfully",
        timer: 2000
      })
    } else {
      Swal.fire({
        text: response.data.MESSAGE,
        timer: 2000
      })
    }
  }

  const updateDocs = async () => {
    const formData = new FormData();
    doc.forEach((doc) => {
      if (doc.file) {
        formData.append(`${doc.catagory}`, doc.file);
      } else {
        formData.append("docs", doc);
      }
    });
    
    const response = await axios.post(
      `${API_URL}users/updateDocs/?id=${item.tripId}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      await refetch();
      Swal.fire(response.data.MESSAGE);
    } else {
      Swal.fire(response.data.MESSAGE);
    }
  };

  return (
    <div className="p-4">
      <BackToHome path={"/schedule"} />
      <div className="max-w-7xl 89 mx-auto p-4 md:p-6 bg-white shadow-lg rounded-lg mt-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          View Confirmed Booking
        </h1>
        <div className="flex justify-end">
          
          <button onClick={updateDocs} className="bg-blue-500 rounded-lg px-2 m-2 text-white py-1">
            Save Changes
          </button>
        </div>

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
              ["Number of Pax", item.pax.A + " A "+ "/ " + item.pax.C + " C " + "-" + (item.pax?.Ca === undefined ? "" : item.pax.Ca )],
              [
                "Travel Month",
                getTravelMonthRange(item.arrivalDate),
              ],
              ["Arrival Date", item.arrivalDate.slice(0, 10).split("-")[2] + " " + getTravelMonthRange(item.arrivalDate)],
              ["Departure Date", item.departureDate.slice(0, 10).split("-")[2] + " " + getTravelMonthRange(item.departureDate)],
              ["Booking Date", item.bookingDate.slice(0, 10).split("-")[2] + " " + getTravelMonthRange(item.bookingDate)],
              ["WhatsApp Number", item.countryCode + " " + item.whatsappNumber],
              [
                "Ops Spoc",
                <select
                  value={item?.opsSpoc}
                  onChange={updateOps}
                >
                  {opsSpoc.length > 0 &&
                    opsSpoc.map((user, index) => (
                      <option key={index} value={user.name}>
                        {user.name}
                      </option>
                    ))}
                </select>,
              ],
              ["Trip Status", <select onChange={updateStatus}>
                <option value="CONFIRMED">Confirmed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>], // ask client where will this come from
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
                          !new String(file).includes("freezeQuotation") && (
                            <li className="space-x-2" key={index}>
                              <a
                                href={file}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {new String(file).includes("http" || "https")
                                  ? splitIt(file)
                                  : file?.file.name}
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
                        onClick={() => {
                          deletePayment(item.payment_id);
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
            <div>
             { ExcelToTable(selectedExcel)}
            </div>
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
                          new String(file).includes("freezeQuotation") && 
                          (
                            <li className="space-x-2" key={index}>
                              <a
                                onClick={handleFreezeQuotationClick}
                                href={
                                  new String(file).includes("http" || "https")
                                    ? file
                                    : file?.url
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {new String(file).includes("http" || "https")
                                  ? splitIt(file)
                                  : file?.file.name}
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
            Supplier Details
            <span onClick={() => setActive(active === 4 ? null : 4)}>
              <IoIosArrowDropdownCircle />
            </span>
          </h2>
          <div className={`p-4 ${active === 4 ? "block" : "hidden"}`}>
            <VendorForm
              setInputData
              tripId={item.tripId}
              supplier={supp}
              dest={inputData}
              refetch={refetchSupp}
            />
            <CustomTable
              dataa={vendorTable.map((item, index) => ({
                name: item.name,
                destination: item.destination,
                currecy: item.currency,
                bookingStatus: (
                  <select
                    onChange={(e) =>
                      setInputData({
                        name: item.name,
                        destination: item.destination,
                        currecy: item.currency,
                        bookingStatus: e.target.value,
                      })
                    }
                  >
                    <option value={"Approved"}>Approved</option>
                    <option value={"Pending"}>Pending</option>
                    <option value={"Rejected"}>Rejected</option>
                  </select>
                ),
                paymentStatus: (
                  <>
                    <select
                      onChange={(e) =>
                        setInputData({
                          name: item.name,
                          destination: item.destination,
                          currecy: item.currency,
                          paymentStatus: e.target.value,
                        })
                      }
                    >
                      <option value={"Paid"}>Paid</option>
                      <option value={"Unpaid"}>Unpaid</option>
                      <option value={"Cancelled"}>Cancelled</option>
                    </select>
                  </>
                ),
                action: (
                  <div className="flex justify-around">
                    <button
                      className="text-blue-900"
                      onClick={() => {
                        editVendor(inputData);
                      }}
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => {
                        deleteVendor(item.vendor_pay_id);
                        refetchSupp();
                      }}
                      className="text-red-600"
                    >
                      <MdDelete />
                    </button>
                  </div>
                ),
              }))}
              columnss={[
                { Header: "Name", accessor: "name" },
                { Header: "Destination", accessor: "destination" },
                { Header: "Currency", accessor: "currecy" },
                { Header: "Booking Status", accessor: "bookingStatus" },
                { Header: "Payment Status", accessor: "paymentStatus" },
                { Header: "Action", accessor: "action" },
              ]}
              size={"text-xs"}
              hideFilter={true}
            />
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
          <div className="w-1/2 my-auto px-2 h-full border-r-[1px] space-y-2 border-slate-400">
              <FileUpload
                label={"Hotel Voucher"}
                id={"hotel-voucher"}
                onChange={addDoc}
                onRemove={removeDoc}
                files={doc}
                catagory={"hotel-voucher"}
              />
              <FileUpload
                label={"Activities Voucher"}
                id={"activities-voucher"}
                onChange={addDoc}
                onRemove={removeDoc}
                files={doc}
                catagory={"activities-voucher"}
              />
              <FileUpload
                label={"Miscellaneous Voucher"}
                id={"misc-voucher"}
                onChange={addDoc}
                onRemove={removeDoc}
                files={doc}
                catagory={"misc-voucher"}
              />
          </div>
          <div className="w-1/2">
            <ul>
              {doc
                ? doc.map(
                    (file, index) =>
                      new String(file).includes("voucher") && (
                        <li className="space-x-2" key={index}>
                          <a
                            href={
                              new String(file).includes("http" || "https")
                                ? file
                                : file?.url
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {new String(file).includes("http" || "https")
                              ? splitIt(file)
                              : file.file.name}
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
