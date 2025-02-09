interface ContentFooterProps {
  title: string;
  description: string;
}

const ContentFooter = ({ title, description }: ContentFooterProps) => {
  return (
    <div className="2xl:w-[60%]">
      <h1 className="text-xl sm:text-2xl" data-aos="fade-up">
        {title}
      </h1>
      <p
        className="text-sm sm:text-base text-gray-400"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {description}
      </p>
    </div>
  );
};

export default ContentFooter;
