import { useState } from 'react';
import { Link2, Upload, Search, Image as ImageIcon, Sparkles, ShieldCheck } from 'lucide-react';

export function HeroSection() {
  const [activeTab, setActiveTab] = useState<'url' | 'image'>('url');
  const [urlInput, setUrlInput] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleAnalyze = () => {
    console.log('Analyzing:', activeTab === 'url' ? urlInput : 'Image upload');
  };

  return (
    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden py-20 px-6">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[#0A0E27]" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#2D5BFF]/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#10B981]/10 blur-[120px]" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <div className="text-center space-y-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md mb-4 shadow-xl">
            <Sparkles className="w-4 h-4 text-[#10B981]" />
            <span className="text-xs font-semibold text-white uppercase tracking-widest">AI-Powered Verification Engine</span>
          </div>

          {/* Headline */}
          <div className="space-y-6 max-w-3xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
              Unmask the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D5BFF] via-[#5D85FF] to-[#10B981]">Digital Truth</span>
            </h1>
            <p className="text-xl text-[#94A3B8] leading-relaxed font-light">
              Verify articles, detect AI-generated deepfakes, and navigate the media landscape with military-grade precision.
            </p>
          </div>

          {/* Main Analysis Input */}
          <div className="max-w-2xl mx-auto mt-12 bg-[#141B3A]/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-3 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
            {/* Tab Switcher */}
            <div className="flex p-1 bg-[#0A0E27]/50 rounded-2xl mb-3 border border-white/5">
              <button
                onClick={() => setActiveTab('url')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'url'
                    ? 'bg-[#2D5BFF] text-white shadow-lg shadow-[#2D5BFF]/30'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                }`}
              >
                <Link2 className="w-4 h-4" />
                Analyze Article URL
              </button>
              <button
                onClick={() => setActiveTab('image')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'image'
                    ? 'bg-[#2D5BFF] text-white shadow-lg shadow-[#2D5BFF]/30'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                Verify Image/Media
              </button>
            </div>

            {/* Input Content */}
            <div className="p-2">
              {activeTab === 'url' ? (
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#475569] group-focus-within:text-[#2D5BFF] transition-colors">
                      <Search className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="Paste link to news article or social post..."
                      className="w-full pl-12 pr-4 py-5 bg-[#0A0E27]/80 border border-white/10 rounded-2xl text-white placeholder:text-[#475569] focus:outline-none focus:ring-2 focus:ring-[#2D5BFF]/50 transition-all text-base"
                    />
                  </div>
                  <button
                    onClick={handleAnalyze}
                    className="px-8 py-5 bg-gradient-to-r from-[#2D5BFF] to-[#1E4AD9] text-white font-bold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#2D5BFF]/20"
                  >
                    <span>Analyze Now</span>
                    <ShieldCheck className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-2xl p-10 transition-all group overflow-hidden ${
                    dragActive
                      ? 'border-[#2D5BFF] bg-[#2D5BFF]/10'
                      : 'border-white/10 bg-[#0A0E27]/40 hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2D5BFF]/20 to-[#10B981]/20 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8 text-[#2D5BFF]" />
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">Drag and drop media for deepscan</p>
                      <p className="text-sm text-[#475569]">Supports high-res JPG, PNG, and MP4 deepfake detection</p>
                    </div>
                    <button className="mt-2 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-all">
                      Browse Files
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center items-center gap-12 pt-8 opacity-60">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-white">12M+</span>
              <span className="text-xs text-[#94A3B8] uppercase tracking-wider text-left">Claims<br/>Analyzed</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-white">99.8%</span>
              <span className="text-xs text-[#94A3B8] uppercase tracking-wider text-left">Detection<br/>Accuracy</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-white">24/7</span>
              <span className="text-xs text-[#94A3B8] uppercase tracking-wider text-left">Real-time<br/>Monitoring</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
