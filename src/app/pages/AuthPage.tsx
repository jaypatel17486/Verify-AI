import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Shield, Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login and redirect to dashboard
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full flex bg-[#0A0E27] absolute inset-0 z-50 overflow-hidden">
      {/* Left Column - Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 bg-[#050818]">
         {/* Background Elements */}
         <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2D5BFF]/10 via-[#0A0E27]/50 to-transparent blur-3xl pointer-events-none" />
         <div className="absolute bottom-0 right-0 w-[80%] h-[80%] bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-[#10B981]/10 via-transparent to-transparent blur-2xl pointer-events-none" />

         {/* Logo */}
         <div className="flex items-center gap-3 relative z-10">
           <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2D5BFF] to-[#1E4AD9] flex items-center justify-center shadow-lg shadow-[#2D5BFF]/30">
             <Shield className="w-7 h-7 text-white" />
           </div>
           <div className="flex flex-col">
             <span className="text-2xl text-white font-bold tracking-tight leading-none">VerifyAI</span>
             <span className="text-xs text-[#10B981] font-semibold uppercase tracking-widest mt-0.5">True Vision</span>
           </div>
         </div>

         {/* Hero Text */}
         <div className="relative z-10 max-w-lg mt-20">
           <h1 className="text-5xl font-black text-white mb-6 leading-tight tracking-tight">
             Combat misinformation with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D5BFF] to-[#10B981]">absolute certainty.</span>
           </h1>
           <p className="text-lg text-[#94A3B8] leading-relaxed">
             Join thousands of researchers, journalists, and everyday users who rely on our AI to fact-check the world in real-time.
           </p>
         </div>

         {/* Testimonial / Social Proof */}
         <div className="relative z-10 mt-auto">
           <div className="bg-[#141B3A]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 max-w-md">
             <div className="flex items-center gap-1 mb-3">
               {[...Array(5)].map((_, i) => <div key={i} className="w-4 h-4 bg-[#F59E0B] rounded-full flex items-center justify-center"><span className="text-[10px] text-white">★</span></div>)}
             </div>
             <p className="text-sm text-white/80 italic mb-4">"VerifyAI has completely transformed how I consume news. The instant fact-checking is indistinguishable from magic."</p>
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2D5BFF] to-[#10B981]" />
               <div>
                 <p className="text-sm font-bold text-white">Sarah Jenkins</p>
                 <p className="text-xs text-[#94A3B8]">Senior Editor</p>
               </div>
             </div>
           </div>
         </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative overflow-y-auto">
         <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
           
           <div className="text-center lg:text-left">
             <h2 className="text-3xl font-black text-white tracking-tight">{isLogin ? 'Welcome back' : 'Create an account'}</h2>
             <p className="text-[#94A3B8] mt-2 text-sm">
               {isLogin ? 'Enter your details to access your dashboard.' : 'Start your truth journey today.'}
             </p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-5">
             {!isLogin && (
               <div className="space-y-2">
                 <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Full Name</label>
                 <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <div className="w-4 h-4 rounded-full border-2 border-[#475569]" />
                   </div>
                   <input 
                     type="text" 
                     placeholder="John Doe" 
                     className="w-full bg-[#141B3A]/50 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-[#475569] focus:outline-none focus:border-[#2D5BFF] focus:ring-1 focus:ring-[#2D5BFF] transition-all"
                   />
                 </div>
               </div>
             )}

             <div className="space-y-2">
               <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Email Address</label>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <Mail className="w-4 h-4 text-[#475569]" />
                 </div>
                 <input 
                   type="email" 
                   required
                   placeholder="you@example.com" 
                   className="w-full bg-[#141B3A]/50 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-[#475569] focus:outline-none focus:border-[#2D5BFF] focus:ring-1 focus:ring-[#2D5BFF] transition-all"
                 />
               </div>
             </div>

             <div className="space-y-2">
               <div className="flex items-center justify-between">
                 <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Password</label>
                 {isLogin && <a href="#" className="text-xs font-semibold text-[#2D5BFF] hover:text-[#1E4AD9] transition-colors">Forgot password?</a>}
               </div>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <Lock className="w-4 h-4 text-[#475569]" />
                 </div>
                 <input 
                   type="password" 
                   required
                   placeholder="••••••••" 
                   className="w-full bg-[#141B3A]/50 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-[#475569] focus:outline-none focus:border-[#2D5BFF] focus:ring-1 focus:ring-[#2D5BFF] transition-all"
                 />
               </div>
             </div>

             <button 
               type="submit" 
               className="w-full bg-gradient-to-r from-[#2D5BFF] to-[#1E4AD9] hover:from-[#1E4AD9] hover:to-[#2D5BFF] text-white rounded-xl py-3.5 font-bold shadow-lg shadow-[#2D5BFF]/30 hover:shadow-[#2D5BFF]/50 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
             >
               {isLogin ? 'Sign In' : 'Create Account'}
               <ArrowRight className="w-4 h-4" />
             </button>
           </form>

           <div className="relative flex items-center py-2">
             <div className="flex-grow border-t border-white/5"></div>
             <span className="flex-shrink-0 mx-4 text-xs font-semibold text-[#475569] uppercase tracking-wider">Or continue with</span>
             <div className="flex-grow border-t border-white/5"></div>
           </div>

           <div className="grid grid-cols-2 gap-4">
             <button className="flex items-center justify-center gap-2 bg-[#141B3A]/50 hover:bg-[#141B3A] border border-white/10 rounded-xl py-3 text-sm font-semibold text-white transition-all">
               <Chrome className="w-4 h-4" />
               Google
             </button>
             <button className="flex items-center justify-center gap-2 bg-[#141B3A]/50 hover:bg-[#141B3A] border border-white/10 rounded-xl py-3 text-sm font-semibold text-white transition-all">
               <Github className="w-4 h-4" />
               GitHub
             </button>
           </div>

           <p className="text-center text-sm text-[#94A3B8]">
             {isLogin ? "Don't have an account? " : "Already have an account? "}
             <button onClick={() => setIsLogin(!isLogin)} className="font-bold text-white hover:text-[#2D5BFF] transition-colors">
               {isLogin ? 'Sign up' : 'Log in'}
             </button>
           </p>

         </div>
      </div>
    </div>
  );
}
