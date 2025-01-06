import React, { useState } from "react";
import BackToHome from "../components/BackToHome";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { API_URL } from "../AppConstant";
import { useNavigate } from "react-router-dom";

const AddBooking = () => {
  const sections = ["Booking Details", "Travel Details", "Order & Contact Details", "Documents Upload"];
  const [currentSection, setCurrentSection] = useState(0);
  const [bookingid, setBookingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const bookingSchema = z.object({
    destination: z.string().min(1, { message: "Destination is required" }),
    salesSpoc: z.string().min(1, { message: "Sales SPOC is required" }),
    agent: z.string().min(1, { message: "Agent is required" }),
    customerName: z.string().min(1, { message: "Customer Name is required" }),
    arrivalDate: z.string().min(1, { message: "Arrival Date is required" }),
    departureDate: z.string().min(1, { message: "Departure Date is required" }),
    pax: z.object({
      A: z.string().min(1, { message: "Adults is required" }),
      C: z.string().optional(),
      Ca: z.array(z.string()).optional(),
    }),
    orderValue: z.string().min(1, { message: "Order Value is required" }),
    countryCode: z.string().min(1, { message: "Country Code is required" }),
    whatsappNumber: z.string().min(1, { message: "WhatsApp Number is required" }),
    documents: z.array(
      z.object({
        file: z
          .instanceof(File, { message: "Must be a valid file" })
          .refine(file => file.size <= 5 * 1024 * 1024, { // Max size 5MB
            message: 'File size must be less than 5MB'
          })
          .refine(file => ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type), {
            message: 'File must be PDF, JPEG, or PNG'
          })
      })
    ),
  });

  const { register, handleSubmit, setValue, watch, control, getValues, formState: { errors } } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  // Add New Document
  const handleFileUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    // Update the form data immediately with the file
    const currentDocs = getValues("documents") || [];
    const updatedDocs = [...currentDocs];
    updatedDocs[index] = { file };
    setValue("documents", updatedDocs);

    if (bookingid) {
        const fileData = new FormData();
        fileData.append('file', file);
        
        try {
            const response = await axios.post(
                `${API_URL}users/uploadFile?id=${bookingid}`, 
                fileData, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            
            console.log("File upload response:", response);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }
};
 
  const addDocument = () => {
    // Add an empty document object to the documents array
    const currentDocs = getValues("documents") || [];
    currentDocs.push({ file: null, preview: null, url: null });
    setValue("documents", currentDocs);
  };

  const removeDocument = (index) => {
    const currentDocs = getValues("documents") || [];
    if (index >= 0 && index < currentDocs.length) {
      currentDocs.splice(index, 1); // Remove the document at the specified index
      setValue("documents", currentDocs); // Update the documents array
    }
  };

  console.dir(errors, "errors");


const bookingSubmit = async (data) => {
  console.log("Current section:", currentSection);
  console.log("Form data before submission:", data);

  if (currentSection < sections.length - 1) {
    // If not on the last section, just move to next section
    setCurrentSection(currentSection + 1);
    return;
  }

  // Only proceed with API submission on the last section
  setIsSubmitting(true);
  try {
    const formattedData = {
      destination: data.destination,
      salesSpoc: data.salesSpoc,
      agent: data.agent,
      customerName: data.customerName,
      pax: {
        A: parseInt(data.pax.A),
        C: parseInt(data.pax.C || 0),
        Ca: data.pax.Ca || []
      },
      arrivalDate: data.arrivalDate,
      departureDate: data.departureDate,
      orderValue: parseFloat(data.orderValue),
      countryCode: data.countryCode,
      whatsappNumber: data.whatsappNumber,
      documents: data.documents || []
    };

    console.log("Formatted data for submission:", formattedData);

    console.log(data, "data");

    const response = await axios.post(
      `${API_URL}users/createBooking`, 
      formattedData,
      {
        withCredentials: true,
        headers: {
          "content-type": "application/json"
        }
      }
    );

    console.log("API Response:", response);
    
    if (response.status === 200) {
      setBookingId(response.data?.OUTPUT?.booking_id);
      // Handle successful submission (e.g., show success message, redirect)
    }
  } catch (error) {
    console.error("Submission error:", error);
    // Handle error (e.g., show error message)
  } finally {
    setIsSubmitting(false);
    // navigate("/booking");
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
              {errors.destination && <p className="text-red-500">{errors.destination.message}</p>}
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
        {currentSection === 2 && (
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
        {currentSection === 3 && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={addDocument}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Document
            </button>

             {/* Document Input Fields */}
  {(watch("documents") || []).map((doc, index) => (
    <div key={index} className="flex flex-col space-y-2 mt-4">
      <div className="flex items-center space-x-4">
     
    <div className="flex items-center space-x-4">
      <Controller
        name={`documents.${index}.file`}
        control={control}
        render={({ field }) => (
          <input
            type="file"
            {...field}
            className="w-1/2 border rounded px-3 py-2"
          />
        )}  
        defaultValue={""}
        />     
      <button
        type="button"
        onClick={() => removeDocument(index)}
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
      </div>

      {/* Preview */}
      {doc.file && doc.file instanceof Blob && (
  <div>
    <p className="text-sm font-semibold">Preview:</p>
    <a
      href={URL.createObjectURL(doc.file)}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >
      {doc.file.name}
    </a>
  </div>
)}

    </div>
  ))
}
          </div>
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
