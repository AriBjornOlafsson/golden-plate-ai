import { useEffect, useRef, useState } from "react";
import { Terminal, Globe, Cpu, Wifi, Server, MapPin } from "lucide-react";

const terminalLines = [
  { type: "comment", text: "# Training a model from 4,000 km away..." },
  { type: "command", text: "$ tailscale status" },
  { type: "output", text: "100.x.x.x    monster    tagged-devices linux -" },
  { type: "command", text: "$ ssh valdegg@EAGLE" },
  { type: "output", text: "Welcome to Ubuntu 22.04 LTS" },
  { type: "command", text: "$ nvidia-smi" },
  { type: "output", text: "RTX 3080 | 76°C | 10GB VRAM | Ready." },
  { type: "command", text: "$ python train_neural.py --embed 160 --hidden 384" },
  { type: "output", text: "Epoch 20/20 | Val BPB: 1.57 | Grader: 1.65 | Time: 4h 23m ✓" },
];

const RemoteOps = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
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

  useEffect(() => {
    if (isVisible && visibleLines < terminalLines.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, visibleLines]);

  return (
    <section ref={sectionRef} className="relative py-32 bg-basalt-light/50 overflow-hidden">
      {/* Map-like decorative element */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M20,50 Q35,30 50,50 T80,50" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-glacier" />
          <circle cx="25" cy="45" r="2" fill="currentColor" className="text-ember" />
          <circle cx="75" cy="55" r="2" fill="currentColor" className="text-glacier" />
        </svg>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-mono text-sm text-ember uppercase tracking-widest">Remote Operations</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Berlin → Iceland<br />
            <span className="text-glacier">via tailnet</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Training happens everywhere: MacBooks for prototyping, RunPod rental clusters for scale,
            and an RTX 3080 in Reykjavík accessed via Tailscale from Berlin.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Terminal visualization */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="stat-card overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 pb-4 mb-4 border-b border-border/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-ember/60" />
                  <div className="w-3 h-3 rounded-full bg-glacier/60" />
                </div>
                <span className="text-xs font-mono text-muted-foreground ml-2">valdegg@EAGLE ~ training</span>
              </div>
              
              {/* Terminal content */}
              <div className="font-mono text-sm space-y-1 min-h-[280px]">
                {terminalLines.slice(0, visibleLines).map((line, index) => (
                  <div 
                    key={index}
                    className={`${
                      line.type === 'comment' ? 'text-ash' :
                      line.type === 'command' ? 'text-glacier' :
                      'text-foreground/80'
                    }`}
                  >
                    {line.text}
                  </div>
                ))}
                {visibleLines < terminalLines.length && (
                  <span className="inline-block w-2 h-4 bg-glacier animate-pulse" />
                )}
              </div>
            </div>
          </div>

          {/* Hardware specs */}
          <div className={`space-y-6 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="stat-card">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-ember/10">
                  <Server className="w-6 h-6 text-ember" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold mb-1">Training Infrastructure</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• MacBooks for prototyping & iteration</li>
                    <li>• RunPod rental cluster for scale</li>
                    <li>• RTX 3080 in Iceland (10 GB VRAM)</li>
                    <li>• Distributed experiments across continents</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-glacier/10">
                  <Wifi className="w-6 h-6 text-glacier" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold mb-1">Tailscale Magic</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• MagicDNS for easy discovery</li>
                    <li>• ACL debugging adventures</li>
                    <li>• "ping 100.x.x.x" moments</li>
                    <li>• Encrypted P2P tunnel</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-glacier/10">
                  <MapPin className="w-6 h-6 text-glacier" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold mb-1">The Distance</h3>
                  <p className="text-sm text-muted-foreground">
                    ~4,000 km of fiber between the keyboard in Berlin and the GPU in Reykjavík. 
                    Latency: negligible. Determination: absolute.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RemoteOps;
