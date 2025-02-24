import React, { use, useEffect, useState } from "react";
import BackToHome from "../components/BackToHome";
import { CustomTable, DefaultColumnFilter } from "../components/customTable/CustomTable";
import { useNavigate } from "react-router-dom";
import { GrFormView } from "react-icons/gr";
import { getTravelMonthRange } from "./Booking";
import {
  fetchPayment,
  fetchRecon,
  fetchTrips,
  fetchVendors,
} from "../components/apiCalls/fetchData";
import { useSelector } from "react-redux";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const user = auth.user;

  // Simulate fetching data
  useEffect(() => {
    (async () => {
      const data = await fetchTrips();
      const bookings = data.map(
        (item) =>
          (user &&
            user.profile === "Sales" &&
            user.name !== item.salesSpoc) || {
              arrivalDate:
              item.arrivalDate,
            departureDate:
              item.departureDate,
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
            travelMonth: getTravelMonthRange(
              item.arrivalDate,
              item.departureDate
            ),
            contactDetails: `${item.countryCode} / ${item.whatsappNumber}`,
            transferPrice: user.profile === "Sales" ? 'N/A' : (parseFloat(item?.transferPrice) || 0) + " USD",
            orderValue: item.orderValue + " USD",
            apayment: (
              <div
                className={`font-bold ${
                  parseFloat(item.orderValue) === parseFloat(item?.payment)
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {item?.payment + " USD"}
              </div>
            ),
            status: (
              <button
                className={`${
                  (item.status === "CANCELLED" && "bg-red-500") ||
                  (item.status === "ON-TOUR" && "bg-yellow-500") ||
                  (item.status === "CONFIRMED" && "bg-green-500") ||
                  (item.status === "TRAVELLED" && "bg-gray-500")
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
                  item.paymentStatus === "FULL-PAID" ? "bg-green-400" : "bg-red-400"
                } p-2 rounded-lg`}
              ></button>
            ),
            validation: (
              <button
                className={`${
                  item.validation === "Finance" && "bg-green-400"
                } ${
                  item.validation === "Operations"
                    && "bg-blue-400"
                } ${
                  item.validation === "Finance" || item.validation === "Operations" || "bg-red-400"
                    && "bg-red-400"
                }
         p-2 rounded-lg`}
              ></button>
            ),
            opsstatus: (
              <button
                className={`${
                  item.opsStatus === "COMPLETED" ? "bg-green-400" : "bg-red-400"
                } p-2 rounded-lg`}
              ></button>
            ),
          }
      ).filter((stuff) => stuff !== true);
      console.log(bookings, "bookings");
      setBookings(bookings);
    })();
  }, []);

  const col = [
    { Header: "Arrival Dates", accessor: "arrivalDate", Filter: DefaultColumnFilter },
    { Header: "Departure Dates", accessor: "departureDate" },
    { Header: "Trip ID", accessor: "tripID" },
    { Header: "Destination", accessor: "destination" },
    { Header: "Booking Date", accessor: "bookingDate" },
    { Header: "Sales SPOC", accessor: "salesSPOC" },
    { Header: "Agent", accessor: "agent" },
    { Header: "Customer Name", accessor: "customerName", Filter: DefaultColumnFilter  },
    { Header: "Travel Month", accessor: "travelMonth" },
    { Header: "Transfer Price", accessor: "transferPrice" },
    { Header: "Contact Details", accessor: "contactDetails" },
    { Header: "Order.V", accessor: "orderValue" },
    { Header: "Agent.P", accessor: "apayment" },
    { Header: "Status", accessor: "status" },
    { Header: "Ops SPOC", accessor: "opsSpoc" },
    { Header: "Action", accessor: "action" },
    { Header: "Supp.Pay", accessor: "paymentstat" },
    { Header: "Validation", accessor: "validation" },
    { Header: "Booking Status", accessor: "opsstatus" },
  ];

  return (
    <div className="flex-col justify-center mt-6 mx-auto p-4">
      <BackToHome />
      <CustomTable dataa={bookings} columnss={col} size="text-xs" />
    </div>
  );
};

export default AllBookings;
