
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DollarSign, TrendingUp, ChevronDown, Sparkles, ArrowRight } from "lucide-react";
import { SplitText } from "@/components/ui/split-text";

interface FinanceHeroProps {
  showAdvanced: boolean;
  setShowAdvanced: (value: boolean) => void;
}

const FinanceHero = ({ showAdvanced, setShowAdvanced }: FinanceHeroProps) => {
  const [showAdvancedDropdown, setShowAdvancedDropdown] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative mb-12 md:mb-16 overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-2xl border border-gray-700"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-1/2 -right-1/2 w-72 h-72 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div 
          className="absolute -bottom-1/2 -left-1/2 w-64 h-64 md:w-80 md:h-80 bg-pink-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0] 
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
      </div>
      
      <div className="relative z-10 p-6 md:p-8 lg:p-12 xl:p-16 flex flex-col items-center justify-center text-center">
        <SplitText
          text="Master Your Money"
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink align-middle leading-tight"
          delay={50}
          animationFrom={{ opacity: 0, transform: 'translate3d(0, 30px, 0)' }}
          animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
          easing="easeOutCubic"
          threshold={0.3}
          rootMargin="-100px"
        />
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 md:mb-3 text-white/90 font-medium max-w-3xl">
          Smart finance tips, tools, and plans – built just for students.
        </p>
        <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl">
          From SIPs to stocks, everything you need to grow your financial skills.
        </p>
      </div>
    </motion.div>
  );
};

export default FinanceHero;
