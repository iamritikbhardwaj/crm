// ! to be deleted in production
import React, { useState } from 'react';
import { API_URL } from '../../AppConstant';
import axios from 'axios';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

function SampleFile() {
  const fileSchema = z.object({
    files: z.instanceof(File),
  })

  const { handleSubmit, control, setValue, formState: { errors } } = useForm({ resolver: zodResolver(fileSchema) });

  const upload = async (data) => {

    try {
      const res = await axios.post(`${API_URL}upload/:id=hello`, data, {
        headers: {
          'Content-Type': 'multipart/form-data', // This is required for file uploads
        },
      });
      console.log(res, 'res');
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(upload)}>
        <label htmlFor='file'>Upload File</label>
        <Controller
        name="file"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input
            type="file"
            id="file"
            {...field}
            onChange={(e) => setValue(e.target.files[0])} // Set the file directly
            name="file"
          />
        )}
        />
        <input type="submit" value="Upload" />
      </form>
    </>
  );
}

export default SampleFile;
