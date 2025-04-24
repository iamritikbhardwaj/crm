import React, { use, useEffect, useState } from "react";
import BackToHome from "../components/BackToHome";
import {
  CustomTable,
  DefaultColumnFilter,
} from "../components/customTable/CustomTable";
import { useNavigate } from "react-router-dom";
import { GrFormView } from "react-icons/gr";
import { getTravelMonthRange } from "./Booking";
import {
  fetchFilteredTrips,
  fetchTrips,
} from "../components/apiCalls/fetchData";
import { useDispatch, useSelector } from "react-redux";
import JsonToExcel from "../components/ExcelJson/JsonToExcel.js";

// this includes dashboard for all the trips which has been created after accepting the booking
const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = auth.user; // this user is used to specify roles based on user profile

  const [fromDate, setFromDate] = useState(Date.now()); // this form data will be used to submit all the data required for trip creation
  const [toDate, setToDate] = useState(Date.now() + new Date(86400000)); // filter related data
  const [download, setDownload] = useState({});

  const renderPax = (pax) => {
    try {
      // Check if pax is a string, if so parse it
      const paxData = typeof pax === "string" ? JSON.parse(pax) : pax;
      
      // Now safely access the properties
      return `${paxData?.A || 0} A / ${paxData?.C || 0} C / ${paxData?.Ca || 0} Ca`;
    } catch (err) {
      // Handle parsing errors
      console.error("Error parsing pax data:", err);
      return "0 A / 0 C"; // Fallback values
    }
  };
  const search = async () => {
    // this function is for fetching trip data as per the date range
    const data = await fetchFilteredTrips(fromDate, toDate);
    setDownload(data);
    const bookings = data
      ? data
          .map(
            (item) =>
              (user &&
                user.profile === "Sales" &&
                user.name !== item.salesSpoc) || {
                arrivalDate: item.arrivalDate,
                departureDate: item.departureDate,
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
                      {renderPax(item.pax)}
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
                transferPrice:
                  user.profile === "Sales"
                    ? "N/A"
                    : (parseFloat(item?.transferPrice) || 0) + " USD",
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
                    onClick={() => {
                      navigate(`/viewAllBooking`, {
                        state: { tripId: item.tripId },
                      });
                    }}
                  >
                    <GrFormView />
                  </button>
                ),
                paymentstat: (
                  <button
                    className={`${
                      item.paymentStatus === "FULL-PAID"
                        ? "bg-green-400"
                        : "bg-red-400"
                    } p-2 rounded-lg`}
                  ></button>
                ),
                validation: (
                  <button
                    className={`${
                      item.validation === "Finance" && "bg-green-400"
                    } ${
                      (item.validation === "Operations" && "bg-blue-400") ||
                      "bg-red-400"
                    }
         p-2 rounded-lg`}
                  ></button>
                ),
                opsstatus: (
                  <button
                    className={`${
                      item.opsStatus === "COMPLETED"
                        ? "bg-green-400"
                        : "bg-red-400"
                    } p-2 rounded-lg`}
                  ></button>
                ),
              }
          )
          .filter((stuff) => stuff !== true)
      : [];
    console.log(bookings, "bookings");
    setBookings(bookings);
  };

  useEffect(() => {
    (async () => {
      const data = await fetchTrips();
      setDownload(data)
      console.log(data, "data");
      const bookings = data
        ? data
            .map(
              (item) =>
                (user &&
                  user.profile === "Sales" &&
                  user.name !== item.salesSpoc) || {
                  arrivalDate: item.arrivalDate,
                  departureDate: item.departureDate,
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
                        {renderPax(item.pax)}
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
                  transferPrice: item?.transferPrice + " USD",
                  orderValue: item.orderValue + " USD",
                  apayment: (
                    <div
                      className={`font-bold ${
                        parseFloat(item.orderValue) ===
                        parseFloat(item?.payment)
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
                      onClick={() =>
                        navigate("/viewAllBooking", { state: item })
                      }
                    >
                      <GrFormView />
                    </button>
                  ),
                  paymentstat: (
                    <button
                      className={`${
                        item.paymentStatus === "FULL-PAID"
                          ? "bg-green-400"
                          : "bg-red-400"
                      } p-2 rounded-lg`}
                    ></button>
                  ),
                  validation: (
                    <button
                      className={`${
                        item.validation === "Finance" && "bg-green-400"
                      } ${item.validation === "Operations" && "bg-blue-400"} ${
                        item.validation === "Finance" ||
                        item.validation === "Operations" ||
                        ("bg-red-400" && "bg-red-400")
                      }
         p-2 rounded-lg`}
                    ></button>
                  ),
                  opsstatus: (
                    <button
                      className={`${
                        item.opsStatus === "COMPLETED"
                          ? "bg-green-400"
                          : "bg-red-400"
                      } p-2 rounded-lg`}
                    ></button>
                  ),
                }
            )
            .filter((stuff) => stuff !== true)
        : [];
      console.log(data, "bookings");
      setBookings(bookings);
    })();
  }, []);

  const col = [
    { Header: "Arrival Dates", accessor: "arrivalDate" },
    { Header: "Departure Dates", accessor: "departureDate" },
    { Header: "Trip ID", accessor: "tripID" },
    { Header: "Destination", accessor: "destination" },
    { Header: "Booking Date", accessor: "bookingDate" },
    { Header: "Sales SPOC", accessor: "salesSPOC" },
    { Header: "Agent", accessor: "agent" },
    { Header: "Customer Name", accessor: "customerName" },
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
      <div className="flex justify-center gap-4 mb-6">
        <div>
          <label htmlFor="fromDate" className="block mb-1">
            From Date
          </label>
          <input
            id="fromDate"
            type="date"
            onChange={(e) => setFromDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="toDate" className="block mb-1">
            To Date
          </label>
          <input
            id="toDate"
            type="date"
            onChange={(e) => setToDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
        <div>
          <button
            onClick={search}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8"
            type="button"
          >
            Filter
          </button>
        </div>
        <div className="mt-8">
          <JsonToExcel data={download}/>
        </div>
      </div>
      <BackToHome />
      <CustomTable dataa={bookings} columnss={col} size="text-xs" />
    </div>
  );
};

export default AllBookings;
