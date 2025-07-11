import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { SparklesIcon } from "lucide-react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Badge } from "@/components/ui/badge";

interface CarouselProps {
  images: { src: string; alt: string }[];
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
}

export const CardCarousel: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 1500,
  showPagination = true, // keep prop for API compatibility, but force false below
  showNavigation = true,
}) => {
  const css = `
  .swiper {
    width: 100%;
    padding-bottom: 50px;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    transition: transform 0.4s cubic-bezier(.4,2,.3,1), box-shadow 0.3s;
    box-shadow: 0 4px 24px 0 rgba(0,0,0,0.12), 0 1.5px 6px 0 rgba(80,0,120,0.08);
    border-radius: 1.5rem;
    overflow: hidden;
  }
  .swiper-slide-active {
    transform: scale(1.08) rotate(-1deg);
    box-shadow: 0 8px 32px 0 rgba(80,0,120,0.18), 0 2px 8px 0 rgba(80,0,120,0.10);
    z-index: 2;
  }
  .swiper-slide img {
    display: block;
    width: 100%;
    border-radius: 1.25rem;
    filter: brightness(0.95) saturate(1.1);
    transition: filter 0.3s;
  }
  .swiper-slide-active img {
    filter: brightness(1) saturate(1.2) drop-shadow(0 2px 16px #a855f7cc);
  }
  /* Removed .swiper-pagination-bullet styles */
  .swiper-button-next, .swiper-button-prev {
    color: #fff;
    background: linear-gradient(90deg, #a855f7, #f472b6);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    box-shadow: 0 2px 8px #a855f7cc;
    opacity: 0.85;
    transition: opacity 0.2s, box-shadow 0.2s;
    top: 50%;
    transform: translateY(-50%);
  }
  .swiper-button-next:hover, .swiper-button-prev:hover {
    opacity: 1;
    box-shadow: 0 4px 16px #f472b6cc;
  }
  .swiper-button-next:after, .swiper-button-prev:after {
    font-size: 1.5rem;
    font-weight: bold;
  }
  `;
  return (
    <>
      <style>{css}</style>
      <Swiper
        spaceBetween={50}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={false} // disables pagination bullets
        navigation={
          showNavigation
            ? {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }
            : undefined
        }
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="size-full rounded-3xl relative group overflow-hidden">
              <img
                src={image.src}
                width={500}
                height={500}
                className="size-full rounded-xl transition-transform duration-300 group-hover:scale-105"
                alt={image.alt}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-80" />
            </div>
          </SwiperSlide>
        ))}
        {/* Navigation Arrows removed as requested */}
      </Swiper>
    </>
  );
}; 