import { Shield, ArrowRight, X, CheckCircle, TrendingUp, ExternalLink } from 'lucide-react';

const debunkedItems = [
  {
    id: 1,
    viralImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
    realityImage: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop',
    title: 'Manipulated Space Image',
    explanation: 'Colors artificially enhanced. Original NASA image significantly altered.',
    confidence: 97,
    viralShares: '2.4M',
    category: 'Technology'
  },
  {
    id: 2,
    viralImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
    realityImage: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400&h=300&fit=crop',
    title: 'AI-Generated Portrait',
    explanation: 'Face does not match any real person. Generated using StyleGAN technology.',
    confidence: 99,
    viralShares: '3.1M',
    category: 'Technology'
  },
  {
    id: 3,
    viralImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop',
    realityImage: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=300&fit=crop',
    title: 'Misattributed News Photo',
    explanation: 'Image from 2019 event incorrectly presented as recent occurrence.',
    confidence: 94,
    viralShares: '1.8M',
    category: 'Politics'
  },
  {
    id: 4,
    viralImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop',
    realityImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
    title: 'Digitally Altered Chart',
    explanation: 'Data points manipulated to misrepresent study findings.',
    confidence: 92,
    viralShares: '1.2M',
    category: 'Politics'
  },
  {
    id: 5,
    viralImage: 'https://images.unsplash.com/photo-1560981477-dbcccffc1565?w=400&h=300&fit=crop',
    realityImage: 'https://images.unsplash.com/photo-1637768316416-191d12e566d6?w=400&h=300&fit=crop',
    title: 'Election Misinformation',
    explanation: 'Fabricated polling data circulated to influence voter perception.',
    confidence: 96,
    viralShares: '4.7M',
    category: 'Politics'
  },
  {
    id: 6,
    viralImage: 'https://images.unsplash.com/photo-1675557570482-df9926f61d86?w=400&h=300&fit=crop',
    realityImage: 'https://images.unsplash.com/photo-1760842543713-108c3cadbba1?w=400&h=300&fit=crop',
    title: 'Fake AI Breakthrough',
    explanation: 'Fraudulent announcement of AI capabilities. Company confirms no such development.',
    confidence: 98,
    viralShares: '2.9M',
    category: 'Technology'
  }
];

export function DebunkedHighlights() {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#10B981]/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-[#10B981]" />
          </div>
          <div>
            <h2 className="text-3xl text-white">Visual Debunks Gallery</h2>
            <p className="text-sm text-[#94A3B8]">Side-by-side comparisons exposing manipulated media</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-[#2D5BFF] hover:text-[#2D5BFF]/80 transition-colors">
          <span className="text-sm">View All</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Masonry Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {debunkedItems.map((item) => (
          <div
            key={item.id}
            className="group bg-[#141B3A]/80 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-[#10B981]/50 transition-all cursor-pointer"
          >
            {/* Split Screen Images */}
            <div className="relative">
              <div className="grid grid-cols-2 divide-x divide-white/10">
                {/* Viral Image */}
                <div className="relative h-48 overflow-hidden bg-[#1A2347]">
                  <img
                    src={item.viralImage}
                    alt="Viral version"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <div className="flex items-center gap-1 px-2 py-1 bg-[#EF4444]/90 backdrop-blur-sm rounded text-xs text-white">
                      <X className="w-3 h-3" />
                      Viral
                    </div>
                  </div>
                </div>

                {/* Truth Image */}
                <div className="relative h-48 overflow-hidden bg-[#1A2347]">
                  <img
                    src={item.realityImage}
                    alt="Truth"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <div className="flex items-center gap-1 px-2 py-1 bg-[#10B981]/90 backdrop-blur-sm rounded text-xs text-white">
                      <CheckCircle className="w-3 h-3" />
                      Truth
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-10 h-10 rounded-full bg-[#0A0E27] border-2 border-white/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute bottom-2 right-2">
                <span className="px-2 py-1 bg-[#2D5BFF]/90 backdrop-blur-sm rounded text-xs text-white">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              <h3 className="text-white group-hover:text-[#2D5BFF] transition-colors">{item.title}</h3>

              <p className="text-sm text-[#94A3B8] leading-relaxed line-clamp-2">
                {item.explanation}
              </p>

              {/* Stats Row */}
              <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-[#EF4444]" />
                  <span>{item.viralShares} shares</span>
                </div>
                <span>•</span>
                <span className="text-[#10B981]">{item.confidence}% confidence</span>
              </div>

              {/* Confidence Score */}
              <div className="pt-3 border-t border-white/10">
                <div className="h-1.5 bg-[#1E293B] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full transition-all duration-1000"
                    style={{ width: `${item.confidence}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}