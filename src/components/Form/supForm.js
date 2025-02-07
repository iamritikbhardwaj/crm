import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from "axios";
import { API_URL } from "../../AppConstant.js"
import Swal from "sweetalert2";
import { useLocation } from 'react-router-dom';

function SupForm({editData, setEditData, refetch, data}) {

  console.error("error");

    const supplierSchema = z.object({
        name: z.string().nonempty(),
        status: z.string().nonempty().toUpperCase(),
        destination_id: z.string().nonempty(),
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
<<<<<<< HEAD
        if (response.status === 201) {
          Swal.fire({
            icon: 'error',
            title: 'User Creation Failed',
            text: "Destination already exists",
            showConfirmButton: true,
          })
        } else{
          refetch();
=======
        if (response.data.STATUS === 'FAIL') {
          Swal.fire({
            icon: 'error',
            title: 'User Creation Failed',
            text: "Supplier already exists",
            showConfirmButton: true,
          })
        } else if (response.status === 200) {
            refetch();
>>>>>>> refs/remotes/origin/main
        }
        console.log(response, 'response');
        })(data);
    }

    useEffect(() => {
      if (editData.hasOwnProperty('name')) {
        setValue("name", editData?.name);
        setValue("status", editData?.status);
        setValue("destination_id", editData?.destination_id);
      } else {
        setValue("name", "");
        setValue("status", "");
        setValue("destination_id", "");
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
              <select
              className='w-full p-2 border-[1px] m-2 rounded'
                {...register("destination_id")}
              >
                <option value="">Select destination</option>
                {data.length > 0 && data.map((item) => (
                  <option key={item.destination_id} value={item.destination_id}>
                    {item.destination}
                  </option>
                ))}
              </select>
              {errors.status && <span>{errors.status.message}</span>}
              <button type="submit" className="w-1/2 p-2 border-[1px] m-2 bg-slate-700 text-white rounded hover:bg-slate-600">
                Save
              </button>
            </form>
  )
}

export default SupForm;