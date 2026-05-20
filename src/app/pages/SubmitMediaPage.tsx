import { useState } from 'react';
import { Link2, Upload, FileText, Image as ImageIcon, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

export function SubmitMediaPage() {
  const [activeTab, setActiveTab] = useState<'article' | 'image'>('article');
  const [urlInput, setUrlInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl text-white">Submit Media for Analysis</h1>
        <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
          Upload articles, images, or videos for AI-powered fact-checking and forensic analysis
        </p>
      </div>

      {/* Tab Selection */}
      <div className="flex gap-4 border-b border-white/10">
        <button
          onClick={() => setActiveTab('article')}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all ${
            activeTab === 'article'
              ? 'border-[#2D5BFF] text-white'
              : 'border-transparent text-[#94A3B8] hover:text-white'
          }`}
        >
          <FileText className="w-5 h-5" />
          Article / Text
        </button>
        <button
          onClick={() => setActiveTab('image')}
          className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all ${
            activeTab === 'image'
              ? 'border-[#2D5BFF] text-white'
              : 'border-transparent text-[#94A3B8] hover:text-white'
          }`}
        >
          <ImageIcon className="w-5 h-5" />
          Image / Media
        </button>
      </div>

      {/* Content Area */}
      {activeTab === 'article' ? (
        <div className="space-y-6">
          <div className="bg-[#141B3A] border border-white/10 rounded-2xl p-8 space-y-6">
            <div className="space-y-3">
              <label className="text-white flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                Article URL
              </label>
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/article"
                className="w-full px-4 py-3 bg-[#0A0E27] border border-white/10 rounded-xl text-white placeholder:text-[#475569] focus:outline-none focus:border-[#2D5BFF] transition-colors"
              />
            </div>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#141B3A] px-4 text-sm text-[#94A3B8]">OR</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-white flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Paste Article Text
              </label>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Paste the article text or claim you want to fact-check..."
                rows={8}
                className="w-full px-4 py-3 bg-[#0A0E27] border border-white/10 rounded-xl text-white placeholder:text-[#475569] focus:outline-none focus:border-[#2D5BFF] transition-colors resize-none"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={analyzing || (!urlInput && !textInput)}
              className="w-full py-4 bg-gradient-to-r from-[#2D5BFF] to-[#1E4AD9] text-white rounded-xl hover:shadow-lg hover:shadow-[#2D5BFF]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {analyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Article...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Analyze Article
                </>
              )}
            </button>
          </div>

          {/* Quick Tips */}
          <div className="bg-[#2D5BFF]/10 border border-[#2D5BFF]/30 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#2D5BFF] mt-0.5" />
              <div className="space-y-2">
                <h3 className="text-white">Tips for Better Results</h3>
                <ul className="text-sm text-[#94A3B8] space-y-1">
                  <li>• Include the full article text for comprehensive analysis</li>
                  <li>• Provide the original source URL when available</li>
                  <li>• Analysis typically takes 5-10 seconds</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-[#141B3A] border border-white/10 rounded-2xl p-8">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-16 transition-all ${
                dragActive
                  ? 'border-[#2D5BFF] bg-[#2D5BFF]/10'
                  : 'border-white/10 bg-[#0A0E27]/50'
              }`}
            >
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="w-20 h-20 rounded-full bg-[#2D5BFF]/20 flex items-center justify-center">
                  <Upload className="w-10 h-10 text-[#2D5BFF]" />
                </div>

                {selectedFile ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#10B981]/20 border border-[#10B981]/30 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-[#10B981]" />
                      <span className="text-sm text-white">{selectedFile.name}</span>
                    </div>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="text-sm text-[#94A3B8] hover:text-white transition-colors"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-white text-lg">Drop your image here, or browse</p>
                    <p className="text-sm text-[#94A3B8]">
                      Supports: JPG, PNG, WebP, GIF, MP4, MOV
                    </p>
                  </div>
                )}

                <label className="px-8 py-4 bg-gradient-to-r from-[#2D5BFF] to-[#1E4AD9] text-white rounded-xl hover:shadow-lg hover:shadow-[#2D5BFF]/30 transition-all cursor-pointer">
                  Choose File
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept="image/*,video/*"
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {selectedFile && (
              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="w-full mt-6 py-4 bg-gradient-to-r from-[#2D5BFF] to-[#1E4AD9] text-white rounded-xl hover:shadow-lg hover:shadow-[#2D5BFF]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Image...
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-5 h-5" />
                    Analyze Image
                  </>
                )}
              </button>
            )}
          </div>

          {/* AI Detection Info */}
          <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#10B981] mt-0.5" />
              <div className="space-y-2">
                <h3 className="text-white">AI-Powered Image Forensics</h3>
                <ul className="text-sm text-[#94A3B8] space-y-1">
                  <li>• Detect AI-generated images and deepfakes</li>
                  <li>• Identify photo manipulation and editing</li>
                  <li>• Reverse image search for source verification</li>
                  <li>• Metadata analysis for authenticity</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
