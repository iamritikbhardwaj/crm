import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { z } from "zod";
import { API_URL } from "../AppConstant";
import BackToHome from "../components/BackToHome";
import FileUpload from "../components/Input/FileUpload";
import countryCodes from "../sampleData/sampleData";
import { fetchAgents } from "../components/apiCalls/fetchData";

const AddBooking = () => {
  const sections = [
    "Booking Details",
    "Travel Details",
    "Documents Upload",
    "Order & Contact Details",
  ];
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [destData, setDestData] = useState([]);
  const [salesSpoc, setSalesSpoc] = useState([]);
  const [agent, setAgent] = useState([]);
  const navigate = useNavigate();

  const bookingSchema = z.object({
    destination: z.string().min(1, { message: "Destination is required" }),
    salesSpoc: z.string().min(1, { message: "Sales SPOC is required" }),
    agent: z.string().min(1, { message: "Agent is required" }),
    customerName: z.string().min(1, { message: "Customer Name is required" }),
    arrivalDate: z
      .string()
      .min(1, { message: "Arrival Date is required" })
      .refine((value) => new Date(value) > new Date(), {
        message: "Arrival Date must be in the future",
      }),
    departureDate: z
      .string()
      .min(1, { message: "Departure Date is required" })
      .refine((value) => new Date(value) > new Date(watch("arrivalDate")), {
        message: "Departure Date must be after Arrival Date",
      }),
    pax: z.object({
      A: z.string().min(1, { message: "Adults is required" }),
      C: z.string().optional(),
      Ca: z.array(z.string().max(11)).optional(),
    }),
    orderValue: z.string().min(1, { message: "Order Value is required" }),
    countryCode: z.string().min(1, { message: "Country Code is required" }),
    whatsappNumber: z
      .string()
      .min(1, { message: "WhatsApp Number is required" }),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    (async () => {
      const destRes = await axios.get(`${API_URL}users/getAllDestinations`, {
        withCredentials: true,
        headers: {
          "content-type": "application/json",
        },
      });
      if (destRes.status === 200) {
        setDestData(destRes.data.OUTPUT);
      }
      const userData = await axios.get(`${API_URL}users/getAllUsers`, {
        withCredentials: true,
        headers: {
          "content-type": "application/json",
        },
      });
      if (userData.status === 200) {
        setSalesSpoc(
          userData.data.OUTPUT.filter((user) => user.profile === "Sales")
        );
      }
      const agentData = await fetchAgents();
      setAgent(agentData);
    })();
  }, []);

  // Add New Document

  const addDocument = (e, catagory) => {
    const files = e.target.files;
    if (files.length > 0) {
      Array.from(files).forEach((file) => {
        const fileURL = URL.createObjectURL(file);
        setDocuments((prevDocs) => [...prevDocs, { file, fileURL, catagory }]);
      });
    }
  };

  const removeDocument = (index) => {
    const updatedDocs = documents.filter((_, i) => i !== index);
    setDocuments(updatedDocs);
  };

  console.log(errors, "errors");

  const bookingSubmit = async (data) => {
    Swal.fire({
      title: "Submitting...",
      text: "Please wait while we create your booking.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    documents.forEach((doc, index) => {
      formData.append(`${doc.catagory}`, doc.file);
    });

    try {
      setIsSubmitting(true);

      // Sending POST request with FormData
      const response = await axios.post(
        `${API_URL}users/createBooking/`,
        formData,
        {
          withCredentials: true,
          headers: {
            "content-Type": "multipart/form-data",
          },
        }
      );

      // Check the status of the response
      if (response.status !== 200) {
        Swal.close();
        Swal.fire("Failed to submit the booking");
      } else {
        navigate("/booking");
        Swal.close();
      }
    } catch (error) {
      console.error("Error submitting the booking:", error);
      // Handle error gracefully (e.g., show error message to the user)
      Swal.fire("There was an error submitting the booking.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const errorAlert = () => {
    if (errors !== null) {
      Swal.fire({
        title: "Booking Form",
        text:
          (currentSection === sections.length - 1
            ? "Creating Booking"
            : "Please Fill all the feilds carefully",
          errors?.agent
            ? errors.agent.message
            : "" || errors?.arrivalDate
            ? errors.arrivalDate.message
            : "" || errors?.customerName
            ? errors.customerName.message
            : "" || errors?.departureDate
            ? errors.departureDate.message
            : "" || errors?.destination
            ? errors.destination.message
            : "" || errors?.orderValue
            ? errors.orderValue.message
            : "" || errors?.whatsappNumber
            ? errors.whatsappNumber.message
            : "" || errors?.countryCode
            ? errors.countryCode.message
            : "" || errors?.pax
            ? errors.pax.message
            : "" || errors?.salesSpoc
            ? errors.salesSpoc.message
            : "" || errors?.tripId
            ? errors.tripId.message
            : "" || errors?.whatsappNumber
            ? errors.whatsappNumber.message
            : ""),
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  // ! Navigation Functions
  const goToNext = () => {
    if (currentSection < sections.length - 1)
      setCurrentSection(currentSection + 1);
  };

  const goToPrevious = () => {
    if (currentSection > 0) setCurrentSection(currentSection - 1);
  };

  // Handle form submission

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <BackToHome path="/booking" />
      <h1 className="text-3xl font-bold text-center mb-6">
        Create New Booking
      </h1>

      <form
        onSubmit={handleSubmit(bookingSubmit)}
        className="bg-white shadow-md rounded p-6"
      >
        {/* Section Header */}
        <h2 className="text-2xl font-semibold text-center mb-4">
          {sections[currentSection]}
        </h2>

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
                {destData.map((dest, index) => (
                  <option key={index} value={dest.destination}>
                    {dest.destination}
                  </option>
                ))}
              </select>
              {errors.destination && (
                  <p className="text-red-500">{errors.destination.message}</p>
                )}
            </div>

            <div>
              <label className="block mb-2">Sales SPOC</label>
              <select
                name="salesSpoc"
                id="salesSpoc"
                {...register("salesSpoc")}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Sales Spoc</option>
                {salesSpoc.map((user, index) => (
                  <option key={index} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </select>
              {errors.salesSpoc && (
                <p className="text-red-500">{errors.salesSpoc.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-2">Agent</label>
              <select
                type="text"
                id="agent"
                {...register("agent")}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Agent</option>
                {agent &&
                  agent.map((user, index) => 
                     (
                    <option key={index} className={`${user.status === "ACTIVE" ? "": "hidden"}`} value={user.name}>
                      {user.name}
                    </option>
                  )
                  )}
              </select>
              {errors.agent && (
                <p className="text-red-500">{errors.agent.message}</p>
              )}
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
              {errors.customerName && (
                <p className="text-red-500">{errors.customerName.message}</p>
              )}
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
                min={new Date()}
                {...register("arrivalDate")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.arrivalDate && (
                <p className="text-red-500">{errors.arrivalDate.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-2">Departure Date</label>
              <input
                type="date"
                name="departureDate"
                id="departureDate"
                min={new Date(watch("arrivalDate"))}
                {...register("departureDate")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.departureDate && (
                <p className="text-red-500">{errors.departureDate.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-2">
                Number of Passengers (Adults)
              </label>
              <input
                type="number"
                name="A"
                id="A"
                {...register("pax.A")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.pax?.A && (
                <p className="text-red-500">{errors.pax.A.message}</p>
              )}
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
              {errors.pax?.C && (
                <p className="text-red-500">{errors.pax.C.message}</p>
              )}
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
                {errors.pax?.Ca?.[index] && (
                  <p className="text-red-500">{errors.pax.Ca[index].message}</p>
                )}
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
                  {countryCodes.map((country, index) => (
                    <option key={index} value={country.code}>
                      {country.country} : {country.code}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <label className="block mb-2">Customer WhatsApp Number</label>
                <input
                  type="tel"
                  name="whatsappNumber"
                  id="whatsappNumber"
                  {...register("whatsappNumber")}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter phone number"
                />
                {errors.whatsappNumber && (
                  <p className="text-red-500">
                    {errors.whatsappNumber.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-2">Order Value {"(USD)"}</label>
              <input
                type="number"
                name="orderValue"
                id="orderValue"
                {...register("orderValue")}
                className="w-full border rounded px-3 py-2"
              />
              {errors.orderValue && (
                <p className="text-red-500">{errors.orderValue.message}</p>
              )}
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
                  <FileUpload
                    label={"Air Ticket & Hotel"}
                    id={"airTicket"}
                    onChange={addDocument}
                    onRemove={removeDocument}
                    files={documents}
                    catagory={"airTicketdoc"}
                  />
                  <FileUpload
                    label={"Passport"}
                    id={"passport"}
                    onChange={addDocument}
                    onRemove={removeDocument}
                    files={documents}
                    catagory={"passportdoc"}
                  />
                  <FileUpload
                    label={"PAN"}
                    id={"pan"}
                    onChange={addDocument}
                    onRemove={removeDocument}
                    files={documents}
                    catagory={"pandoc"}
                  />
                  <FileUpload
                    label={"Sales Sheet"}
                    id={"misc"}
                    onChange={addDocument}
                    onRemove={removeDocument}
                    files={documents}
                    catagory={"freezeQuotation"}
                    toAccept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  />
                  <FileUpload
                    label={"Email Confirmation"}
                    id={"emailConf"}
                    onChange={addDocument}
                    onRemove={removeDocument}
                    files={documents}
                    catagory={"emailConfdoc"}
                  />
                </div>

                {/* Document Preview */}
                <div className="w-1/2 pl-4">
                  <ul>
                    {documents.length > 0
                      ? documents.map((doc, index) => (
                          <li className="space-x-2" key={index}>
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {doc.file.name}
                            </a>
                            <button
                              className="text-red-400 hover:text-red-700"
                              onClick={() => removeDocument(index)}
                            >
                              Remove
                            </button>
                          </li>
                        ))
                      : "No documents uploaded"}
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
            className={`px-4 py-2 bg-gray-400 text-white rounded ${
              currentSection === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentSection === 0}
          >
            Previous
          </button>
          <button
            type={currentSection === sections.length - 1 ? "submit" : "button"}
            onClick={
              currentSection === sections.length - 1
                ? errorAlert
                : goToNext
            }
            // disabled={isSubmitting}
            className={`px-4 py-2 ${
              currentSection === sections.length - 1
                ? "bg-green-500"
                : "bg-blue-500"
            } text-white rounded`}
          >
            {currentSection === sections.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBooking;
