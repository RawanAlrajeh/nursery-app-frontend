import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useBabysitters } from '@/src/services/hooks/babysitters/use-babysitters';

const schema = z.object({
  full_name: z.string().nonempty(),
  age: z.number().positive().int(),
  mobile: z.string().nonempty(),
  idNumber: z.string().nonempty(),
  email: z.string().email(),
});

const NewBabysitter = () => {
  const { createBabysitter, isCreating, createError } = useBabysitters();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    createBabysitter(data);
  };

  return (
    <div>
      <h1>Add New Babysitter</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Full Name</label>
          <input {...register("full_name")} />
          {errors.full_name && <span>{errors.full_name.message}</span>}
        </div>
        <div>
          <label>Age</label>
          <input type="number" {...register("age")} />
          {errors.age && <span>{errors.age.message}</span>}
        </div>
        <div>
          <label>Mobile</label>
          <input {...register("mobile")} />
          {errors.mobile && <span>{errors.mobile.message}</span>}
        </div>
        <div>
          <label>ID Number</label>
          <input {...register("idNumber")} />
          {errors.idNumber && <span>{errors.idNumber.message}</span>}
        </div>
        <div>
          <label>Email</label>
          <input {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <button type="submit" disabled={isCreating}>Add</button>
        {createError && <div>{createError.message}</div>}
      </form>
    </div>
  );
};

export default NewBabysitter;
