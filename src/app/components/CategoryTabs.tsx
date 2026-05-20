import { useState } from 'react';
import { LayoutGrid, Newspaper, Cpu, Globe, TrendingUp } from 'lucide-react';

type Category = 'all' | 'politics' | 'technology' | 'breaking' | 'global';

const categories = [
  { id: 'all' as Category, label: 'All Claims', icon: LayoutGrid, count: '2,847' },
  { id: 'breaking' as Category, label: 'Breaking Now', icon: TrendingUp, count: '23', urgent: true },
  { id: 'politics' as Category, label: 'Politics', icon: Newspaper, count: '1,243' },
  { id: 'technology' as Category, label: 'Technology', icon: Cpu, count: '892' },
  { id: 'global' as Category, label: 'Global News', icon: Globe, count: '712' }
];

export function CategoryTabs() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl text-white">Explore by Category</h2>
        <p className="text-[#94A3B8]">Filter the truth by what matters most to you</p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative flex items-center gap-3 px-6 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-[#2D5BFF] text-white shadow-lg shadow-[#2D5BFF]/30'
                  : 'bg-[#141B3A]/80 backdrop-blur-sm border border-white/10 text-[#94A3B8] hover:text-white hover:border-[#2D5BFF]/50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#94A3B8]'}`} />
              <div className="flex items-center gap-2">
                <span className="font-medium">{category.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#0A0E27] text-[#94A3B8]'
                  }`}
                >
                  {category.count}
                </span>
              </div>
              {category.urgent && (
                <>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#EF4444] rounded-full animate-ping" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#EF4444] rounded-full" />
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Sort Options */}
      <div className="flex items-center justify-center gap-4 pt-2">
        <span className="text-sm text-[#94A3B8]">Sort by:</span>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-[#2D5BFF]/20 text-[#2D5BFF] rounded-lg text-sm hover:bg-[#2D5BFF]/30 transition-colors">
            Most Recent
          </button>
          <button className="px-4 py-2 text-[#94A3B8] hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors">
            Most Viral
          </button>
          <button className="px-4 py-2 text-[#94A3B8] hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors">
            High Impact
          </button>
        </div>
      </div>
    </div>
  );
}
