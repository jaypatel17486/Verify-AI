import { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router';

export function AnalysisForm() {
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    // Redirect to the fact check page with the query
    navigate(`/fact-check?q=${encodeURIComponent(inputText)}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="bg-[#141B3A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#2D5BFF]/20 blur-[100px] pointer-events-none" />
        
        <h2 className="text-xl text-white font-heading font-medium mb-4">Verify a New Claim</h2>
        
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-[#94A3B8]" />
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste a link, tweet, or type a claim to verify..."
              className="w-full bg-[#0A0E27] border border-white/10 rounded-xl py-4 pl-12 pr-32 text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2D5BFF]/50 focus:ring-1 focus:ring-[#2D5BFF]/50 transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="absolute right-2 px-6 py-2 bg-[#2D5BFF] hover:bg-[#1E4AD9] disabled:bg-[#2D5BFF]/50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
