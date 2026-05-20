import { Archive, Search, Filter, Download, CheckCircle, XCircle, AlertTriangle, Calendar, FileText, Image as ImageIcon, Trash2, X, ExternalLink, Sparkles, ShieldCheck, Settings, Bell, Sliders, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ArchiveItem {
  id: number;
  type: 'text' | 'image';
  title: string;
  status: 'true' | 'false' | 'misleading' | 'unverified' | 'authentic' | 'manipulated';
  credibility: number;
  date: string;
  source: string;
  reasoning?: string;
  sources?: { name: string; url: string }[];
}

const ARCHIVE_KEY = 'verifyai_archive';

function loadArchive(): ArchiveItem[] {
  try {
    return JSON.parse(localStorage.getItem(ARCHIVE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function ArchivePage() {
  const [archiveData, setArchiveData] = useState<ArchiveItem[]>(loadArchive);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'text' | 'image'>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<ArchiveItem | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    notifications: true,
    analysisMode: 'standard',
    darkMode: true
  });

  // Keep archive in sync if another tab / page updates localStorage
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === ARCHIVE_KEY) setArchiveData(loadArchive());
    };
    window.addEventListener('storage', onStorage);
    // Also refresh on focus so navigating back from FactCheck shows new items
    const onFocus = () => setArchiveData(loadArchive());
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  const handleClearArchive = () => {
    if (window.confirm('Are you sure you want to clear the entire archive?')) {
      localStorage.removeItem(ARCHIVE_KEY);
      setArchiveData([]);
    }
  };

  const filteredData = archiveData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    if (status === 'true' || status === 'authentic') return <CheckCircle className="w-5 h-5 text-[#10B981]" />;
    if (status === 'false' || status === 'manipulated') return <XCircle className="w-5 h-5 text-[#EF4444]" />;
    return <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />;
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      true: 'bg-[#10B981]/20 text-[#10B981]',
      false: 'bg-[#EF4444]/20 text-[#EF4444]',
      unverified: 'bg-[#94A3B8]/20 text-[#94A3B8]',
      misleading: 'bg-[#F59E0B]/20 text-[#F59E0B]',
      authentic: 'bg-[#10B981]/20 text-[#10B981]',
      manipulated: 'bg-[#EF4444]/20 text-[#EF4444]'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const stats = {
    total: archiveData.length,
    debunked: archiveData.filter(item => item.status === 'false' || item.status === 'manipulated').length,
    verified: archiveData.filter(item => item.status === 'true' || item.status === 'authentic').length,
  };

  return (
    <div className="flex flex-col min-h-[85vh] max-w-5xl mx-auto space-y-10 pb-32">
      {/* Sleek Hero Section */}
      <div className="text-center mt-8 animate-in fade-in zoom-in duration-500">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2D5BFF]/10 border border-[#2D5BFF]/30 rounded-full mb-6">
          <Archive className="w-4 h-4 text-[#2D5BFF]" />
          <span className="text-sm font-bold text-[#2D5BFF] uppercase tracking-wider">Your History</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
          Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D5BFF] to-[#10B981]">Archive</span>
        </h1>
        <p className="text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed mb-10">
          Review your past fact-checks and monitor your verification accuracy over time.
        </p>

        {/* Minimalist Stats Row */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
           <div className="flex flex-col items-center">
             <span className="text-4xl md:text-5xl font-black text-white">{stats.total}</span>
             <span className="text-xs font-bold text-[#475569] uppercase tracking-wider mt-2">Total Checked</span>
           </div>
           <div className="w-px h-16 bg-white/10 hidden md:block"></div>
           <div className="flex flex-col items-center">
             <span className="text-4xl md:text-5xl font-black text-[#EF4444]">{stats.debunked}</span>
             <span className="text-xs font-bold text-[#EF4444]/70 uppercase tracking-wider mt-2">Debunked</span>
           </div>
           <div className="w-px h-16 bg-white/10 hidden md:block"></div>
           <div className="flex flex-col items-center">
             <span className="text-4xl md:text-5xl font-black text-[#10B981]">{stats.verified}</span>
             <span className="text-xs font-bold text-[#10B981]/70 uppercase tracking-wider mt-2">Verified</span>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-[#141B3A]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Sleek Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between p-4 border-b border-white/10 bg-[#0A0E27]/50 gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#475569] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search your archive..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1E293B]/50 border border-white/5 rounded-full pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#2D5BFF]/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
               onClick={() => setShowSettings(true)}
               className="flex-1 md:flex-none p-2.5 bg-white/5 border border-white/10 text-[#94A3B8] rounded-full hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center"
               title="Preferences"
            >
               <Settings className="w-5 h-5" />
            </button>
            {archiveData.length > 0 && (
              <button
                onClick={handleClearArchive}
                className="flex-1 md:flex-none px-5 py-2.5 bg-[#EF4444]/10 text-[#EF4444] rounded-full text-sm font-bold hover:bg-[#EF4444]/20 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* List View */}
        <div className="p-0">
          {filteredData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <Archive className="w-16 h-16 text-[#475569] mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-white mb-2">No history found</h3>
              <p className="text-[#94A3B8] text-sm">Your fact-check history will appear here once you analyze a claim.</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {filteredData.map((item, index) => (
                <div 
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`group flex flex-col md:flex-row md:items-center justify-between p-6 cursor-pointer transition-all hover:bg-[#2D5BFF]/10 ${
                    index !== filteredData.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1 pr-6">
                    <div className="w-12 h-12 rounded-full bg-[#1E293B] flex items-center justify-center border border-white/5 group-hover:border-[#2D5BFF]/30 transition-colors">
                       {getStatusIcon(item.status)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#2D5BFF] transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-[#475569] font-medium">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        <span>•</span>
                        <span className="uppercase tracking-wider">{item.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-6 mt-4 md:mt-0 pl-16 md:pl-0">
                    <div className="flex flex-col items-start md:items-end">
                      <span className="text-2xl font-black text-white">{item.credibility}%</span>
                      <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wider">Credibility</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#2D5BFF] transition-colors">
                       <ExternalLink className="w-4 h-4 text-[#94A3B8] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-[#0A0E27]/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-[#141B3A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2D5BFF]/10 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-[#2D5BFF]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Analysis Details</h3>
                    <p className="text-xs text-[#94A3B8]">Archived on {new Date(selectedItem.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                {/* Claim Title */}
                <div>
                  <span className="text-[10px] font-bold text-[#475569] uppercase tracking-widest block mb-2">Original Claim</span>
                  <h2 className="text-2xl font-bold text-white leading-tight">
                    "{selectedItem.title}"
                  </h2>
                </div>

                {/* Score & Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0A0E27]/50 rounded-2xl p-4 border border-white/5">
                    <span className="text-[10px] font-bold text-[#475569] uppercase tracking-widest block mb-2">Verdict</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedItem.status)}
                      <span className="text-lg font-bold text-white uppercase tracking-wider">{selectedItem.status}</span>
                    </div>
                  </div>
                  <div className="bg-[#0A0E27]/50 rounded-2xl p-4 border border-white/5">
                    <span className="text-[10px] font-bold text-[#475569] uppercase tracking-widest block mb-2">Credibility</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-white">{selectedItem.credibility}%</span>
                      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#2D5BFF]" 
                          style={{ width: `${selectedItem.credibility}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reasoning */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#2D5BFF]">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">AI Reasoning</span>
                  </div>
                  <div className="bg-[#0A0E27]/30 rounded-2xl p-6 border border-white/5 text-[#94A3B8] leading-relaxed italic whitespace-pre-wrap">
                    {selectedItem.reasoning || "No detailed reasoning archived for this claim."}
                  </div>
                </div>

                {/* Sources */}
                {selectedItem.sources && selectedItem.sources.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[#10B981]">
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">Verified Sources</span>
                    </div>
                    <div className="grid gap-3">
                      {selectedItem.sources.map((src, i) => (
                        <a
                          key={i}
                          href={src.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between p-4 bg-[#0A0E27]/50 border border-white/5 rounded-xl hover:border-[#2D5BFF]/30 hover:bg-[#2D5BFF]/5 transition-all group/link"
                        >
                          <span className="text-white font-medium group-hover/link:text-[#2D5BFF] transition-colors">{src.name}</span>
                          <ExternalLink className="w-4 h-4 text-[#475569] group-hover/link:text-[#2D5BFF]" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-[#0A0E27]/50 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="absolute inset-0 bg-[#0A0E27]/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#141B3A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0A0E27]/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2D5BFF]/10 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-[#2D5BFF]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">User Preferences</h3>
                    <p className="text-xs text-[#94A3B8]">Manage your account settings</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                {/* Notifications */}
                <div className="flex items-center justify-between bg-[#0A0E27]/50 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                      <Bell className="w-5 h-5 text-[#10B981]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Push Notifications</h4>
                      <p className="text-xs text-[#94A3B8]">Alerts for viral claims</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSettings(s => ({ ...s, notifications: !s.notifications }))}
                    className={`w-12 h-6 rounded-full transition-colors relative ${settings.notifications ? 'bg-[#10B981]' : 'bg-[#475569]'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${settings.notifications ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>

                {/* Analysis Mode */}
                <div className="flex items-center justify-between bg-[#0A0E27]/50 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                      <Sliders className="w-5 h-5 text-[#2D5BFF]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Analysis Strictness</h4>
                      <p className="text-xs text-[#94A3B8]">AI fact-checking threshold</p>
                    </div>
                  </div>
                  <select 
                    value={settings.analysisMode}
                    onChange={(e) => setSettings(s => ({ ...s, analysisMode: e.target.value }))}
                    className="bg-[#1E293B] border border-white/10 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#2D5BFF]"
                  >
                    <option value="lenient">Lenient</option>
                    <option value="standard">Standard</option>
                    <option value="strict">Strict</option>
                  </select>
                </div>

                {/* Appearance */}
                <div className="flex items-center justify-between bg-[#0A0E27]/50 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                      <Moon className="w-5 h-5 text-[#F59E0B]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Dark Theme</h4>
                      <p className="text-xs text-[#94A3B8]">Match system appearance</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSettings(s => ({ ...s, darkMode: !s.darkMode }))}
                    className={`w-12 h-6 rounded-full transition-colors relative ${settings.darkMode ? 'bg-[#2D5BFF]' : 'bg-[#475569]'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${settings.darkMode ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              </div>

              <div className="p-6 bg-[#0A0E27]/50 border-t border-white/5 flex justify-end gap-3">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-6 py-2 bg-transparent hover:bg-white/5 text-[#94A3B8] hover:text-white rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert("Preferences saved successfully!");
                    setShowSettings(false);
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-[#2D5BFF] to-[#1E4AD9] text-white rounded-xl font-bold shadow-lg shadow-[#2D5BFF]/30 hover:shadow-[#2D5BFF]/50 transition-all active:scale-95"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
