import React, { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { API_URL } from "../../AppConstant";
import axios from "axios";

function ReconForm({ handleHide, inputData, tripId, refetch }) {
  const reconSchema = z.object({
    online: z.string().min(1, { message: "online is required" }),
    offline: z.string().min(1, { message: "offline is required" }),
    land: z.string().min(1, { message: "Status is required" }),
    tripId: z.string().optional(),
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reconSchema),
    defaultValues: {
      tripId: tripId,
    },
  });

  useEffect(() => {
    setValue("online", inputData?.online);
    setValue("offline", inputData?.offline);
    setValue("land", inputData?.land);
  }, [inputData]);

  const reset = () => {
    setValue("online", "");
    setValue("offline", "");
    setValue("land", "");
  };

  console.log(errors, "errors");

  const reconSubmit = (data) => {
    console.log(data, "data");
    (async (data) => {
      const response = await axios.post(
        `${API_URL}users/createRecon/?id=${inputData?.recon_id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response, "response");
      if (response.status === 200) {
        await refetch();
        reset();
      }
    })(data);
    handleHide();
  };

  return (
    <form onSubmit={handleSubmit(reconSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Online Booking</label>
        <input
          type="text"
          {...register("online")}
          className="w-full border rounded p-2"
        />
        {errors.online && (
          <span className="text-red-500">{errors.online.message}</span>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Offline Booking(only hotels)
        </label>
        <input
          type="text"
          {...register("offline")}
          className="w-full border rounded p-2"
        />
        {errors.offline && (
          <span className="text-red-500">{errors.offline.message}</span>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Land Combo</label>
        <input
          type="text"
          {...register("land")}
          className="w-full border rounded p-2"
        />
        {errors.land && (
          <span className="text-red-500">{errors.land.message}</span>
        )}
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={handleHide}
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={() => console.log("clicked")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default ReconForm;
