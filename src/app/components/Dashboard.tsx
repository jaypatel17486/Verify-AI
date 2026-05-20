import { CheckCircle, XCircle, AlertTriangle, TrendingUp } from 'lucide-react';

const factChecks = [
  {
    id: 1,
    claim: "Global temperatures reached record highs in 2025",
    status: "true",
    credibility: 95,
    time: "2h ago"
  },
  {
    id: 2,
    claim: "New vaccine prevents all forms of cancer",
    status: "false",
    credibility: 15,
    time: "4h ago"
  },
  {
    id: 3,
    claim: "Tech company announces breakthrough in quantum computing",
    status: "misleading",
    credibility: 62,
    time: "6h ago"
  },
  {
    id: 4,
    claim: "Study finds 80% reduction in plastic waste in Pacific Ocean",
    status: "true",
    credibility: 88,
    time: "8h ago"
  }
];

export function Dashboard() {
  const getStatusIcon = (status: string) => {
    if (status === 'true') return <CheckCircle className="w-5 h-5 text-[#10B981]" />;
    if (status === 'false') return <XCircle className="w-5 h-5 text-[#EF4444]" />;
    return <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />;
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      true: 'bg-[#10B981]/20 text-[#10B981]',
      false: 'bg-[#EF4444]/20 text-[#EF4444]',
      misleading: 'bg-[#F59E0B]/20 text-[#F59E0B]'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <TrendingUp className="w-6 h-6 text-[#2D5BFF]" />
        <h2 className="text-2xl text-white">Recent Fact-Checks</h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#141B3A] border border-white/10 rounded-xl p-6">
          <p className="text-sm text-[#94A3B8] mb-2">Total Checks</p>
          <p className="text-3xl text-white">12,847</p>
        </div>
        <div className="bg-[#141B3A] border border-white/10 rounded-xl p-6">
          <p className="text-sm text-[#94A3B8] mb-2">Avg Credibility</p>
          <p className="text-3xl text-white">78%</p>
        </div>
        <div className="bg-[#141B3A] border border-white/10 rounded-xl p-6">
          <p className="text-sm text-[#94A3B8] mb-2">False Claims</p>
          <p className="text-3xl text-white">2,341</p>
        </div>
      </div>

      <div className="space-y-4">
        {factChecks.map((check) => (
          <div
            key={check.id}
            className="bg-[#141B3A] border border-white/10 rounded-xl p-6 hover:border-[#2D5BFF]/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 flex-1">
                {getStatusIcon(check.status)}
                <div className="flex-1">
                  <h3 className="text-white mb-2">{check.claim}</h3>
                  <p className="text-sm text-[#94A3B8]">{check.time}</p>
                </div>
              </div>
              {getStatusBadge(check.status)}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-xs text-[#94A3B8] mb-2">Credibility Score</p>
                <div className="w-full bg-[#1E293B] rounded-full h-2">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${check.credibility}%`,
                      background: check.credibility >= 70 ? '#10B981' : check.credibility >= 40 ? '#F59E0B' : '#EF4444'
                    }}
                  />
                </div>
              </div>
              <span className="text-sm text-white">{check.credibility}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
