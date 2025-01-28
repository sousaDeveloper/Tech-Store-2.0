interface ContentFooterProps {
  title: string;
  description: string;
}

const ContentFooter = ({ title, description }: ContentFooterProps) => {
  return (
    <>
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
    </>
  );
};

export default ContentFooter;
