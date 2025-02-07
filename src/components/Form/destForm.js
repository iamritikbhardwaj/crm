import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { API_URL } from "../../AppConstant.js";
import { set } from "mongoose";
import e from "express";

function DestForm({ editData, setEditData, refetch }) {
 
  const destSchema = z.object({
    destination: z.string(),
    currency: z.string().toUpperCase(),
  });

  const { handleSubmit, setValue, register, formState: { errors } } = useForm({
    resolver: zodResolver(destSchema)
  });

  const destSubmit = (data) => {
    console.log(editData, 'editData1');
    (async (data) => {
      const response = await axios.post(`${API_URL}users/createDestination${editData.hasOwnProperty('destination_id') ? `/?id=${editData?.destination_id}` : ""}`, data,
      {
        withCredentials: true,
        headers: {
          "content-type": "application/json"
        }
      })
      console.log(response, 'response');
      if (response.data.STATUS === 'FAIL') {
        Swal.fire({
          icon: 'error',
          title: 'User Creation Failed',
          text: "Destination already exists",
          showConfirmButton: true,
        })
      } else if (response.status === 200) {
        refetch();
      }
    })(data);
  }

  
   useEffect(() => {if (editData) {
      setValue("destination", editData?.destination);
      setValue("currency", editData?.currency);
      console.log(editData?.destination, 'editData');
    }}, [editData, setEditData]);
  

  return (
    <form onSubmit={handleSubmit(destSubmit)}>
              <input
                className="w-full p-2 border-[1px] m-2 rounded"
                type="text"
                placeholder="Destination"
                {...register("destination")}
              />
              {errors.destination && <p>{errors.destination.message}</p>}
              <input
                className="w-full p-2 border-[1px] m-2 rounded"
                type="text"
                placeholder="Currency"
                {...register("currency")}
              />
              {errors.currency && <p>{errors.currency.message}</p>}
              <button type="submit" className="w-1/2 p-2 border-[1px] m-2 bg-slate-700 text-white rounded hover:bg-slate-600">
                Save
              </button>
            </form>
  );
}

export default DestForm;
