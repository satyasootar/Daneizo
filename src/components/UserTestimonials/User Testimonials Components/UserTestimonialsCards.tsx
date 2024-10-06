"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Define the testimonial data structure
type AllUserTestimonialsProps = {
  image: string;
  userName: string;
  testimonial: string;
};

// Testimonial data
const AllUserTestimonials = [
  {
    image: "https://picsum.photos/120",
    userName: "Daniel",
    testimonial:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
  },
  {
    image: "https://picsum.photos/120/119",
    userName: "KEN",
    testimonial:
      "To be honest, when I found out the patriarchy wasn't just about horses, I lost interest.",
  },
  {
    image: "https://picsum.photos/119/120",
    userName: "OFFICER K",
    testimonial: "I have memories but they are not real. They are just implants...",
  },
  {
    image: "https://picsum.photos/121",
    userName: "Emily",
    testimonial:
      "This platform has completely changed the way I work. The user experience is seamless and intuitive!",
  },
  {
    image: "https://picsum.photos/122",
    userName: "Michael",
    testimonial:
      "I’ve never been more satisfied with a product. The attention to detail and functionality is outstanding!",
  },
  {
    image: "https://picsum.photos/123",
    userName: "Sarah",
    testimonial:
      "Incredible service! I couldn’t be happier with the support and overall experience. Highly recommend!",
  },
];

// Testimonial Card component
const Card: React.FC<AllUserTestimonialsProps> = ({
  image,
  userName,
  testimonial,
}) => (
  <div className="w-[365px] h-[350px] flex-shrink-0 relative">
    <div className="flex justify-center">
      <Image
        src={image}
        alt={userName}
        width={120}
        height={120}
        className="rounded-full z-[2]"
      />
    </div>
    <div className="bg-gradient-to-br from-[#433FD7]/20 to-[#8D8BD3]/20 w-[365px] h-[272px] rounded-[20px] absolute bottom-0">
      <div className="mt-[20px] h-full flex flex-col justify-evenly items-center">
        <p className="font-outfit font-semibold text-[25px] text-white text-center px-4">
          {userName}
        </p>
        <p className="font-tillana text-[22px] text-white text-center px-4 pb-6">
          {testimonial}
        </p>
      </div>
    </div>
  </div>
);

// Carousel Component
const UserTestimonialsCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const totalTestimonials = AllUserTestimonials.length;
  const clonedTestimonials = [...AllUserTestimonials, ...AllUserTestimonials]; // Duplicate for infinite loop

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Smooth infinite scrolling
  useEffect(() => {
    if (carouselRef.current) {
      const testimonialWidth = 365 + 14; // Card width + gap
      carouselRef.current.style.transition = "transform 0.5s ease-in-out";
      carouselRef.current.style.transform = `translateX(-${
        (currentIndex % totalTestimonials) * testimonialWidth
      }px)`;

      // Reset index for infinite loop without a visual jump
      if (currentIndex >= totalTestimonials) {
        setTimeout(() => {
          carouselRef.current!.style.transition = "none"; // Disable transition for smooth jump
          setCurrentIndex(0);
        }, 500); // After transition ends, reset index to 0
      }
    }
  }, [currentIndex, totalTestimonials]);

  return (
    <div className="relative overflow-hidden w-[1150px]">
      {/* Gradient overlay for visual effect on the sides */}
      <div className="z-10 bg-gradient-to-r from-[#040312] to-transparent absolute top-0 bottom-0 left-0 w-[75px] pointer-events-none"></div>
      <div className="z-10 bg-gradient-to-l from-[#040312] to-transparent absolute top-0 bottom-0 right-0 w-[75px] pointer-events-none"></div>

      {/* Carousel container */}
      <div
        ref={carouselRef}
        className="flex flex-row gap-[14px] transition-transform duration-500 ease-in-out"
        style={{ width: `${clonedTestimonials.length * (365 + 14)}px` }}
      >
        {clonedTestimonials.map((testimonial, index) => (
          <Card
            key={index}
            image={testimonial.image}
            userName={testimonial.userName}
            testimonial={testimonial.testimonial}
          />
        ))}
      </div>
    </div>
  );
};

export default UserTestimonialsCards;