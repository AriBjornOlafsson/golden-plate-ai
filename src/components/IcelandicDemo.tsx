import { useEffect, useRef, useState } from "react";
import { Sparkles, Type } from "lucide-react";

type Prediction = { word: string; confidence: number };

const demoSequence = [
  {
    typed: "Það er ",
    predictions: [
      { word: "rólegt", confidence: 92.4 },
      { word: "kalt", confidence: 4.1 },
      { word: "dimmt", confidence: 3.5 },
    ],
    accepted: "rólegt",
    full: "Það er rólegt ",
  },
  {
    typed: "Það er rólegt ",
    predictions: [
      { word: "í", confidence: 95.3 },
      { word: "núna", confidence: 3.0 },
      { word: "hér", confidence: 1.7 },
    ],
    accepted: "í",
    full: "Það er rólegt í ",
  },
  {
    typed: "Það er rólegt í ",
    predictions: [
      { word: "bænum", confidence: 91.6 },
      { word: "borginni", confidence: 5.2 },
      { word: "miðbænum", confidence: 3.2 },
    ],
    accepted: "bænum",
    full: "Það er rólegt í bænum ",
  },
  {
    typed: "Það er rólegt í bænum ",
    predictions: [
      { word: "og", confidence: 90.2 },
      { word: "þar", confidence: 6.8 },
      { word: "en", confidence: 3.0 },
    ],
    accepted: "og",
    full: "Það er rólegt í bænum og ",
  },
  {
    typed: "Það er rólegt í bænum og ",
    predictions: [
      { word: "flestir", confidence: 89.4 },
      { word: "fólk", confidence: 7.1 },
      { word: "ferðamenn", confidence: 3.5 },
    ],
    accepted: "flestir",
    full: "Það er rólegt í bænum og flestir ",
  },
  {
    typed: "Það er rólegt í bænum og flestir ",
    predictions: [
      { word: "eru", confidence: 94.7 },
      { word: "hafa", confidence: 3.4 },
      { word: "vilja", confidence: 1.9 },
    ],
    accepted: "eru",
    full: "Það er rólegt í bænum og flestir eru ",
  },
  {
    typed: "Það er rólegt í bænum og flestir eru ",
    predictions: [
      { word: "að", confidence: 96.2 },
      { word: "í", confidence: 2.3 },
      { word: "nú", confidence: 1.5 },
    ],
    accepted: "að",
    full: "Það er rólegt í bænum og flestir eru að ",
  },
  {
    typed: "Það er rólegt í bænum og flestir eru að ",
    predictions: [
      { word: "sinna", confidence: 88.9 },
      { word: "gera", confidence: 6.4 },
      { word: "klára", confidence: 4.7 },
    ],
    accepted: "sinna",
    full: "Það er rólegt í bænum og flestir eru að sinna ",
  },
  {
    typed: "Það er rólegt í bænum og flestir eru að sinna ",
    predictions: [
      { word: "sínum", confidence: 93.1 },
      { word: "verkum", confidence: 4.5 },
      { word: "daglegu", confidence: 2.4 },
    ],
    accepted: "sínum",
    full: "Það er rólegt í bænum og flestir eru að sinna sínum ",
  },
  {
    typed: "Það er rólegt í bænum og flestir eru að sinna sínum ",
    predictions: [
      { word: "daglegu", confidence: 90.5 },
      { word: "venjulegu", confidence: 6.2 },
      { word: "smáu", confidence: 3.3 },
    ],
    accepted: "daglegu",
    full: "Það er rólegt í bænum og flestir eru að sinna sínum daglegu ",
  },
  {
    typed: "Það er rólegt í bænum og flestir eru að sinna sínum daglegu ",
    predictions: [
      { word: "verkum.", confidence: 92.8 },
      { word: "skyldum.", confidence: 4.9 },
      { word: "verkum", confidence: 2.3 },
    ],
    accepted: "verkum.",
    full: "Það er rólegt í bænum og flestir eru að sinna sínum daglegu verkum.",
  },
];

