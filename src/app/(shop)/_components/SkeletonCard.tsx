import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonCardProps {
  aosDelay: string;
}

export function SkeletonCard({ aosDelay }: SkeletonCardProps) {
  return (
    <div
      className="flex flex-col text-secondaryColor"
      data-aos="fade-up"
      data-aos-delay={aosDelay}
    >
      <Skeleton
        className="min-w-[8.5rem] max-w-[8.5rem] h-36 sm:h-40 xl:h-[12rem] sm:min-w-[10rem] sm:max-w-[10rem] lg:min-w-[11rem] lg:max-w-[11rem] xl:min-w-[13rem] xl:max-w-[13rem] rounded-xl bg-gray-600"
        data-aos="fade-up"
      />
      <div className="space-y-2">
        <Skeleton
          className="mt-2 h-4 min-w-[7.5rem] max-w-[7.5rem] sm:min-w-[9rem] sm:max-w-[9rem] lg:min-w-[10rem] lg:max-w-[10rem] xl:min-w-[12rem] xl:max-w-[12rem] bg-gray-600 rounded-[0.25rem]"
          data-aos="fade-up"
        />
        <Skeleton
          className="h-4 min-w-[5.5rem] max-w-[5.5rem] sm:min-w-[7rem] sm:max-w-[7rem] lg:min-w-[8rem] lg:max-w-[8rem] xl:min-w-[10rem] xl:max-w-[10rem] bg-gray-600 rounded-[0.25rem]"
          data-aos="fade-up"
        />
        <Skeleton
          className="h-4 min-w-[2.5rem] max-w-[2.5rem] sm:min-w-[4rem] sm:max-w-[4rem] lg:min-w-[5rem] lg:max-w-[5rem] xl:min-w-[7rem] xl:max-w-[7rem] bg-gray-600 rounded-[0.25rem]"
          data-aos="fade-up"
        />
      </div>
    </div>
  );
}
