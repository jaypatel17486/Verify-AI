import { AlertTriangle, TrendingUp, Clock, Users } from 'lucide-react';

const featuredClaim = {
  id: 'featured-001',
  timestamp: '2 hours ago',
  category: 'Politics',
  headline: 'Viral Video Claims Recent Federal Budget Contains Hidden Tax Increases',
  status: 'debunked',
  confidence: 98,
  viralMetrics: {
    shares: '4.2M',
    platforms: ['Twitter', 'Facebook', 'TikTok'],
    reach: '12.8M'
  },
  thumbnail: 'https://images.unsplash.com/photo-1637768316416-191d12e566d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwY2FwaXRvbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3NTE4NTY4MXww&ixlib=rb-4.1.0&q=80&w=1080',
  truthStatement: 'No hidden tax increases exist in the federal budget. The viral video misrepresents standard legislative language and selectively edits official statements.',
  sources: ['Congressional Budget Office', 'IRS Official Statement', 'PolitiFact'],
  expertVerification: 'Prof. Sarah Chen, Economics, Harvard University'
};

export function FeaturedClaimOfDay() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EF4444]/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative">
        {/* Header Badge */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#EF4444] to-[#DC2626] rounded-full shadow-lg shadow-[#EF4444]/30">
            <div className="absolute -inset-1 bg-[#EF4444] rounded-full animate-ping opacity-75" />
            <div className="relative flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-white animate-pulse" />
              <span className="text-white uppercase tracking-wide text-sm font-semibold">Most Urgent Debunk Today</span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-[#141B3A]/80 backdrop-blur-sm border border-[#EF4444]/30 rounded-2xl overflow-hidden shadow-2xl hover:border-[#EF4444]/50 transition-all">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: Image & Quick Stats */}
            <div className="relative h-96 md:h-auto overflow-hidden bg-[#0A0E27]">
              <img
                src={featuredClaim.thumbnail}
                alt="Featured claim"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E27] via-transparent to-transparent" />
              
              {/* Overlay Stats */}
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#EF4444] rounded-full text-xs text-white uppercase tracking-wide">
                    {featuredClaim.status}
                  </span>
                  <span className="px-3 py-1 bg-[#2D5BFF]/80 backdrop-blur-sm rounded-full text-xs text-white">
                    {featuredClaim.category}
                  </span>
                </div>
                
                {/* Viral Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#0A0E27]/80 backdrop-blur-sm rounded-lg">
                    <TrendingUp className="w-4 h-4 text-[#EF4444]" />
                    <div>
                      <div className="text-xs text-[#94A3B8]">Viral Shares</div>
                      <div className="text-white">{featuredClaim.viralMetrics.shares}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#0A0E27]/80 backdrop-blur-sm rounded-lg">
                    <Users className="w-4 h-4 text-[#F59E0B]" />
                    <div>
                      <div className="text-xs text-[#94A3B8]">Total Reach</div>
                      <div className="text-white">{featuredClaim.viralMetrics.reach}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="p-8 space-y-6">
              {/* Timestamp */}
              <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                <Clock className="w-4 h-4" />
                <span>Debunked {featuredClaim.timestamp}</span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl text-white leading-tight">
                {featuredClaim.headline}
              </h2>

              {/* Truth Statement */}
              <div className="p-4 bg-[#10B981]/10 border border-[#10B981]/30 rounded-xl">
                <div className="text-xs text-[#10B981] uppercase tracking-wide mb-2">The Truth</div>
                <p className="text-white leading-relaxed">
                  {featuredClaim.truthStatement}
                </p>
              </div>

              {/* Expert Verification */}
              <div className="flex items-start gap-3 p-4 bg-[#2D5BFF]/10 border border-[#2D5BFF]/30 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#2D5BFF]/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-[#2D5BFF]" />
                </div>
                <div>
                  <div className="text-xs text-[#94A3B8] mb-1">Expert Verification</div>
                  <div className="text-white text-sm">{featuredClaim.expertVerification}</div>
                </div>
              </div>

              {/* Confidence Score */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#94A3B8]">AI Confidence Score</span>
                  <span className="text-[#10B981] font-semibold">{featuredClaim.confidence}%</span>
                </div>
                <div className="h-2 bg-[#1E293B] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full transition-all duration-1000"
                    style={{ width: `${featuredClaim.confidence}%` }}
                  />
                </div>
              </div>

              {/* Sources */}
              <div>
                <div className="text-xs text-[#94A3B8] mb-2">Verified Sources</div>
                <div className="flex flex-wrap gap-2">
                  {featuredClaim.sources.map((source, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#0A0E27] border border-white/10 rounded-full text-xs text-[#94A3B8]"
                    >
                      {source}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button className="w-full py-4 bg-gradient-to-r from-[#2D5BFF] to-[#1E4AD9] text-white rounded-xl hover:shadow-lg hover:shadow-[#2D5BFF]/30 transition-all">
                View Full Analysis & Evidence
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}