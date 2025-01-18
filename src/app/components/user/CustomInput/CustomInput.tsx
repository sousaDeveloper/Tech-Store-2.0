import { EyeIcon } from "lucide-react";
import "./CustomInput.css";
import { useState } from "react";

interface CustomInputProps {
  label: string;
  type: string;
}

const CustomInput = ({ label, type }: CustomInputProps) => {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div className="input-container mt-8 text-secondaryColor">
      <input
        type={inputType}
        id="input"
        required
        className={`${type === "password" && "relative"}`}
      />
      <label htmlFor="input" className="label">
        {label}
      </label>
      {type === "password" && (
        <span className="absolute right-2">
          <EyeIcon size={20} onClick={togglePasswordVisibility} />
        </span>
      )}
      <div className="underline"></div>
    </div>
  );
};

export default CustomInput;
