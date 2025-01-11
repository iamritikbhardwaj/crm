import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { API_URL } from '../../AppConstant';
import axios from 'axios';

function AgentForm({editData, setEditData, refetch}) {

    const agentSchema = z.object({
        name: z.string().nonempty(),
        status: z.string().nonempty().toUpperCase(),
    })
    const { handleSubmit, register, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(agentSchema)
    });

    const agentSubmit = (data) => {
      // console.log('data', data)
        (async (data) => {
          const response = axios.post(`${API_URL}users/createAgent${editData.hasOwnProperty('agent_id') ? `/?id=${editData?.agent_id}` : ""}`, data,
          {
            withCredentials: true,
            headers: {
              "content-type": "application/json"
            }
          })
          console.log(response, 'response');
          if ((await response).status === 200) {
            refetch();
          }
        })(data);     
    }

    useEffect(() => {
      console.log(editData, 'editData');
      if (editData.hasOwnProperty('agent_id')) {
        setValue("name", editData?.name);
        setValue("status", editData?.status);
      }else {
        setValue("name", "");
        setValue("status", "");
      }
    }, [editData, setEditData]);

  return (
    <form onSubmit={handleSubmit(agentSubmit)}>
              <input
                className="w-full p-2 border-[1px] m-2 rounded"
                type="text"
                placeholder="Agent Name"
                {...register("name")}
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              <input
                className="w-full p-2 border-[1px] m-2 rounded"
                type="text"
                placeholder="Status"
                {...register("status")}
              />
              {errors.status && <p className="text-red-500">{errors.status.message}</p>}
              <button type="submit" className="w-1/2 p-2 border-[1px] m-2 bg-slate-700 text-white rounded hover:bg-slate-600">
                Save
              </button>
            </form>
  )
}

export default AgentForm