import React, { useEffect, useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import BackToHome from "../components/BackToHome";
import { useLocation, useNavigate } from "react-router-dom";
import { getTravelMonthRange } from "./Booking";
import axios from "axios";
import { API_URL } from "../AppConstant";
import Swal from "sweetalert2";
import FileUpload from "../components/Input/FileUpload";
import { fetchUsers } from "../components/data/fetchData";

export default function VeiwBooking() {

  // data from table on previous page
  const location = useLocation();
  const data = location.state;

  // to navigate b/w sections
  const [active, setActive] = useState(0); // Section toggle

  const [doc, setDoc] = useState(data.documents);
  const [opsSpoc, setOpsSpoc] = useState('');
  const [inputData, setInputData] = useState({...data, documents: doc, opsSpoc: ''});

  useEffect(() => {
    (async () => {
      const data = await fetchUsers()
if (data) {
        setOpsSpoc(data.filter((user) => user.profile === 'Operations'));
        console.log(opsSpoc, 'ops');
}    })();
  }, []);

  const addDoc = (e, catagory) => {
    const files = e.target.files;
    console.log(files, 'files');
    
    if(files.length > 0){
      Array.from(files).forEach((file) => {
        const fileURL = URL.createObjectURL(file);
          if(doc){        
            setDoc((prevDoc) => [...prevDoc, { file, url: fileURL, catagory: catagory }]);
          }else{
            setDoc([{ file, url: fileURL, catagory: catagory }]);
          }
        })
    };
  };  
  
  const removeDoc = (index) => {
    const updatedDoc = doc.filter((_, i) => i !== index);
    setDoc(updatedDoc)
  }

  const navigate = useNavigate();

  // Accept Booking is to set booking status to confirmed also add salesSpoc
  const acceptBooking = async() => {
    await submit();
    Swal.fire({
      icon: 'success',
      title: 'Trip has been created!',
      showConfirmButton: false,
      timer: 1500
    }).then(async()=>{
      rejectBooking();
    })
  };



  // Reject Booking is to delete the booking
  const rejectBooking = async() => {
   try {
    console.log(data.booking_id, 'booking id');
     const response = await axios.delete(`${API_URL}users/deleteBooking/${data.booking_id}`,{
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.status === 200) {
      Swal.fire("Trip has been created successfully");
      navigate('/booking')
    } else {
      Swal.fire("Error deleting booking. Please try again later.");
      navigate('/booking')
    }
   } catch (error) {
    console.log(error);
   }
  };

  const submit = async () => {
    const formData = {
      ...inputData
    }
    const response = await axios.post(`${API_URL}users/createTrip`, formData,
    {
       withCredentials: true,
        headers: {
         "Content-Type": "application/json",
       },
     });
     if (response.status === 200) {
      (async (data) => {
        const response = await axios.get(`${API_URL}users/deleteBooking/${data.booking_id}`, {
        withCredentials: true,
        headers: {
          "content-type": "application/json"
        }
      });
      if (response.status === 200) {
        console.log(response, 'response');
      } else {
        Swal.fire("Error creating trip. Please try again later.");
        navigate('/booking')
      }
      })(data);
     }
    }

  return (
    <div className="p-4">
    <BackToHome path="/booking" />
      <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white shadow-lg rounded-lg mt-8">
        <h1 className="text-2xl font-bold text-center mb-6">View Booking</h1>

        {/* Booking Details */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold bg-gray-200 p-2 rounded flex justify-between">
            Booking Details
            <span onClick={() => setActive(active === 0 ? null : 0)}>
              <IoIosArrowDropdownCircle />
            </span>
          </h2>
          <div className={`${active === 0 ? "block" : "hidden"} grid grid-cols-2 gap-4 p-4`}>
            {[
              ["Destination", data.destination],
              ["Sales Spoc", data.salesSpoc],
              ["Agent", data.agent],
              ["Customer Name", data.customerName],
              ["Number of Pax", data.pax.A + data.pax.C],
              ["Travel Month", getTravelMonthRange(data.arrivalDate, data.departureDate)],
              ["Arrival Date", data.arrivalDate.slice(0, 10)],
              ["Departure Date", data.departureDate.slice(0, 10)],
              ["Booking Date", data.bookingDate.slice(0, 10)],
              ["WhatsApp Number",data.countryCode + " " + data.whatsappNumber],
              ["Ops Spoc",
              <select onChange={(e) => {
                setInputData({...inputData, opsSpoc: e.target.value})
                  console.log(inputData, 'inputData');
                }}>
        {opsSpoc.length > 0 && opsSpoc.map((user, index) => (
          <option key={index} value={user.name}>
    {user.name}
          </option>
        ))}
      </select>
              ], // ask client where will this come from
            ].map(([label, value], index) => (
              <div key={index} className="flex space-x-3">
                <label className="font-semibold">{label}:</label>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Document Upload */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold bg-gray-200 p-2 rounded flex justify-between">
            Document Upload
            <span onClick={() => setActive(active === 1 ? null : 1)}>
              <IoIosArrowDropdownCircle />
            </span>
          </h2>
          <div className={`p-4 ${active === 1 ? "block" : "hidden"}`}>
            <div className="flex">
              {/* Document Upload List */}
              <div className="w-1/2 border-r border-gray-300 px-2 space-y-2">
                {/* <ul>
                    <li className="flex justify-between mb-2">
                      <span>Air Ticket:</span>
                      <input
                        type="file"
                        accept="application/pdf,image/*"
                        className="hidden"
                        id="airTicket"
                        onChange={addAirTicket}
                      />
                      <label
                        htmlFor="airTicket"
                        className="bg-blue-600 text-white px-2 py-1 rounded-lg cursor-pointer hover:bg-blue-700"
                      >
                        Upload
                      </label>
                    </li>
                    <li className="flex justify-between mb-2">
                      <span>Passport:</span>
                      <input
                        type="file"
                        accept="application/pdf,image/*"
                        className="hidden"
                        id={`passport`}
                        onChange={(e) => addPassport(e)}
                      />
                      <label
                        htmlFor={`passport`}
                        className="bg-blue-600 text-white px-2 py-1 rounded-lg cursor-pointer hover:bg-blue-700"
                      >
                        Upload
                      </label>
                    </li>
                    <li className="flex justify-between mb-2">
                      <span>PAN:</span>
                      <input
                        type="file"
                        accept="application/pdf,image/*"
                        className="hidden"
                        id={`pan`}
                        onChange={(e) => addPan(e)}
                      />
                      <label
                        htmlFor={`pan`}
                        className="bg-blue-600 text-white px-2 py-1 rounded-lg cursor-pointer hover:bg-blue-700"
                      >
                        Upload
                      </label>
                    </li>
                    <li className="flex justify-between mb-2">
                      <span>Miscleanious:</span>
                      <input
                        type="file"
                        accept="application/pdf,image/*"
                        className="hidden"
                        id={`misc`}
                        onChange={(e) => addMisc(e)}
                      />
                      <label
                        htmlFor={`misc`}
                        className="bg-blue-600 text-white px-2 py-1 rounded-lg cursor-pointer hover:bg-blue-700"
                      >
                        Upload
                      </label>
                    </li>
                    <li className="flex justify-between mb-2">
                      <span>Email Confirmation:</span>
                      <input
                        type="file"
                        accept="application/pdf,image/*"
                        className="hidden"
                        id={`emailConf`}
                        onChange={(e) => addEmailConf(e)}
                      />
                      <label
                        htmlFor={`emailConf`}
                        className="bg-blue-600 text-white px-2 py-1 rounded-lg cursor-pointer hover:bg-blue-700"
                      >
                        Upload
                      </label>
                    </li>
                </ul> */}
                <FileUpload label={"Air Ticket"} id={"airTicket"} onChange={addDoc} onRemove={removeDoc} files={doc} catagory={"airTicket"} />
                <FileUpload label={"Passport"} id={"passport"} onChange={addDoc} onRemove={removeDoc} files={doc} catagory={"passport"} />
                <FileUpload label={"PAN"} id={"pan"} onChange={addDoc} onRemove={removeDoc} files={doc} catagory={"pan"} />
                <FileUpload label={"Misceleanious"} id={"misc"} onChange={addDoc} onRemove={removeDoc} files={doc} catagory={"misc"} />
                <FileUpload label={"Email Confirmation"} id={"emailConf"} onChange={addDoc} onRemove={removeDoc} files={doc} catagory={"emailConf"} />
              </div>

              {/* Document Preview */}
              <div className="w-1/2 pl-4">
                <ul>
                  {doc ? doc.map((file, index) => (
                    (file.catagory !== "freezeQuotation" && (
                    <li className="space-x-2" key={index}>
                      <a href={file.url} target="_blank" rel="noopener noreferrer">
                        {file.file.name}
                      </a>
                      <button className="text-red-400 rounded-lg cursor-pointer hover:text-red-700" onClick={() => removeDoc(index)}>Remove</button>
                    </li>))
                  )): "No documents uploaded"}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Commercials */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold bg-gray-200 p-2 rounded flex justify-between">
            Commercials
            <span onClick={() => setActive(active === 2 ? null : 2)}>
              <IoIosArrowDropdownCircle />
            </span>
          </h2>
          <div className={`p-4 ${active === 2 ? "block" : "hidden"}`}>
            <label className="font-semibold">Order Value (USD):</label>
            <input
              type="text"
              value={data.orderValue}
              onChange={(e) => console.log(e.target.value)}
              className="w-full p-2 border rounded mt-2"
            />
          </div>
        </div>

        {/* Freeze Quotation */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold bg-gray-200 p-2 rounded flex justify-between">
            Freeze Quotation
            <span onClick={() => setActive(active === 3 ? null : 3)}>
              <IoIosArrowDropdownCircle />
            </span>
          </h2>
          <div className={`p-4 flex ${active === 3 ? "" : "hidden"}`}>
            <div className="w-1/2 border-r px-4 border-gray-300">
            <FileUpload label={"Sales Sheet"} id={"misc"} onChange={addDoc} onRemove={removeDoc} files={doc} catagory={"misc"} toAccept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />         
      </div>
            <div className="w-1/2 pl-4">
                <ul>
                  {doc ? doc.map((file, index) => (
                    (file.catagory === "freezeQuotation" && (<li className="space-x-2" key={index}>
                      <a href={file.url} target="_blank" rel="noopener noreferrer">
                        {file.file.name}
                      </a>
                      <button className="text-red-400 cursor-pointer hover:text-red-700" onClick={() => removeDoc(index)}>Remove</button>
                    </li>))
                  )): "No documents uploaded"}
                </ul>
              </div>
         </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 flex justify-between">
          <button
            onClick={acceptBooking}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Accept Booking
          </button>
          <button
            onClick={rejectBooking}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          >
            Reject Booking
          </button>
        </div>
      </div>
    </div>
  );
};