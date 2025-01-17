import { prisma } from "@/lib/prisma";
import SubText from "../SubText";
import TestimonialCard from "./TestimonialCard";

import "./Testimonials.css";

const Testimonials = async () => {
  const testimonials = await prisma.testimonial.findMany({});

  return (
    <section className="text-secondaryColor">
      <h1 className="text-2xl px-5">
        O que <span className="text-gradient">nossos clientes</span> dizem sobre
        nós?
      </h1>
      <SubText
        text="Junte-se a nossos clientes satisfeitos!"
        className="px-5 text-sm"
      />

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
