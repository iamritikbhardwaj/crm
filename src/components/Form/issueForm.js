import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FaCross } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { z } from "zod";
import { createIssue } from "../apiCalls/createData";

function IssueForm({ hidden, tripId, refetch }) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (hidden) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [hidden]);
  const issueSchema = z.object({
    date: z.string(),
    description: z.string().min(1, { message: "Description is required" }),
    resolution: z.string(),
    responsible: z
      .string()
      .min(1, { message: "It is required to mention who is responsible" }),
  });

  React.useEffect(() => {
    setValue("date", Date.now());
    setValue("description", "");
    setValue("resolution", "");
    setValue("responsible", "");
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(issueSchema),
  });

  const submitIssue = async (issue) => {
    const something = await createIssue(issue, tripId);
    if (something) {
      refetch();
      setOpen(true);
    }
  };

  return (
    <div
      className={`${
        open ? "hidden" : ""
      } p-2 bg-white rounded shadow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
    >
      <div className="flex justify-end">
        <MdCancel onClick={() => setOpen(false)} />
      </div>
      <div className={` p-4`}>
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(submitIssue)}
        >
          <input
            type="date"
            className="border rounded-full p-2 text-sm font-semibold w-[300px]"
            {...register("date")}
            placeholder="Enter Issue Date"
          />
          {errors.date && <p className="text-red-500">{errors.date.message}</p>}
          <Controller
            name="responsible"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="border rounded-full p-2 text-sm font-semibold w-[300px]"
              >
                <option value="">Select an option</option>
                <option value="Agent">Agent</option>
                <option value="Force-Majure">Force-Majure</option>
                <option value="Supplier">Supplier</option>
                <option value="Customer">Customer</option>
                <option value="Team">Team</option>
              </select>
            )}
          />
          {errors.responsible && (
            <p className="text-red-500">{errors.responsible.message}</p>
          )}
          <input
            type="text"
            className="border rounded-full p-2 text-sm font-semibold w-[300px]"
            {...register("description")}
            placeholder="Enter Issue Description"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
          <input
            type="text"
            className="border rounded-full p-2 text-sm font-semibold w-[300px]"
            {...register("resolution")}
            placeholder="Enter Issue Resolution"
          />
          {errors.resolution && (
            <p className="text-red-500">{errors.resolution.message}</p>
          )}
          <div className="flex justify-center space-x-4">
            <button
              className="bg-blue-500 align-middle hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-1/2"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IssueForm;
