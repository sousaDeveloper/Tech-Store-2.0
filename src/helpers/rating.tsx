import { Star } from "lucide-react";

interface RatingProps {
  rating: number;
}

const Rating = ({ rating }: RatingProps) => {
  return (
    <div className="flex items-center">
      <Star className="h-6 w-6 text-primaryColor" />

      <span className="ml-2 text-lg text-secondaryColor">
        {rating.toFixed(1)}/5.0
      </span>
    </div>
  );
};

export default Rating;
