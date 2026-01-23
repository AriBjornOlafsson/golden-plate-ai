import { useEffect, useRef, useState } from "react";
import { Calendar, TrendingUp } from "lucide-react";

const phases = [
  {
    phase: "Phase 1",
    date: "Jan 16",
    title: "Baselines",
    summary: "Unigram 4.76 bpb, Bigram 3.51 bpb.",
  },
  {
    phase: "Phase 2",
    date: "Jan 16-17",
    title: "Neural ByteLM",
    summary: "Best e128-h368-L2: 1.712 val, 1.682 grader.",
  },
  {
    phase: "Phase 3",
    date: "Jan 17",
    title: "Compression",
    summary: "LZMA beat gzip and brought submissions under 1 MB.",
  },
  {
    phase: "Phase 4",
    date: "Jan 17-18",
    title: "Model Scaling",
    summary: "e160-h384-L2 hit 1.673 bpb; 2 layers > 3 layers.",
  },
  {
    phase: "Phase 5",
    date: "Jan 17",
    title: "Context Window",
    summary: "48 → 256 bytes for +0.03 bpb with 60-min limit intact.",
  },
  {
    phase: "Phase 6",
    date: "Jan 19-20",
    title: "Hyperparameter Tuning",
    summary: "Default lr=1e-3, 20 epochs stayed best.",
  },
  {
    phase: "Phase 7",
    date: "Jan 20-21",
    title: "More Training Data",
    summary: "500MB → 4GB dropped val bpb from 1.703 to 1.571.",
  },
  {
    phase: "Phase 8",
    date: "Jan 21-22",
    title: "Fine-tuning",
    summary: "Detected weight degradation; monitored int8 zero-weight %.",
  },
  {
    phase: "Phase 9",
    date: "Jan 21-22",
    title: "Hybrid Model",
    summary: "Neural 1.66 → Hybrid 1.65 bpb.",
  },
];

const baselines = [
  { model: "Unigram", bpb: "4.76", notes: "Naive frequency baseline" },
  { model: "Bigram", bpb: "3.51", notes: "Simple but limited" },
];

const neuralModels = [
  { model: "e128-h320-L2", params: "1.12M", val: "1.727", grader: "1.727" },
  { model: "e128-h368-L2", params: "1.44M", val: "1.712", grader: "1.682" },
];

const scaledModels = [
  { model: "e160-h352-L2", params: "1.39M", grader: "1.702" },
  { model: "e160-h384-L2", params: "1.62M", grader: "1.673" },
  { model: "e128-h304-L3", params: "1.58M", grader: "1.696" },
];

const dataScaling = [
  { data: "500MB", val: "1.703", change: "baseline" },
  { data: "4GB", val: "1.571", change: "-0.132 bpb" },
];

const hybridComparison = [
  { model: "Pure neural", grader: "1.66" },
  { model: "Hybrid (λ=0.1)", grader: "1.65" },
];

const optimizationNotes = [
  "LZMA compression shrank weights ~10% vs gzip.",
  "Context window 48 → 256 bytes delivered ~0.03 bpb gain.",
  "Default lr=1e-3 and 20 epochs remained best after tuning.",
  "Stop early if int8 quantization zero-weight % rises (collapse signal).",
];

const ExperimentLog = () => {
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
    <section ref={sectionRef} className="relative py-32 bg-basalt-light/30">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="font-mono text-sm text-glacier uppercase tracking-widest">Experiment Log</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            What we tried, when, and why it mattered
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A full timeline of baselines, scaling, compression, and the final hybrid gain.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Timeline */}
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <div className="relative pl-6">
              <div className="absolute left-2 top-2 bottom-2 w-px bg-border/60" />
              <div className="space-y-6">
                {phases.map((phase, index) => (
                  <div key={phase.phase} className="relative">
                    <div className="absolute -left-[2px] top-2 w-4 h-4 rounded-full bg-glacier/20 border border-glacier/60" />
                    <div className="stat-card">
                      <div className="flex items-center gap-2 text-xs font-mono text-ember mb-2">
                        <Calendar className="w-3 h-3" />
                        {phase.phase} • {phase.date}
                      </div>
                      <h3 className="font-display text-lg font-bold mb-2">{phase.title}</h3>
                      <p className="text-sm text-muted-foreground">{phase.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tables */}
          <div className={`space-y-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <div className="stat-card">
              <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-glacier" />
                Baselines
              </h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b border-border/50">
                    <th className="text-left py-2">Model</th>
                    <th className="text-right py-2">BPB</th>
                    <th className="text-left py-2">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {baselines.map((row) => (
                    <tr key={row.model} className="border-b border-border/30 last:border-0">
                      <td className="py-2 font-medium">{row.model}</td>
                      <td className="py-2 text-right font-mono">{row.bpb}</td>
                      <td className="py-2 text-muted-foreground">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="stat-card">
              <h3 className="font-display text-lg font-bold mb-4">Neural ByteLM (Phase 2)</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b border-border/50">
                    <th className="text-left py-2">Model</th>
                    <th className="text-right py-2">Params</th>
                    <th className="text-right py-2">Val</th>
                    <th className="text-right py-2">Grader</th>
                  </tr>
                </thead>
                <tbody>
                  {neuralModels.map((row) => (
                    <tr key={row.model} className="border-b border-border/30 last:border-0">
                      <td className="py-2 font-medium">{row.model}</td>
                      <td className="py-2 text-right font-mono">{row.params}</td>
                      <td className="py-2 text-right font-mono">{row.val}</td>
                      <td className="py-2 text-right font-mono">{row.grader}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="stat-card">
              <h3 className="font-display text-lg font-bold mb-4">Model Scaling (Phase 4)</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b border-border/50">
                    <th className="text-left py-2">Model</th>
                    <th className="text-right py-2">Params</th>
                    <th className="text-right py-2">Grader</th>
                  </tr>
                </thead>
                <tbody>
                  {scaledModels.map((row) => (
                    <tr key={row.model} className="border-b border-border/30 last:border-0">
                      <td className="py-2 font-medium">{row.model}</td>
                      <td className="py-2 text-right font-mono">{row.params}</td>
                      <td className="py-2 text-right font-mono">{row.grader}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="stat-card">
              <h3 className="font-display text-lg font-bold mb-4">Training Data Scale (Phase 7)</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b border-border/50">
                    <th className="text-left py-2">Data</th>
                    <th className="text-right py-2">Val BPB</th>
                    <th className="text-left py-2">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {dataScaling.map((row) => (
                    <tr key={row.data} className="border-b border-border/30 last:border-0">
                      <td className="py-2 font-medium">{row.data}</td>
                      <td className="py-2 text-right font-mono">{row.val}</td>
                      <td className="py-2 text-muted-foreground">{row.change}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="stat-card">
              <h3 className="font-display text-lg font-bold mb-4">Hybrid Gain (Phase 9)</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b border-border/50">
                    <th className="text-left py-2">Model</th>
                    <th className="text-right py-2">Grader BPB</th>
                  </tr>
                </thead>
                <tbody>
                  {hybridComparison.map((row) => (
                    <tr key={row.model} className="border-b border-border/30 last:border-0">
                      <td className="py-2 font-medium">{row.model}</td>
                      <td className="py-2 text-right font-mono">{row.grader}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="stat-card">
              <h3 className="font-display text-lg font-bold mb-4">Optimization Notes</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {optimizationNotes.map((note) => (
                  <li key={note} className="flex items-start gap-2">
                    <span className="text-ember mt-1">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperimentLog;
