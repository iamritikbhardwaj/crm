import React, { useState, useEffect } from 'react';
import BackToHome from '../components/BackToHome'
function Booking() {
  // Define states for all fields
  const [destination, setDestination] = useState('');
  const [bookingDate] = useState(new Date().toISOString().split('T')[0]); // Default to current date
  const [salesSPOC] = useState('Sales SPOC Name'); // Replace with logic to get logged-in user
  const [agent, setAgent] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [numOfPax, setNumOfPax] = useState(1);
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [travelMonth, setTravelMonth] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [orderValue, setOrderValue] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [documents, setDocuments] = useState({});
  const [freezeQuotation, setFreezeQuotation] = useState(null);

  const handleDocumentUpload = (event) => {
    const { name, files } = event.target;
    setDocuments({
      ...documents,
      [name]: files[0],
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Submit logic to save the booking
    const bookingData = {
      destination,
      bookingDate,
      salesSPOC,
      agent,
      customerName,
      numOfPax,
      arrivalDate,
      departureDate,
      travelMonth,
      countryCode,
      orderValue,
      whatsappNumber,
      documents,
      freezeQuotation,
    };
    // Call API to save the booking details
    alert(bookingData);
  };

  useEffect(() => {
    if (arrivalDate) {
      const month = new Date(arrivalDate).toLocaleString('default', { month: 'long' });
      setTravelMonth(month);
    }
  }, [arrivalDate]);

  return (
    <div className="max-w-4xl mx-auto my-10 p-4 bg-slate-100 rounded-lg shadow-md">
      <BackToHome />
      <h2 className="text-2xl font-bold text-center mb-6">Create New Booking</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Destination */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Destination</label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border border-slate-400 p-2 rounded-md"
          >
            <option value="">Select Destination</option>
            {/* Populate destinations dynamically */}
            <option value="Bali">Bali</option>
            <option value="Paris">Paris</option>
            <option value="Tokyo">Tokyo</option>
          </select>
        </div>

        {/* Booking Date */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Booking Date</label>
          <input
            type="date"
            value={bookingDate}
            disabled
            className="border border-slate-400 p-2 rounded-md"
          />
        </div>

        {/* Sales SPOC */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Sales SPOC</label>
          <input
            type="text"
            value={salesSPOC}
            disabled
            className="border border-slate-400 p-2 rounded-md"
          />
        </div>

        {/* Agent */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Agent</label>
          <select
            value={agent}
            onChange={(e) => setAgent(e.target.value)}
            className="border border-slate-400 p-2 rounded-md"
          >
            <option value="">Select Agent</option>
            <option value="Agent 1">Agent 1</option>
            <option value="Agent 2">Agent 2</option>
          </select>
        </div>

        {/* Customer Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Customer Name</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="border border-slate-400 p-2 rounded-md"
          />
        </div>

        {/* Number of Pax */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Number of Pax</label>
          <select
            value={numOfPax}
            onChange={(e) => setNumOfPax(e.target.value)}
            className="border border-slate-400 p-2 rounded-md"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>

        {/* Arrival Date */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Arrival Date</label>
          <input
            type="date"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            className="border border-slate-400 p-2 rounded-md"
          />
        </div>

        {/* Departure Date */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Departure Date</label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="border border-slate-400 p-2 rounded-md"
          />
        </div>

        {/* Travel Month */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Travel Month</label>
          <input
            type="text"
            value={travelMonth}
            disabled
            className="border border-slate-400 p-2 rounded-md"
          />
        </div>

        {/* Country Code */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Country Code</label>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="border border-slate-400 p-2 rounded-md"
          >
            <option value="">Select Country Code</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
            <option value="+91">+91</option>
          </select>
        </div>

        {/* Order Value */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Order Value (USD)</label>
          <input
            type="text"
            value={orderValue}
            onChange={(e) => setOrderValue(e.target.value)}
            className="border border-slate-400 p-2 rounded-md"
          />
        </div>

        {/* WhatsApp Number */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">WhatsApp Number</label>
          <input
            type="text"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            className="border border-slate-400 p-2 rounded-md"
          />
        </div>

        {/* Document Upload */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Documents Upload</label>
          <input
            type="file"
            name="airticket"
            onChange={handleDocumentUpload}
            className="border border-slate-400 p-2 rounded-md"
          />
          {/* Add other file inputs similarly */}
        </div>

        {/* Freeze Quotation Upload */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Upload Freeze Quotation</label>
          <input
            type="file"
            onChange={(e) => setFreezeQuotation(e.target.files[0])}
            className="border border-slate-400 p-2 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-slate-800 text-white p-3 rounded-md w-full">
          Submit Booking
        </button>
      </form>
    </div>
  );
}

export default Booking;