import { useState } from 'react';
import { Search, Upload, Link2, Image, X } from 'lucide-react';

export function QuickAnalyzeBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeType, setActiveType] = useState<'url' | 'image'>('url');
  const [urlInput, setUrlInput] = useState('');

  const handleAnalyze = () => {
    console.log('Analyzing:', activeType === 'url' ? urlInput : 'Image');
    setIsExpanded(false);
    setUrlInput('');
  };

  return (
    <div className="sticky top-0 z-50 bg-[#0A0E27]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-3">
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full max-w-2xl mx-auto flex items-center gap-3 px-6 py-3 bg-[#141B3A]/80 border border-white/10 rounded-xl hover:border-[#2D5BFF]/50 transition-all group"
          >
            <Search className="w-5 h-5 text-[#2D5BFF] group-hover:scale-110 transition-transform" />
            <span className="text-[#94A3B8] group-hover:text-white transition-colors">
              Quick fact-check: paste a URL or upload an image...
            </span>
          </button>
        ) : (
          <div className="max-w-2xl mx-auto space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveType('url')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                      activeType === 'url'
                        ? 'bg-[#2D5BFF] text-white'
                        : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Link2 className="w-4 h-4" />
                    URL
                  </button>
                  <button
                    onClick={() => setActiveType('image')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                      activeType === 'image'
                        ? 'bg-[#2D5BFF] text-white'
                        : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Image className="w-4 h-4" />
                    Image
                  </button>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsExpanded(false);
                  setUrlInput('');
                }}
                className="p-2 text-[#94A3B8] hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Input */}
            {activeType === 'url' ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Enter URL or paste text..."
                  className="flex-1 px-4 py-3 bg-[#141B3A] border border-white/10 rounded-lg text-white placeholder:text-[#475569] focus:outline-none focus:border-[#2D5BFF] transition-colors"
                  autoFocus
                />
                <button
                  onClick={handleAnalyze}
                  className="px-6 py-3 bg-gradient-to-r from-[#2D5BFF] to-[#1E4AD9] text-white rounded-lg hover:shadow-lg hover:shadow-[#2D5BFF]/30 transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  <Search className="w-4 h-4" />
                  Analyze
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-[#141B3A] border border-white/10 rounded-lg">
                  <Upload className="w-5 h-5 text-[#94A3B8]" />
                  <span className="text-[#94A3B8]">Choose image file...</span>
                </div>
                <button
                  onClick={handleAnalyze}
                  className="px-6 py-3 bg-gradient-to-r from-[#2D5BFF] to-[#1E4AD9] text-white rounded-lg hover:shadow-lg hover:shadow-[#2D5BFF]/30 transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  <Search className="w-4 h-4" />
                  Analyze
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
