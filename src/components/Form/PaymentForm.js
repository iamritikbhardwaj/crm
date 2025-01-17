import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from "axios";
import { API_URL } from "../../AppConstant.js"
import { set } from 'mongoose';

function PaymentForm({handlehide, tripId, inputData}) {

    const paymentSchema = z.object({
        tripId: z.string().min(1, { message: "Trip ID is required" }),
        date: z.string().min(1, { message: "Date is required" }),
        amount: z.string().min(1, { message: "Amount is required" }),
        conFee: z.string().min(1, { message: "Convenience Fee is required" }),
        convRate: z.string().min(1, { message: "Convenience Rate is required" }),
        paymentMode: z.string().min(1, { message: "Payment Mode is required" }),
        status: z.string().min(1, { message: "Status is required" }),
        remarks: z.string().optional(),
        validatedBy: z.string().min(1, { message: "Validated By is required" }),
        TripId: z.string().optional()
      })

      const { handleSubmit, register, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(paymentSchema)
      });

      console.log(inputData, 'inputData');

      useEffect(() => {
        if(tripId)
        {setValue("validatedBy", "Admin");
        setValue("tripId", tripId);}
        if (inputData) {
          console.log(inputData, 'inputData');
          setValue("date", inputData.date);
          setValue("amount", inputData.amount);
          setValue("conFee", inputData.conFee);
          setValue("convRate", inputData.convRate);
          setValue("paymentMode", inputData.paymentMode);
          setValue("status", inputData.status);
          setValue("remarks", inputData.remarks);
        }
      }, [tripId, inputData]);

      const reset = () => {
        setValue("date", "");
        setValue("amount", "");
        setValue("conFee", "");
        setValue("convRate", "");
        setValue("paymentMode", "");
        setValue("status", "");
        setValue("remarks", "")
      }

      const reconSubmit = (data) => {
        console.log(data, 'data');
        (async (data) => {
            const response = await axios.post(`${API_URL}users/createPayment/?id=${inputData.payment_id}`, data,
            {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: true
            })
            console.log(response, 'response');
            if (response.status === 200) {
              reset();
            }
        })(data)
        handlehide();
      }

      console.log(errors, 'errors');


  return (
    <form onSubmit={handleSubmit(reconSubmit)} className="space-y-4">
    <div>
      <label className="block text-sm font-medium mb-1">
        Date
      </label>
      <input
        type="datetime-local"
        className="w-full border rounded p-2"
        {...register("date")}
      />
      {errors.date && <span className="text-red-500">{errors.date.message}</span>}
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">
        Amount
      </label>
      <input
        type="number"
        className="w-full border rounded p-2"
        {...register("amount")}
      />
      {errors.amount && <span className="text-red-500">{errors.amount.message}</span>}
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">
        Conversion Fee
      </label>
      <input
        type="number"
        className="w-full border rounded p-2"
        {...register("conFee")}
      />
      {errors.conFee && <span className="text-red-500">{errors.conFee.message}</span>}
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">
        Conversion Rate
      </label>
      <input
        type="number"
        className="w-full border rounded p-2"
        {...register("convRate")}
      />
      {errors.convRate && <span className="text-red-500">{errors.convRate.message}</span>}
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">
        Payment Mode
      </label>
      <select
      {...register("paymentMode")}
      className="w-full border rounded p-2">
        <option>Cash</option>
        <option>Credit Card</option>
        <option>Bank Transfer</option>
        <option>UPI</option>
      </select>
      {errors.paymentMode && <span className="text-red-500">{errors.paymentMode.message}</span>}
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">
        Status
      </label>
      <select
      {...register("status")}
      className="w-full border rounded p-2">
        <option>Pending</option>
        <option>Completed</option>
        <option>Failed</option>
      </select>
      {errors.status && <span className="text-red-500">{errors.status.message}</span>}
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">
        Remarks
      </label>
      <textarea
      {...register("remarks")}
      className="w-full border rounded p-2"></textarea>
      {errors.remarks && <span className="text-red-500">{errors.remarks.message}</span>}
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
        onClick={console.log("Submitted")}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Changes
      </button>
    </div>
  </form>
  )
}

export default PaymentForm