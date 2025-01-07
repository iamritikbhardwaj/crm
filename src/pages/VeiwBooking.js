import React, { useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import BackToHome from "../components/BackToHome";
import { useLocation, useNavigate } from "react-router-dom";
import { getTravelMonthRange } from "./Booking";
import axios from "axios";
import { API_URL } from "../AppConstant";

function VeiwBooking() {
  const [active, setActive] = useState(0); // Section toggle
  const [docPreviews, setDocPreviews] = useState({
    "Air Ticket": null,
    Passport: null,
    PAN: null,
    "Sales Sheet": null,
    "Email confirmation": null,
  });

  const location = useLocation();
  const data = location.state;
  console.log(data, 'data');
  const navigate = useNavigate();


  // Handle file upload
  const handleFileUpload = (e, docName) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setDocPreviews((prev) => ({ ...prev, [docName]: fileURL }));
      // setdata((prev) => ({
      //   ...prev,
      //   documents: { ...prev.documents, [docName]: file },
      // }));
    }
  };

  // Accept Booking
  const acceptBooking = () => {
    localStorage.setItem("confirmedBooking", data);
    alert("Booking accepted and saved!");
  };

  // Reject Booking
  const rejectBooking = async() => {
    // write your logic here delete ofc
   try {
    console.log(data.booking_id, 'booking id');
     const response = await axios.delete(`${API_URL}users/deleteBooking/${data.booking_id}`)
    if (response.status === "ok") {
      alert("Booking has been deleted successfully");
      navigate('/veiwBooking')
    }
   } catch (error) {
    console.log(error);
   }
    setDocPreviews({});
  };

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
          <div className={`${active === 0 ? "block" : "hidden"} grid grid-cols-2 gap-4 p-4`}>
            {[
              ["Destination", data.destination],
              ["Sales Spoc", data.salesSpoc],
              ["Agent", data.agent],
              ["Customer Name", data.customerName],
              ["Number of Pax", data.pax.A + data.pax.C],
              ["Travel Month", getTravelMonthRange(data.arrivalDate, data.departureDate)],
              ["Arrival Date", data.arrivalDate],
              ["Departure Date", data.departureDate],
              ["Booking Date", data.bookingDate],
              ["WhatsApp Number",data.countryCode + " " + data.whatsappNumber],
              ["Ops Spoc", "some One"], // ask client where will this come from
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
              <div className="w-1/2 border-r-2 pr-4">
                <ul>
                  {Object.keys(docPreviews).map((docName, index) => (
                    <li key={index} className="flex justify-between mb-2">
                      <span>{docName}:</span>
                      <input
                        type="file"
                        accept="application/pdf,image/*"
                        className="hidden"
                        id={`file-${index}`}
                        onChange={(e) => handleFileUpload(e, docName)}
                      />
                      <label
                        htmlFor={`file-${index}`}
                        className="bg-blue-600 text-white px-2 py-1 rounded-lg cursor-pointer hover:bg-blue-700"
                      >
                        Upload
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Document Preview */}
              <div className="w-1/2 pl-4">
                {Object.values(docPreviews).some((url) => url) ? (
                  <iframe
                    src={Object.values(docPreviews).find((url) => url)}
                    className="w-full h-48 border"
                    title="Document Preview"
                  ></iframe>
                ) : (
                  <p>No document uploaded</p>
                )}
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
              type="text"
              value={data.orderValue}
              // onChange={(e) => setdata({ ...data, orderValue: e.target.value })}
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
          <div className={`p-4 ${active === 3 ? "block" : "hidden"}`}>
          <span>Freeze Quotation:</span>
                      <input
                        type="file"
                        accept="application/pdf,image/*"
                        className="hidden"
                        id={`file-quatation`}
                        // onChange={(e) => handleFileUpload(e, docName)}
                      />
                      <label
                        htmlFor={`file-quatation`}
                        className="bg-blue-600 text-white px-2 mx-4 py-1 rounded-lg cursor-pointer hover:bg-blue-700"
                      >
                        Upload
                      </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 flex justify-between">
          <button
            onClick={acceptBooking}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Accept Booking
          </button>
          <button
            onClick={rejectBooking}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          >
            Reject Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default VeiwBooking;
