import React, { use, useEffect, useState } from "react";
import BackToHome from "../components/BackToHome";
import { CustomTable } from "../components/customTable/CustomTable";
import { useNavigate } from "react-router-dom";
import { GrFormView } from "react-icons/gr";
import { getTravelMonthRange } from "./Booking";
import {
  fetchPayment,
  fetchRecon,
  fetchTrips,
  fetchVendors,
} from "../components/apiCalls/fetchData";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const [valid, setValid] = useState("bg-red-400");
  const [opsStat, setOpsStat] = useState("bg-red-400");
  const [spStat, setSpStat] = useState(true);

  const payStat = async (id) => {
    const supPay = await fetchVendors();
    console.log(supPay, "supPay");
    Array.from(supPay).forEach((payData, index) => {
      if (payData.payment_status !== "FULL-PAID") {
        console.log("triggered");
        setSpStat(false);
      }
    });
    
    // this is for recon may be removed if not needed

    // const recon = await fetchRecon();
    // const rec = parseFloat(recon[0].land) + parseFloat(recon[0].online) + parseFloat(recon[0].offline);
    // console.log(recon, "rec");
  };

  // Simulate fetching data
  useEffect(() => {
    (async () => {
      const data = await fetchTrips();
      payStat(data[0].tripId);
      const payment = await fetchPayment();
      const pay = payment.reduce((acc, item) => parseFloat(acc) + parseFloat(item.amount), 0);
      const bookings = data.map((item) => ({
        tripID: item.tripId,
        destination: item.destination,
        bookingDate:
          item.bookingDate.slice(8, 10) +
          "/" +
          item.bookingDate.slice(5, 7) +
          "/" +
          item.bookingDate.slice(0, 4),
        customerName: (
          <div className="leading-[0.7]">
            <p>{item.customerName}</p> <br />
            <p>
              {item.pax?.A} A / {item.pax?.C} C
            </p>
          </div>
        ),
        salesSPOC: item.salesSpoc,
        agent: item.agent,
        arrivalDate:
          item.arrivalDate.slice(8, 10) +
          "/" +
          item.arrivalDate.slice(5, 7) +
          "/" +
          item.arrivalDate.slice(0, 4),
        departureDate:
          item.departureDate.slice(8, 10) +
          "/" +
          item.departureDate.slice(5, 7) +
          "/" +
          item.departureDate.slice(0, 4),
        travelMonth: getTravelMonthRange(item.arrivalDate, item.departureDate),
        contactDetails: `${item.countryCode} / ${item.whatsappNumber}`,
        orderValue: item.orderValue + " USD",
        apayment: (
          <div
            className={`${
              item.orderValue === pay
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {pay + " USD"}
          </div>
        ),
        status: (
          <button
            className={`${
              item.status === "CANCELLED" ||
              item.status === !"IN-PROGRESS" ||
              item.status === !"COMPLETED"
                ? "bg-red-500"
                : "bg-green-500"
            } ${
              item.status === "IN-PROGRESS" ? "bg-blue-500" : ""
            } text-white p-1 m-1 rounded-full`}
          >
            {!item.status ? "CONFIRMED" : item.status}
          </button>
        ),
        opsSpoc: item.opsSpoc,
        action: (
          <button
            className="text-3xl"
            onClick={() => navigate("/viewAllBooking", { state: item })}
          >
            <GrFormView />
          </button>
        ),
        paymentstat: (
          <button
            className={`${
              spStat ? "bg-green-400" : "bg-red-400"
            } p-2 rounded-lg`}
          ></button>
        ),
        validation: <button className={`${valid} p-2 rounded-lg`}></button>,
        opsstatus: <button className={`${opsStat} p-2 rounded-lg`}></button>,
      }));
      setBookings(bookings);
    })();
  }, [setSpStat, spStat, valid, opsStat, navigate]);

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
    { Header: "Agent.P", accessor: "apayment" },
    { Header: "Status", accessor: "status" },
    { Header: "Ops SPOC", accessor: "opsSpoc" },
    { Header: "Action", accessor: "action" },
    { Header: "Supp.Pay", accessor: "paymentstat" },
    { Header: "Validation", accessor: "validation" },
    { Header: "Ops Status", accessor: "opsstatus" },
  ];

  return (
    <div className="container mx-auto p-6">
      <BackToHome />
      <CustomTable dataa={bookings} columnss={col} size="text-xs" />
    </div>
  );
};

export default AllBookings;
