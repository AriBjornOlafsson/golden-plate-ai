import { useEffect, useRef, useState } from "react";
import { Zap, TrendingUp, Brain, Layers } from "lucide-react";

const models = [
  {
    stage: "01",
    name: "Unigram Baseline",
    bpb: "4.76",
    size: "2.7 KB",
    description: "Simple frequency counting. A sanity check baseline.",
    tech: ["n=1", "gzipped JSON", "min_count pruning"],
    icon: Zap,
    status: "baseline",
  },
  {
    stage: "02",
    name: "Bigram Model",
    bpb: "3.51",
    size: "60 KB",
    description: "Context-aware transitions. A 26% improvement over unigram.",
    tech: ["n=2", "min_count=2", "clean train split"],
    icon: TrendingUp,
    status: "improvement",
  },
  {
    stage: "03",
    name: "GRU ByteLM",
    bpb: "1.69",
    size: "~900 KB",
    description: "Neural language modeling with weight tying and regularization.",
    tech: ["Weight tying", "Locked dropout", "Embedding dropout", "BPTT-512"],
    icon: Brain,
    status: "breakthrough",
  },
  {
    stage: "04",
    name: "Final Submission",
    bpb: "1.6734",
    size: "991 KB",
    description: "e160-h384-L2 with int8 quantization and LZMA compression.",
    tech: ["int8 quantization", "LZMA compression", "1.6M+ params", "Best score"],
    icon: Layers,
    status: "champion",
  },
];

const ModelEvolution = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "baseline": return "text-ash border-ash/30 bg-ash/5";
      case "improvement": return "text-glacier border-glacier/30 bg-glacier/5";
      case "breakthrough": return "text-ember border-ember/30 bg-ember/5";
      case "champion": return "text-ember border-ember/50 bg-ember/10 glow-ember";
      default: return "text-muted-foreground";
    }
  };

  return (
    <section ref={sectionRef} className="relative py-32">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-mono text-sm text-glacier uppercase tracking-widest">Model Evolution</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            From counting<br />
            <span className="text-gradient-glacier">to compression</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each iteration pushed the boundaries of what fits in 1 MB while maximizing prediction quality.
          </p>
        </div>

        {/* Evolution ladder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {models.map((model, index) => (
            <div
              key={model.name}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`stat-card h-full ${model.status === 'champion' ? 'ring-1 ring-ember/50' : ''}`}>
                <div className="flex items-start gap-4">
                  {/* Stage number */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                    <span className="font-mono text-lg font-bold text-muted-foreground">{model.stage}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display text-xl font-bold">{model.name}</h3>
                      <model.icon className={`w-5 h-5 ${model.status === 'champion' ? 'text-ember' : 'text-glacier'}`} />
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4">{model.description}</p>
                    
                    {/* Stats */}
                    <div className="flex gap-6 mb-4">
                      <div>
                        <div className="text-xs font-mono text-muted-foreground">BPB</div>
                        <div className={`text-2xl font-mono font-bold ${model.status === 'champion' ? 'text-gradient-ember' : 'text-foreground'}`}>
                          {model.bpb}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-mono text-muted-foreground">Size</div>
                        <div className="text-2xl font-mono font-bold text-foreground">{model.size}</div>
                      </div>
                    </div>
                    
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                      {model.tech.map((tech) => (
                        <span 
                          key={tech} 
                          className={`text-xs font-mono px-2 py-1 rounded border ${getStatusColor(model.status)}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModelEvolution;
