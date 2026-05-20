import { AlertCircle, TrendingUp, ExternalLink } from 'lucide-react';

const trendingClaims = [
  {
    id: 1,
    thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop',
    claim: 'AI-generated video shows fictional earthquake in California',
    badge: 'Debunked',
    views: '2.4M',
    checks: '12.5K'
  },
  {
    id: 2,
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
    claim: 'Deepfake of world leader announcing false policy spreads on social media',
    badge: 'Debunked',
    views: '1.8M',
    checks: '9.2K'
  },
  {
    id: 3,
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop',
    claim: 'Vaccine study misrepresented in viral social media post',
    badge: 'Suspicious',
    views: '1.2M',
    checks: '7.8K'
  },
  {
    id: 4,
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop',
    claim: 'Old photo circulates as recent climate disaster evidence',
    badge: 'Debunked',
    views: '950K',
    checks: '6.1K'
  },
  {
    id: 5,
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
    claim: 'Tech company announcement taken out of context',
    badge: 'Suspicious',
    views: '820K',
    checks: '5.4K'
  }
];

export function TrendingClaims() {
  const getBadgeStyles = (badge: string) => {
    if (badge === 'Debunked') {
      return 'bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/30';
    }
    return 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/30';
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#EF4444]/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-[#EF4444]" />
          </div>
          <div>
            <h2 className="text-2xl text-white">Trending Misinformation</h2>
            <p className="text-sm text-[#94A3B8]">Most commonly flagged claims this week</p>
          </div>
        </div>
        <button className="text-sm text-[#2D5BFF] hover:text-[#2D5BFF]/80 transition-colors flex items-center gap-1">
          View All
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable Carousel */}
      <div className="overflow-x-auto pb-4 -mx-6 px-6">
        <div className="flex gap-4 min-w-max">
          {trendingClaims.map((claim) => (
            <div
              key={claim.id}
              className="w-80 bg-[#141B3A]/80 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-[#EF4444]/50 transition-all cursor-pointer group"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden bg-[#1A2347]">
                <img
                  src={claim.thumbnail}
                  alt={claim.claim}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs border backdrop-blur-sm ${getBadgeStyles(claim.badge)}`}>
                    {claim.badge}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                <p className="text-white line-clamp-2 leading-relaxed">
                  {claim.claim}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-[#94A3B8]">
                  <div className="flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{claim.checks} checks</span>
                  </div>
                  <span>{claim.views} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
