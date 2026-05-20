import { AlertTriangle, ExternalLink, TrendingUp, Clock } from 'lucide-react';

const breakingDebunks = [
  {
    id: 'breaking-1',
    timestamp: '45 min ago',
    category: 'Politics',
    headline: 'Deepfake Video of Congressional Hearing Spreads Rapidly',
    viralCount: '2.1M',
    urgency: 'critical',
    thumbnail: 'https://images.unsplash.com/photo-1773841915558-25083446c52e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xpdGljYWwlMjBkZWJhdGUlMjBzdGFnZXxlbnwxfHx8fDE3NzUxODU2ODB8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'breaking-2',
    timestamp: '1 hour ago',
    category: 'Technology',
    headline: 'False AI Safety Report Attributed to Major Tech Company',
    viralCount: '1.8M',
    urgency: 'high',
    thumbnail: 'https://images.unsplash.com/photo-1675557570482-df9926f61d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwYXJ0aWZpY2lhbCUyMGludGVsbGlnZW5jZXxlbnwxfHx8fDE3NzUwOTY3MTh8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'breaking-3',
    timestamp: '2 hours ago',
    category: 'Politics',
    headline: 'Manipulated Election Data Circulates on Social Media',
    viralCount: '1.5M',
    urgency: 'critical',
    thumbnail: 'https://images.unsplash.com/photo-1560981477-dbcccffc1565?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdGlvbiUyMHZvdGluZyUyMGRlbW9jcmFjeXxlbnwxfHx8fDE3NzUxMTAzMjR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export function BreakingDebunks() {
  const getUrgencyStyles = (urgency: string) => {
    if (urgency === 'critical') {
      return 'bg-[#EF4444] animate-pulse';
    }
    return 'bg-[#F59E0B]';
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-[#EF4444]/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-[#EF4444]" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF4444] rounded-full animate-ping" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF4444] rounded-full" />
          </div>
          <div>
            <h2 className="text-3xl text-white">Breaking Debunks</h2>
            <p className="text-sm text-[#94A3B8]">Critical misinformation spreading right now</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#EF4444]/20 rounded-lg">
          <div className="w-2 h-2 bg-[#EF4444] rounded-full animate-pulse" />
          <span className="text-sm text-[#EF4444] uppercase tracking-wide">Live Updates</span>
        </div>
      </div>

      {/* Breaking Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {breakingDebunks.map((item, index) => (
          <div
            key={item.id}
            className="group relative bg-[#141B3A]/80 backdrop-blur-sm border border-[#EF4444]/30 rounded-xl overflow-hidden hover:border-[#EF4444]/60 transition-all cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Urgency Indicator */}
            <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
              <div className={`h-full ${getUrgencyStyles(item.urgency)}`} />
            </div>

            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden bg-[#0A0E27]">
              <img
                src={item.thumbnail}
                alt={item.headline}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E27] via-transparent to-transparent" />
              
              {/* Overlay Badge */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="px-3 py-1 bg-[#EF4444] rounded-full text-xs text-white uppercase tracking-wide">
                  Debunked
                </span>
                <span className="px-3 py-1 bg-[#0A0E27]/80 backdrop-blur-sm rounded-full text-xs text-white">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              {/* Timestamp */}
              <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                <Clock className="w-3 h-3" />
                <span>{item.timestamp}</span>
              </div>

              {/* Headline */}
              <h3 className="text-white leading-snug line-clamp-2 group-hover:text-[#2D5BFF] transition-colors">
                {item.headline}
              </h3>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-[#EF4444]" />
                  <span className="text-[#94A3B8]">{item.viralCount} shares</span>
                </div>
                <ExternalLink className="w-4 h-4 text-[#2D5BFF] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
