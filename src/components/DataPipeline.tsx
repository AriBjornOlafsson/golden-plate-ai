import { useEffect, useRef, useState } from "react";
import { Database, GitBranch, Binary, CheckCircle } from "lucide-react";

const pipelineSteps = [
  {
    icon: Database,
    title: "IGC-2024",
    subtitle: "Icelandic Gigaword Corpus",
    description: "Downloaded from HuggingFace. The national treasure of Icelandic text.",
    code: "create_dataset.py → data/igc_full",
  },
  {
    icon: GitBranch,
    title: "Train/Val Split",
    subtitle: "95% / 5% with dedup",
    description: "Prefix-hash deduplication on first 100 bytes. No data leakage.",
    code: "split_data.py → data/train, data/val",
  },
  {
    icon: Binary,
    title: "Byte-Level",
    subtitle: "256-symbol vocabulary",
    description: "Raw UTF-8 bytes. Every character, every accent, every Icelandic þ.",
    code: "vocab_size = 256 # No shortcuts",
  },
  {
    icon: CheckCircle,
    title: "Arrow Shards",
    subtitle: "HuggingFace format",
    description: "Efficient storage and streaming for training at scale.",
    code: "pyarrow datasets, concatenate bytes",
  },
];

const DataPipeline = () => {
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
    <section ref={sectionRef} className="relative py-32 bg-basalt-light/50">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-mono text-sm text-glacier uppercase tracking-widest">Data Pipeline</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            From corpus<br />
            <span className="text-ember">to bytes</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Icelandic text flows through our pipeline, emerging as pure bytes ready for the model.
          </p>
        </div>

        {/* Pipeline visualization */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div 
            className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-px transition-all duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: "linear-gradient(180deg, transparent 0%, hsl(var(--glacier)) 10%, hsl(var(--glacier)) 90%, transparent 100%)",
            }}
          />

          {/* Pipeline steps */}
          <div className="space-y-12">
            {pipelineSteps.map((step, index) => (
              <div
                key={step.title}
                className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-12 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                } ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Icon node */}
                <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                  <div className="w-16 h-16 rounded-xl bg-card border border-glacier/30 flex items-center justify-center glow-glacier">
                    <step.icon className="w-7 h-7 text-glacier" />
                  </div>
                </div>

                {/* Content card */}
                <div className={`flex-1 md:w-[calc(50%-4rem)] ${index % 2 === 1 ? 'md:pr-20' : 'md:pl-20'} ml-20 md:ml-0`}>
                  <div className="stat-card">
                    <div className="text-sm font-mono text-ember mb-1">{step.subtitle}</div>
                    <h3 className="text-xl font-display font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{step.description}</p>
                    <code className="block text-xs font-mono text-glacier bg-glacier/10 px-3 py-2 rounded-lg">
                      {step.code}
                    </code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataPipeline;
