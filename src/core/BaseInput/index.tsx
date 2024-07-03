"use client";

import { Input, InputProps } from "@nextui-org/input";
import React, { useState, useRef, useEffect, forwardRef } from "react";
import debounce from "lodash/debounce";

interface BaseInputProps extends Omit<InputProps, "validationState"> {
  label: string;
  errorMessage?: string | null | boolean;
  validationState?: "valid" | "invalid" | "none";
  isPassword?: boolean;
  labelColor?: string;
  inputClassName?: string;
}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      label,
      validationState,
      errorMessage,
      isPassword = false,
      inputClassName,
      maxLength,
      labelColor,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

    useEffect(() => {
      const inputElement = inputRef.current;
      const onFocus = () => setIsFocused(true);
      const onBlur = () => setIsFocused(false);

      if (inputElement) {
        inputElement.addEventListener("focus", onFocus);
        inputElement.addEventListener("blur", onBlur);
      }

      return () => {
        if (inputElement) {
          inputElement.removeEventListener("focus", onFocus);
          inputElement.removeEventListener("blur", onBlur);
        }
      };
    }, []);

    const determineBorderColor = () => {
      if (validationState === "invalid")
        return "border-red-500 focus:border-red-500";
      if (isFocused) return "border-blue-500 focus:border-blue-500";
      return "border-gray-300 focus:border-gray-300";
    };

    // Define a debounce function for focus handling
    const debouncedFocus = debounce((inputRef) => {
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);

    return (
      <div className="relative w-full sm:w-auto">
        <label
          className={`block text-sm font-bold mb-2 ${
            labelColor || "text-gray-700"
          }`}
          htmlFor={props.id}
        >
          {label}
        </label>
        <div
          className={`relative rounded-md bg-white ${determineBorderColor()} h-12 border text-gray-700 font-medium ${inputClassName}`}
        >
          <Input
            ref={ref as any}
            value={value}
            onChange={onChange}
            onWheel={(e) => {
              if (e && "current" in e) {
                (e.current as HTMLInputElement).blur();
                debouncedFocus(e);
              }
            }}
            variant="bordered"
            className="hide-spinners w-full h-full"
            classNames={{
              inputWrapper: "border-none outline-none h-full",
              base: "w-full h-full",
              label: "text-gray-400",
            }}
            endContent={
              isPassword ? (
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isPasswordVisible ? <p>close</p> : <p>open</p>}
                </button>
              ) : null
            }
            type={
              isPassword ? (isPasswordVisible ? "text" : "password") : "text"
            }
            {...props}
          />
        </div>
        {validationState === "invalid" && errorMessage && (
          <div className="mr-1 text-red-500 h-5">
            <p className="text-red-500">{errorMessage}</p>
          </div>
        )}
      </div>
    );
  }
);

export { BaseInput };
