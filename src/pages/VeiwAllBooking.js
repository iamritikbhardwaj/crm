import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import BackToHome from "../components/BackToHome";
import { CustomTable } from "../components/customTable/CustomTable";
import { useLocation } from "react-router-dom";
import { getTravelMonthRange } from "./Booking";
import FileUpload from "../components/Input/FileUpload";
import ReconForm from "../components/Form/ReconForm";
import { MdAddCircle, MdDelete, MdEdit, MdSave } from "react-icons/md";
import PaymentForm from "../components/Form/PaymentForm";
import VendorForm from "../components/Form/VendorForm";
import WhatsappNo from "../components/Input/whatsappNo";
import {
  fetchPayment,
  fetchRecon,
  fetchSalesDocs,
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
import {
  updateRecon,
  updateTrip,
  updateVoucher,
} from "../components/apiCalls/updateData";
import { useSelector } from "react-redux";
import IssuesAccordian from "../components/Accordians/IssuesAccordian";
import PaymentAccordian from "../components/Accordians/PaymentAccordian";
import { FaCertificate, FaDochub, FaExchangeAlt, FaExclamationCircle, FaFile, FaFileExcel, FaMoneyBill, FaWpforms } from "react-icons/fa";

export default function VeiwAllBooking() {
  const location = useLocation();
  const trip = location.state;
  const tripId = trip.tripId;
  const [item, setItem] = useState();
  const [active, setActive] = useState(0); // Section toggle
  const [doc, setDoc] = useState(item?.documents);
  const [vendorTable, setVendorTable] = useState([]);
  const [transferPrice, setTransferPrice] = useState(item?.transferPrice);
  const [orderValue, setOrderValue] = useState();
  const [whatsForm, setWhatsForm] = useState(true);

  const setPrice = (price) => {
    setTransferPrice(price);
  };
  const inpRef = useRef(null);
  const editForm = useRef(null);
  const [payment, setPayment] = useState([]);
  // Predefined booking data
  const [opsSpoc, setOpsSpoc] = useState([]);
  const [inputData, setInputData] = useState(null);
  const [recon, setRecon] = useState([]);

  const [selectedExcel, setSelectedExcel] = useState([]);
  const auth = useSelector((state) => state.auth);
  const user = auth.user;

  const refetch = async () => {
    const itemData = await fetchTrips(tripId);
    setItem(itemData);
    setDoc(itemData?.documents);
  };

  const refetchVend = async () => {
    const vendorData = await fetchVendors(tripId);
    setVendorTable(vendorData);
  };

  const refetchCom = async () => {
    const reconData = await fetchRecon(tripId);
    if (reconData) {
      setRecon(reconData);
    } else {
      setRecon([]);
    }

    const payData = await fetchPayment(tripId);
    if (payData) {
      setPayment(payData);
    } else {
      setPayment([]);
    }
  };

  const editVendor = (id, vendor) => {
    Swal.fire({
      title: "Do you want to Update changes?",
      showDenyButton: true,
      confirmButtonText: "Update",
      denyButtonText: `Don't Update`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title: "Submitting...",
          text: "Please wait while we make updates.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const response = await axios.post(
          `${API_URL}users/createVendor/?id=${id}`,
          vendor
        );
        if (response) {
          await refetchVend();
          Swal.close();
        }
      } else {
        Swal.fire("Changes are not Updated", "", "info");
      }
    });
  };

  const updateOrderVal = () => {
    Swal.fire({
      title: "Do you want to Update changes?",
      showDenyButton: true,
      confirmButtonText: "Update",
      denyButtonText: `Don't Update`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title: "Submitting...",
          text: "Please wait while we make updates.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const res = await updateTrip({ orderValue: orderValue }, tripId);
        Swal.close();
      } else {
        Swal.fire("Order Value is not Updated", "", "info");
      }
    });
  };

  const splitIt = (str) => {
    const data = new String(str).split("/");
    const result = data[data.length - 1];
    return result;
  };

  const handleFreezeQuotationClick = (e) => {
    e.preventDefault();
    setSelectedExcel(e.target.href);
  };

  useEffect(() => {
    try {
      if (Date.now() > item?.arrivalDate && Date.now() < item?.departureDate) {
        setInputData({ ...inputData, status: "ON-TOUR" });
        (async () => {
          await updateTrip({ status: "ON-TOUR" }, tripId);
        })();
      } else if (Date.now() > item?.departureDate) {
        setInputData({ ...inputData, status: "TRAVELLED" });
        (async () => {
          await updateTrip({ status: "TRAVELLED" }, tripId);
        })();
      }
      (async () => {
        const data = await fetchUsers();
        if (data) {
          setOpsSpoc(data.filter((user) => user.profile === "Operations"));
        }
        refetchCom();
        refetch();
        refetchVend();
        const sdata = await fetchSalesDocs(tripId);
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

  const updateStatus = async (e) => {
    const value = e.target.value;
    Swal.fire({
      title: "Do you want to Update changes?",
      showDenyButton: true,
      confirmButtonText: "Update",
      denyButtonText: `Don't Update`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title: "Submitting...",
          text: "Please wait while we make updates.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const formData = {
          status: value,
        };
        const response = updateTrip(formData, tripId);
        if (response) {
          await refetch();
          Swal.close();
          Swal.fire({
            title: "Status updated successfully",
            timer: 2000,
          });
        } else {
          Swal.close();
          Swal.fire({
            text: "There was some problem while updating status",
            timer: 2000,
          });
        }
      }
    });
  };

  const updateOps = async (e) => {
    const value = e.target.value;
    Swal.fire({
      title: "Do you want to Update changes?",
      showDenyButton: true,
      confirmButtonText: "Update",
      denyButtonText: `Don't Update`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title: "Submitting...",
          text: "Please wait while we make updates.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const formData = {
          opsSpoc: value,
        };
        const response = await updateTrip(formData, tripId);
        if (response) {
          await refetch();
          Swal.close();
          Swal.fire({
            title: "Ops updated successfully",
            timer: 2000,
          });
        } else {
          Swal.close();
          Swal.fire({
            text: response.data.MESSAGE,
            timer: 2000,
          });
        }
      }
    });
  };

  const renderPax = (pax) => {
    try {
      // Check if pax is a string, if so parse it
      const paxData = typeof pax === "string" ? JSON.parse(pax) : pax;

      // Now safely access the properties
      return `${paxData?.A || 0} A / ${paxData?.C || 0} C / ${paxData?.Ca || 0} Ca`;
    } catch (err) {
      // Handle parsing errors
      console.error("Error parsing pax data:", err);
      return "0 A / 0 C"; // Fallback values
    }
  };

  const voucherUpdate = async () => {
    await updateVoucher(tripId);
    updateDocs();
  };
  const updateDocs = async () => {
    Swal.fire({
      title: "Submitting...",
      text: "Please wait while we update your documents.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const formData = new FormData();
    doc.forEach((doc) => {
      if (doc?.file) {
        formData.append(`${doc.catagory}`, doc.file);
      } else {
        formData.append("docs", doc);
      }
    });

    const response = await axios.post(
      `${API_URL}users/updateDocs/?id=${tripId}`,
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
      Swal.close();
      Swal.fire(response.data.MESSAGE);
    } else {
      Swal.close();
      Swal.fire(response.data.MESSAGE);
    }
  };

  return (
    <div className="p-4 h-screen w-full overflow-hidden bg-slate-800">
      <BackToHome path={"/schedule"} />
      <div className="max-w-7xl max-h-[90vh] overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-slate-700 89 mx-auto p-4 md:p-6 shadow-lg rounded-lg mt-8">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          View Confirmed Booking
        </h1>

        {/* Booking Details */}
        <div className="mb-6">
          <div className='bg-gradient-to-r from-yellow-100 to-yellow-300 text-black p-3 rounded-lg flex justify-between items-center shadow-md'>
            <h2 className="text-lg font-bold text-black flex items-center gap-2">
              <FaWpforms />
              Booking Details
            </h2>
            <button
              className="text-black hover:text-yellow-300 transition-colors duration-300"
              onClick={() => setActive(active === 0 ? null : 0)}>
              <IoIosArrowDropdownCircle size={24} />
            </button>
          </div>
          <div
            className={`${active === 0 ? "block" : "hidden"
              }  bg-gradient-to-b from-slate-200 to-slate-400 rounded-b-lg shadow-inner grid grid-cols-2 gap-4 p-4`}
          >
            {[
              ["Destination", item?.destination],
              ["Sales Spoc", item?.salesSpoc],
              ["Agent", item?.agent],
              ["Customer Name", item?.customerName],
              [
                "Number of Pax",
                renderPax(item?.pax),
              ],
              ["Travel Month", getTravelMonthRange(item?.arrivalDate)],
              [
                "Arrival Date",
                item?.arrivalDate.slice(0, 10).split("-")[2] +
                " " +
                getTravelMonthRange(item?.arrivalDate),
              ],
              [
                "Departure Date",
                item?.departureDate.slice(0, 10).split("-")[2] +
                " " +
                getTravelMonthRange(item?.departureDate),
              ],
              [
                "Booking Date",
                item?.bookingDate.slice(0, 10).split("-")[2] +
                " " +
                getTravelMonthRange(item?.bookingDate),
              ],
              [
                "WhatsApp Number",
                <button key={item?.tripId}>
                  {item?.countryCode} {item?.whatsappNumber}{" "}
                  <MdEdit
                    className={` ${user.profile === "Sales" || user.profile === "Finance"
                      ? "hidden"
                      : "flex"
                      } ml-2`}
                    onClick={() => setWhatsForm(!whatsForm)}
                  />
                </button>,
              ],
              [
                "Ops Spoc",
                <select
                  key={item?.tripId}
                  value={item?.opsSpoc}
                  disabled={user.profile !== "Admin"}
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
              [
                "Trip Status",
                <select
                  key={item?.tripId}
                  value={item?.status}
                  onChange={updateStatus}
                  disabled={
                    (user.profile !== "Admin" && user.name !== item?.opsSpoc) ||
                    Date.now() > new Date(item?.arrivalDate).getTime()
                  }
                >
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="CANCELLED">CANCELLED</option>
                  <option value="ON-TOUR">ON-TOUR</option>
                  <option value="TRAVELLED">TRAVELLED</option>
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

        <div className={`mb-6 ${whatsForm ? "hidden" : "block"}`}>
          <WhatsappNo id={tripId} refetch={refetch} setHidden={setWhatsForm} />
        </div>

        {/* Document Upload */}
        <div className="mb-6">
          <div className='bg-gradient-to-r from-yellow-100 to-yellow-300 text-black p-3 rounded-lg flex justify-between items-center shadow-md'>
            <h2 className="text-lg font-bold text-black flex items-center gap-2">
              <FaFile />
              Documents Upload
            </h2>
            <button
              className="text-black hover:text-yellow-300 transition-colors duration-300"
              onClick={() => setActive(active === 1 ? null : 1)}>
              <IoIosArrowDropdownCircle size={24} />
            </button>
          </div>
          <div className={`p-4 ${active === 1 ? "block" : "hidden"} bg-gradient-to-b from-slate-200 to-slate-400 rounded-b-lg shadow-inner`}>
            <div className="flex justify-end">
              <button
                onClick={updateDocs}
                disabled={
                  user.profile !== "Admin" &&
                  user.name !== item?.opsSpoc &&
                  user.profile !== "Finance"
                }
                className="bg-blue-500 rounded-lg px-2 m-2 text-white py-1"
              >
                Save documents
              </button>
            </div>
            <div className="flex">
              {/* Document Upload List */}
              <div
                className={`w-1/2 ${user.profile !== "Admin" &&
                  user.name !== item?.opsSpoc &&
                  "hidden"
                  } border-r border-gray-300 px-2 space-y-2`}
              >
                <FileUpload
                  label={"Air Ticket"}
                  id={"airTicket"}
                  onChange={addDoc}
                  onRemove={removeDoc}
                  files={doc}
                  catagory={"airTicketdoc"}
                />
                <FileUpload
                  label={"Passport"}
                  id={"passport"}
                  onChange={addDoc}
                  onRemove={removeDoc}
                  files={doc}
                  catagory={"passportdoc"}
                />
                <FileUpload
                  label={"PAN"}
                  id={"pan"}
                  onChange={addDoc}
                  onRemove={removeDoc}
                  files={doc}
                  catagory={"pandoc"}
                />
                <FileUpload
                  label={"Email Confirmation"}
                  id={"emailConf"}
                  onChange={addDoc}
                  onRemove={removeDoc}
                  files={doc}
                  catagory={"emailConfdoc"}
                />
              </div>

              {/* Document Preview */}
              <div className="w-1/2 pl-4">
                <ul>
                  {doc
                    ? doc.map(
                      (file, index) =>
                        String(file).includes(
                          "xls",
                          "xlsx",
                          "doc",
                          "docx"
                        ) || (
                          <li className="space-x-2" key={index}>
                            <a
                              href={file.url || file}
                            // target="_blank"
                            // rel="noopener noreferrer"
                            >
                              {file?.file?.name || splitIt(file)}
                            </a>
                            <button
                              className={`text-red-700 rounded-lg cursor-pointer hover:text-red-900`}
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
          <div className='bg-gradient-to-r from-yellow-100 to-yellow-300 text-black p-3 rounded-lg flex justify-between items-center shadow-md'>
            <h2 className="text-lg font-bold text-black flex items-center gap-2">
              <FaMoneyBill />
              Commercials
            </h2>
            <button
              className="text-black hover:text-yellow-300 transition-colors duration-300"
              onClick={() => setActive(active === 2 ? null : 2)}>
              <IoIosArrowDropdownCircle size={24} />
            </button>
          </div>
          <div className={`p-4 ${active === 2 ? "block" : "hidden"} bg-gradient-to-b from-slate-200 to-slate-400 rounded-b-lg shadow-inner`}>
            <div className="flex justify-between">
              <p className="font-semibold">
                Order Value (USD):{" "}
                <input
                  type="number"
                  step="0.01"
                  placeholder={item?.orderValue}
                  className="w-full p-2 border rounded mt-2"
                  onChange={(e) => setOrderValue(e.target.value)}
                />
              </p>
              <button
                className="px-1 py-0 m-1 text-white bg-blue-500 rounded-lg"
                disabled={
                  user.profile !== "Admin" &&
                  user.name !== item?.opsSpoc &&
                  user.profile !== "Finance"
                }
                onClick={updateOrderVal}
              >
                Save Changes
              </button>
              <p
                className={`font-semibold ${user.profile !== "Admin" &&
                  user.name !== item?.opsSpoc &&
                  user.profile !== "Finance"
                  ? "hidden"
                  : ""
                  }`}
              >
                Transfer Price(USD): {transferPrice}
              </p>
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
                    tripId={tripId}
                    handlehide={() => {
                      inpRef.current.style.display = "none";
                    }}
                  />
                </div>
              </div>
              <button
                className="text-blue-600 ml-[90%] text-3xl"
                disabled={
                  user.profile !== "Admin" &&
                  user.name !== item?.opsSpoc &&
                  user.profile !== "Finance"
                }
                onClick={() => {
                  setInputData(null);
                  inpRef.current.style.display = "block";
                }}
              >
                <MdAddCircle />
              </button>
              <CustomTable
                dataa={payment.map((data, index) => ({
                  installment: "installment" + " " + parseInt(index + 1),
                  amount: parseFloat(data?.amount).toFixed(2) + " " + "USD",
                  date:
                    data?.date.slice(8, 10) +
                    " " +
                    getTravelMonthRange(data?.date),
                  mode: data?.paymentMode,
                  convertionRate: parseFloat(data?.convRate).toFixed(2),
                  amtinr:
                    (
                      (parseFloat(data?.conFee) + parseFloat(data?.amount)) *
                      data?.convRate
                    ).toFixed(2) + " INR",
                  convfee: parseFloat(data?.conFee).toFixed(2) + " USD",
                  remarks: data?.remarks,
                  action: (
                    <div className="flex justify-around">
                      <button
                        className="text-blue-900"
                        disabled={
                          user.profile !== "Admin" &&
                          user.name !== item?.opsSpoc &&
                          user.profile !== "Finance"
                        }
                        onClick={() => {
                          setInputData(data);
                          inpRef.current.style.display = "block";
                        }}
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={async () => {
                          await deletePayment(data?.payment_id, tripId);
                          refetchCom();
                        }}
                        disabled={
                          user.profile !== "Admin" &&
                          user.name !== item?.opsSpoc &&
                          user.profile !== "Finance"
                        }
                        className="text-red-700"
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
                  { Header: "XE", accessor: "convertionRate" },
                  { Header: "Amount (USD)", accessor: "amount" },
                  { Header: "CONV: Fee", accessor: "convfee" },
                  { Header: "Amount (INR)", accessor: "amtinr" },
                  { Header: "Remarks", accessor: "remarks" },
                  { Header: "Action", accessor: "action" },
                ]}
                hideFilter={true}
                size={"text-md"}
              />
            </div>

            {/* Booking Reconciliation Table */}
            <div
              className={`mb-4 ${user.profile !== "Admin" &&
                user.name !== item?.opsSpoc &&
                user.profile !== "Finance"
                ? "hidden"
                : ""
                }`}
            >
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
                    tripId={tripId}
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
                disabled={
                  user.profile !== "Admin" &&
                  user.name !== item?.opsSpoc &&
                  user.profile !== "Finance"
                }
              >
                <MdAddCircle />
              </button>

              <CustomTable
                dataa={recon.map((data, index) => ({
                  online: data?.online + " USD",
                  offline: data?.offline + " USD",
                  land: data?.land + " USD",
                  action: (
                    <div className="flex justify-around">
                      <button
                        className="text-blue-900"
                        disabled={
                          user.profile !== "Admin" &&
                          user.name !== item?.opsSpoc &&
                          user.profile !== "Finance"
                        }
                        onClick={async () => {
                          if (
                            parseFloat(data?.online) +
                            parseFloat(data?.offline) +
                            parseFloat(data?.land) !==
                            parseFloat(item.orderValue)
                          ) {
                            Swal.fire(
                              "Online + Offline + Land must be equal to Order Value"
                            );
                          } else {
                            Swal.fire({
                              title: "Updating validation...",
                              text: "Please wait while we make updates.",
                              allowOutsideClick: false,
                              didOpen: () => {
                                Swal.showLoading();
                              },
                            });
                            const res = await updateTrip(
                              { validation: user.profile },
                              tripId
                            );
                            await updateRecon(tripId);
                            Swal.close();
                            // edit options are available in case we want to add edit functionality
                          }
                        }}
                      >
                        <MdSave />
                      </button>
                      <button
                        onClick={() => {
                          deleteRecon(data?.recon_id, tripId);
                          refetchCom();
                        }}
                        disabled={
                          user.profile !== "Admin" &&
                          user.name !== item?.opsSpoc &&
                          user.profile !== "Finance"
                        }
                        className="text-red-700"
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
                size={"text-md"}
                hideFilter={true}
              />
            </div>
          </div>
        </div>

        {/* Freeze Quotation */}
        <div
          className={`mb-6 ${user.profile !== "Admin" &&
            user.name !== item?.opsSpoc &&
            user.profile !== "Finance"
            ? "hidden"
            : ""
            }`}
        >
          <div className='bg-gradient-to-r from-yellow-100 to-yellow-300 text-black p-3 rounded-lg flex justify-between items-center shadow-md'>
            <h2 className="text-lg font-bold text-black flex items-center gap-2">
              <FaFileExcel />
              Freeze Quotation
            </h2>
            <button
              className="text-black hover:text-yellow-300 transition-colors duration-300"
              onClick={() => setActive(active === 3 ? null : 3)}>
              <IoIosArrowDropdownCircle size={24} />
            </button>
          </div>
          <div className={`p-4 ${active === 3 ? "flex-col" : "hidden"} h-fit bg-gradient-to-b from-slate-200 to-slate-400 rounded-b-lg shadow-inner`}>
            <div className="flex justify-between">
              <button
                onClick={updateDocs}
                disabled={
                  user.profile !== "Admin" &&
                  user.name !== item?.opsSpoc &&
                  user.profile !== "Finance"
                }
                className="bg-blue-500 rounded-lg px-2 m-2 text-white py-1"
              >
                Save documents
              </button>
              <button
                onClick={async () => {
                  Swal.fire({
                    title: "Updating Transfer Price...",
                    text: "Please wait while we update your transfer price.",
                    allowOutsideClick: false,
                    didOpen: () => {
                      Swal.showLoading();
                    },
                  });
                  const match = transferPrice.match(/[\d\.]+/g); // Add comma to the pattern and use global flag
                  if (match) {
                    // Join all matched numeric parts to handle values like "1,433.02"
                    const fullNumericValue = match.join("");
                    await updateTrip({ transferPrice: fullNumericValue }, tripId);
                  }

                  Swal.close();
                }}
                disabled={
                  user.profile !== "Admin" &&
                  user.name !== item?.opsSpoc &&
                  user.profile !== "Finance"
                }
                className={`${item?.transferPrice === transferPrice
                  ? "bg-blue-500"
                  : "bg-red-500"
                  } rounded-lg px-2 m-2 text-white py-1`}
              >
                Save Transfer Price
              </button>
            </div>
            <div>
              <ExcelToTable url={selectedExcel} setPrice={setPrice} />
            </div>
            <div className="flex gap-4">
              <div
                className={`w-1/2 ${user.profile !== "Admin" && user.name !== item?.opsSpoc
                  ? "hidden"
                  : ""
                  }`}
              >
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
                        String(file).includes("xls") && (
                          <li className="space-x-2" key={index}>
                            <a
                              onClick={handleFreezeQuotationClick}
                              href={file}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {new String(file).includes("http" || "https")
                                ? splitIt(file)
                                : file?.file?.name}
                            </a>
                            <button
                              className="text-red-700 rounded-lg cursor-pointer hover:text-red-900"
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
        <div
          className={`mb-6 ${user.profile !== "Admin" &&
            user.name !== item?.opsSpoc &&
            user.profile !== "Finance"
            ? "hidden"
            : ""
            }`}
        >
          <div className='bg-gradient-to-r from-yellow-100 to-yellow-300 text-black p-3 rounded-lg flex justify-between items-center shadow-md'>
            <h2 className="text-lg font-bold text-black flex items-center gap-2">
              <FaExchangeAlt />
              Supplier Payments
            </h2>
            <button
              className="text-black hover:text-yellow-300 transition-colors duration-300"
              onClick={() => setActive(active === 4 ? null : 4)}>
              <IoIosArrowDropdownCircle size={24} />
            </button>
          </div>
          <div className={`p-4 ${active === 4 ? "block" : "hidden"} bg-gradient-to-b from-slate-200 to-slate-400 rounded-b-lg shadow-inner`}>
            <VendorForm
              setInputData={setInputData}
              tripId={tripId}
              refetch={refetchVend}
            />
            <CustomTable
              dataa={vendorTable.map((data, index) => ({
                name: data?.name,
                destination: data?.destination,
                currecy: data?.currency,
                bookingStatus: (
                  <select
                    value={data?.booking_status}
                    onChange={(e) => {
                      editVendor(data?.vendor_pay_id, {
                        booking_status: e.target.value,
                        tripId,
                      });
                    }}
                  >
                    <option value={"PENDING"}>PENDING</option>
                    <option value={"IN-PROGRESS"}>IN-PROGRESS</option>
                    <option value={"COMPLETED"}>COMPLETED</option>
                  </select>
                ),
                paymentStatus: (
                  <>
                    <select
                      onChange={(e) => {
                        editVendor(data?.vendor_pay_id, {
                          payment_status: e.target.value,
                          tripId,
                        });
                      }}
                      value={data?.payment_status}
                    >
                      <option value={"UNPAID"}>UNPAID</option>
                      <option value={"PARTPAID"}>PARTPAID</option>
                      <option value={"FULL-PAID"}>FULL-PAID</option>
                    </select>
                  </>
                ),
                action: (
                  <div className="flex justify-around">
                    {/* <button
                      className="text-blue-900"
                      onClick={() => {
                      }}
                    >
                      <MdEdit />
                    </button> */}
                    <button
                      onClick={async () => {
                        await deleteVendor(data?.vendor_pay_id);
                        refetchVend();
                      }}
                      disabled={
                        user.profile !== "Admin" &&
                        user.name !== item?.opsSpoc &&
                        user.profile !== "Finance"
                      }
                      className="text-red-700"
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
              size={"text-md"}
              hideFilter={true}
            />
          </div>
        </div>
        {/* Voucher details */}
        <div className="mb-6">
          <div className='bg-gradient-to-r from-yellow-100 to-yellow-300 text-black p-3 rounded-lg flex justify-between items-center shadow-md'>
            <h2 className="text-lg font-bold text-black flex items-center gap-2">
              <FaCertificate />
              Voucher Details
            </h2>
            <button
              className="text-black hover:text-yellow-300 transition-colors duration-300"
              onClick={() => setActive(active === 5 ? null : 5)}>
              <IoIosArrowDropdownCircle size={24} />
            </button>
          </div>
          <div className={`p-4 ${active === 5 ? "flex" : "hidden"} min-h-36 bg-gradient-to-b from-slate-200 to-slate-400 rounded-b-lg shadow-inner`}>
            <div
              className={`w-1/2 ${user.profile !== "Admin" && user.name !== item?.opsSpoc
                } my-auto px-2 h-full border-r-[1px] space-y-2 border-slate-400`}
            >
              <FileUpload
                label={"Hotel Voucher"}
                id={"hotelvoucher"}
                onChange={addDoc}
                onRemove={removeDoc}
                toAccept="application/pdf, image/*,.docs,.docx,.doc,application/vnd.ms-excel"
                files={doc}
                catagory={"hotelvoucher"}
              />
              <FileUpload
                label={"Activities Voucher"}
                id={"activitiesvoucher"}
                onChange={addDoc}
                onRemove={removeDoc}
                toAccept="application/pdf, image/*,.docs,.docx,.doc,application/vnd.ms-excel"
                files={doc}
                catagory={"activitiesvoucher"}
              />
              <FileUpload
                label={"Transfer Voucher"}
                id={"miscvoucher"}
                onChange={addDoc}
                onRemove={removeDoc}
                toAccept="application/pdf, image/*,.docs,.docx,.doc,application/vnd.ms-excel"
                files={doc}
                catagory={"miscvoucher"}
              />
            </div>
            <div className="w-1/2">
              <div className="flex justify-end">
                <button
                  onClick={voucherUpdate}
                  disabled={
                    user.profile !== "Admin" &&
                    user.name !== item?.opsSpoc &&
                    user.profile !== "Finance"
                  }
                  className="bg-blue-500 rounded-lg px-2 m-2 text-white py-1"
                >
                  Save documents
                </button>
              </div>
              <ul>
                {doc
                  ? doc.map(
                    (file, index) =>
                      String(file).includes("voucher", "doc", "docx") && (
                        <li className="space-x-2" key={index}>
                          <a
                            href={file}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {new String(file).includes("http" || "https")
                              ? splitIt(file)
                              : file?.file?.name}
                          </a>
                          <button
                            className="text-red-700 rounded-lg cursor-pointer hover:text-red-900"
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
        {/* Issues details */}
        <div className={user.profile === "Admin" ? "" : "hidden"}>
          <IssuesAccordian active={active} setActive={setActive} tripId={tripId} />
        </div>

        {/* Payment details */}
        <div className={user.profile === "Finance" || user.profile === "Admin" ? "" : "hidden"}>
          <PaymentAccordian active={active} disabled={user.profile === "Admin" || user.profile === "Finance"} setActive={setActive} tripId={tripId} agent={item?.agent} />
        </div>

      </div>
    </div>
  );
}
