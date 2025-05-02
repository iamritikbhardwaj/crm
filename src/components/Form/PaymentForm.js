import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";
import { API_URL } from "../../AppConstant.js";
import { fetchPayment } from "../apiCalls/fetchData";
import { updateTrip } from "../apiCalls/updateData.js";

function PaymentForm({ handlehide, tripId, inputData, refetch }) {
  const paymentSchema = z.object({
    tripId: z.string().min(1, { message: "Trip ID is required" }),
    date: z.string().min(1, { message: "Date is required" }),
    amount: z.string().min(1, { message: "Amount is required" }),
    conFee: z.string().optional(),
    convRate: z.string().min(1, { message: "Convenience Rate is required" }),
    paymentMode: z.string().min(1, { message: "Payment Mode is required" }),
    remarks: z.string().optional(),
    validatedBy: z.string().min(1, { message: "Validated By is required" }),
    TripId: z.string().optional(),
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentSchema),
  });


  useEffect(() => {
    if (tripId) {
      setValue("validatedBy", "Admin");
      setValue("tripId", tripId);
    }
    if (inputData) {
      setValue("date", inputData.date);
      setValue("amount", inputData.amount);
      setValue("conFee", inputData.conFee);
      setValue("convRate", inputData.convRate);
      setValue("paymentMode", inputData.paymentMode);
      setValue("remarks", inputData.remarks);
    }
  }, [tripId, inputData]);

  const reset = () => {
    setValue("date", "");
    setValue("amount", "");
    setValue("conFee", "");
    setValue("convRate", "");
    setValue("paymentMode", "");
    setValue("remarks", "");
  };

  const reconSubmit = (data) => {
    Swal.fire({
      title: "Submitting...",
      text: "Please wait while we create your payment.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    (async (data) => {
      const response = await axios.post(
        `${API_URL}users/createPayment${inputData?.payment_id ? "/?id=" + inputData.payment_id : ``
        }`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        reset();
        await refetch();
        Swal.close();
        Swal.fire({
          title: "Calculating...",
          text: "Please wait while we calculate agent payment.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const pay = await fetchPayment(tripId);
        const payment = pay.reduce((acc, item) => parseFloat(acc) + parseFloat(item.amount), 0);
        const res = await updateTrip({ payment: payment }, tripId);
        if (res) {
          Swal.close();
          Swal.fire("Payment updated")
        } else {
          Swal.close();
          Swal.fire("Payment not updated")
        }
        Swal.close();
      }
    })(data);
    handlehide();
  };

  return (
    <form onSubmit={handleSubmit(reconSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          className="w-full border rounded p-2"
          {...register("date")}
        />
        {errors.date && (
          <span className="text-red-500">{errors.date.message}</span>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Amount</label>
        <input
          type="number"
          step="0.01"
          className="w-full border rounded p-2"
          {...register("amount", {
            setValueAs: (v) => parseFloat(v).toFixed(2), // Convert to number
          })}
        />
        {errors.amount && (
          <span className="text-red-500">{errors.amount.message}</span>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Conversion Fee</label>
        <input
          type="number"
          step="0.01"
          className="w-full border rounded p-2"
          {...register("conFee", {
            setValueAs: (v) => parseFloat(v).toFixed(2), // Convert to number
          })}
        />
        {errors.conFee && (
          <span className="text-red-500">{errors.conFee.message}</span>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Conversion Rate
        </label>
        <input
          type="number"
          step="0.01"
          className="w-full border rounded p-2"
          {...register("convRate", {
            setValueAs: (v) => parseFloat(v).toFixed(2), // Convert to number
          })}
        />
        {errors.convRate && (
          <span className="text-red-500">{errors.convRate.message}</span>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Payment Mode</label>
        <select
          {...register("paymentMode")}
          className="w-full border rounded p-2"
        >
          <option>INR ACCOUNT</option>
          <option>CASH</option>
          <option>CREDIT CARD</option>
          <option>REMITTANCE</option>
          <option>FLYREMIT</option>
          <option>PAYMENT LINK</option>
        </select>
        {errors.paymentMode && (
          <span className="text-red-500">{errors.paymentMode.message}</span>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Remarks</label>
        <textarea
          {...register("remarks")}
          className="w-full border rounded p-2"
        ></textarea>
        {errors.remarks && (
          <span className="text-red-500">{errors.remarks.message}</span>
        )}
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={handlehide}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default PaymentForm;
