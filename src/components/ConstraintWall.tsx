import { useEffect, useRef, useState } from "react";
import { HardDrive, Cpu, Clock, Database, Wifi, Layers } from "lucide-react";

const constraints = [
  { icon: HardDrive, label: "Zip Size", value: "≤ 1 MB", note: "1,048,576 bytes exactly" },
  { icon: Database, label: "Memory Limit", value: "8 GB", note: "RAM constraint" },
  { icon: Cpu, label: "CPU Only", value: "No GPU", note: "Pure computation" },
  { icon: Wifi, label: "Network", value: "None", note: "Offline inference" },
  { icon: Clock, label: "Time Limit", value: "60 min", note: "Inference time limit" },
  { icon: Layers, label: "Context", value: "256 bytes", note: "Chosen for speed" },
];

const ConstraintWall = () => {
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
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div 
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, hsl(var(--border)) 50%, transparent 100%)",
        }}
      />
      
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-mono text-sm text-ember uppercase tracking-widest">The Constraint Wall</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Basalt constraints,<br />
            <span className="text-glacier">glacial throughput</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The competition rules carved our design space: 1 MB zip limit, 8 GB memory,
            60 minutes inference time, and CPU-only execution.
          </p>
        </div>

        {/* Constraints grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {constraints.map((constraint, index) => (
            <div
              key={constraint.label}
              className={`stat-card group transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-glacier/10 text-glacier group-hover:bg-glacier/20 transition-colors">
                  <constraint.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground font-mono">{constraint.label}</div>
                  <div className="text-2xl font-bold text-foreground mt-1">{constraint.value}</div>
                  <div className="text-sm text-ash mt-2">{constraint.note}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional context */}
        <div className={`mt-16 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-block p-6 rounded-xl border border-ember/30 bg-ember/5 max-w-2xl">
            <p className="font-mono text-sm text-ember mb-2">Required Interface</p>
            <code className="text-foreground/90 text-sm">
              Model.__init__(submission_dir) → Model.predict(contexts) → 256 logits
            </code>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstraintWall;
