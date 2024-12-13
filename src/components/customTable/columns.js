const bookingColumns = [
    {
      Header: 'Booking ID',
      accessor: 'bookingId', // Column accessor for Booking ID
      Cell: ({ value }) => <span>{value}</span> // Custom rendering if necessary
    },
    {
      Header: 'Destination',
      accessor: 'destination', // Column accessor for Destination
      Cell: ({ value }) => <span>{value}</span> // Custom rendering if necessary
    },
    {
      Header: 'Booking Date',
      accessor: 'bookingDate', // Column accessor for Booking Date
      Cell: ({ value }) => <span>{new Date(value).toLocaleDateString()}</span> // Format date
    },
    {
      Header: 'Sales SPOC',
      accessor: 'salesSPOC', // Column accessor for Sales SPOC
      Cell: ({ value }) => <span>{value}</span> // Custom rendering if necessary
    },
    {
      Header: 'Agent',
      accessor: 'agentDetails', // Column accessor for Agent Details
      Cell: ({ value }) => <span>{value}</span> // Custom rendering if necessary
    },
    {
      Header: 'Customer Name',
      accessor: 'customerName', // Column accessor for Customer Name
      Cell: ({ value }) => <span>{value}</span> // Custom rendering if necessary
    },
    {
      Header: 'Number of Pax',
      accessor: 'numOfPax', // Column accessor for Number of Pax
      Cell: ({ value }) => <span>{value}</span> // Custom rendering if necessary
    },
    {
      Header: 'Arrival Date',
      accessor: 'arrivalDate', // Column accessor for Arrival Date
      Cell: ({ value }) => <span>{new Date(value).toLocaleDateString()}</span> // Format date
    },
    {
      Header: 'Departure Date',
      accessor: 'departureDate', // Column accessor for Departure Date
      Cell: ({ value }) => <span>{new Date(value).toLocaleDateString()}</span> // Format date
    },
    {
      Header: 'Travel Month',
      accessor: 'travelMonth', // Column accessor for Travel Month
      Cell: ({ value }) => <span>{value}</span> // Custom rendering if necessary
    },
    {
      Header: 'Country Code',
      accessor: 'countryCode', // Column accessor for Country Code
      Cell: ({ value }) => <span>{value}</span> // Custom rendering if necessary
    },
    {
      Header: 'Order Value',
      accessor: 'orderValue', // Column accessor for Order Value
      Cell: ({ value }) => <span>{value}</span> // Custom rendering if necessary
    },
    {
      Header: 'Whatsapp Number',
      accessor: 'whatsappNumber', // Column accessor for Whatsapp Number
      Cell: ({ value }) => <span>{value}</span> // Custom rendering if necessary
    },
    {
      Header: 'Booking Documents',
      accessor: 'bookingDocuments', // Column accessor for Booking Documents
      Cell: ({ value }) => (
        <ul>
          {value.map((doc, index) => (
            <li key={index}>{doc}</li>
          ))}
        </ul>
      ) // Render list of documents
    },
    {
      Header: 'Booking Sheets',
      accessor: 'bookingSheets', // Column accessor for Booking Sheets
      Cell: ({ value }) => (
        <ul>
          {value.map((sheet, index) => (
            <li key={index}>{sheet}</li>
          ))}
        </ul>
      ) // Render list of booking sheets
    },
    {
      Header: 'Action',
      accessor: 'action', // Column accessor for Action
      Cell: ({ value }) => (
        <div>
          {value} {/* Assuming this is a button or link to view/manage */}
        </div>
      )
    }
  ];
  
  export default bookingColumns;  