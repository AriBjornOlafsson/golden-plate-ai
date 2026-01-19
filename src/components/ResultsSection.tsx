import { useEffect, useRef, useState } from "react";
import { Trophy, Medal, Target, Award } from "lucide-react";

const results = [
  {
    id: "baseline-unigram-001",
    model: "Unigram Baseline",
    config: "n=1",
    valBpb: "4.7641",
    graderBpb: "—",
    size: "2.7 KB",
    highlight: false,
  },
  {
    id: "ngram-2-002",
    model: "Bigram",
    config: "n=2, min_count=2",
    valBpb: "3.5072",
    graderBpb: "—",
    size: "60 KB",
    highlight: false,
  },
  {
    id: "neural-e128-h320-L2",
    model: "GRU 2-Layer",
    config: "e128 h320 L2",
    valBpb: "1.6884",
    graderBpb: "—",
    size: "756 KB",
    highlight: false,
  },
  {
    id: "neural-e128-h368-L2-full",
    model: "GRU + LZMA",
    config: "e128 h368 L2",
    valBpb: "1.7120",
    graderBpb: "1.6817",
    size: "911 KB",
    highlight: false,
  },
  {
    id: "neural-e160-h384-L2",
    model: "Champion",
    config: "e160 h384 L2",
    valBpb: "1.7030",
    graderBpb: "1.6734",
    size: "991 KB",
    highlight: true,
  },
];

const ResultsSection = () => {
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

  return (
    <section ref={sectionRef} className="relative py-32">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-mono text-sm text-glacier uppercase tracking-widest">Results</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            The scoreboard<br />
            <span className="text-gradient-ember">speaks for itself</span>
          </h2>
        </div>

        {/* Achievement cards */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="stat-card text-center">
            <Trophy className="w-8 h-8 text-ember mx-auto mb-3" />
            <div className="text-2xl font-mono font-bold text-gradient-ember">2nd</div>
            <div className="text-xs text-muted-foreground mt-1">Overall Rank</div>
          </div>
          <div className="stat-card text-center">
            <Target className="w-8 h-8 text-glacier mx-auto mb-3" />
            <div className="text-2xl font-mono font-bold">1.6734</div>
            <div className="text-xs text-muted-foreground mt-1">Best BPB</div>
          </div>
          <div className="stat-card text-center">
            <Medal className="w-8 h-8 text-glacier mx-auto mb-3" />
            <div className="text-2xl font-mono font-bold">991 KB</div>
            <div className="text-xs text-muted-foreground mt-1">Under Limit</div>
          </div>
          <div className="stat-card text-center">
            <Award className="w-8 h-8 text-glacier mx-auto mb-3" />
            <div className="text-2xl font-mono font-bold">1.6M+</div>
            <div className="text-xs text-muted-foreground mt-1">Parameters</div>
          </div>
        </div>

        {/* Results table */}
        <div className={`max-w-5xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="stat-card overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left font-mono text-xs text-muted-foreground uppercase tracking-wider p-4">Model</th>
                    <th className="text-left font-mono text-xs text-muted-foreground uppercase tracking-wider p-4">Config</th>
                    <th className="text-right font-mono text-xs text-muted-foreground uppercase tracking-wider p-4">Val BPB</th>
                    <th className="text-right font-mono text-xs text-muted-foreground uppercase tracking-wider p-4">Grader BPB</th>
                    <th className="text-right font-mono text-xs text-muted-foreground uppercase tracking-wider p-4">Size</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr 
                      key={result.id}
                      className={`border-b border-border/30 last:border-0 transition-colors ${
                        result.highlight ? 'bg-ember/5' : 'hover:bg-secondary/30'
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {result.highlight && <Trophy className="w-4 h-4 text-ember" />}
                          <span className={`font-medium ${result.highlight ? 'text-ember' : 'text-foreground'}`}>
                            {result.model}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <code className="text-sm font-mono text-muted-foreground">{result.config}</code>
                      </td>
                      <td className="p-4 text-right font-mono">{result.valBpb}</td>
                      <td className="p-4 text-right font-mono">
                        <span className={result.highlight ? 'text-gradient-ember font-bold' : ''}>
                          {result.graderBpb}
                        </span>
                      </td>
                      <td className="p-4 text-right font-mono text-muted-foreground">{result.size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
