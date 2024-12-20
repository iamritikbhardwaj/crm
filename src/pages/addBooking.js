import React, { useState } from "react";
import BackToHome from "../components/BackToHome";

const AddBooking = () => {
  const sections = ["Booking Details", "Travel Details", "Order & Contact Details", "Documents Upload"];
  const [currentSection, setCurrentSection] = useState(0);
  const [cpax, setCpax] = useState(0)

  const [formData, setFormData] = useState({
    destination: "",
    agent: "",
    customerName: "",
    pax: {
      A: 0,
      C: 0,
      Ca: 0,
    },
    arrivalDate: "",
    departureDate: "",
    orderValue: "",
    countryCode: '',
    whatsappNumber: "",
    documents: [],
  });

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle File Upload with Preview
  const handleFileUpload = (e, index) => {
    const file = e.target.files[0];
    const filePreview = file ? URL.createObjectURL(file) : null;

    const updatedDocs = [...formData.documents];
    updatedDocs[index] = { file, preview: filePreview };
    setFormData({ ...formData, documents: updatedDocs });
  };

  // Add New Document
  const addDocument = () => {
    setFormData({ ...formData, documents: [...formData.documents, { file: null, preview: null }] });
  };

  // Remove Document
  const removeDocument = (index) => {
    const updatedDocs = [...formData.documents];
    updatedDocs.splice(index, 1);
    setFormData({ ...formData, documents: updatedDocs });
  };

  // Navigation Functions
  const goToNext = () => {
    if (currentSection < sections.length - 1) setCurrentSection(currentSection + 1);
  };
  const goToPrevious = () => {
    if (currentSection > 0) setCurrentSection(currentSection - 1);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <BackToHome />
      <h1 className="text-3xl font-bold text-center mb-6">Create New Booking</h1>

      <div className="bg-white shadow-md rounded p-6">
        {/* Section Header */}
        <h2 className="text-2xl font-semibold text-center mb-4">{sections[currentSection]}</h2>

        {/* Booking Details */}
        {currentSection === 0 && (
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Destination</label>
              <select
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Destination</option>
                <option value="Paris">Paris</option>
                <option value="New York">New York</option>
                <option value="Tokyo">Tokyo</option>
              </select>
            </div>

            <div>
              <label className="block mb-2">Sales SPOC</label>
              <select
                name="salesspc"
                value={formData.salesspc}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Sales Spoc̦</option>
                <option value="Paris">Paris</option>
                <option value="New York">New York</option>
                <option value="Tokyo">Tokyo</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Agent</label>
              <input
                type="text"
                name="agent"
                value={formData.agent}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-2">Customer Name</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
        )}

        {/* Travel Details */}
        {currentSection === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Arrival Date</label>
              <input
                type="date"
                name="arrivalDate"
                value={formData.arrivalDate}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-2">Departure Date</label>
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <div className="flex gap-3 w-full">
              <div className="w-1/3">
              <label className="block mb-2">Number of Passengers</label>
              <select
                type="number"
                name="pax"
                value={formData.pax.A}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value={0}>Select</option>
                <option value={1}>1 A</option>
                <option value={2}>2 A</option>
                <option value={3}>3 A</option>
                <option value={4}>4 A</option>
                <option value={5}>5 A</option>
              </select>
              </div>
              <div>
                <label className="block mb-2">Number of Children</label>
                <input 
                type="number"
                name="childrenPax"
                value={formData.pax.C}
                onChange={(e) => setCpax(Array(parseInt(e.target.value)).fill({}))}
                className="w-1/2 border rounded px-3 py-2" />
              </div>
              {cpax && cpax.map(() => (
                <div className="w-fit">
                <label className="mb-2 block">Age</label>
              <input
              type="number"
              name="age"
              onChange={handleInputChange}
              value={formData.pax.Ca}
              className="px-2 w-20 py-1 border rounded"
              />
                </div>))}
              </div>
            </div>
          </div>
        )}

        {/* Order & Contact Details */}
        {currentSection === 2 && (
          <div className="space-y-4">
            <label className="block">whatsappNumber</label>
            <div className="flex gap-4">
              <select 
                name="countryCode"
                value={formData.countryCode}
                onChange={handleInputChange}
                className="border rounded px-3 py-2"
              >
                  <option value="+1">🇺🇸 +1 (USA)</option>
                  <option value="+44">🇬🇧 +44 (UK)</option>
                  <option value="+91">🇮🇳 +91 (India)</option>
                  <option value="+61">🇦🇺 +61 (Australia)</option>
                  <option value="+81">🇯🇵 +81 (Japan)</option>
              </select>
              <input 
                type="tel" 
                name="whatsappNumber"
                className="w-full border rounded px-3 py-2"
                onChange={handleInputChange}
                value={formData.whatsappNumber}
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block mb-2">Order Value</label>
              <input 
                type="number"
                name="orderValue"
                className="w-full border rounded px-3 py-2"
                onChange={handleInputChange}
                value={formData.orderValue}
              />
            </div>
          </div>
        )}

        {/* Documents Upload */}
        {currentSection === 3 && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={addDocument}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Document
            </button>

            {/* Document Input Fields */}
            {formData.documents.map((doc, index) => (
              <div key={index} className="flex flex-col space-y-2 mt-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, index)}
                    className="w-full border rounded px-3 py-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeDocument(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                {/* Display Preview */}
                {doc.preview && (
                  <div>
                    <p className="text-sm font-semibold">Preview:</p>
                    <a
                      href={doc.preview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {doc.file.name}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={goToPrevious}
            className={`px-4 py-2 bg-gray-400 text-white rounded ${currentSection === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={currentSection === 0}
          >
            Previous
          </button>
          {currentSection < sections.length - 1 ? (
            <button
              type="button"
              onClick={goToNext}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBooking;
