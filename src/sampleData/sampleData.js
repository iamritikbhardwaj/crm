import { MdModeEdit } from "react-icons/md";// assuming ProfileDropdown is a separate component



const destData = [
  {
    destination: "Bali",
    currency: "IDR",
    status: <button className="p-2 rounded-lg bg-green-400"></button>,
    action: <button className="mx-auto" onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    destination: "Paris",
    currency: "EUR",
    status: <button className="p-2 rounded-lg bg-green-400"></button>,
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    destination: "London",
    currency: "GBP",
    status: <button className="p-2 rounded-lg bg-green-400"></button>,
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    destination: "Tokyo",
    currency: "JPY",
    status: <button className="p-2 rounded-lg bg-green-400"></button>,
    action: <button className="w-full align-center" onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    destination: "Sydney",
    currency: "AUD",
    status: <button className="p-2 rounded-lg bg-green-400"></button>,
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    destination: "Rome",
    currency: "EUR",
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    destination: "New York",
    currency: "USD",
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    destination: "Dubai",
    currency: "AED",
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    destination: "Singapore",
    currency: "SGD",
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    destination: "Beijing",
    currency: "CNY",
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    destination: "Sydney",
    currency: "AUD",
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    destination: "Tokyo",
    currency: "JPY",
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
];

const agentData = [
  {
    agentName: "Agent 1",
    status: <button className="p-2 rounded-lg bg-green-400"></button>,
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    agentName: "Agent 2",
    status: <button className="p-2 rounded-lg bg-red-400"></button>, 
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    agentName: "Agent 3",
    status: <button className="p-2 rounded-lg bg-green-400"></button>,
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    agentName: "Agent 4",
    status: <button className="p-2 rounded-lg bg-green-400"></button>,
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    agentName: "Agent 5",
    status: <button className="p-2 rounded-lg bg-red-400"></button>, 
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    agentName: "Agent 6",
    status: <button className="p-2 rounded-lg bg-green-400"></button>,
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    agentName: "Agent 7",
    status: <button className="p-2 rounded-lg bg-red-400"></button>, 
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    agentName: "Agent 8",
    status: <button className="p-2 rounded-lg bg-green-400"></button>,
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    agentName: "Agent 9",
    status: <button className="p-2 rounded-lg bg-red-400"></button>, 
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    agentName: "Agent 10",
    status: <button className="p-2 rounded-lg bg-green-400"></button>,
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    agentName: "Agent 11",
    status: <button className="p-2 rounded-lg bg-green-400"></button>,
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    agentName: "Agent 12",
    status: <button className="p-2 rounded-lg bg-red-400"></button>, 
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    agentName: "Agent 13",
    status: <button className="p-2 rounded-lg bg-green-400"></button>,
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    agentName: "Agent 14",
    status: <button className="p-2 rounded-lg bg-red-400"></button>, 
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
];

const supplierData = [
  {
    supplierName: "Supplier 1",
    status: <button className="p-2 rounded-lg bg-green-400"></button>,
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    supplierName: "Supplier 2",
    status: <button className="p-2 rounded-lg bg-red-400"></button>, 
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    supplierName: "Supplier 3",
    status: <button className="p-2 rounded-lg bg-green-400"></button>,
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    supplierName: "Supplier 4",
    status: <button className="p-2 rounded-lg bg-green-400"></button>,
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    supplierName: "Supplier 5",
    status: <button className="p-2 rounded-lg bg-red-400"></button>, 
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    supplierName: "Supplier 6",
    status: <button className="p-2 rounded-lg bg-green-400"></button>,
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    supplierName: "Supplier 7",
    status: <button className="p-2 rounded-lg bg-red-400"></button>, 
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    supplierName: "Supplier 8",
    status: <button className="p-2 rounded-lg bg-green-400"></button>,
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    supplierName: "Supplier 9",
    status: <button className="p-2 rounded-lg bg-red-400"></button>, 
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    supplierName: "Supplier 10",
    status: <button className="p-2 rounded-lg bg-green-400"></button>,
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    supplierName: "Supplier 11",
    status: <button className="p-2 rounded-lg bg-green-400"></button>,
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    supplierName: "Supplier 12",
    status: <button className="p-2 rounded-lg bg-red-400"></button>, 
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    supplierName: "Supplier 13",
    status: <button className="p-2 rounded-lg bg-green-400"></button>,
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    supplierName: "Supplier 14",
    status: <button className="p-2 rounded-lg bg-red-400"></button>, 
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  },
  {
    supplierName: "Supplier 15",
    status: <button className="p-2 rounded-lg bg-green-400"></button>,
    action: <button onClick={() => alert("Edit")}><MdModeEdit /></button>,
  }
];

const bookings = [
  {
    bookingId: "BKG001",
    destination: "Bali",
    bookingDate: "2024-10-01",
    salesSPOC: "John Doe",
    agentDetails: "Agent 1",
    customerName: "Alice Smith 2A / 1C",
    arrivalDate: "2024-11-01",
    departureDate: "2024-11-10",
    travelMonth: "November",
    countryCode: "+1",
    orderValue: "3000 USD",
    whatsappNumber: "1234567890",
    action: <button onClick={() => alert("View/Manage")}>View/Manage</button>,
  },
  {
    bookingId: "BKG002",
    destination: "Bali",
    bookingDate: "2024-10-01",
    salesSPOC: "John Doe",
    agentDetails: "Agent 1",
    customerName: "Alice Smith 2A / 1C",
    arrivalDate: "2024-11-01",
    departureDate: "2024-11-10",
    travelMonth: "November",
    countryCode: "+1",
    orderValue: "3000 USD",
    whatsappNumber: "1234567890",
    action: <button onClick={() => alert("View/Manage")}>View/Manage</button>,
  },
  // Add additional bookings up to BKG025
  // Repeat the same structure for the next 16 objects
];

export { bookings };
export { destData };
export { agentData };
export { supplierData };
