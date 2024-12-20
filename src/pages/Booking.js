import React, { useEffect, useState } from "react";
import BackToHome from "../components/BackToHome";
import { CustomTable } from "../components/customTable/CustomTable";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NewBooking = () => {
  // Initialize booking as an empty array
  const [booking, setBooking] = useState([]);
  const navigate = useNavigate();

  // Define columns
  const col = [
    { Header: "Booking ID", accessor: "bookingID" },
    { Header: "Destination", accessor: "destination" },
    { Header: "Booking Date", accessor: "bookingDate" },
    { Header: "Sales SPOC", accessor: "salesSPOC" },
    { Header: "Agent", accessor: "agent" },
    { Header: "Customer Details", accessor: "customerDetails" },
    { Header: "Arrival Dates", accessor: "ArrivalDate" },
    { Header: "Departure Dates", accessor: "DepartureDate" },
    { Header: "Travel Month", accessor: "travelMonth" },
    { Header: "Contact Details", accessor: "contactDetails" },
    { Header: "Order Value", accessor: "orderValue" },
    { Header: "Action", accessor: "action" },
  ];

  // Simulate fetching data
  useEffect(() => {
    const data = [
      {
        bookingID: "TRP001",
        destination: "Paris",
        bookingDate: "2024-12-20",
        salesSPOC: "Alice",
        agent: "Travel Agent A1 C3",
        customerDetails: "John Doe",
        ArrivalDate: "2024-12-20",
        DepartureDate: "2024-12-30",
        travelMonth: "2024-12",
        contactDetails: "+1 " + "1234567890",
        orderValue: "5000",
        action: <button onClick={() => navigate('/viewBooking')}><FaInfoCircle /></button>,
      },
      {
        bookingID: "TRP002",
        destination: "Paris",
        bookingDate: "2024-12-20",
        salesSPOC: "Alice",
        agent: "Travel Agent 1",
        customerDetails: "John Doe A1 C2",
        ArrivalDate: "2024-12-20",
        DepartureDate: "2024-12-30",
        travelMonth: "2024-12",
        contactDetails: "+1 " + "1234567890",
        orderValue: "5000",
        action: <button onClick={() => navigate('/viewBooking')}><FaInfoCircle /></button>,
      },
      {
        bookingID: "TRP003",
        destination: "Paris",
        bookingDate: "2024-12-20",
        salesSPOC: "Alice",
        agent: "Travel Agent 1",
        customerDetails: "John Doe A2 C1",
        ArrivalDate: "2024-12-20",
        DepartureDate: "2024-12-30",
        travelMonth: "2024-12",
        contactDetails: "+1 " + "1234567890",
        orderValue: "5000",
        action: <button onClick={() => navigate('/viewBooking')}><FaInfoCircle /></button>,
      },
      {
        bookingID: "TRP004",
        destination: "Paris",
        bookingDate: "2024-12-20",
        salesSPOC: "Alice",
        agent: "Travel Agent 1",
        customerDetails: "John Doe",
        ArrivalDate: "2024-12-20",
        DepartureDate: "2024-12-30",
        travelMonth: "2024-12",
        contactDetails: "+91 " + "1234567890",
        orderValue: "5000",
        action: <button onClick={() => navigate('/viewBooking')}><FaInfoCircle /></button>,
      },
      {
        bookingID: "TRP005",
        destination: "Paris",
        bookingDate: "2024-12-20",
        salesSPOC: "Alice",
        agent: "Travel Agent 1",
        customerDetails: "John Doe A5 C2",
        ArrivalDate: "2024-12-20",
        DepartureDate: "2024-12-30",
        travelMonth: "2024-12",
        contactDetails: "+1 " + "1234567890",
        orderValue: "5000",
        action: <button onClick={() => navigate('/viewBooking')}><FaInfoCircle /></button>,
      },
    ];
    setBooking(data);
  }, []);

  return (
    <div className="box-border border-4 p-4 overflow-auto">
      <BackToHome />
      <CustomTable
        columnss={col}
        dataa={booking} // Pass booking as an array
        button={true}
        path={"/addBooking"}
        size={"text-xs"}
      />
    </div>
  );
};

export default NewBooking;