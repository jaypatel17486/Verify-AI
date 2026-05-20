import { AlertTriangle } from 'lucide-react';

const breakingNews = [
  'BREAKING: Deepfake video of Congressional hearing debunked - 2.1M shares stopped',
  'URGENT: False AI safety report spreading rapidly - verified as fabricated',
  'ALERT: Election data manipulation detected on social media - 1.5M reach',
  'BREAKING: Fake tech company announcement debunked - market impact prevented',
  'URGENT: Medicare misinformation going viral - 3.2M shares flagged'
];

export function NewsTickerBanner() {
  return (
    <div className="relative bg-[#EF4444] text-white overflow-hidden">
      <div className="flex items-center gap-4 py-2 px-6">
        {/* Breaking Badge */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <AlertTriangle className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">Breaking Debunks</span>
        </div>

        {/* Scrolling Text */}
        <div className="flex-1 overflow-hidden">
          <div className="animate-scroll flex gap-8 whitespace-nowrap">
            {[...breakingNews, ...breakingNews].map((news, index) => (
              <span key={index} className="text-sm">
                {news}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
