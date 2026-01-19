import { useEffect, useRef, useState } from "react";
import { Minimize2, FileArchive, Gauge } from "lucide-react";

const CompressionAlchemy = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-basalt-light/50 overflow-hidden">
      {/* Decorative gradient */}
      <div 
        className="absolute top-1/2 right-0 w-1/2 h-1/2 -translate-y-1/2 opacity-30"
        style={{
          background: "radial-gradient(ellipse at right, hsl(32 95% 65% / 0.2) 0%, transparent 70%)",
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-mono text-sm text-ember uppercase tracking-widest">Compression Alchemy</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            1.6M parameters<br />
            <span className="text-gradient-ember">under 1 MB</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            LZMA compression was the key that unlocked our final parameter budget. 
            It's the difference between "almost" and "exactly under 1 MB."
          </p>
        </div>

        {/* Compression comparison */}
        <div className={`grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="stat-card text-center">
            <div className="p-3 rounded-lg bg-ash/10 w-fit mx-auto mb-4">
              <Gauge className="w-8 h-8 text-ash" />
            </div>
            <div className="text-sm font-mono text-muted-foreground mb-2">Raw fp32</div>
            <div className="text-3xl font-mono font-bold text-ash">~6.4 MB</div>
            <div className="text-xs text-muted-foreground mt-2">Way too big</div>
          </div>
          
          <div className="stat-card text-center">
            <div className="p-3 rounded-lg bg-glacier/10 w-fit mx-auto mb-4">
              <Minimize2 className="w-8 h-8 text-glacier" />
            </div>
            <div className="text-sm font-mono text-muted-foreground mb-2">int8 + gzip</div>
            <div className="text-3xl font-mono font-bold text-glacier">~1.1 MB</div>
            <div className="text-xs text-muted-foreground mt-2">Close but not enough</div>
          </div>
          
          <div className="stat-card text-center ring-1 ring-ember/50">
            <div className="p-3 rounded-lg bg-ember/10 w-fit mx-auto mb-4">
              <FileArchive className="w-8 h-8 text-ember" />
            </div>
            <div className="text-sm font-mono text-muted-foreground mb-2">int8 + LZMA</div>
            <div className="text-3xl font-mono font-bold text-gradient-ember">991 KB</div>
            <div className="text-xs text-ember mt-2">Victory ✓</div>
          </div>
        </div>

        {/* Technical details */}
        <div className={`max-w-3xl mx-auto transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="stat-card">
            <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-3">
              <span className="text-glacier">quantize.py</span>
              <span className="text-muted-foreground font-normal text-sm">— The magic spell</span>
            </h3>
            
            <div className="space-y-4 font-mono text-sm">
              <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                <div className="text-muted-foreground mb-2"># Per-tensor int8 quantization</div>
                <div className="text-foreground">
                  <span className="text-glacier">scale</span> = max(abs(weights)) / 127
                  <br />
                  <span className="text-glacier">int8_weights</span> = round(weights / scale)
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                <div className="text-muted-foreground mb-2"># LZMA compression</div>
                <div className="text-foreground">
                  <span className="text-ember">lzma.compress</span>(int8_weights, preset=9)
                  <br />
                  <span className="text-muted-foreground"># ~10% smaller than gzip</span>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                <div className="text-muted-foreground mb-2"># Output</div>
                <div className="text-foreground">
                  weights.bin <span className="text-muted-foreground">+</span> config.json <span className="text-muted-foreground">→</span> <span className="text-ember">submission.zip</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompressionAlchemy;
