import { AlertTriangle, CheckCircle, XCircle, ExternalLink, Lightbulb } from 'lucide-react';

export function AnalysisResultPreview() {
  const credibilityScore = 34;
  const reasons = [
    'No credible sources match this claim',
    'Inconsistent lighting and shadows detected in image',
    'Similar deepfake patterns identified',
    'Source domain has history of misinformation'
  ];

  const getScoreColor = (score: number) => {
    if (score >= 70) return { color: '#10B981', label: 'Credible' };
    if (score >= 40) return { color: '#F59E0B', label: 'Questionable' };
    return { color: '#EF4444', label: 'Not Credible' };
  };

  const scoreInfo = getScoreColor(credibilityScore);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#2D5BFF]/20 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-[#2D5BFF]" />
        </div>
        <div>
          <h2 className="text-2xl text-white">How It Works</h2>
          <p className="text-sm text-[#94A3B8]">Sample analysis to build your trust</p>
        </div>
      </div>

      {/* Preview Card */}
      <div className="bg-[#141B3A]/80 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2D5BFF]/10 to-[#10B981]/10 border-b border-white/10 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-[#EF4444]/20 text-[#EF4444] rounded-full text-xs border border-[#EF4444]/30">
                  Sample Result
                </span>
              </div>
              <h3 className="text-lg text-white mb-1">
                "New study proves coffee cures all diseases"
              </h3>
              <p className="text-sm text-[#94A3B8]">Source: unknown-health-blog.com</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Credibility Score */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-white">Credibility Assessment</h4>
              <span className="text-xs text-[#94A3B8]">AI Analysis</span>
            </div>

            {/* Circular Meter */}
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-32">
                {/* Background Circle */}
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke={scoreInfo.color}
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${(credibilityScore / 100) * 352} 352`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl text-white">{credibilityScore}</span>
                  <span className="text-xs text-[#94A3B8]">/ 100</span>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5" style={{ color: scoreInfo.color }} />
                  <span className="text-lg" style={{ color: scoreInfo.color }}>
                    {scoreInfo.label}
                  </span>
                </div>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  This content shows multiple indicators of misinformation and lacks verifiable sources.
                </p>
              </div>
            </div>
          </div>

          {/* AI Reasoning Box */}
          <div className="bg-[#0A0E27]/50 border border-white/10 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-white">AI Analysis & Transparency</h4>
              <button className="text-xs text-[#2D5BFF] hover:text-[#2D5BFF]/80 transition-colors flex items-center gap-1">
                Full Report
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                  </div>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="flex-1 px-4 py-3 bg-[#2D5BFF] text-white rounded-lg hover:bg-[#2D5BFF]/90 transition-colors text-sm">
              Try Your Own Analysis
            </button>
            <button className="px-4 py-3 border border-white/10 text-[#94A3B8] rounded-lg hover:border-white/20 hover:text-white transition-colors text-sm">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
