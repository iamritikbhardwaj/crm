import React, { useEffect, useState } from "react";
import BackToHome from "../components/BackToHome";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);

  // Simulate fetching data
  useEffect(() => {
    const mockBookings = [
      {
        tripID: "TRP001",
        customerName: "John Doe",
        pax: "2A/1C",
        destination: "Paris",
        salesSPOC: "Alice",
        agent: "Travel Agent 1",
        travelDates: "2024-12-20 to 2024-12-30",
        orderValue: 5000,
        payment: "Full Paid",
        status: "Confirmed",
        opsStatus: "Green",
      },
      {
        tripID: "TRP002",
        customerName: "Jane Smith",
        pax: "3A",
        destination: "New York",
        salesSPOC: "Bob",
        agent: "Travel Agent 2",
        travelDates: "2024-11-15 to 2024-11-25",
        orderValue: 7000,
        payment: "Part-Paid",
        status: "Ongoing",
        opsStatus: "Orange",
      },
    ];
    setBookings(mockBookings);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <BackToHome />
      <h1 className="text-3xl font-bold text-center mb-4">All Bookings</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              {[
                "Trip ID",
                "Customer Name",
                "Pax",
                "Destination",
                "Sales SPOC",
                "Agent",
                "Travel Dates",
                "Order Value",
                "Payment",
                "Status",
                "Ops Status",
              ].map((header) => (
                <th key={header} className="border px-4 py-2 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.tripID} className="hover:bg-gray-100">
                {Object.values(booking).map((value, index) => (
                  <td key={index} className="border px-4 py-2">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBookings;