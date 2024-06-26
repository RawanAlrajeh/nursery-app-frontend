import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface VerificationCodeInputProps {
  onSubmit: (code: string) => void;
  length?: number;
}

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({ onSubmit, length = 4 }) => {
  const [code, setCode] = useState(Array(length).fill(""));
  const { t } = useTranslation("common");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      (document.getElementById(`input-${index - 1}`) as HTMLInputElement)?.focus();
    } else if (e.key !== "Backspace" && index < length - 1) {
      (document.getElementById(`input-${index + 1}`) as HTMLInputElement)?.focus();
    }
  };

  const handleSubmit = () => {
    const verificationCode = code.join("");
    if (verificationCode.length === length) {
      onSubmit(verificationCode);
    } else {
      alert(`Please enter a ${length}-digit code.`);
    }
  };

  return (
    <div className="w-full max-w-xs">
      <h2 className="text-lg font-semibold mb-2">{t("verify.EnterVerificationCode")}</h2>
      <div className="flex justify-between mb-4">
        {code.map((digit, index) => (
          <input
            key={index}
            id={`input-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyUp={(e) => handleKeyUp(e, index)}
            maxLength={1}
            className="w-12 h-12 text-center shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        {t("verify.verify")}
      </button>
    </div>
  );
};

export default VerificationCodeInput;
