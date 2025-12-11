import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const promos = [
  {
    id: 1,
    title: "0% Commission",
    subtitle: "For tutoring and learning categories",
    cta: "Post Job Now!",
    bgColor: "from-primary to-blue-400",
  },
  {
    id: 2,
    title: "New User Bonus",
    subtitle: "Get 50 points on your first job post",
    cta: "Claim Now!",
    bgColor: "from-accent to-orange-400",
  },
  {
    id: 3,
    title: "Refer & Earn",
    subtitle: "Invite friends and earn rewards",
    cta: "Start Referring!",
    bgColor: "from-green-500 to-emerald-400",
  },
];

export function PromoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % promos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + promos.length) % promos.length);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {promos.map((promo) => (
            <div
              key={promo.id}
              className={`min-w-full bg-gradient-to-r ${promo.bgColor} p-6 text-primary-foreground`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide opacity-80 mb-1">Special Offer</p>
                  <h3 className="text-2xl font-bold mb-1">{promo.title}</h3>
                  <p className="text-sm opacity-90 mb-3">{promo.subtitle}</p>
                  <button className="bg-card text-foreground px-4 py-2 rounded-full text-sm font-semibold hover:bg-card/90 transition-colors">
                    {promo.cta}
                  </button>
                </div>
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-4xl">🎯</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-3">
        {promos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
