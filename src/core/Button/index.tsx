import React, { forwardRef, CSSProperties, ReactNode } from "react";
import className from "classnames";
import { ButtonTypes } from "./ButtonTypes";
import {
  AiOutlineCheck,
  AiOutlineStop,
  AiOutlineWarning,
} from "react-icons/ai";

interface ButtonProps {
  children: ReactNode;
  variant: ButtonTypes;
  outline?: boolean;
  rounded?: boolean;
  Bsx?: CSSProperties;
  iconStyle?: CSSProperties;
  className?: string;
  [x: string]: any; // to allow other props like onClick, etc.
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant,
      outline,
      rounded,
      Bsx,
      iconStyle,
      isLoading,
      className: customClassName,
      ...props
    },
    ref
  ) => {
    const _variant =
      isLoading || props.disabled || props.variant === "disabled"
        ? "disabled"
        : props.variant;

    let buttonClassName = className(
      customClassName,
      "flex justify-center items-center px-3 py-1.5 border my-2",
      {
        "rounded-lg": rounded,
        "bg-white": outline,
      }
    );

    switch (variant) {
      case ButtonTypes.PRIMARY:
        buttonClassName +=
          " bg-primary-base border-primary-border text-primary-text";
        break;
      case ButtonTypes.SECONDARY:
        buttonClassName +=
          " bg-secondary-base border-secondary-border text-white";
        break;
      case ButtonTypes.SUCCESS:
        buttonClassName +=
          " bg-success-base border-success-border text-success-text";
        break;
      case ButtonTypes.WARNING:
        buttonClassName +=
          " bg-warning-base border-warning-border text-warning-text";
        break;
      case ButtonTypes.DANGER:
        buttonClassName +=
          " bg-danger-base border-danger-border text-danger-text";
        break;
      default:
        break;
    }

    return (
      <button {...props} className={buttonClassName} style={Bsx} ref={ref}>
        {variant === ButtonTypes.SUCCESS && (
          <AiOutlineCheck className="mr-2" style={iconStyle} />
        )}
        {variant === ButtonTypes.DANGER && (
          <AiOutlineStop className="mr-2" style={iconStyle} />
        )}
        {variant === ButtonTypes.WARNING && (
          <AiOutlineWarning className="mr-2" style={iconStyle} />
        )}
        {children}
        {isLoading ? "loading" : props.children}
      </button>
    );
  }
);

export default Button;
