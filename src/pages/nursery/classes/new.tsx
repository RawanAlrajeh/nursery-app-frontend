import React from "react";
import { useForm } from "react-hook-form";
import { useClasses } from "@/services/hooks/classes/useClasses";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  name: z.string().nonempty(),
  year: z.number().positive().int(),
  babysitterId: z.number().positive().int(),
});

const NewClass = () => {
  const { createClass, isCreating, createError } = useClasses();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    createClass(data);
  };

  return (
    <div>
      <h1>Add New Class</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input {...register("name")} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div>
          <label>Year</label>
          <input type="number" {...register("year")} />
          {errors.year && <span>{errors.year.message}</span>}
        </div>
        <div>
          <label>Babysitter ID</label>
          <input type="number" {...register("babysitterId")} />
          {errors.babysitterId && <span>{errors.babysitterId.message}</span>}
        </div>
        <button type="submit" disabled={isCreating}>
          Add
        </button>
        {createError && <div>{createError.message}</div>}
      </form>
    </div>
  );
};

export default NewClass;
