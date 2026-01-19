import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-iceland.jpg";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
      </div>
      
      {/* Ambient glow effects */}
      <div className="hero-glow animate-glow-pulse" />
      <div 
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, hsl(32 95% 65% / 0.3) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Competition badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-glacier/30 bg-background/50 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-glacier animate-pulse" />
            <span className="text-sm font-mono text-glacier">GKI2026 • 2nd Place Overall</span>
          </div>
          
          {/* Main title */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="text-gradient-glacier">Golden Plate</span>
            <br />
            <span className="text-foreground/90">at Þingvellir</span>
          </h1>
          
          {/* Subtitle */}
          <p className="font-mono text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            A 1 MB byte-level Icelandic language model
          </p>
          
          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-12 mb-16">
            <StatItem value="1.6734" label="bits per byte" highlight />
            <StatItem value="<1MB" label="zip size" />
            <StatItem value="256" label="byte vocabulary" />
            <StatItem value="1.6M+" label="parameters" />
          </div>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl text-foreground/80 font-display italic max-w-3xl mx-auto">
            "Compression with soul—a tiny model chasing national-language excellence."
          </p>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-muted-foreground" />
        </div>
      </div>
      
      {/* Background texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </section>
  );
};

const StatItem = ({ value, label, highlight = false }: { value: string; label: string; highlight?: boolean }) => (
  <div className="text-center bg-background/30 backdrop-blur-sm rounded-lg px-4 py-3 border border-border/20">
    <div className={`font-mono text-3xl md:text-4xl font-bold ${highlight ? 'text-gradient-ember' : 'text-foreground'}`}>
      {value}
    </div>
    <div className="text-sm text-muted-foreground mt-1">{label}</div>
  </div>
);

export default HeroSection;
