import { useState, useEffect } from 'react';
import { Shield, X, CheckCircle, AlertCircle, TrendingUp, Clock, Users, ExternalLink, Share2, BookmarkPlus } from 'lucide-react';
import { motion } from 'motion/react';

interface ViralMetrics {
  shares: string;
  reach: string;
  platforms: number;
}

interface Claim {
  id: string;
  timestamp: string;
  category: string;
  status: string;
  confidence: number;
  headline: string;
  description: string;
  thumbnail: string;
  viralMetrics: ViralMetrics;
  sources: string[];
  expert: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 400
    }
  }
};

export function LiveClaimsFeed() {
  const [liveClaimsData, setLiveClaimsData] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Using mock data since the new Python backend does not yet support a claims feed endpoint
    const mockClaims: Claim[] = [
      {
        id: 'claim-001',
        timestamp: '12 minutes ago',
        category: 'Politics',
        status: 'debunked',
        confidence: 97,
        headline: 'Viral Post Claims New Federal Policy Will Eliminate Medicare Benefits',
        description: 'Social media posts misrepresent healthcare legislation, claiming complete elimination of Medicare benefits. Official sources confirm no such provisions exist.',
        thumbnail: 'https://images.unsplash.com/photo-1637768316416-191d12e566d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwY2FwaXRvbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3NTE4NTY4MXww&ixlib=rb-4.1.0&q=80&w=1080',
        viralMetrics: { shares: '3.2M', reach: '8.7M', platforms: 4 },
        sources: ['Medicare.gov', 'Congressional Budget Office', 'FactCheck.org'],
        expert: 'Dr. Michael Torres, Healthcare Policy Expert'
      },
      {
        id: 'claim-002',
        timestamp: '28 minutes ago',
        category: 'Technology',
        status: 'debunked',
        confidence: 99,
        headline: 'False Report: Major Tech Company Experiencing Global Data Breach',
        description: 'Fabricated news article claims massive data breach affecting millions of users. Company confirms no breach occurred and reports originate from known disinformation network.',
        thumbnail: 'https://images.unsplash.com/photo-1483817101829-339b08e8d83f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwZGF0YSUyMHNlY3VyaXR5fGVufDF8fHx8MTc3NTE4NTY4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
        viralMetrics: { shares: '2.8M', reach: '7.1M', platforms: 5 },
        sources: ['Company Official Statement', 'CyberSecurity & Infrastructure Security Agency', 'TechCrunch'],
        expert: 'Rachel Kim, Cybersecurity Analyst'
      }
    ];
    
    setLiveClaimsData(mockClaims);
    setLoading(false);
  }, []);

  const getStatusConfig = (status: string) => {
    // ... (logic remains the same)
    switch (status) {
      case 'debunked':
        return {
          icon: X,
          color: '#EF4444',
          bg: 'bg-[#EF4444]/20',
          border: 'border-[#EF4444]/30',
          text: 'text-[#EF4444]',
          label: 'Debunked'
        };
      case 'verified':
        return {
          icon: CheckCircle,
          color: '#10B981',
          bg: 'bg-[#10B981]/20',
          border: 'border-[#10B981]/30',
          text: 'text-[#10B981]',
          label: 'Verified'
        };
      case 'suspicious':
        return {
          icon: AlertCircle,
          color: '#F59E0B',
          bg: 'bg-[#F59E0B]/20',
          border: 'border-[#F59E0B]/30',
          text: 'text-[#F59E0B]',
          label: 'Suspicious'
        };
      default:
        return {
          icon: AlertCircle,
          color: '#94A3B8',
          bg: 'bg-[#94A3B8]/20',
          border: 'border-[#94A3B8]/30',
          text: 'text-[#94A3B8]',
          label: 'Unknown'
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl text-white">Live Claims Feed</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-[#10B981]/20 rounded-full">
              <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
              <span className="text-sm text-[#10B981] font-medium">Live</span>
            </div>
          </div>
          <p className="text-[#94A3B8]">Real-time fact-checking from around the world • Updated every minute</p>
        </div>
      </div>

      {/* Claims List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D5BFF]"></div>
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6"
        >
          {liveClaimsData.map((claim) => {
          const statusConfig = getStatusConfig(claim.status);
          const StatusIcon = statusConfig.icon;

          return (
            <motion.article
              key={claim.id}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`group bg-[#141B3A]/80 backdrop-blur-sm border ${statusConfig.border} rounded-xl overflow-hidden hover:bg-[#141B3A] transition-all cursor-pointer shadow-xl hover:shadow-[#2D5BFF]/5`}
            >
              <div className="grid md:grid-cols-[300px,1fr] gap-0">
                {/* Left: Thumbnail */}
                <div className="relative h-64 md:h-auto overflow-hidden bg-[#0A0E27]">
                  <img
                    src={claim.thumbnail}
                    alt={claim.headline}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E27] via-transparent to-transparent md:bg-gradient-to-r" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <div className={`flex items-center gap-2 px-3 py-2 ${statusConfig.bg} backdrop-blur-sm border ${statusConfig.border} rounded-lg shadow-lg`}>
                      <StatusIcon className={`w-4 h-4 ${statusConfig.text}`} />
                      <span className={`text-sm font-bold ${statusConfig.text} uppercase tracking-wider`}>
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-[#2D5BFF]/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-white uppercase tracking-widest shadow-lg">
                      {claim.category}
                    </span>
                  </div>

                  {/* Viral Metrics Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#0A0E27]/90 backdrop-blur-sm rounded-lg border border-white/5">
                      <TrendingUp className="w-4 h-4 text-[#EF4444]" />
                      <div>
                        <div className="text-[10px] text-[#94A3B8] uppercase tracking-tighter">Shares</div>
                        <div className="text-white text-sm font-bold">{claim.viralMetrics.shares}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#0A0E27]/90 backdrop-blur-sm rounded-lg border border-white/5">
                      <Users className="w-4 h-4 text-[#F59E0B]" />
                      <div>
                        <div className="text-[10px] text-[#94A3B8] uppercase tracking-tighter">Reach</div>
                        <div className="text-white text-sm font-bold">{claim.viralMetrics.reach}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="p-6 space-y-5">
                  {/* Timestamp */}
                  <div className="flex items-center gap-2 text-sm text-[#94A3B8] font-medium">
                    <Clock className="w-4 h-4" />
                    <span>Fact-checked {claim.timestamp}</span>
                    <span className="mx-2 opacity-30">•</span>
                    <span>{claim.viralMetrics.platforms} platforms</span>
                  </div>

                  {/* Headline */}
                  <h3 className="text-2xl text-white leading-tight group-hover:text-[#2D5BFF] transition-colors duration-300">
                    {claim.headline}
                  </h3>

                  {/* Description */}
                  <p className="text-[#94A3B8] leading-relaxed text-sm">
                    {claim.description}
                  </p>

                  {/* Expert Verification */}
                  <div className="flex items-center gap-3 p-4 bg-[#0A0E27]/50 rounded-xl border border-white/5 group-hover:border-[#2D5BFF]/20 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-[#2D5BFF]/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-[#2D5BFF]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-bold mb-0.5">Expert Verification</div>
                      <div className="text-white text-sm font-medium">{claim.expert}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-bold mb-0.5">Confidence</div>
                      <div className={`text-xl font-black ${statusConfig.text}`}>{claim.confidence}%</div>
                    </div>
                  </div>

                  {/* Sources */}
                  <div>
                    <div className="text-[10px] text-[#94A3B8] uppercase tracking-widest font-bold mb-3">Verified Sources ({claim.sources.length})</div>
                    <div className="flex flex-wrap gap-2">
                      {claim.sources.map((source, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-[#0A0E27] border border-white/10 rounded-lg text-[11px] font-medium text-[#94A3B8] hover:border-[#2D5BFF]/50 hover:text-white transition-all cursor-pointer"
                        >
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#2D5BFF] to-[#1E4AD9] text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-[#2D5BFF]/30 transition-all active:scale-95">
                      <ExternalLink className="w-4 h-4" />
                      View Analysis
                    </button>
                    <button className="p-3 bg-[#0A0E27] border border-white/10 rounded-xl text-[#94A3B8] hover:text-white hover:border-[#2D5BFF]/50 transition-all active:scale-90">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-3 bg-[#0A0E27] border border-white/10 rounded-xl text-[#94A3B8] hover:text-white hover:border-[#2D5BFF]/50 transition-all active:scale-90">
                      <BookmarkPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
      )}

      {/* Load More */}
      <div className="text-center pt-6">
        <button className="px-8 py-4 bg-[#141B3A]/80 backdrop-blur-sm border border-white/10 text-white rounded-xl hover:border-[#2D5BFF]/50 hover:bg-[#2D5BFF]/10 transition-all">
          Load More Claims
        </button>
      </div>
    </div>
  );
}