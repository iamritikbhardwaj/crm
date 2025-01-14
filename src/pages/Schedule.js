import React, { useEffect, useState } from "react";
import BackToHome from "../components/BackToHome";
import { CustomTable } from "../components/customTable/CustomTable";
import { useNavigate } from "react-router-dom";
import { GrFormView } from "react-icons/gr";
import axios from "axios";
import { API_URL } from "../AppConstant";
import { getTravelMonthRange } from "./Booking";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  // Simulate fetching data
  useEffect(() => {
    (async () => {
      const response = axios.get(`${API_URL}users/getAllTrips`, {
        withCredentials: true,
        headers: {
          "content-type": "application/json, multipart/form-data"
        }
      })
      console.log((await response).data.OUTPUT, 'response');
      const data = (await response).data.OUTPUT;
      const bookings = data.map((item) => (
          {
            tripID: item.tripId,
            destination: item.destination,
            bookingDate: item.bookingDate.slice(0, 10),
            customerName: item.customerName + " / " + item.pax?.A + item.pax?.C,
            salesSPOC: item.salesSpoc,
            agent: item.agent,
            TravelDates: item.arrivalDate.slice(0, 10) + " to " + item.departureDate.slice(0, 10),
            travelMonth: getTravelMonthRange(item.arrivalDate, item.departureDate),
            contactDetails: `${item.countryCode} / ${item.whatsappNumber}`,
            orderValue: item.orderValue,
            payment: item.payment,
            status: item.status,
            opsSpoc: item.opsSpoc,
            action: <button onClick={() => navigate("/viewAllBooking")}><GrFormView /></button>,
            paymentstat: <button className="bg-red-400 p-2 rounded-lg text-white">{item.paymentStatus}</button>,
            validation: <button className="bg-red-400 p-2 rounded-lg">{item.validation}</button>,
            opsstatus: <button className="bg-red-300 p-2 rounded-lg">{item?.opsStatus}</button>
          }
      ))
    setBookings(bookings);})();
  }, []);

  const col = [
    { Header: "Trip ID", accessor: "tripID" },
    { Header: "Destination", accessor: "destination" },
    { Header: "Booking Date", accessor: "bookingDate" },
    { Header: "Sales SPOC", accessor: "salesSPOC" },
    { Header: "Agent", accessor: "agent" },
    { Header: "Customer Name", accessor: "customerName" },
    { Header: "Travel Dates", accessor: "TravelDates" },
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