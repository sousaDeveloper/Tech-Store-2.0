import "./CustomInput.css";

interface CustomInputProps {
  label: string;
  type: string;
}

const CustomInput = ({ label, type }: CustomInputProps) => {
  return (
    <div className="input-container mt-8">
      <input type={type} id="input" required />
      <label htmlFor="input" className="label text-secondaryColor">
        {label}
      </label>
      <div className="underline"></div>
    </div>
  );
};

export default CustomInput;
