import React, { useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import BackToHome from "../components/BackToHome";
import { CustomTable } from "../components/customTable/CustomTable";
import ExcelToTable from "../components/customTable/ExcelToTable";

function VeiwAllBooking() {
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
    orderValue: "5000",
    quotationDetails: {},
    documents: {},
  });

  const columns = [
    {
      Header: 'HEAD',
      accessor: 'head',
    },
    {
      Header: 'DATE',
      accessor: 'date',
    },
    {
      Header: 'DESCRIPTION',
      accessor: 'description',
    },
    {
      Header: 'PICKUP LOCATION',
      accessor: 'pickupLocation',
    },
    {
      Header: 'DROP LOCATION',
      accessor: 'dropLocation',
    },
    {
      Header: 'PRICE (A)',
      accessor: 'priceA',
    },
    {
      Header: 'PRICE (T)/MYR',
      accessor: 'priceMYR',
    },
    {
      Header: 'PRICE (T)/USD',
      accessor: 'priceUSD',
    },
    {
      Header: 'SUPPLIER',
      accessor: 'supplier',
    },
  ];

  // Example data based on the table in the image
  const data = [
    {
      head: 'HOTEL',
      date: '19 DEC || 21 DEC',
      description: 'VILLAGE HOTEL SENTOSA BY FAR EAST HOSPITALITY',
      pickupLocation: 'BOOKED BY AGENT',
      dropLocation: 'BOOKED BY AGENT',
      priceA: 'USD 0.00',
      priceMYR: '',
      priceUSD: 'USD 0.00',
      supplier: 'SELF BOOKED',
    },
    {
      head: 'ETICKET',
      date: '20-Dec',
      description: 'UNIVERSAL STUDIOS NORMAL ADMISSION - TICKETS ONLY',
      pickupLocation: '=',
      dropLocation: '=',
      priceA: 'SGD 505.10',
      priceMYR: '',
      priceUSD: 'USD 373.77',
      supplier: 'GLOBALTIX',
    },
    {
      head: 'TRANSFERS',
      date: '25-Dec',
      description: 'DEPARTURE',
      pickupLocation: 'HILTON GARDEN INN SERAGON',
      dropLocation: 'CHANGI AIRPORT',
      priceA: '',
      priceMYR: '',
      priceUSD: 'USD 33.30',
      supplier: 'TDMC',
    },
    // Add more rows as needed based on the table in the image
  ];

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

  return (
    <div className="p-4">
    <BackToHome path={"/schedule"} />
      <div className="max-w-7xl 89 mx-auto p-4 md:p-6 bg-white shadow-lg rounded-lg mt-8">
        <h1 className="text-2xl font-bold text-center mb-6">View Confirmed Booking</h1>

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
              ["Spoc", formData.spoc],
              ["Agent", formData.agent],
              ["Customer Name", formData.customerName],
              ["Number of Pax", formData.paxCount],
              ["Travel Month", formData.travelMonth],
              ["Arrival Date", formData.arrivalDate],
              ["Departure Date", formData.departureDate],
              ["Country Code", formData.countryCode],
              ["WhatsApp Number", formData.whatsAppNumber],
            ].map(([label, value], index) => (
              <div key={index} className="flex space-x-3">
                <label className="font-semibold">{label}:</label>
                <p>{value}</p>
              </div>
            ))}
            <button className="bg-blue-600 text-white px-4 py-2 max-w-20 rounded-lg hover:bg-blue-700">Save</button>
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
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Save</button>

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
            <div className="flex justify-between"><p className="font-semibold">Order Value (USD): {formData.orderValue}</p>
            <p className="font-semibold">Transfer Price(USD): 2000</p></div>
            <p className="font-semibold">Payment Details: data from api will be added in table</p>
            {/* Payment Details Table */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Payment Details</h3>
              <CustomTable dataa={[
                { installment: "First Installment", date: "", amount: "", mode: "", status: "", remarks: "", action: <button onClick={() => {
                  document.getElementById('paymentForm').classList.remove('hidden');
                }}>Edit</button>},
              ]} columnss={[
                { Header: " ", accessor: "installment" },
                { Header: "Date/Payment", accessor: "date" },
                { Header: "Mode", accessor: "mode" },
                { Header: "Conv: Rate", accessor: "convertionRate" },
                { Header: "Amount (USD)", accessor: "amount" },  
                { Header: "CONV: Fee", accessor: "convfee" },
                { Header: "Amount (INR)", accessor: "amtinr" },
                { Header: "Status", accessor: "status" },
                { Header: "Action", accessor: "action" },
              ]} size={"text-xs"} hideFilter={true} />
            {/* Payment Edit Form */}
            <div className="relative w-fit inset-0 bg-black bg-opacity-50 items-center justify-center hidden" id="paymentForm">
              <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="font-semibold mb-4">Edit Payment Details</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Date</label>
                    <input type="date" className="w-full border rounded p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Amount</label>
                    <input type="number" className="w-full border rounded p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Payment Mode</label>
                    <select className="w-full border rounded p-2">
                      <option>Cash</option>
                      <option>Credit Card</option>
                      <option>Bank Transfer</option>
                      <option>UPI</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select className="w-full border rounded p-2">
                      <option>Pending</option>
                      <option>Completed</option>
                      <option>Failed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Remarks</label>
                    <textarea className="w-full border rounded p-2" rows="3"></textarea>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button 
                      type="button"
                      onClick={() => {
                        document.getElementById('paymentForm').classList.add('hidden');
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
              <CustomTable dataa={[
                { online: "", offline: "", land: "", remarks: "", validatedBy: "", action: <button onClick={() => {
                  document.getElementById('editForm').classList.remove('hidden');
                }}>Edit</button>},
              ]} columnss={[
                { Header: "Online Booking", accessor: "online" },
                { Header: "Offline Booking(only Hotels)", accessor: "offline" },
                { Header: "Land Combo", accessor: "land" },
              ]} size={"text-xs"} hideFilter={true}/>
            {/* Edit Form */}
            <div className="relative w-fit inset-0 bg-black bg-opacity-50 items-center justify-center hidden" id="editForm">
              <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="font-semibold mb-4">Edit Reconciliation Details</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Supplier</label>
                    <input type="text" className="w-full border rounded p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Amount</label>
                    <input type="number" className="w-full border rounded p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select className="w-full border rounded p-2">
                      <option>Pending</option>
                      <option>Completed</option>
                      <option>Failed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Remarks</label>
                    <textarea className="w-full border rounded p-2" rows="3"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Validated By</label>
                    <input type="text" className="w-full border rounded p-2" />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button 
                      type="button" 
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                      onClick={() => {
                        document.getElementById('editForm').classList.add('hidden');
                      }}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>

            </div>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Save</button>

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
          <div className={`p-4 ${active === 3 ? "block" : "hidden"} min-h-[30vh]`}>
            <div className="flex flex-col gap-4">
              <div className="overflow-x-auto">
                <ExcelToTable />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Save
                </button>
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
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search vendor..."
                list="vendorList"
              />
              <datalist id="vendorList">
                <option value="Supplier 1" />
                <option value="Supplier 2" />
                <option value="Supplier 3" />
                <option value="Supplier 4" />
                <option value="Supplier 5" />
                <option value="Supplier 6" />
                <option value="Supplier 7" />
                <option value="Supplier 8" />
                <option value="Supplier 9" />
                <option value="Supplier 10" />
              </datalist>
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
            <button className="bg-blue-600  text-white px-4 py-2 rounded-lg hover:bg-blue-700">Save</button>
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
                    <p>Hotel Voucher:</p>
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden" 
                      id="hotel-voucher1"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const fileURL = URL.createObjectURL(file);
                          document.querySelector('iframe').src = fileURL;
                        }
                      }}
                    />
                    <label
                      htmlFor="hotel-voucher"
                      className="bg-blue-600 text-white px-1 py-0 rounded-lg cursor-pointer hover:bg-blue-700"
                    >
                      Upload Voucher
                    </label>
                    </div>
                   <div className="flex gap-4 align-middle">
                   <p>Activities Voucher:</p>
                    <input 
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    id="activity-voucher"
                    onChange={(e) => {const file = e.target.files[0];
                      if (file) {
                        const fileURL = URL.createObjectURL(file);
                        document.querySelector('iframe').src = fileURL;
                      }}
                    } />
                    <label
                    htmlFor="activity-voucher" 
                    className="bg-blue-600 rounded-lg text-white px-1 my-1 py-0"
                    >Upload voucher</label>
                   </div>
                   <div className="flex gap-4 align-middle">
                   <p>Miscellaneous Voucher:</p>
                    <input 
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    id="misc-voucher"
                    onChange={(e) => {const file = e.target.files[0];
                      if (file) {
                        const fileURL = URL.createObjectURL(file);
                        document.querySelector('iframe').src = fileURL;
                      }}
                    } />
                    <label
                    htmlFor="misc-voucher" 
                    className="bg-blue-600 rounded-lg text-white px-1 my-1 py-0"
                    >Upload voucher</label>
                   </div>
                   <button className="bg-blue-600 px-2 py-1 text-white rounded-lg mt-12">Save</button>

                </div>
                <div className="w-1/2">
                    <iframe 
                    // src={pdf} 
                    width="100%" height="100%"
                    title="Voucher Preview"
                    />
                </div>
            </div>
      </div>
    </div>
  );
}

export default VeiwAllBooking;
