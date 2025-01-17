import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

function ReconForm({handleHide}) {

    const reconSchema = z.object({
        supplier: z.string().min(1, { message: "Supplier is required" }),
        amount: z.string().min(1, { message: "Amount is required" }),
        status: z.string().min(1, { message: "Status is required" }),
        remarks: z.string().optional(),
        validatedBy: z.string().min(1, { message: "Validated By is required" }),
      })

      const { handleSubmit, register, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(reconSchema)
      });

      const reconSubmit = (data) => {
        console.log(data, 'data');

        handleHide();
      }

  return (
    <form onSubmit={handleSubmit(reconSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Supplier</label>
                    <input type="text" {...register("supplier")} className="w-full border rounded p-2" />
                    {errors.supplier && <span className="text-red-500">{errors.supplier.message}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Amount</label>
                    <input type="number" {...register("amount")} className="w-full border rounded p-2" />
                    {errors.amount && <span className="text-red-500">{errors.amount.message}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select {...register("status")} className="w-full border rounded p-2">
                      <option>Pending</option>
                      <option>Completed</option>
                      <option>Failed</option>
                    </select>
                    {errors.status && <span className="text-red-500">{errors.status.message}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Remarks</label>
                    <textarea {...register("remarks")} className="w-full border rounded p-2" rows="3"></textarea>
                    {errors.remarks && <span className="text-red-500">{errors.remarks.message}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Validated By</label>
                    <input type="text" {...register("validatedBy")} className="w-full border rounded p-2" />
                    {errors.validatedBy && <span className="text-red-500">{errors.validatedBy.message}</span>}
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
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
  )
}

export default ReconForm