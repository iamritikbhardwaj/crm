import React, { useEffect, useState } from "react";
import BackToHome from "../components/BackToHome";
import { CustomTable } from "../components/customTable/CustomTable";
import { useNavigate } from "react-router-dom";
import { GrFormView } from "react-icons/gr";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  // Simulate fetching data
  useEffect(() => {
    const mockBookings = [
      {
        tripID: "TRP001",
        destination: "Paris",
        bookingDate: "2024-12-20",
        customerName: "John Doe 2A / 1C",
        salesSPOC: "Alice",
        agent: "Travel Agent 1",
        TravelDates: "2024-12-20 to 2024-12-30",
        orderValue: 5000,
        payment: "Full Paid",
        status: "Confirmed",
        opsSpoc: "some One",
        action: <button onClick={() => navigate("/viewAllBooking")}><GrFormView /></button>,
        paymentstat: <button className="bg-red-400 p-2 rounded-lg text-white">Unpaid</button>,
        validation: <button className="bg-blue-400 p-2 rounded-lg"></button>,
        opsstatus: <button className="bg-orange-300 p-2 rounded-lg"></button>
      }
    ];
    
   
    setBookings(mockBookings);
  }, []);

  const col = [
    { Header: "Trip ID", accessor: "tripID" },
    { Header: "Destination", accessor: "destination" },
    { Header: "Booking Date", accessor: "bookingDate" },
    { Header: "Sales SPOC", accessor: "salesSPOC" },
    { Header: "Agent", accessor: "agent" },
    { Header: "Customer Name", accessor: "customerName A1" },
    { Header: "Arrival Date", accessor: "arrival"},
    { Header: "Departure Date", accessor: "departure" },
    { Header: "Travel Month", accessor: "travelMonth" },
    { Header: "Contact Details", accessor: "contactDetails" },
    { Header: "Order Value", accessor: "orderValue" },
    { Header: "Payment", accessor: "payment" },
    { Header: "Status", accessor: "status" },
    { Header: "Ops Spoc", accessor: "opsSpoc" },
    { Header: "Action", accessor: "action" },
    { Header: "Payment", accessor: "paymentstat" },
    { Header: "Validation", accessor: "validation" },
    { Header: "Ops Status", accessor: "opsstatus"}
  ];


  return (
    <div className="container mx-auto p-6">
      <BackToHome />
      <CustomTable dataa={bookings} columnss={col} size="text-xs" />
    </div>
  );
};

export default AllBookings;