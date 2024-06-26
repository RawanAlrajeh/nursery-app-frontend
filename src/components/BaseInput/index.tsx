import React, { forwardRef } from "react";

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  validationState?: "valid" | "invalid" | "none";
  errorMessage?: string;
}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ label, validationState, errorMessage, ...props }, ref) => (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={props.id}
      >
        {label}
      </label>
      <input
        ref={ref}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          validationState === "invalid" ? "border-red-500" : ""
        }`}
        {...props}
      />
      {validationState === "invalid" && errorMessage && (
        <p className="text-red-500 text-xs italic">{errorMessage}</p>
      )}
    </div>
  )
);

export { BaseInput };
