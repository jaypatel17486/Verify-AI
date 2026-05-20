import { useState, useEffect } from 'react';
import { Chrome, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function FloatingExtensionCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <div className="relative bg-gradient-to-br from-[#2D5BFF] to-[#1E4AD9] rounded-2xl shadow-2xl shadow-[#2D5BFF]/30 p-6 max-w-sm border border-white/20 overflow-hidden group">
            {/* Gloss Effect */}
            <div className="absolute -inset-x-20 top-0 h-[200%] w-20 bg-white/20 rotate-[35deg] transition-all duration-1000 group-hover:translate-x-[500px]" />

            {/* Close Button */}
            <button
              onClick={() => setIsDismissed(true)}
              className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            {/* Content */}
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 shadow-inner">
                <Chrome className="w-6 h-6 text-white" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-white font-bold">Smart Analysis</h3>
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-[#10B981] rounded-full shadow-lg shadow-[#10B981]/20">
                    <Zap className="w-3 h-3 text-white fill-current" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-tighter">Pro</span>
                  </div>
                </div>
                <p className="text-sm text-white/90 mb-4 leading-snug">
                  Fact-check any website instantly with our browser extension.
                </p>
                <button className="w-full px-4 py-2.5 bg-white text-[#2D5BFF] rounded-xl font-bold text-sm hover:shadow-xl transition-all flex items-center justify-center gap-2 group/btn active:scale-95">
                  <Chrome className="w-4 h-4" />
                  Add to Chrome
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
