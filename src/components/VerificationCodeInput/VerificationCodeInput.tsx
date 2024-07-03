import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@nextui-org/react";
import Button from "@/src/core/Button";
import { ButtonTypes } from "@/src/core/Button/ButtonTypes";

interface VerificationCodeInputProps {
  onSubmit: (code: string) => void;
  length?: number;
  errorMessage?: string;
  isLoading: boolean;
}

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
  onSubmit,
  length = 4,
  errorMessage,
  isLoading,
}) => {
  const [code, setCode] = useState(Array(length).fill(""));
  const [error, setError] = useState("");
  const { t } = useTranslation("common");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Clear error message when the user starts typing
      setError("");
    }
  };

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      (
        document.getElementById(`input-${index - 1}`) as HTMLInputElement
      )?.focus();
    } else if (e.key !== "Backspace" && index < length - 1) {
      (
        document.getElementById(`input-${index + 1}`) as HTMLInputElement
      )?.focus();
    }
  };

  const handleSubmit = () => {
    const verificationCode = code.join("");
    if (verificationCode.length === length) {
      onSubmit(verificationCode);
    } else {
      setError(t("verify.EnterVerificationCode"));
    }
  };

  return (
    <div className="w-full max-w-xs">
      <h2 className="text-lg font-semibold mb-2">
        {t("verify.EnterVerificationCode")}
      </h2>
      <div className="flex justify-between mb-4">
        {code.map((digit, index) => (
          <div key={index} className="flex flex-col items-center">
            <Input
              id={`input-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyUp={(e) => handleKeyUp(e, index)}
              maxLength={1}
              className="w-12 h-12 text-center mr-2"
              fullWidth={false}
              style={{ textAlign: "center" }}
            />
          </div>
        ))}
      </div>
      {error && <span className="text-red-500 text-sm mb-4">{error}</span>}
      {!error && <p className="text-red-500 mt-4">{errorMessage}</p>}

      <Button
        variant={ButtonTypes.SECONDARY}
        rounded
        type="submit"
        isLoading={isLoading}
        className="w-full py-2 px-4"
        onClick={handleSubmit}
      >
        {t("verify.verify")}
      </Button>
    </div>
  );
};

export default VerificationCodeInput;
