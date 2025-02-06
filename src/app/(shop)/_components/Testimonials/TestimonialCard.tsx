import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Testimonial } from "@prisma/client";
import { StarIcon } from "lucide-react";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div
      className="flex flex-col gap-4 bg-backgroundItem rounded-lg min-w-[23rem] min-h-auto lg:min-w-[25rem] 2xl:min-w-[28rem] 
    2xl:h-[13rem] shadow-lg p-2"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Avatar className="2xl:w-14 2xl:h-14">
            <AvatarImage
              src={testimonial.imageUrl}
              sizes="100vw"
              alt="Avatar de usuário que avaliou sua compra"
            />
          </Avatar>
          <div className="flex flex-col">
            <h2 className="2xl:text-lg">
              {testimonial.clientName.split(" ")[0]}{" "}
              {testimonial.clientName.split(" ")[1][0]}.
            </h2>
            <p className="text-[0.8rem] opacity-60 2xl:text-sm">{`${testimonial.date}`}</p>
          </div>
        </div>
        <h3 className="flex items-center gap-1">
          <StarIcon size={18} className="text-primaryColor" />{" "}
          {testimonial.assessment}/5.0
        </h3>
      </div>
      <div className="text-center opacity-70">
        <p className="text-sm lg:text-base 2xl:text-lg">{testimonial.text}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
