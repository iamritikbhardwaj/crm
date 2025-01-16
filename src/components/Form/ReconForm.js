import React from 'react'
import { z } from 'zod'

function ReconForm() {

    const reconSchema = z.object({
        supplier: z.string().min(1, { message: "Supplier is required" }),
        amount: z.number().min(1, { message: "Amount is required" }),
        status: z.string().min(1, { message: "Status is required" }),
        remarks: z.string().optional(),
        validatedBy: z.string().min(1, { message: "Validated By is required" }),
      })


  return (
    <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Supplier</label>
                    <input type="text" className="w-full border rounded p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Amount</label>
                    <input type="number" className="w-full border rounded p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select className="w-full border rounded p-2">
                      <option>Pending</option>
                      <option>Completed</option>
                      <option>Failed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Remarks</label>
                    <textarea className="w-full border rounded p-2" rows="3"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Validated By</label>
                    <input type="text" className="w-full border rounded p-2" />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button 
                      type="button" 
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    //   onClick={() => {
                    //     document.getElementById('editForm').classList.add('hidden');
                    //   }}
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