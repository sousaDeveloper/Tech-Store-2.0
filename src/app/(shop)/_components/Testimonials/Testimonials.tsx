import { prisma } from "@/lib/prisma";
import SubText from "../SubText";
import TestimonialCard from "./TestimonialCard";

import "./Testimonials.css";

const Testimonials = async () => {
  const testimonials = await prisma.testimonial.findMany({});

  return (
    <section className="text-secondaryColor sm:my-12 md:my-20">
      <div className="px-5 sm:px-8 xl:px-16 2xl:px-32">
        <h1
          className="text-2xl sm:text-3xl lg:text-4xl sm:w-[70%] lg:w-[50%] xl:text-[2.5rem]"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          O que <span className="text-gradient">nossos clientes</span> dizem
          sobre nós?
        </h1>
        <SubText
          text="Junte-se a nossos clientes satisfeitos!"
          className="text-sm lg:text-lg xl:text-[1.2rem]"
        />
      </div>

      {/* Primeiro grupo (movendo para a esquerda) */}
      <div className="scroll-parent z-30 overflow-hidden relative">
        <div className="scroll-element primary">
          {testimonials.map((testimonial) => (
            <TestimonialCard testimonial={testimonial} key={testimonial.id} />
          ))}

          {testimonials.map((testimonial) => (
            <TestimonialCard testimonial={testimonial} key={testimonial.id} />
          ))}
        </div>
      </div>

      {/* Segundo grupo (movendo para a direita) */}
      <div className="scroll-parent z-30 overflow-hidden relative">
        <div className="scroll-element secondary">
          {testimonials.map((testimonial) => (
            <TestimonialCard testimonial={testimonial} key={testimonial.id} />
          ))}

          {testimonials.map((testimonial) => (
            <TestimonialCard testimonial={testimonial} key={testimonial.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
