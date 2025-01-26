import React, { useEffect, useState } from "react";
import BackToHome from "../components/BackToHome";
import { CustomTable } from "../components/customTable/CustomTable";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../AppConstant";

export function getTravelMonthRange(arrivalDate) {
    const arrival = new Date(arrivalDate); // Convert to Date object
  
    const arrivalMonth = arrival.getMonth(); // Zero-based month
  
    const arrivalYear = arrival.getFullYear(); // Year of arrival
  
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const arrivalMonthName = months[arrivalMonth];
    return `${arrivalMonthName} ${arrivalYear}`;
  }

const NewBooking = () => {
  // Initialize booking as an empty array
  const [booking, setBooking] = useState([]);
  const navigate = useNavigate();

  // Define columns
  const col = [
    { Header: "Booking ID", accessor: "booking_id" },
    { Header: "Destination", accessor: "destination" },
    { Header: "Booking Date", accessor: "bookingDate" },
    { Header: "Sales SPOC", accessor: "salesSpoc" },
    { Header: "Agent", accessor: "agent" },
    { Header: "Customer Details", accessor: "customerDetails" },
    { Header: "Arrival Dates", accessor: "arrivalDate" },
    { Header: "Departure Dates", accessor: "departureDate" },
    { Header: "Travel Month", accessor: "travelMonth" },
    { Header: "Contact Details", accessor: "contactDetails" },
    { Header: "Order Value", accessor: "orderValue" },
    { Header: "Action", accessor: "action" },
  ];

  // Simulate fetching data
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${API_URL}users/getAllBookings`, {
          withCredentials: true,
          headers: {
            "content-type": "application/json",
          },
        });

        const bookings = response.data.OUTPUT; // Assuming response is structured this way
        console.log(bookings, "Bookings data");
        // Map the bookings data to your desired structure
        const processedData = bookings.map((item) => ({
          booking_id: item.booking_id.slice(0, 6),
          destination: item.destination,
          bookingDate: item.bookingDate.slice(0, 10),
          salesSpoc: item.salesSpoc,
          agent: item.agent,
          customerDetails: <div className="leading-[0.7]">
          <p>{item.customerName}</p> <br />
          <p>{item.pax?.A} A / {item.pax?.C} C</p>
          </div>,
          arrivalDate: item.arrivalDate.slice(0, 10),
          departureDate: item.departureDate.slice(0, 10),
          travelMonth: getTravelMonthRange(item.arrivalDate),
          contactDetails: `${item.countryCode} / ${item.whatsappNumber}`,
          orderValue: item.orderValue,
          action: (
            <button onClick={() => navigate("/viewBooking", { state: item })}>
              <FaInfoCircle />
            </button>
          ),
        }));

        setBooking(processedData); // Set the state with processed data
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [navigate]); 

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