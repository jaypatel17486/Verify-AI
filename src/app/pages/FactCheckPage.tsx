import { Search, FileText, Upload, ExternalLink, CheckCircle, XCircle, AlertTriangle, Sparkles, ShieldAlert, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { mockClaims } from '../mockData';
import { post } from '../services/apiClient';

interface AnalysisResult {
  claim: string;
  status: 'true' | 'false' | 'unverified' | 'misleading' | 'authentic' | 'manipulated';
  credibility: number;
  sources: { name: string; url: string; reliability: number }[];
  aiDetection: number;
  claims: number;
  reasoning: string;
}

export function FactCheckPage() {
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get('id');

  const [inputText, setInputText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    if (idParam) {
      const foundClaim = mockClaims.find(c => c.id === idParam);
      if (foundClaim) {
        setInputText(foundClaim.headline);
        handleAnalyze(foundClaim.headline, foundClaim);
      }
    }

    // Handle redirect from Dashboard
    const qParam = searchParams.get('q');
    if (qParam) {
      setInputText(qParam);
      // Use setTimeout to ensure state is settled before analyzing
      setTimeout(() => handleAnalyze(qParam), 100);
    }
  }, [idParam, searchParams]);

  const handleAnalyze = async (textToAnalyze?: string, preloadedClaim?: any) => {
    const text = textToAnalyze || inputText || uploadedFile?.name;
    if (!text) return;

    setIsAnalyzing(true);
    setResult(null); // Clear previous result

    // Call the backend API (works on both Azure SWA and Vercel via VITE_BACKEND_URL)
    try {
      const data = await post<any>('/api/analyze', { claim: text });

      const newResult: AnalysisResult = {
        claim: text,
        status: data.status,
        credibility: data.credibility,
        sources: data.sources || [],
        aiDetection: Math.floor(Math.random() * 10) + 1,
        claims: Math.floor(Math.random() * 5) + 1,
        reasoning: data.reasoning
      };

      setResult(newResult);

      // Save to localStorage archive
      try {
        const existing = JSON.parse(localStorage.getItem('verifyai_archive') || '[]');
        const archiveEntry = {
          id: Date.now(),
          type: 'text' as const,
          title: text.length > 100 ? text.substring(0, 100) + '...' : text,
          status: data.status,
          credibility: data.credibility,
          date: new Date().toISOString(),
          source: 'User Submission',
          reasoning: data.reasoning,
          sources: data.sources || []
        };
        localStorage.setItem('verifyai_archive', JSON.stringify([archiveEntry, ...existing]));
      } catch (e) {
        console.warn('Could not save to archive:', e);
      }
    } catch (error) {
      console.error('Error analyzing claim:', error);
      setResult({
        claim: text,
        status: 'unverified',
        credibility: 0,
        sources: [],
        aiDetection: 0,
        claims: 0,
        reasoning: "Failed to connect to the AI analysis server. Check your Azure OpenAI API keys and backend logs."
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setInputText(text.substring(0, 500));
      };
      reader.readAsText(file);
    }
  };

  const getStatusUI = (status: AnalysisResult['status']) => {
    if (status === 'true' || status === 'authentic') {
      return {
        icon: <CheckCircle className="w-8 h-8 text-[#10B981]" />,
        color: 'text-[#10B981]',
        bg: 'bg-[#10B981]',
        bgLight: 'bg-[#10B981]/10',
        border: 'border-[#10B981]/30',
        label: status === 'true' ? 'True' : 'Authentic'
      };
    }
    if (status === 'false' || status === 'manipulated') {
      return {
        icon: <XCircle className="w-8 h-8 text-[#EF4444]" />,
        color: 'text-[#EF4444]',
        bg: 'bg-[#EF4444]',
        bgLight: 'bg-[#EF4444]/10',
        border: 'border-[#EF4444]/30',
        label: status === 'false' ? 'False' : 'Manipulated'
      };
    }
    if (status === 'misleading') {
      return {
        icon: <AlertTriangle className="w-8 h-8 text-[#F59E0B]" />,
        color: 'text-[#F59E0B]',
        bg: 'bg-[#F59E0B]',
        bgLight: 'bg-[#F59E0B]/10',
        border: 'border-[#F59E0B]/30',
        label: 'Misleading'
      };
    }
    return {
      icon: <AlertCircle className="w-8 h-8 text-[#94A3B8]" />,
      color: 'text-[#94A3B8]',
      bg: 'bg-[#94A3B8]',
      bgLight: 'bg-[#94A3B8]/10',
      border: 'border-[#94A3B8]/30',
      label: 'Unable to Verify'
    };
  };

  return (
    <div className="flex flex-col min-h-[85vh] max-w-5xl mx-auto relative pb-32">
      {!result && !isAnalyzing ? (
        <div className="flex-1 flex flex-col items-center justify-center pt-12 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-gradient-to-br from-[#2D5BFF] to-[#10B981] rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(45,91,255,0.3)]">
            <ShieldAlert className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 text-center tracking-tight">
            AI Fact-Check Engine
          </h1>
          <p className="text-lg text-[#94A3B8] mb-12 text-center max-w-2xl">
            Cross-reference claims against thousands of verified sources using advanced RAG capabilities.
          </p>

          <div className="w-full max-w-3xl mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#2D5BFF]" />
              <span className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider">Try these out</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "UCLA was originally called the Los Angeles State Normal School",
                "A penny dropped from the Empire State Building can kill someone",
                "The Eiffel Tower shrinks in the winter",
                "Goldfish have a three-second memory"
              ].map((claim, idx) => (
                <button
                  key={idx}
                  onClick={() => { setInputText(claim); handleAnalyze(claim); }}
                  className="text-left bg-[#1E293B]/50 hover:bg-[#2D5BFF]/10 border border-white/5 hover:border-[#2D5BFF]/30 p-4 rounded-xl text-[#CBD5E1] text-sm transition-all hover:scale-[1.02]"
                >
                  "{claim}"
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 w-full">
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center h-64 animate-pulse pt-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-[#2D5BFF]/30 border-t-[#2D5BFF] rounded-full animate-spin"></div>
                <ShieldAlert className="w-6 h-6 text-[#2D5BFF] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="mt-6 text-[#94A3B8] font-medium tracking-widest uppercase text-sm">Running RAG Analysis...</p>
            </div>
          ) : result && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8 pt-6">
              {/* 1. Evidence Strength Bar & Status */}
              <div className={`relative overflow-hidden bg-[#141B3A]/90 backdrop-blur-xl border ${getStatusUI(result.status).border} rounded-3xl p-8 md:p-12 shadow-2xl`}>
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] ${getStatusUI(result.status).bgLight} blur-3xl -z-10 rounded-full opacity-50 pointer-events-none`}></div>

                <div className="flex flex-col gap-8">
                  <div className="text-center md:text-left border-b border-white/5 pb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-4">
                      <FileText className="w-4 h-4 text-[#94A3B8]" />
                      <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Analyzed Claim</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                      "{result.claim}"
                    </h2>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-6 mt-2">
                    <div className="flex items-center gap-4">
                      {getStatusUI(result.status).icon}
                      <h3 className={`text-4xl md:text-5xl font-black ${getStatusUI(result.status).color} uppercase tracking-widest`}>
                        {getStatusUI(result.status).label}
                      </h3>
                    </div>

                    {result.status !== 'unverified' && (
                      <div className="w-full max-w-2xl mt-4">
                        <div className="flex justify-between items-end mb-2">
                          <span className="text-[#94A3B8] font-bold text-sm uppercase tracking-wider">Evidence Strength</span>
                          <span className={`font-black text-2xl ${getStatusUI(result.status).color}`}>{result.credibility}/100</span>
                        </div>
                        <div className="h-4 w-full bg-[#0A0E27] rounded-full overflow-hidden border border-white/5">
                          <div
                            className={`h-full ${getStatusUI(result.status).bg} transition-all duration-1000 ease-out`}
                            style={{ width: `${result.credibility}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={`grid ${result.status !== 'unverified' ? 'md:grid-cols-[2fr,1fr]' : 'grid-cols-1'} gap-8`}>
                {/* 2. Reasoning Block */}
                <div className="bg-[#141B3A]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#2D5BFF]/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-[#2D5BFF]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">AI Reasoning</h3>
                  </div>
                  <p className="text-[#94A3B8] text-lg leading-relaxed whitespace-pre-wrap">
                    {result.reasoning}
                  </p>
                </div>

                {/* 3. Cross-Referenced Sources (Hidden if unverified) */}
                {result.status !== 'unverified' && result.sources.length > 0 && (
                  <div className="bg-[#141B3A]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                        <ExternalLink className="w-5 h-5 text-[#10B981]" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Supporting Evidence</h3>
                    </div>

                    <div className="space-y-4 flex-1">
                      {result.sources.map((source, index) => (
                        <a
                          key={index}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block bg-[#0A0E27]/50 border border-white/5 rounded-xl p-4 hover:border-[#2D5BFF]/50 hover:bg-[#2D5BFF]/5 transition-all group"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-white font-bold group-hover:text-[#2D5BFF] transition-colors">{source.name}</h4>
                            <ExternalLink className="w-4 h-4 text-[#475569] group-hover:text-[#2D5BFF] transition-colors" />
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[#475569] truncate max-w-[150px]">{source.url}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Persistent Bottom Input Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0A0E27]/80 backdrop-blur-2xl border-t border-white/10 pt-4 pb-6 z-50">
        <div className="max-w-4xl mx-auto px-6 relative group">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAnalyze();
              }
            }}
            placeholder="Message FactCheck AI..."
            className="w-full bg-[#1E293B]/80 border border-white/10 rounded-2xl pl-6 pr-32 py-5 text-white placeholder:text-[#475569] focus:outline-none focus:border-[#2D5BFF] focus:ring-1 focus:ring-[#2D5BFF] min-h-[64px] max-h-[200px] resize-none text-lg transition-all shadow-xl"
            rows={1}
          />

          <div className="absolute right-8 bottom-4 flex items-center gap-2">
            <input
              type="file"
              accept=".pdf,.txt,.docx,.doc"
              onChange={handleFileUpload}
              className="hidden"
              id="fact-check-file-mini"
            />
            <label htmlFor="fact-check-file-mini" className="cursor-pointer p-3 hover:bg-white/10 rounded-xl text-[#94A3B8] transition-colors">
              <Upload className="w-5 h-5" />
            </label>

            <button
              onClick={() => handleAnalyze()}
              disabled={(!inputText && !uploadedFile) || isAnalyzing}
              className="p-3 bg-[#2D5BFF] hover:bg-[#1E4AD9] text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#2D5BFF]/20"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
          {uploadedFile && (
            <div className="absolute -top-12 left-6 bg-[#10B981]/20 border border-[#10B981]/30 text-[#10B981] px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 backdrop-blur-md">
              <FileText className="w-4 h-4" />
              {uploadedFile.name}
              <button onClick={() => setUploadedFile(null)} className="hover:text-white ml-2">
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        <p className="text-center text-xs text-[#475569] mt-4 font-medium">
          FactCheck AI can make mistakes. Consider cross-referencing important information.
        </p>
      </div>
    </div>
  );
}
