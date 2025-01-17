import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300"],
  style: ["italic"],
});

interface SubTextProps {
  text: string;
  className?: string;
}

const SubText = ({ text, className }: SubTextProps) => {
  return (
    <h2 className={`opacity-65 font-light ${poppins.className} ${className}`}>
      {text}
    </h2>
  );
};

export default SubText;
