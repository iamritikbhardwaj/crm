import React from 'react'

function VendorForm() {

    const vendorSchema = z.object({
        name: z.string().min(1, { message: "vendor name is required" }),
        destination: z.string().min(1, { message: "destination is required" }),
        currency: z.string().min(1, { message: "currency is required" }),
        booking_status: z.string().min(1, { message: "booking status is required" }),
        payment_status: z.string().min(1, { message: "payment status is required" }),
      });

      const { handleSubmit, register, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(vendorSchema),
        defaultValues: {
          name: "",
          destination: "",
          currency: "",
          booking_status: "",
          payment_status: "",
        }
      });

      console.log(errors, 'errors');

      const vendorSubmit = (data) => {
          console.log(data, 'data');
      }
  return (
    <form onSubmit={handleSubmit(vendorSubmit)} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vendor Name
              </label>
              <select
                id="vendor"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search vendor..."
                list="vendorList"
                {...register("name")}
              >
                <option value="">Select a vendor</option>
                {supp &&
                  supp.map((supplier, index) => {
                    return (
                      <option key={index} value={supplier}>
                        {supplier.name}
                      </option>
                    );
                  })}
              </select>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-700"
              >
                Add Vendor
              </button>
            </form>
  )
}

export default VendorForm