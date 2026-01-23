import { useEffect, useRef, useState } from "react";
import { FileCode, Package, Sparkles } from "lucide-react";

const files = [
  { file: "byte_lm.py", purpose: "Neural model architecture" },
  { file: "train_neural.py", purpose: "Training with early stopping + weight monitoring" },
  { file: "quantize.py", purpose: "Int8 quantization + LZMA compression" },
  { file: "create_hybrid_submission.py", purpose: "Add n-gram cache to submission" },
];

const submissionStructure = `submission.zip
├── model.py      # Model + predict()
├── weights.bin   # Int8 + LZMA compressed
└── config.json   # Hyperparameters`;

const lessons = [
  "Maximize model size within the compression budget.",
  "2 layers > 3 layers for this parameter count.",
  "LZMA compression buys ~10% more parameters.",
];

const TechnicalDetails = () => {
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
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="font-mono text-sm text-ember uppercase tracking-widest">Technical Details</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Files, packaging, and lessons learned
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything needed to reproduce the submission, plus the key takeaways.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="stat-card">
            <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-glacier" />
              Core Files
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b border-border/50">
                  <th className="text-left py-2">File</th>
                  <th className="text-left py-2">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {files.map((row) => (
                  <tr key={row.file} className="border-b border-border/30 last:border-0">
                    <td className="py-2 font-mono text-glacier">{row.file}</td>
                    <td className="py-2 text-muted-foreground">{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="stat-card">
            <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
              <Package className="w-4 h-4 text-ember" />
              Submission Structure
            </h3>
            <pre className="text-xs font-mono text-muted-foreground bg-secondary/40 border border-border/40 rounded-lg p-4 whitespace-pre-wrap">
              {submissionStructure}
            </pre>
          </div>

          <div className="stat-card">
            <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-glacier" />
              Lessons Learned
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {lessons.map((lesson) => (
                <li key={lesson} className="flex items-start gap-2">
                  <span className="text-ember mt-1">•</span>
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalDetails;
