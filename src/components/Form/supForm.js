import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from "axios";
import { API_URL } from "../../AppConstant.js"
import { useLocation } from 'react-router-dom';

function SupForm({editData, setEditData, refetch}) {

  console.error("error");

    const supplierSchema = z.object({
        name: z.string().nonempty(),
        status: z.string().nonempty(),
    })

    const { handleSubmit, register, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(supplierSchema)
    });

    const supplierSubmit = (data) => {
        console.log(data, 'data');
        (async (data) => {
        const response = await axios.post(`${API_URL}users/createSupplier${editData.hasOwnProperty('name') ? `/?id=${editData?.supplier_id}` : ""}`, data,
        {
            withCredentials: true,
            headers: {  
                "content-type": "application/json" 
            }
        })
        if (response.status === 200) {
            refetch();
        }
        console.log(response, 'response');
        })(data);
    }

    useEffect(() => {
      if (editData.hasOwnProperty('name')) {
        setValue("name", editData?.name);
        setValue("status", editData?.status);
      } else {
        setValue("name", "");
        setValue("status", "");
      }
    }, [editData, setEditData]);

  return (
    <form onSubmit={handleSubmit(supplierSubmit)}>
              <input
                className="w-full p-2 border-[1px] m-2 rounded"
                type="text"
                placeholder="Supplier Name"
                {...register("name")}
              />
              {errors.name && <span>{errors.name.message}</span>}
              <input
                className="w-full p-2 border-[1px] m-2 rounded"
                type="text"
                placeholder="Status"
                {...register("status")}
              />
              {errors.status && <span>{errors.status.message}</span>}
              <button type="submit" className="w-1/2 p-2 border-[1px] m-2 bg-slate-700 text-white rounded hover:bg-slate-600">
                Save
              </button>
            </form>
  )
}

export default SupForm;