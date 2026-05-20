import { Shield, Chrome, Search, Image as ImageIcon, Archive, LayoutDashboard, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router';

export function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Fact Check', path: '/fact-check', icon: Search },
    { name: 'Trusted Sources', path: '/trusted-sources', icon: BookOpen },
    { name: 'Archive', path: '/archive', icon: Archive },
  ];

  return (
    <header className="border-b border-white/10 bg-[#0A0E27]/80 sticky top-0 z-50 backdrop-blur-xl shadow-2xl shadow-black/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2D5BFF] to-[#1E4AD9] flex items-center justify-center shadow-lg shadow-[#2D5BFF]/30 group-hover:scale-110 transition-transform">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl text-white font-bold tracking-tight leading-none">VerifyAI</span>
            <span className="text-[10px] text-[#10B981] font-semibold uppercase tracking-widest mt-0.5">True Vision</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'text-white bg-[#2D5BFF]/10 shadow-[inset_0_0_12px_rgba(45,91,255,0.1)]'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#2D5BFF]' : ''}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white/5 text-white border border-white/10 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all active:scale-95">
            Sign In
          </Link>
          <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#2D5BFF] to-[#1E4AD9] text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-[#2D5BFF]/40 transition-all active:scale-95 shadow-xl">
            <Chrome className="w-4 h-4" />
            Install Extension
          </button>
          
          {/* Mobile Menu Toggle (Simplified) */}
          <button className="md:hidden p-2 text-[#94A3B8] hover:text-white">
            <LayoutDashboard className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
