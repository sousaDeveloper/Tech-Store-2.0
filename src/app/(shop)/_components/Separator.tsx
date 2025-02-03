interface SeparatosProps {
  dataAos?: string;
}

const Separator = ({ dataAos }: SeparatosProps) => {
  return (
    <div
      className="w-full text-center bg-gradient-to-r from-[#1f1f1f] via-secondaryColor to-[#1f1f1f] h-[0.05rem] xl:mt-5"
      data-aos={dataAos}
    />
  );
};

export default Separator;
