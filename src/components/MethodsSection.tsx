import { useEffect, useRef, useState } from "react";
import { Brain, Database, Layers } from "lucide-react";

const methods = [
  {
    icon: Brain,
    title: "GRU ByteLM",
    tagline: "GRU-based byte-level language model predicting the next byte from context.",
    details: [
      "Input: bytes 0-255 → embedding dim 160",
      "2× GRU layers, 384 hidden units each",
      "Softmax over 256 possible next bytes",
      "AWD-LSTM tricks: weight tying, locked dropout, embedding dropout",
      "1.62M params → ~949 KB after int8 + LZMA",
    ],
  },
  {
    icon: Database,
    title: "N-gram Cache",
    tagline: "Frequency-based predictor computed on-the-fly from the recent context window.",
    details: [
      "Window: last 256 bytes of context",
      "Unigram, bigram, trigram counts",
      "Blend: 30% unigram + 40% bigram + 30% trigram",
      "Captures local repetition the neural model misses",
    ],
  },
  {
    icon: Layers,
    title: "Hybrid Interpolation",
    tagline: "Blends neural and cache logits for a steady bpb gain.",
    details: [
      "Logit interpolation with λ = 0.1 (10% cache, 90% neural)",
      "Consistent +0.01–0.02 bpb improvement",
      "Final score: 1.65 bpb on grader",
    ],
    formula: "hybrid_logits = (1 - λ) × neural_logits + λ × cache_logits",
  },
];

const MethodsSection = () => {
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
    <section ref={sectionRef} className="relative py-32">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="font-mono text-sm text-ember uppercase tracking-widest">Methods</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            How the model works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            One-liners and mechanics for the three core components that earned 1.65 bpb.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {methods.map((method, index) => (
            <div
              key={method.title}
              className={`stat-card transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-glacier/10 text-glacier">
                  <method.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold">{method.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{method.tagline}</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {method.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2">
                    <span className="text-ember mt-1">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              {method.formula && (
                <div className="mt-4 p-3 rounded-lg bg-secondary/40 border border-border/40 text-xs font-mono text-glacier">
                  {method.formula}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodsSection;
