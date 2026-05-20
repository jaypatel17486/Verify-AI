import { Search } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="w-full">
      <div className="flex items-center bg-[#141B3A] border border-white/10 rounded-xl overflow-hidden">
        <Search className="w-5 h-5 text-[#94A3B8] ml-4" />
        <input
          type="text"
          placeholder="Enter URL or text to fact-check..."
          className="flex-1 bg-transparent px-4 py-4 text-white placeholder:text-[#475569] focus:outline-none"
        />
        <button className="m-2 px-6 py-2 bg-[#2D5BFF] text-white rounded-lg text-sm">
          Verify
        </button>
      </div>
    </div>
  );
}
