import React, { useState } from "react";

const NewBooking = () => {
  const sections = ["Booking Details", "Customer Details", "Travel Dates", "Order & Payment", "Documents Upload"];
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({
    destination: "",
    agent: "",
    customerName: "",
    pax: "",
    arrivalDate: "",
    departureDate: "",
    orderValue: "",
    whatsappNumber: "",
    documents: {},
  });

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle File Upload
  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      documents: { ...formData.documents, [name]: files[0] },
    });
  };

  // Remove Document
  const removeDocument = (key) => {
    const updatedDocs = { ...formData.documents };
    delete updatedDocs[key];
    setFormData({ ...formData, documents: updatedDocs });
  };

  // Navigate Sections
  const goToNext = () => {
    if (currentSection < sections.length - 1) setCurrentSection(currentSection + 1);
  };
  const goToPrevious = () => {
    if (currentSection > 0) setCurrentSection(currentSection - 1);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Create New Booking</h1>

      <div className="bg-white shadow-md rounded p-6">
        {/* Section Header */}
        <h2 className="text-2xl font-semibold text-center mb-4">{sections[currentSection]}</h2>

        {/* Section Content */}
        {currentSection === 0 && (
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
        )}

        {currentSection === 1 && (
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
        )}

        {currentSection === 2 && (
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
        )}

        {currentSection === 3 && (
          <div>
            <label className="block mb-2">Order Value (USD)</label>
            <input
              type="number"
              name="orderValue"
              value={formData.orderValue}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        )}

        {currentSection === 4 && (
          <div>
            <label className="block mb-2">Upload Documents</label>
            <input
              type="file"
              name="document"
              onChange={handleFileUpload}
              className="w-full border rounded px-3 py-2"
            />

            {/* Document Previews */}
            <div className="mt-4 space-y-2">
              {Object.keys(formData.documents).map((key) => (
                <div key={key} className="flex justify-between items-center border p-2 rounded">
                  <span className="text-sm">{formData.documents[key]?.name}</span>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeDocument(key)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
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
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewBooking;
