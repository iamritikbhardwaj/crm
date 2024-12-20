import React, { useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import BackToHome from "../components/BackToHome";

function VeiwBooking() {
  const [active, setActive] = useState(0); // Section toggle
  const [docPreviews, setDocPreviews] = useState({
    "Air Ticket": null,
    Passport: null,
    PAN: null,
    "Sales Sheet": null,
    "Email confirmation": null,
  });

  // Predefined booking data
  const [formData, setFormData] = useState({
    destination: "Paris",
    spoc: "Something",
    agent: "John Doe",
    customerName: "Jane Smith",
    paxCount: 3,
    travelMonth: "July",
    arrivalDate: "11/12/2024",
    departureDate: "20/12/2024",
    countryCode: "+1",
    whatsAppNumber: "1112202423",
    opsSpoc: "John Doe",
    orderValue: "5000",
    quotationDetails: {},
    documents: {},
  });

  // Handle file upload
  const handleFileUpload = (e, docName) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setDocPreviews((prev) => ({ ...prev, [docName]: fileURL }));
      setFormData((prev) => ({
        ...prev,
        documents: { ...prev.documents, [docName]: file },
      }));
    }
  };

  // Accept Booking
  const acceptBooking = () => {
    localStorage.setItem("confirmedBooking", JSON.stringify(formData));
    alert("Booking accepted and saved!");
  };

  // Reject Booking
  const rejectBooking = () => {
    setFormData({
      destination: "",
      spoc: "",
      agent: "",
      customerName: "",
      paxCount: 0,
      travelMonth: "",
      arrivalDate: "",
      departureDate: "",
      countryCode: "",
      whatsAppNumber: "",
      opsSpoc: "",
      orderValue: "",
      quotationDetails: "",
      documents: {},
    });
    setDocPreviews({});
    alert("Booking rejected!");
  };

  return (
    <div className="p-4">
    <BackToHome />
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
              ["Destination", formData.destination],
              ["Sales Spoc", formData.spoc],
              ["Agent", formData.agent],
              ["Customer Name", formData.customerName],
              ["Number of Pax", formData.paxCount],
              ["Travel Month", formData.travelMonth],
              ["Arrival Date", formData.arrivalDate],
              ["Departure Date", formData.departureDate],
              ["Country Code", formData.countryCode],
              ["Booking Date", formData.bookingDate],
              ["WhatsApp Number", formData.whatsAppNumber],
              ["Ops Spoc", formData.opsSpoc],
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
              value={formData.orderValue}
              onChange={(e) => setFormData({ ...formData, orderValue: e.target.value })}
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
