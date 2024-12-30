import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

function AgentForm() {

    const supplierSchema = z.object({
        name: z.string().nonempty(),
        status: z.string().nonempty(),
    })
    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: zodResolver(supplierSchema)
    });

    const agentSubmit = (data) => {
        console.log(data);        
    }

  return (
    <form onSubmit={handleSubmit(agentSubmit)}>
              <input
                className="w-full p-2 border-[1px] m-2 rounded"
                type="text"
                placeholder="Agent Name"
              />
              <input
                className="w-full p-2 border-[1px] m-2 rounded"
                type="text"
                placeholder="Status"
              />
              <button type="submit" className="w-1/2 p-2 border-[1px] m-2 bg-slate-700 text-white rounded hover:bg-slate-600">
                Save
              </button>
            </form>
  )
}

export default AgentForm