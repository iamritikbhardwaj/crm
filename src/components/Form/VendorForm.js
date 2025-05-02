import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { API_URL } from "../../AppConstant";
import {
  fetchDestinations,
  fetchSuppliers,
} from "../apiCalls/fetchData";
import Swal from "sweetalert2";

function VendorForm({ dest, refetch, tripId, setInputData }) {
  const [supplier, setSupplier] = React.useState([]);
  const vendorSchema = z.object({
    name: z.string().min(1, { message: "vendor name is required" }),
    destination: z.string().min(1, { message: "destination is required" }),
    currency: z.string().min(1, { message: "currency is required" }),
    booking_status: z
      .string()
      .min(1, { message: "booking status is required" }),
    payment_status: z
      .string()
      .min(1, { message: "payment status is required" }),
    tripId: z.string().optional(),
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      name: "",
      destination: "",
      currency: "",
      booking_status: "Pending",
      payment_status: "Pending",
      tripId: tripId,
    },
  });

  useEffect(() => {
    (async () => {
      const supp = await fetchSuppliers();
      setSupplier(supp);
    })();
    setValue("currency", dest?.currency);
    setValue("destination", dest?.destination);
    setValue("tripId", tripId);
  }, []);


  const handleChange = async (e) => {
    Swal.fire({
      title: "Fetching...",
      text: "Please wait while we fetch Data.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const desti = await fetchDestinations();
    const target = supplier.filter((sup) => sup.name === e.target.value)[0];
    const dest = desti.filter(
      (d) => d.destination_id === target.destination_id
    )[0];
    setInputData(target);
    setValue("destination", dest.destination);
    setValue("currency", dest.currency);
    setValue("tripId", tripId);
    Swal.close();
  };

  const vendorSubmit = (data) => {
    Swal.fire({
      title: "Submitting...",
      text: "Please wait while we process your request.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    (async (data) => {
      const response = await axios.post(`${API_URL}users/createVendor`, data, {
        withCredentials: true,
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.status === 200) {
        await refetch();
        setInputData(null);
        Swal.close();
      }
    })(data);
  };

  return (
    <form onSubmit={handleSubmit(vendorSubmit)} className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Vendor Name
      </label>
      <select
        id="vendor"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search vendor..."
        list="vendorList"
        {...register("name")}
        onChange={handleChange}
      >
        <option value="">Select a vendor</option>
        {supplier &&
          Array.from(supplier).map((sup, index) => {
            return (
              <option
                key={index}
                className={`${sup.status === "ACTIVE" ? "" : "hidden"}`}
                value={sup.name}
              >
                {sup.name}
              </option>
            );
          })}
      </select>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-700"
        >
          Add Vendor
        </button>
      </div>
    </form>
  );
}

export default VendorForm;
