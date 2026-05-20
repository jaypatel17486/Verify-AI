import { FileText, Image, Upload } from 'lucide-react';
import { useState } from 'react';

export function AnalysisCards() {
  const [textFile, setTextFile] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<string | null>(null);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Text Analysis */}
      <div className="bg-[#141B3A] border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-5 h-5 text-[#2D5BFF]" />
          <h3 className="text-lg text-white">Text Analysis</h3>
        </div>
        
        <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center">
          <input
            type="file"
            accept=".pdf,.txt,.docx"
            onChange={(e) => setTextFile(e.target.files?.[0]?.name || null)}
            className="hidden"
            id="text-file"
          />
          <label htmlFor="text-file" className="cursor-pointer">
            <Upload className="w-10 h-10 text-[#94A3B8] mx-auto mb-3" />
            <p className="text-white mb-1">Upload Document</p>
            <p className="text-sm text-[#94A3B8]">PDF, TXT, DOCX</p>
          </label>
          {textFile && (
            <p className="mt-4 text-sm text-[#10B981]">Uploaded: {textFile}</p>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-[#1E293B] rounded-lg p-3 text-center">
            <p className="text-xs text-[#94A3B8] mb-1">AI Score</p>
            <p className="text-sm text-[#10B981]">2%</p>
          </div>
          <div className="bg-[#1E293B] rounded-lg p-3 text-center">
            <p className="text-xs text-[#94A3B8] mb-1">Factual</p>
            <p className="text-sm text-[#2D5BFF]">87%</p>
          </div>
          <div className="bg-[#1E293B] rounded-lg p-3 text-center">
            <p className="text-xs text-[#94A3B8] mb-1">Claims</p>
            <p className="text-sm text-white">12</p>
          </div>
        </div>
      </div>

      {/* Image Analysis */}
      <div className="bg-[#141B3A] border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Image className="w-5 h-5 text-[#10B981]" />
          <h3 className="text-lg text-white">Image Forensics</h3>
        </div>
        
        <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0]?.name || null)}
            className="hidden"
            id="image-file"
          />
          <label htmlFor="image-file" className="cursor-pointer">
            <Upload className="w-10 h-10 text-[#94A3B8] mx-auto mb-3" />
            <p className="text-white mb-1">Upload Image</p>
            <p className="text-sm text-[#94A3B8]">JPG, PNG, WEBP</p>
          </label>
          {imageFile && (
            <p className="mt-4 text-sm text-[#10B981]">Uploaded: {imageFile}</p>
          )}
        </div>
        
        <div className="mt-6 bg-[#1E293B] rounded-lg p-4 text-center">
          <p className="text-xs text-[#94A3B8] mb-2">Credibility Score</p>
          <p className="text-3xl text-[#10B981] mb-1">92</p>
          <p className="text-xs text-[#94A3B8]">Likely Real</p>
        </div>
      </div>
    </div>
  );
}