const IcelandicDemo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [showPrediction, setShowPrediction] = useState(false);
  const [activePrediction, setActivePrediction] = useState("");
  const [activePredictions, setActivePredictions] = useState<Prediction[]>([]);
  const [confidence, setConfidence] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const step = demoSequence[currentStep];
    if (!step) {
      // Reset and loop
      const resetTimer = setTimeout(() => {
        setCurrentStep(0);
        setDisplayText("");
        setShowPrediction(false);
        setActivePrediction("");
        setActivePredictions([]);
      }, 3000);
      return () => clearTimeout(resetTimer);
    }

    // Type out the current step
    let charIndex = displayText.length;
    const targetLength = step.typed.length;

    if (charIndex < targetLength) {
      const typeTimer = setTimeout(() => {
        setDisplayText(step.typed.slice(0, charIndex + 1));
      }, 80);
      return () => clearTimeout(typeTimer);
    }

    // Show prediction
    if (!showPrediction) {
      const predTimer = setTimeout(() => {
        const topPrediction = step.predictions[0];
        setActivePrediction(step.accepted);
        setActivePredictions(step.predictions);
        setConfidence(topPrediction?.confidence ?? 0);
        setShowPrediction(true);
      }, 400);
      return () => clearTimeout(predTimer);
    }

    // Accept prediction and move to next step
    const acceptTimer = setTimeout(() => {
      setShowPrediction(false);
      setActivePrediction("");
      setActivePredictions([]);
      setDisplayText(step.full);
      setCurrentStep((prev) => prev + 1);
    }, 1200);

    return () => clearTimeout(acceptTimer);
  }, [isVisible, currentStep, displayText, showPrediction]);

  return (
    <section ref={sectionRef} className="relative py-24 bg-basalt-light/30">
      <div className="container mx-auto px-6">
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Header */}
          <div className="text-center mb-12">
            <span className="font-mono text-sm text-glacier uppercase tracking-widest">Live Demo</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-4">
              Icelandic Text Prediction
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Watch our 1 MB model surface top-3 next-word predictions at every step.
            </p>
          </div>

          {/* Terminal Demo */}
          <div className="stat-card overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 pb-4 mb-6 border-b border-border/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-ember/60" />
                <div className="w-3 h-3 rounded-full bg-glacier/60" />
              </div>
              <span className="text-xs font-mono text-muted-foreground ml-2">
                <Type className="w-3 h-3 inline mr-1" />
                bytelm-predict --model golden_plate.zip
              </span>
            </div>

            {/* Main display */}
            <div className="min-h-[120px] flex flex-col justify-center">
              <div className="font-mono text-lg md:text-xl leading-relaxed">
                <span className="text-foreground">{displayText}</span>
                <span className={`px-1 rounded transition-opacity duration-200 ${showPrediction ? 'text-glacier bg-glacier/20 opacity-100' : 'opacity-0'}`}>
                  {activePrediction || '\u00A0'}
                </span>
                <span className="inline-block w-0.5 h-5 bg-glacier ml-0.5 animate-pulse" />
              </div>

              {/* Prediction panel - always rendered to prevent layout shift */}
              <div className={`mt-6 flex flex-wrap items-center gap-3 text-sm min-h-[2rem] transition-opacity duration-200 ${showPrediction ? 'opacity-100' : 'opacity-0'}`}>
                <Sparkles className="w-4 h-4 text-ember" />
                <span className="text-muted-foreground">Top-3 predictions:</span>
                <div className="flex flex-wrap gap-2">
                  {activePredictions.map((prediction) => (
                    <span
                      key={prediction.word}
                      className={`px-2 py-1 rounded border text-xs font-mono ${
                        prediction.word === activePrediction
                          ? 'bg-glacier/20 text-glacier border-glacier/40'
                          : 'bg-secondary/40 text-muted-foreground border-border/40'
                      }`}
                    >
                      {prediction.word} <span className="text-ember">{prediction.confidence.toFixed(1)}%</span>
                    </span>
                  ))}
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-ember font-mono">{confidence.toFixed(1)}% top-1</span>
              </div>
            </div>

            {/* Stats footer */}
            <div className="mt-8 pt-4 border-t border-border/50 flex flex-wrap gap-6 text-xs font-mono text-muted-foreground">
              <span>Model: <span className="text-glacier">GRU + N-gram Cache</span></span>
              <span>Size: <span className="text-ember">949 KB</span></span>
              <span>Context: <span className="text-foreground">256 bytes</span></span>
              <span>BPB: <span className="text-glacier">1.65</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IcelandicDemo;
