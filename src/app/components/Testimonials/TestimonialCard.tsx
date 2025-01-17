import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Testimonial } from "@prisma/client";
import SubText from "../SubText";
import { StarIcon } from "lucide-react";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="flex flex-col gap-4 bg-backgroundItem rounded-lg min-w-[23rem] min-h-auto shadow-lg p-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src={testimonial.imageUrl} />
          </Avatar>
          <div className="flex flex-col">
            <h2>
              {testimonial.clientName.split(" ")[0]}{" "}
              {testimonial.clientName.split(" ")[1][0]}.
            </h2>
            <SubText text={`${testimonial.date}`} className="text-[0.8rem]" />
          </div>
        </div>
        <h3 className="flex items-center gap-1">
          <StarIcon size={18} className="text-primaryColor" />{" "}
          {testimonial.assessment}/5.0
        </h3>
      </div>
      <div className="text-center opacity-70">
        <p className="text-sm">{testimonial.text}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
