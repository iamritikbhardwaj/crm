import React, { useEffect, useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import BackToHome from "../components/BackToHome";
import { useLocation, useNavigate } from "react-router-dom";
import { getTravelMonthRange } from "./Booking";
import axios from "axios";
import { API_URL } from "../AppConstant";
import Swal from "sweetalert2";
import FileUpload from "../components/Input/FileUpload";
import { fetchUsers } from "../components/apiCalls/fetchData";
import { cancelBooking, deleteBooking } from "../components/apiCalls/deleteData";
import { useSelector } from "react-redux";

export default function VeiwBooking() {
  // data from table on previous page
  const location = useLocation();
  const data = location.state;
  const auth = useSelector((state) => state.auth);
  const user = auth.user;

  useEffect(() => {
    console.log(user);
  }, [user]);

  // to navigate b/w sections
  const [active, setActive] = useState(0); // Section toggle
  const [doc, setDoc] = useState(data.documents);
  const [opsSpoc, setOpsSpoc] = useState("");
  const [inputData, setInputData] = useState({
    ...data,
    documents: doc,
    opsSpoc: opsSpoc.length === 1 ? opsSpoc[0].name : opsSpoc,
    status: "confirmed",
  });

  useEffect(() => {
    (async () => {
      const data = await fetchUsers();
      if (data.profile !== "Operations") {
        setOpsSpoc(data.filter((user) => user.profile === "Operations"));
      }
    })();
    if (user.profile === "Operations") {
      setInputData({...inputData, opsSpoc: user.name});
    }
  }, []);

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

  const navigate = useNavigate();

  // Accept Booking is to set booking status to confirmed also add salesSpoc
  const acceptBooking = async () => {
    
    Swal.fire({
      title: "Submitting...",
      text: "Please wait while we move your booking.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const res = await submit();
    if (res === true) {
      Swal.close();
      navigate("/booking");
      Swal.fire({
        icon: "success",
        title: "Trip has been created!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // Reject Booking is to delete the booking
  const rejectBooking = async () => {
    try {
      const response = await cancelBooking(data.booking_id, true);
      if (response.status === 200) {
        navigate("/booking");
        Swal.close();
      } else {
        Swal.fire("Error deleting booking. Please try again later.");
        navigate("/booking");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const rejectvalidation = () => {
    {Swal.fire({
      title: `Do you want to Reject Booking?`,
      showDenyButton: true,
      confirmButtonText: `reject`,
      denyButtonText: `Don't reject`,
    }).then((result) => {
      if (result.isConfirmed) {
        rejectBooking();
      }
    })}
  }

  const acceptValidation = () => {
    {Swal.fire({
      title: `Do you want to Accept Booking?`,
      showDenyButton: true,
      confirmButtonText: `Accept`,
      denyButtonText: `Don't accept`,
    }).then((result) => {
      if (result.isConfirmed) {
        acceptBooking();
      }
    })}
  }

  const splitIt = (str) => {
    const data = new String(str).split("/");
    const result = data[data.length - 1];
    return result;
  };

  const submit = async () => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(inputData));
    if (inputData.opsSpoc === "") {
      Swal.close();
      Swal.fire("Please select an ops spoc");
      return false;
    } else {
      doc.forEach((doc) => {
        formData.append(`${doc.catagory}`, doc.file);
      });
      console.log("still working");
      const response = await axios.post(`${API_URL}users/createTrip`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
       
          await deleteBooking(data.booking_id);
          return true;
      }
  };
}

  return (
    <div className="p-4">
      <BackToHome path="/booking" />
      <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white shadow-lg rounded-lg mt-8">
        <h1 className="text-2xl font-bold text-center mb-6">View Booking</h1>

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
              ["Destination", data.destination],
              ["Sales Spoc", data.salesSpoc],
              ["Agent", data.agent],
              ["Customer Name", data.customerName],
              [
                "Number of Pax",
                data?.pax.A +
                  " A " +
                  " / " +
                  data?.pax.C +
                  " C " +
                  "- " +
                  (data?.pax?.Ca === undefined ? "" : data?.pax.Ca),
              ],
              [
                "Travel Month",
                getTravelMonthRange(data.arrivalDate, data.departureDate),
              ],
              [
                "Arrival Date",
                data?.arrivalDate.slice(0, 10).split("-")[2] +
                  " " +
                  getTravelMonthRange(data?.arrivalDate),
              ],
              [
                "Departure Date",
                data?.departureDate.slice(0, 10).split("-")[2] +
                  " " +
                  getTravelMonthRange(data?.departureDate),
              ],
              [
                "Booking Date",
                data?.bookingDate.slice(0, 10).split("-")[2] +
                  " " +
                  getTravelMonthRange(data?.bookingDate),
              ],
              ["WhatsApp Number", data.countryCode + " " + data.whatsappNumber],
              [
                "Ops Spoc",
                <select
                value={inputData.opsSpoc}
                disabled={user.profile === "Operations"}
                  onChange={(e) => {
                    setInputData({ ...inputData, opsSpoc: e.target.value });
                  }}
                >
                  <option defaultChecked={""}>Select opsSpoc</option>
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
              <div className="w-1/2 pl-4 overflow-auto">
                <ul>
                  {doc
                    ? doc.map(
                        (file, index) =>
                          !new String(file).includes("freezeQuotation") && (
                            <li className="space-x-2" key={index}>
                              <a
                                href={
                                  file.hasOwnProperty("file") ? file.url : file
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {file.hasOwnProperty("file")
                                  ? file.file.name
                                  : splitIt(file)}
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
            <label className="font-semibold">Order Value (USD):</label>
            <input
              type="number"
              step={0.01}
              value={inputData.orderValue}
              onChange={(e) => {
                setInputData({ ...inputData, orderValue: e.target.value });
              }}
              className="w-full p-2 border rounded mt-2"
            />
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
          <div className={`p-4 ${active === 3 ? "flex" : "hidden"}`}>
            <div className="w-1/2 border-r px-4 border-gray-300">
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
            <div className="w-1/2 pl-4">
              <ul>
                {doc
                  ? doc.map(
                      (file, index) =>
                        (!new String(file).includes("doc") ||
                          file?.catagory === "freezeQuotation") && (
                          <li className="space-x-2" key={index}>
                            <a
                              href={
                                file.hasOwnProperty("url") ? file.url : file
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {file.hasOwnProperty("file")
                                ? file.file.name
                                : splitIt(file)}
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

        {/* Action Buttons */}
        <div className="p-4 flex justify-between">
          <button
            onClick={acceptValidation}
            disabled={user?.profile === "Sales" ? true : false }
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Accept Booking
          </button>
          <button
            onClick={rejectvalidation}
            disabled={user?.profile === "Sales" ? true : false }
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          >
            Reject Booking
          </button>
        </div>
      </div>
    </div>
  );
}
