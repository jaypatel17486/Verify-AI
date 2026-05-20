import { X, CheckCircle, AlertCircle, Clock, Shield } from 'lucide-react';
import { Claim } from '../types';
import { Link } from 'react-router';

interface ClaimCardProps {
  claim: Claim;
}

export function ClaimCard({ claim }: ClaimCardProps) {
  const getStatusConfig = (status: string) => {
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

  const statusConfig = getStatusConfig(claim.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className={`group relative w-[280px] h-[380px] flex-shrink-0 bg-[#141B3A]/80 backdrop-blur-sm border ${statusConfig.border} rounded-xl overflow-hidden hover:bg-[#141B3A] transition-all cursor-pointer shadow-xl hover:shadow-[#2D5BFF]/10 flex flex-col`}>
      {/* Thumbnail Area */}
      <div className="relative h-40 overflow-hidden bg-[#0A0E27]">
        <img
          src={claim.thumbnail}
          alt={claim.headline}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E27] via-transparent to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <div className={`flex items-center gap-1.5 px-2 py-1 ${statusConfig.bg} backdrop-blur-sm border ${statusConfig.border} rounded-md shadow-lg`}>
            <StatusIcon className={`w-3 h-3 ${statusConfig.text}`} />
            <span className={`text-[10px] font-bold ${statusConfig.text} uppercase tracking-wider`}>
              {statusConfig.label}
            </span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col relative">
        <div className="flex items-center justify-between gap-2 text-[10px] text-[#94A3B8] font-medium mb-2">
          <span className="bg-[#2D5BFF]/20 text-[#2D5BFF] px-2 py-0.5 rounded text-[9px] uppercase font-bold">
            {claim.category}
          </span>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{claim.timestamp}</span>
          </div>
        </div>

        <h3 className="text-sm font-bold text-white leading-snug group-hover:text-[#2D5BFF] transition-colors duration-300 line-clamp-3 mb-2">
          {claim.headline}
        </h3>

        <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#2D5BFF]" />
            <span className="text-xs text-white font-medium">{claim.confidence}% Conf.</span>
          </div>
          <div className="flex gap-2 text-[10px] text-[#94A3B8]">
            <span title="Shares">{claim.viralMetrics.shares} sh.</span>
            <span title="Reach">{claim.viralMetrics.reach} rch.</span>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-[#0A0E27]/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-center items-center text-center">
          <p className="text-xs text-[#94A3B8] line-clamp-4 mb-4">{claim.description}</p>
          <Link
            to={`/fact-check?id=${claim.id}`}
            className="px-4 py-2 bg-gradient-to-r from-[#2D5BFF] to-[#1E4AD9] text-white rounded-lg font-bold text-xs hover:shadow-lg hover:shadow-[#2D5BFF]/30 transition-all active:scale-95"
          >
            View Full Analysis
          </Link>
        </div>
      </div>
    </div>
  );
}
