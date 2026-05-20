import { useState } from 'react';
import { ShieldCheck, BookOpen, AlertTriangle, Lightbulb, Search, ExternalLink, Image as ImageIcon, EyeOff, MessageSquareWarning } from 'lucide-react';

export function TrustedSourcesPage() {
  const [activeTab, setActiveTab] = useState<'sources' | 'guide'>('sources');

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto min-h-[80vh]">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 shrink-0 flex flex-col gap-2">
        <h2 className="text-xl font-bold text-white mb-4 px-2">Information Hub</h2>
        
        <button
          onClick={() => setActiveTab('sources')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'sources'
              ? 'bg-[#2D5BFF]/20 text-[#2D5BFF] border border-[#2D5BFF]/30'
              : 'text-[#94A3B8] hover:bg-white/5 hover:text-white border border-transparent'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          Trusted Sources
        </button>

        <button
          onClick={() => setActiveTab('guide')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'guide'
              ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30'
              : 'text-[#94A3B8] hover:bg-white/5 hover:text-white border border-transparent'
          }`}
        >
          <Lightbulb className="w-5 h-5" />
          Spotting Fake News
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#141B3A]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden">
        
        {activeTab === 'sources' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
             <div className="border-b border-white/10 pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-[#2D5BFF]/20 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-[#2D5BFF]" />
                  </div>
                  <h1 className="text-3xl font-bold text-white">Verified Research Databases</h1>
                </div>
                <p className="text-[#94A3B8] text-lg ml-13">Direct access to non-partisan, globally recognized fact-checking organizations and scientific databases.</p>
             </div>

             <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: "Snopes", url: "https://www.snopes.com", desc: "The oldest and largest fact-checking site on the internet." },
                  { name: "FactCheck.org", url: "https://www.factcheck.org", desc: "Nonpartisan, nonprofit project monitoring US political deception." },
                  { name: "Reuters Fact Check", url: "https://www.reuters.com/fact-check", desc: "Global news agency's dedicated misinformation team." },
                  { name: "PolitiFact", url: "https://www.politifact.com", desc: "Pulitzer Prize-winning fact-checking organization." },
                  { name: "PubMed Central", url: "https://www.ncbi.nlm.nih.gov/pmc/", desc: "Free full-text archive of biomedical and life sciences journal literature." },
                  { name: "Google Scholar", url: "https://scholar.google.com", desc: "Broad search for scholarly literature across many disciplines." }
                ].map((source, i) => (
                  <a key={i} href={source.url} target="_blank" rel="noreferrer" className="block bg-[#0A0E27]/50 border border-white/5 hover:border-[#2D5BFF]/50 hover:bg-[#2D5BFF]/5 p-5 rounded-2xl transition-all group">
                     <div className="flex justify-between items-start mb-3">
                       <h3 className="text-lg font-bold text-white group-hover:text-[#2D5BFF] transition-colors">{source.name}</h3>
                       <ExternalLink className="w-4 h-4 text-[#475569] group-hover:text-[#2D5BFF]" />
                     </div>
                     <p className="text-[#94A3B8] text-sm leading-relaxed">{source.desc}</p>
                  </a>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
             <div className="border-b border-white/10 pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-[#10B981]/20 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <h1 className="text-3xl font-bold text-white">How to Spot Fake News</h1>
                </div>
                <p className="text-[#94A3B8] text-lg ml-13">A simple, visual guide to protecting yourself from online misinformation.</p>
             </div>

             <div className="space-y-6">
                
                {/* Guide Card 1 */}
                <div className="bg-[#0A0E27]/50 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row gap-6">
                   <div className="w-full md:w-1/3 bg-[#1E293B] rounded-xl flex flex-col items-center justify-center p-6 text-center border border-red-500/20 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <MessageSquareWarning className="w-12 h-12 text-red-400 mb-3" />
                     <span className="font-bold text-white text-sm bg-red-500/20 px-3 py-1 rounded-full text-red-300">SHOCKING!! You won't believe...</span>
                   </div>
                   <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-xl font-bold text-white mb-2">1. Beware of "Clickbait" Headlines</h3>
                      <p className="text-[#94A3B8] leading-relaxed">
                        Fake news often uses outrageous, emotional, or ALL CAPS headlines to make you click without thinking. If a headline makes you extremely angry or shocked instantly, take a breath and verify it first.
                      </p>
                   </div>
                </div>

                {/* Guide Card 2 */}
                <div className="bg-[#0A0E27]/50 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row gap-6">
                   <div className="w-full md:w-1/3 bg-[#1E293B] rounded-xl flex flex-col items-center justify-center p-6 text-center border border-orange-500/20 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <Search className="w-12 h-12 text-orange-400 mb-3" />
                     <span className="font-mono text-xs text-orange-300 bg-orange-500/20 px-2 py-1 rounded">www.abcnews.com.co</span>
                   </div>
                   <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-xl font-bold text-white mb-2">2. Check the URL Closely</h3>
                      <p className="text-[#94A3B8] leading-relaxed">
                        Imposter websites mimic legitimate news sources by changing the URL slightly. For example, ending a URL with ".com.co" instead of just ".com" is a common trick used to fool readers.
                      </p>
                   </div>
                </div>

                {/* Guide Card 3 */}
                <div className="bg-[#0A0E27]/50 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row gap-6">
                   <div className="w-full md:w-1/3 bg-[#1E293B] rounded-xl flex flex-col items-center justify-center p-6 text-center border border-purple-500/20 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <ImageIcon className="w-12 h-12 text-purple-400 mb-3" />
                     <div className="flex items-center gap-1 bg-purple-500/20 px-2 py-1 rounded text-purple-300">
                        <EyeOff className="w-3 h-3" /> <span className="text-xs font-bold">AI Generated / Photoshopped</span>
                     </div>
                   </div>
                   <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-xl font-bold text-white mb-2">3. Question Images and Videos</h3>
                      <p className="text-[#94A3B8] leading-relaxed">
                        Images can be taken out of context or entirely created by AI. Look for strange shadows, unnatural hands/faces, or use a Reverse Image Search (like Google Images) to see where the photo originally came from.
                      </p>
                   </div>
                </div>

             </div>
          </div>
        )}

      </div>
    </div>
  );
}
