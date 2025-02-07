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
            bookingDate: item.bookingDate.slice(8, 10) + "/" + item.bookingDate.slice(5, 7) + "/" + item.bookingDate.slice(0, 4),
            customerName: <div className="leading-[0.7]">
            <p>{item.customerName}</p> <br />
            <p>{item.pax?.A} A / {item.pax?.C} C</p>
            </div>,            
            salesSPOC: item.salesSpoc,
            agent: item.agent,
            arrivalDate: item.arrivalDate.slice(8, 10) + "/" + item.arrivalDate.slice(5, 7) + "/" + item.arrivalDate.slice(0, 4),
            departureDate:  item.departureDate.slice(8, 10) + "/" + item.departureDate.slice(5, 7) + "/" + item.departureDate.slice(0, 4),
            travelMonth: getTravelMonthRange(item.arrivalDate, item.departureDate),
            contactDetails: `${item.countryCode} / ${item.whatsappNumber}`,
            orderValue: item.orderValue + " USD",
            payment: item.payment + " USD",
            status: <button className={`${item.status === "CANCELLED" ? "bg-red-500" : "bg-green-500"} text-white p-1 m-1 rounded-full`}>{item?.status ? item?.status : "CONFIRMED"}</button>,
            opsSpoc: item.opsSpoc,
            action: <button className="text-3xl" onClick={() => navigate("/viewAllBooking", { state: item })}><GrFormView /></button>,
            paymentstat: <button className="bg-red-400 p-2 rounded-lg text-white">{item.paymentStatus}</button>,
            validation: <button className="bg-red-400 p-2 rounded-lg">{item.validation}</button>,
            opsstatus: <button className="bg-red-700 p-2 rounded-lg">{item?.opsStatus}</button>
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
    { Header: "Arrival Dates", accessor: "arrivalDate" },
    { Header: "Departure Dates", accessor: "departureDate" },
    { Header: "Travel Month", accessor: "travelMonth" },
    { Header: "Contact Details", accessor: "contactDetails" },
    { Header: "Order.V", accessor: "orderValue" },
    { Header: "Agent.P", accessor: "payment" },
    { Header: "Status", accessor: "status" },
    { Header: "Ops SPOC", accessor: "opsSpoc" },
    { Header: "Action", accessor: "action" },
    { Header: "Supp.Pay", accessor: "paymentstat" },
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