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
    <h2
      className={`text-gray-400 font-light ${poppins.className} ${className}`}
      data-aos-delay="300"
      data-aos="fade-up"
    >
      {text}
    </h2>
  );
};

export default SubText;
