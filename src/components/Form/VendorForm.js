import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { API_URL } from "../../AppConstant";
import { fetchDestinations, fetchSuppliers, fetchVendors } from "../apiCalls/fetchData";

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

  console.log(errors, "errors");

  const handleChange = async (e) => {
    const desti = await fetchDestinations();
    console.log(desti, "desti");
    const target = supplier.filter((sup) => sup.name === e.target.value)[0];
    console.log(target, "target");
    const dest = desti.filter((d) => d.destination_id === target.destination_id)[0];
    console.log(dest.destination, "dest");
    setInputData(target);
    setValue("destination", dest.destination);
    setValue("currency", dest.currency);
    setValue("tripId", tripId);
  };

  const vendorSubmit = (data) => {
    (async (data) => {
      const response = await axios.post(`${API_URL}users/createVendor`, data, {
        withCredentials: true,
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.status === 200) {
          refetch();
        }
        const vend = await fetchVendors(tripId);
        const payStat = vend.filter(
          (item) => item.payment_status !== "FULL-PAID"
        );
        const bookStat = vend.filter(
          (item) => item.booking_status !== "COMPLETED"
        );
        if (
          Array.from(payStat).length === 0 &&
          Array.from(bookStat).length === 0
        ) {
          const res = await axios.post(
            `${API_URL}users/updatePayStat/?id=${tripId}`,
            { paymentStatus: "FULL-PAID", opsStatus: "COMPLETED" }
          );
        } else if (
          Array.from(payStat).length !== 0 &&
          Array.from(bookStat).length === 0
        ) {
          const res = await axios.post(
            `${API_URL}users/updatePayStat/?id=${tripId}`,
            { paymentStatus: "UNPAID", opsStatus: "COMPLETED" }
          );
        } else if (
          Array.from(payStat).length === 0 &&
          Array.from(bookStat).length !== 0
        ) {
          const res = await axios.post(
            `${API_URL}users/updatePayStat/?id=${tripId}`,
            { paymentStatus: "FULL-PAID", opsStatus: "PENDING" }
          );
        } else {
          const res = await axios.post(
            `${API_URL}users/updatePayStat/?id=${tripId}`,
            { paymentStatus: "UNPAID", opsStatus: "PENDING" }
          );
        refetch();
        setInputData(null);
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
              <option key={index} className={`${sup.status === "ACTIVE" ? "" : "hidden"}`} value={sup.name}>
                {sup.name}
              </option>
            );
          })}
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-700"
      >
        Add Vendor
      </button>
    </form>
  );
}

export default VendorForm;
