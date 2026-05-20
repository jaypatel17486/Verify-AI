import { useState } from 'react';
import { useNavigate } from 'react-router';
import { mockClaims } from '../mockData';
import { ShieldAlert, TrendingUp, Search, Clock, ArrowRight, Activity, Globe, Star, Zap, FlaskConical, Gavel, Sparkles, Heart } from 'lucide-react';
import { NewsCarousel } from '../components/NewsCarousel';

const TABS = [
  { id: 'For You', icon: Sparkles },
  { id: 'Breaking News', icon: Zap },
  { id: 'Politics', icon: Gavel },
  { id: 'Technology', icon: Globe },
  { id: 'Sports', icon: Activity },
  { id: 'Science', icon: FlaskConical },
  { id: 'Health', icon: Heart },
  { id: 'Entertainment', icon: Star },
];

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState('For You');
  const navigate = useNavigate();

  const getFilteredClaims = () => {
    if (activeTab === 'For You') {
       return [...mockClaims].sort(() => 0.5 - Math.random()).slice(0, 6);
    }
    if (activeTab === 'Breaking News') {
       return mockClaims.filter(c => c.status === 'unverified' || c.category === 'Breaking News' || c.status === 'suspicious');
    }
    return mockClaims.filter(c => c.category === activeTab);
  };

  const filteredClaims = getFilteredClaims();

  const handleClaimClick = (headline: string) => {
    navigate(`/fact-check?q=${encodeURIComponent(headline)}`);
  };

  return (
    <div className="flex flex-col min-h-[85vh] max-w-6xl mx-auto space-y-8 pb-32">
      {/* Sleek Hero Section */}
      <div className="text-center mt-8 mb-12 animate-in fade-in zoom-in duration-500">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2D5BFF]/10 border border-[#2D5BFF]/30 rounded-full mb-6">
          <TrendingUp className="w-4 h-4 text-[#2D5BFF]" />
          <span className="text-sm font-bold text-[#2D5BFF] uppercase tracking-wider">Trending Claims</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
          Verify the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D5BFF] to-[#10B981]">Unverified</span>
        </h1>
        <p className="text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
          Explore the most viral stories circulating online right now. Click any claim to instantly run it through our AI Fact-Check Engine.
        </p>
      </div>

      {/* News Carousel */}
      <div className="max-w-5xl mx-auto w-full mb-8">
        <NewsCarousel />
      </div>

      {/* Master Table Section */}
      <div className="bg-[#141B3A]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-white/10 hide-scrollbar bg-[#0A0E27]/50">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold tracking-wide whitespace-nowrap transition-all border-b-2 ${
                  isActive 
                    ? 'border-[#2D5BFF] text-white bg-[#2D5BFF]/5' 
                    : 'border-transparent text-[#94A3B8] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#2D5BFF]' : 'text-[#475569]'}`} />
                {tab.id}
              </button>
            );
          })}
        </div>

        {/* Table Content */}
        <div className="p-0">
          {filteredClaims.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Search className="w-12 h-12 text-[#475569] mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No trending claims found</h3>
              <p className="text-[#94A3B8]">Check back later for updates in {activeTab}.</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {filteredClaims.map((claim, index) => (
                <div 
                  key={claim.id}
                  onClick={() => handleClaimClick(claim.headline)}
                  className={`group flex flex-col md:flex-row md:items-center justify-between p-6 cursor-pointer transition-all hover:bg-[#2D5BFF]/10 ${
                    index !== filteredClaims.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-[#1E293B] overflow-hidden shrink-0 hidden sm:block border border-white/10 group-hover:border-[#2D5BFF]/30 transition-colors">
                       <img src={claim.thumbnail} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex-1 pr-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold px-2 py-1 bg-white/5 rounded text-[#94A3B8] uppercase tracking-wider">
                          {claim.category}
                        </span>
                        <div className="flex items-center gap-1 text-[#475569] text-xs">
                          <Clock className="w-3 h-3" />
                          {claim.timestamp}
                        </div>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-[#2D5BFF] transition-colors line-clamp-2">
                        {claim.headline}
                      </h3>
                      <p className="text-sm text-[#94A3B8] line-clamp-1">
                        {claim.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 mt-4 md:mt-0 pl-0 md:pl-6 md:border-l md:border-white/5">
                     <div className="flex flex-col items-start md:items-end">
                       <span className="text-xs text-[#475569] uppercase font-bold tracking-wider mb-1">Engagement</span>
                       <span className="text-white font-black">{claim.viralMetrics.reach} <span className="text-[#94A3B8] font-medium text-sm">reach</span></span>
                     </div>
                     <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#2D5BFF] transition-colors">
                       <ArrowRight className="w-5 h-5 text-[#94A3B8] group-hover:text-white transition-colors" />
                     </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}