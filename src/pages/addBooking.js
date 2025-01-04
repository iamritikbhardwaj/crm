import React, { useState } from "react";
import BackToHome from "../components/BackToHome";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { set } from "mongoose";
import { API_URL } from "../AppConstant";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBooking = () => {
  const sections = ["Booking Details", "Travel Details", "Order & Contact Details", "Documents Upload"];
  const [currentSection, setCurrentSection] = useState(0);
  const [bookingid, setBookingId] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: "",
    salesSpoc: "",
    agent: "",
    customerName: "",
    pax: { A: 0, C: 0, Ca: [] },
    arrivalDate: "",
    departureDate: "",
    orderValue: "",
    countryCode: '',
    whatsappNumber: "",
    documents: [],
  });

  const bookingSchema = z.object({
    destination: z.string().min(1, { message: "Destination is required" }),
    salesSpoc: z.string().min(1, { message: "Sales SPOC is required" }),
    agent: z.string().min(1, { message: "Agent is required" }),
    customerName: z.string().min(1, { message: "Customer Name is required" }),
    arrivalDate: z.string().min(1, { message: "Arrival Date is required" }),
    departureDate: z.string().min(1, { message: "Departure Date is required" }),
    pax: z.object({
      A: z.string().min(1, { message: "Adults is required" }),
      C: z.string().min(0, { message: "Children is required" }).optional(),
      Ca: z.array(z.string()).optional(),
    }),
    orderValue: z.string().min(1, { message: "Order Value is required" }),
    countryCode: z.string().min(1, { message: "Country Code is required" }),
    whatsappNumber: z.string().min(1, { message: "WhatsApp Number is required" }),
    documents: z.array(z.object({ file: z.instanceof(File) })),
  });

  const { register, handleSubmit, setValue, watch, getValues, formState: { errors } } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      pax: { A: "0", C: "0", Ca: [] },
      documents: []
    }
  });

  // Add New Document
  const handleFileUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Get the current documents array
      const currentDocs = [...(getValues("documents") || [])];
      
      // Update the document at the specified index
      currentDocs[index] = {
        file: file,
        preview: URL.createObjectURL(file)
      };

      // Update the form
      setValue("documents", currentDocs);
    } catch (error) {
      console.error("Error handling file:", error);
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

  const countryData = [
    { code: '+1', flag: '🇺🇸', name: 'USA' },
    { code: '+1', flag: '🇨🇦', name: 'Canada' },
    { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+61', flag: '🇦🇺', name: 'Australia' },
    { code: '+81', flag: '🇯🇵', name: 'Japan' },
    { code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: '+33', flag: '🇫🇷', name: 'France' },
    { code: '+39', flag: '🇮🇹', name: 'Italy' },
    { code: '+34', flag: '🇪🇸', name: 'Spain' },
    { code: '+55', flag: '🇧🇷', name: 'Brazil' },
    { code: '+7', flag: '🇷🇺', name: 'Russia' },
    { code: '+52', flag: '🇲🇽', name: 'Mexico' },
    { code: '+27', flag: '🇿🇦', name: 'South Africa' },
    { code: '+61', flag: '🇳🇿', name: 'New Zealand' },
    { code: '+82', flag: '🇰🇷', name: 'South Korea' },
    { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
    { code: '+66', flag: '🇹🇭', name: 'Thailand' },
    { code: '+63', flag: '🇵🇭', name: 'Philippines' },
    { code: '+20', flag: '🇪🇬', name: 'Egypt' },
    { code: '+20', flag: '🇸🇾', name: 'Syria' },
    { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
    { code: '+90', flag: '🇹🇷', name: 'Turkey' },
    { code: '+31', flag: '🇳🇱', name: 'Netherlands' },
    { code: '+32', flag: '🇧🇪', name: 'Belgium' },
    { code: '+41', flag: '🇨🇭', name: 'Switzerland' },
    { code: '+45', flag: '🇩🇰', name: 'Denmark' },
    { code: '+47', flag: '🇳🇴', name: 'Norway' },
    { code: '+46', flag: '🇸🇪', name: 'Sweden' },
    { code: '+351', flag: '🇵🇹', name: 'Portugal' },
    { code: '+53', flag: '🇨🇺', name: 'Cuba' },
    { code: '+354', flag: '🇮🇸', name: 'Iceland' },
    { code: '+354', flag: '🇮🇸', name: 'Iceland' },
    { code: '+357', flag: '🇨🇾', name: 'Cyprus' },
    { code: '+233', flag: '🇬🇭', name: 'Ghana' },
    { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
    { code: '+30', flag: '🇬🇷', name: 'Greece' },
    { code: '+358', flag: '🇫🇮', name: 'Finland' },
    { code: '+972', flag: '🇮🇱', name: 'Israel' },
    { code: '+359', flag: '🇧🇬', name: 'Bulgaria' },
    { code: '+974', flag: '🇶🇦', name: 'Qatar' },
    { code: '+218', flag: '🇱🇾', name: 'Libya' },
    { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
    { code: '+231', flag: '🇱🇷', name: 'Liberia' },
    { code: '+855', flag: '🇰🇭', name: 'Cambodia' },
    { code: '+226', flag: '🇧🇫', name: 'Burkina Faso' },
    { code: '+960', flag: '🇲🇻', name: 'Maldives' },
    { code: '+965', flag: '🇰🇼', name: 'Kuwait' },
    { code: '+592', flag: '🇬🇾', name: 'Guyana' },
    { code: '+977', flag: '🇳🇵', name: 'Nepal' },
    { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
    { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
    { code: '+855', flag: '🇰🇭', name: 'Cambodia' },
    { code: '+229', flag: '🇧🇯', name: 'Benin' },
    { code: '+251', flag: '🇪🇹', name: 'Ethiopia' },
    { code: '+254', flag: '🇰🇪', name: 'Kenya' },
    { code: '+268', flag: '🇸🇿', name: 'Eswatini' },
    { code: '+264', flag: '🇳🇦', name: 'Namibia' },
    { code: '+263', flag: '🇿🇼', name: 'Zimbabwe' },
    { code: '+254', flag: '🇰🇪', name: 'Kenya' },
    { code: '+850', flag: '🇰🇵', name: 'North Korea' },
    { code: '+252', flag: '🇸🇴', name: 'Somalia' },
    { code: '+679', flag: '🇫🇯', name: 'Fiji' },
    { code: '+256', flag: '🇺🇬', name: 'Uganda' },
    { code: '+855', flag: '🇰🇭', name: 'Cambodia' },
    { code: '+886', flag: '🇹🇼', name: 'Taiwan' },
    { code: '+222', flag: '🇲🇷', name: 'Mauritania' },
    { code: '+995', flag: '🇬🇪', name: 'Georgia' },
    { code: '+223', flag: '🇲🇱', name: 'Mali' },
    { code: '+855', flag: '🇰🇭', name: 'Cambodia' },
    { code: '+235', flag: '🇹🇩', name: 'Chad' },
  ];

  const bookingSubmit = async (data) => { 
    console.log(data)
    try {
      // Create a FormData object to handle file uploads
      const formData = new FormData();

      // Append all non-file data
      Object.keys(data).forEach(key => {
        if (key !== 'documents') {
          formData.append(key, JSON.stringify(data[key]));
        }
      });

      // Append documents
      data.documents.forEach((doc, index) => {
        if (doc.file) {
          formData.append(`documents[${index}]`, doc.file);
        }
      });

      // Log the form data for debugging
      console.log("Form data to be submitted:", Object.fromEntries(formData));

      // Make your API call here
        const response = axios.post(`${API_URL}users/createBooking`, formData)
        if(response.status === "ok") {
          alert("booking created successfully");
          navigate("/booking")
        }

      // if (!response.ok) throw new Error('Submission failed');
      // const result = await response.json();
      // console.log("Submission successful:", result);

    } catch (error) {
      console.error("Error submitting form:", error);
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
                {...register("agent")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.agent && <p className="text-red-500">{errors.agent.message}</p>}
            </div>
            <div>
              <label className="block mb-2">Customer Name</label>
              <input
                type="text"
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
                {...register("pax.C")}
                onChange={(e) => {
                  const numChildren = parseInt(e.target.value) || 0;
                  setValue("pax.C", e.target.value);
                  
                  // Initialize children ages array
                  const childrenAges = Array(numChildren).fill("");
                  setValue("pax.Ca", childrenAges);
                  
                  // Update form data state if needed
                  setFormData(prev => ({
                    ...prev,
                    pax: {
                      ...prev.pax,
                      C: numChildren,
                      Ca: childrenAges
                    }
                  }));
                }}
                className="w-full border rounded px-3 py-2"
                min="0"
              />
              {errors.pax?.C && <p className="text-red-500">{errors.pax.C.message}</p>}
            </div>

            {formData.pax.C > 0 &&
              formData.pax.Ca.map((_, index) => (
                <div key={index}>
                  <label className="block mb-2">Child {index + 1} Age</label>
                  <input
                    type="number"
                    name={`Ca${index}`}
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
                  {...register("countryCode")}
                  className="w-full border rounded px-3 py-2"
                >
                  {countryData.map((country, index) => (
        <option key={index} value={country.code}>
          {country.flag} {country.code} ({country.name})
        </option>
      ))}
                </select>
              </div>
              <div className="w-1/2">
                <label className="block mb-2">WhatsApp Number</label>
                <input
                  type="tel"
                  name="whatsappNumber"
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
  {watch("documents")?.map((doc, index) => (
    <div key={index} className="flex flex-col space-y-2 mt-4">
      <div className="flex items-center space-x-4">
        <input
          type="file"
          className="w-full border rounded px-3 py-2"
          onChange={(e) => handleFileUpload(e, index)}
        />
        <button
          type="button"
          onClick={() => removeDocument(index)}
          className="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>

      {/* Preview */}
      {doc?.file && (
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
  ))}
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
          {currentSection < sections.length - 1 ? (
            <button
              type="button"
              onClick={goToNext}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddBooking;
