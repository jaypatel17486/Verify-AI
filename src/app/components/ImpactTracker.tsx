import { CheckCircle, X, Users, TrendingUp, AlertTriangle, Shield } from 'lucide-react';

const stats = [
  {
    label: 'Claims Debunked Today',
    value: '847',
    icon: X,
    color: '#EF4444',
    trend: '+23.5%',
    subtitle: 'Last 24 hours'
  },
  {
    label: 'Political Claims Verified',
    value: '1.2M',
    icon: CheckCircle,
    color: '#2D5BFF',
    trend: '+12.5%',
    subtitle: 'All time'
  },
  {
    label: 'Tech Misinformation Stopped',
    value: '500K',
    icon: Shield,
    color: '#10B981',
    trend: '+8.2%',
    subtitle: 'This month'
  },
  {
    label: 'Users Protected',
    value: '8.7M',
    icon: Users,
    color: '#F59E0B',
    trend: '+15.3%',
    subtitle: 'Active members'
  },
  {
    label: 'Viral Lies Exposed',
    value: '12.4K',
    icon: TrendingUp,
    color: '#8B5CF6',
    trend: '+18.9%',
    subtitle: 'This week'
  },
  {
    label: 'Urgent Alerts Sent',
    value: '3,215',
    icon: AlertTriangle,
    color: '#EF4444',
    trend: '+34.2%',
    subtitle: 'Critical debunks'
  }
];

export function ImpactTracker() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D5BFF]/5 via-transparent to-[#10B981]/5 pointer-events-none" />

      <div className="relative bg-[#141B3A]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8 space-y-3">
          <h2 className="text-3xl text-white">Global Impact Dashboard</h2>
          <p className="text-[#94A3B8]">Fighting misinformation in politics and technology, together</p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
            <span className="text-sm text-[#10B981]">Live statistics updating in real-time</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity rounded-xl blur-xl"
                     style={{ background: `radial-gradient(circle at center, ${stat.color}40, transparent)` }}
                />
                <div className="relative bg-[#0A0E27]/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 group-hover:border-white/20 transition-all">
                  {/* Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                         style={{ backgroundColor: `${stat.color}20` }}>
                      <Icon className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                    <div className="px-2 py-1 bg-[#10B981]/20 rounded text-xs text-[#10B981]">
                      {stat.trend}
                    </div>
                  </div>

                  {/* Value */}
                  <div className="space-y-1">
                    <p className="text-4xl text-white font-semibold">{stat.value}</p>
                    <p className="text-sm text-white">{stat.label}</p>
                    <p className="text-xs text-[#94A3B8]">{stat.subtitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-[#94A3B8]">
            Join <span className="text-white font-semibold">8.7 million users</span> fighting misinformation every day
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-[#2D5BFF] to-[#1E4AD9] text-white rounded-xl hover:shadow-lg hover:shadow-[#2D5BFF]/30 transition-all">
              Start Contributing Today
            </button>
            <button className="px-6 py-3 bg-[#0A0E27] border border-white/10 text-white rounded-xl hover:border-[#2D5BFF]/50 transition-all">
              View Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}