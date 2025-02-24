import React from "react";
import { useForm } from "react-hook-form";
import { updateTrip } from "../apiCalls/updateData";

function WhatsappNo({ id, refetch, setHidden }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitWN = async (data) => {
    await updateTrip({ whatsappNumber: data.whatsappNumber }, id);
    setHidden(true);
    refetch();
  };
  return (
    <form onSubmit={handleSubmit(submitWN)}>
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
          <p className="text-red-500">{errors.whatsappNumber.message}</p>
        )}
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default WhatsappNo;
