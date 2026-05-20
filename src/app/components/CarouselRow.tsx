import { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

interface CarouselRowProps {
  title: string;
  children: ReactNode;
  subtitle?: string;
}

export function CarouselRow({ title, children, subtitle }: CarouselRowProps) {
  return (
    <div className="w-full mb-12">
      <div className="px-6 mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2 group cursor-pointer">
            {title}
            <ChevronRight className="w-5 h-5 text-[#2D5BFF] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </h2>
          {subtitle && <p className="text-sm text-[#94A3B8] mt-1">{subtitle}</p>}
        </div>
      </div>
      
      {/* Scroll Container */}
      <div className="w-full overflow-x-auto hide-scrollbar pb-4 px-6 snap-x snap-mandatory">
        <div className="flex gap-4 w-max">
          {children}
        </div>
      </div>
    </div>
  );
}
