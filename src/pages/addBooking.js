import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { z } from "zod";
import { API_URL } from "../AppConstant";
import BackToHome from "../components/BackToHome";
import FileUpload from "../components/Input/FileUpload";

const AddBooking = () => {
  const sections = ["Booking Details", "Travel Details", "Order & Contact Details", "Documents Upload"];
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  const bookingSchema = z.object({
    destination: z.string().min(1, { message: "Destination is required" }),
    salesSpoc: z.string().min(1, { message: "Sales SPOC is required" }),
    agent: z.string().min(1, { message: "Agent is required" }),
    customerName: z.string().min(1, { message: "Customer Name is required" }),
    arrivalDate: z.string().min(1, { message: "Arrival Date is required" }).refine(
      (value) => 
      new Date(value) > new Date()
    ,
    {
      message: "Arrival Date must be in the future",
    }),
    departureDate: z.string().min(1, { message: "Departure Date is required" }).refine(
      (value) => 
        new Date(value) > new Date(watch("arrivalDate"))
      ,
      {
        message: "Departure Date must be after Arrival Date",
      }
    ),
    pax: z.object({
      A: z.string().min(1, { message: "Adults is required" }),
      C: z.string().optional(),
      Ca: z.array(z.string().max(11)).optional(),
    }),
    orderValue: z.string().min(1, { message: "Order Value is required" }),
    countryCode: z.string().min(1, { message: "Country Code is required" }),
    whatsappNumber: z.string().min(1, { message: "WhatsApp Number is required" }),
  });

  const { register, handleSubmit, setValue, watch, control, getValues, formState: { errors } } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  // Add New Document
 
const addDocument = (e, catagory) => {
  const files = e.target.files;
  if(files.length > 0){
    Array.from(files).forEach((file) => {
      const fileURL = URL.createObjectURL(file);
      setDocuments((prevDocs) => [...prevDocs, { file, url: fileURL, catagory: catagory }]);
    })
  };
};

const removeDocument = (index) => {
  const updatedDocs = documents.filter((_, i) => i !== index);
  setDocuments(updatedDocs);
};

  console.dir(errors, "errors");


  const bookingSubmit = async (data) => {
    console.log("Form data before submission:", data);
  
    const formData = {
      ...data,
      documents
    };
    
    console.log(formData, 'formData');
  
    // Submit the form data
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `${API_URL}users/createBooking`, 
        formData, 
        { 
          withCredentials: true,
          headers: { "Content-Type": "Application/json" } // Use multipart/form-data for file uploads
        }
      );
      console.log("Response", response);

      if (response.status !== 200) {
        Swal.fire("Failed to submit the booking");
      }else{
        Swal.fire("Booking submitted successfully");
      }
  
      // Handle response (e.g., navigate or show success message)
      navigate("/booking");
    } catch (error) {
      console.error("Error submitting the booking:", error);
      // Optionally, handle error (e.g., show error message to the user)
    } finally {
      setIsSubmitting(false);
    }
  };
  

  

  // Navigation Functions
  const goToNext = () => {
    if (currentSection < sections.length - 1) setCurrentSection(currentSection + 1);
  };

  const goToPrevious = () => {
    if (currentSection > 0) setCurrentSection(currentSection - 1);
  };

  // Handle form submission


  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <BackToHome />
      <h1 className="text-3xl font-bold text-center mb-6">Create New Booking</h1>

      <form onSubmit={handleSubmit(bookingSubmit)} className="bg-white shadow-md rounded p-6">
        {/* Section Header */}
        <h2 className="text-2xl font-semibold text-center mb-4">{sections[currentSection]}</h2>

        {/* Booking Details */}
        {currentSection === 0 && (
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Destination</label>
              <select
                name="destination"
                id="destination"
                {...register("destination")}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Destination</option>
                <option value="Paris">Paris</option>
                <option value="New York">New York</option>
                <option value="Tokyo">Tokyo</option>
              </select>
              {errors.destination && <p className="text-red-500">{errors.destination.message}</p> && Swal.fire(errors.destination.message)}
            </div>

            <div>
              <label className="block mb-2">Sales SPOC</label>
              <select
                name="salesSpoc"
                id="salesSpoc"
                {...register("salesSpoc")}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Destination</option>
                <option value="Paris">Paris</option>
                <option value="New York">New York</option>
                <option value="Tokyo">Tokyo</option>
              </select>
              {errors.salesSpoc && <p className="text-red-500">{errors.salesSpoc.message}</p>}
            </div>

            <div>
              <label className="block mb-2">Agent</label>
              <input
                type="text"
                name="agent"
                id="agent"
                {...register("agent")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.agent && <p className="text-red-500">{errors.agent.message}</p>}
            </div>
            <div>
              <label className="block mb-2">Customer Name</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                {...register("customerName")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.customerName && <p className="text-red-500">{errors.customerName.message}</p>}
            </div>
          </div>
        )}

        {/* Travel Details */}
        {currentSection === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Arrival Date</label>
              <input
                type="date"
                name="arrivalDate"
                id="arrivalDate"
                {...register("arrivalDate")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.arrivalDate && <p className="text-red-500">{errors.arrivalDate.message}</p>}
            </div>
            <div>
              <label className="block mb-2">Departure Date</label>
              <input
                type="date"
                name="departureDate"
                id="departureDate"
                {...register("departureDate")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.departureDate && <p className="text-red-500">{errors.departureDate.message}</p>}
            </div>

            <div>
              <label className="block mb-2">Number of Passengers (Adults)</label>
              <input
                type="number"
                name="A"
                id="A"
                {...register("pax.A")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.pax?.A && <p className="text-red-500">{errors.pax.A.message}</p>}
            </div>

            <div>
              <label className="block mb-2">Number of Children</label>
              <input
                type="number"
                name="C"
                id="C"
                {...register("pax.C")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.pax?.C && <p className="text-red-500">{errors.pax.C.message}</p>}
            </div>

            {Array.from({ length: watch("pax.C") || 0 }).map((_, index) => (
                <div key={index}>
                  <label className="block mb-2">Child {index + 1} Age</label>
                  <input
                    type="number"
                    name={`Ca${index}`}
                    id={`Ca${index}`}
                    {...register(`pax.Ca.${index}`)}
                    className="w-full border rounded px-3 py-2"
                  />
                  {errors.pax?.Ca?.[index] && <p className="text-red-500">{errors.pax.Ca[index].message}</p>}
                </div>
              ))}
          </div>
        )}

        {/* Order & Contact Details */}
        {currentSection === 3 && (
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block mb-2">Country Code</label>
                <select
                  name="countryCode"
                  id="countryCode"
                  {...register("countryCode")}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="+1">🇺🇸 +1 (USA)</option>
                  <option value="+44">🇬🇧 +44 (UK)</option>
                  <option value="+91">🇮🇳 +91 (India)</option>
                  <option value="+61">🇦🇺 +61 (Australia)</option>
                  <option value="+81">🇯🇵 +81 (Japan)</option>
                </select>
              </div>
              <div className="w-1/2">
                <label className="block mb-2">WhatsApp Number</label>
                <input
                  type="tel"
                  name="whatsappNumber"
                  id="whatsappNumber"
                  {...register("whatsappNumber")}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter phone number"
                />
                {errors.whatsappNumber && <p className="text-red-500">{errors.whatsappNumber.message}</p>}
              </div>
            </div>

            <div>
              <label className="block mb-2">Order Value</label>
              <input
                type="number"
                name="orderValue"
                id="orderValue"
                {...register("orderValue")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.orderValue && <p className="text-red-500">{errors.orderValue.message}</p>}
            </div>
          </div>
        )}

        {/* Documents Upload */}
        {currentSection === 2 && (
          <>
          <h3 className="text-2xl font-bold mb-4">Documents Upload</h3>
          <div className={`p-4 `}>
          <div className="flex">
            {/* Document Upload List */}
            <div className="w-1/2 border-r border-gray-300 px-2 space-y-2">
              <FileUpload label={"Air Ticket"} id={"airTicket"} onChange={addDocument} onRemove={removeDocument} files={documents} catagory={"airTicket"} />
              <FileUpload label={"Passport"} id={"passport"} onChange={addDocument} onRemove={removeDocument} files={documents} catagory={"passport"} />
              <FileUpload label={"PAN"} id={"pan"} onChange={addDocument} onRemove={removeDocument} files={documents} catagory={"pan"} />
              <FileUpload label={"Misceleanious"} id={"misc"} onChange={addDocument} onRemove={removeDocument} files={documents} catagory={"misc"} />
              <FileUpload label={"Email Confirmation"} id={"emailConf"} onChange={addDocument} onRemove={removeDocument} files={documents} catagory={"emailConf"} />
            </div>

            {/* Document Preview */}
            <div className="w-1/2 pl-4">
              <ul>
                {documents.length > 0 ? documents.map((doc, index) => (
                  <li className="space-x-2" key={index}>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                      {doc.file.name}
                    </a>
                    <button className="text-red-400 hover:text-red-700" onClick={() => removeDocument(index)}>Remove</button>
                  </li>
                )): "No documents uploaded"}
              </ul>
            </div>
          </div>
        </div>
          </>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={goToPrevious}
            className={`px-4 py-2 bg-gray-400 text-white rounded ${currentSection === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={currentSection === 0}
          >
            Previous
          </button>
          <button
          type={isSubmitting ? "submit" : "button"}
          onClick={currentSection === sections.length - 1 ? handleSubmit(bookingSubmit) : goToNext}
          // disabled={isSubmitting}
          className={`px-4 py-2 ${
            currentSection === sections.length - 1 
              ? "bg-green-500" 
              : "bg-blue-500"
          } text-white rounded`}
        >
          {currentSection === sections.length - 1
            ? "Submit" 
              : "Next"
          }
        </button>
        </div>
      </form>
    </div>
  );
};

export default AddBooking;
