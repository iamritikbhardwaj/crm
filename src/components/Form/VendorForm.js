import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { API_URL } from '../../AppConstant';
import { fetchDestinations } from '../apiCalls/fetchData';

function VendorForm({supplier, dest, refetch, tripId, setInputData}) {

    const vendorSchema = z.object({
        name: z.string().min(1, { message: "vendor name is required" }),
        destination: z.string().min(1, { message: "destination is required" }),
        currency: z.string().min(1, { message: "currency is required" }),
        booking_status: z.string().min(1, { message: "booking status is required" }),
        payment_status: z.string().min(1, { message: "payment status is required" }),
        tripId: z.string().optional()
      });

      const { handleSubmit, register, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(vendorSchema),
        defaultValues: {
          name: "",
          destination: "",
          currency: "",
          booking_status: "Pending",
          payment_status: "Pending",
          tripId: tripId
        }
      });

      // useEffect(() => {
      //   (async () => {
      //     await refetch();
      //     setValue("currency", await fetchDestinations(supplier?.destination_id).currency);
      //   })()
      //   setValue("destination", dest?.destination);
      //   setValue("tripId", tripId);
      // }, []);

      console.log(errors, 'errors');

      const handleChange = (e) => {
        const dest = fetchDestinations().filter( (des) => [...supplier].filter( sup => sup.name === e.target.value)[0].destination_id === des.destination_id)[0];
        setValue("destination", new String(dest?.destination));
        setValue("currency", new String(dest?.currency));
        setValue("tripId", tripId);
      }

      const vendorSubmit = (data) => {
          (async (data) => {
            const response = await axios.post(`${API_URL}users/createVendor`, data,
            {
              withCredentials: true,
              headers: {
                "content-type": "application/json"
              }
            })
            console.log(response, 'response');
            if (response.status === 200) {
              refetch();
              setInputData(null);
            }
          })(data);
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
                onChange={handleChange}
              >
                <option value="">Select a vendor</option>
                {supplier &&
                  supplier.map(( sup, index) => {
                    return (
                      <option key={index} value={sup.name}>
                        {sup.name}
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