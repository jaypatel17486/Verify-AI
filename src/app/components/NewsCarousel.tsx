import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { mockClaims } from '../mockData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function NewsCarousel() {
  const navigate = useNavigate();
  // Filter claims that are interesting for the carousel
  const carouselStories = mockClaims.slice(0, 5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselStories.length);
    }, 6000); // 6 seconds pace
    return () => clearInterval(timer);
  }, [carouselStories.length, isHovered]);

  const handleClaimClick = (headline: string) => {
    navigate(`/fact-check?q=${encodeURIComponent(headline)}`);
  };

  const nextSlide = (e: React.MouseEvent) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % carouselStories.length); };
  const prevSlide = (e: React.MouseEvent) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + carouselStories.length) % carouselStories.length); };

  const currentStory = carouselStories[currentIndex];

  return (
    <div 
      className="relative w-full max-w-5xl mx-auto bg-[#141B3A]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer min-h-[120px] md:min-h-[140px] transition-all hover:border-[#2D5BFF]/30 hover:shadow-[0_0_40px_rgba(45,91,255,0.15)] flex flex-col justify-center select-none focus:outline-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleClaimClick(currentStory.headline)}
      tabIndex={0}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-white/5 z-10 pointer-events-none">
        <div 
           className="h-full bg-gradient-to-r from-[#2D5BFF] to-[#10B981] transition-all ease-linear"
           style={{ 
             width: isHovered ? '100%' : '100%', 
             transitionDuration: isHovered ? '0s' : '6000ms',
             animation: isHovered ? 'none' : 'progress 6s linear infinite'
           }}
        />
      </div>

      {/* Clickable Side Navigation Zones */}
      <div 
        className="absolute inset-y-0 left-0 w-16 md:w-24 z-20 flex items-center justify-start px-2 md:px-6 cursor-pointer group/left bg-gradient-to-r from-[#0A0E27]/80 to-transparent opacity-60 hover:opacity-100 transition-opacity" 
        onClick={prevSlide}
      >
         <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-white/50 group-hover/left:text-white transition-all group-hover/left:-translate-x-1" />
      </div>
      
      <div 
        className="absolute inset-y-0 right-0 w-16 md:w-24 z-20 flex items-center justify-end px-2 md:px-6 cursor-pointer group/right bg-gradient-to-l from-[#0A0E27]/80 to-transparent opacity-60 hover:opacity-100 transition-opacity" 
        onClick={nextSlide}
      >
         <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-white/50 group-hover/right:text-white transition-all group-hover/right:translate-x-1" />
      </div>

      {/* Content */}
      <div className="w-full flex items-center justify-between px-16 md:px-28 py-6 z-0">
          <div 
             key={currentIndex}
             className="w-full flex items-center justify-between gap-8 animate-in slide-in-from-right-8 fade-in duration-500"
          >
             {/* Left Section: Metadata & Headline */}
             <div className="flex flex-col gap-3 flex-1">
               <div className="flex items-center gap-3">
                 <span className="text-[#2D5BFF] font-bold text-xs uppercase tracking-widest bg-[#2D5BFF]/10 px-3 py-1.5 rounded-full border border-[#2D5BFF]/20">
                   {currentStory.category}
                 </span>
               </div>
               
               <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white group-hover:text-[#10B981] transition-colors leading-snug line-clamp-2 max-w-3xl">
                 {currentStory.headline}
               </h2>
             </div>

             {/* Right Section: Metrics (Fills negative space) */}
             <div className="hidden lg:flex flex-col items-end text-right shrink-0 border-l border-white/10 pl-8">
               <span className="text-xs font-bold text-[#475569] uppercase tracking-wider mb-1">Current Reach</span>
               <div className="flex items-baseline gap-1">
                 <span className="text-3xl font-black text-white tracking-tight">{currentStory.viralMetrics.reach}</span>
               </div>
               <span className="text-xs text-[#94A3B8] font-medium mt-1">Across {currentStory.viralMetrics.platforms} platforms</span>
             </div>
          </div>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {carouselStories.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-[#2D5BFF] w-6 shadow-[0_0_10px_rgba(45,91,255,0.5)]' : 'bg-white/20 w-2 hover:bg-white/40'}`}
          />
        ))}
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
