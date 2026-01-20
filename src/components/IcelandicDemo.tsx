import { useEffect, useRef, useState } from "react";
import { Sparkles, Type } from "lucide-react";

const demoSequence = [
  { typed: "Ísland er ", prediction: "land", full: "Ísland er land " },
  { typed: "Ísland er land ", prediction: "eldfjalla", full: "Ísland er land eldfjalla " },
  { typed: "Ísland er land eldfjalla ", prediction: "og", full: "Ísland er land eldfjalla og " },
  { typed: "Ísland er land eldfjalla og ", prediction: "jökla", full: "Ísland er land eldfjalla og jökla" },
];

const IcelandicDemo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [showPrediction, setShowPrediction] = useState(false);
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
        setShowPrediction(true);
      }, 400);
      return () => clearTimeout(predTimer);
    }

    // Accept prediction and move to next step
    const acceptTimer = setTimeout(() => {
      setDisplayText(step.full);
      setShowPrediction(false);
      setCurrentStep((prev) => prev + 1);
    }, 1200);

    return () => clearTimeout(acceptTimer);
  }, [isVisible, currentStep, displayText, showPrediction]);

  const currentPrediction = demoSequence[currentStep]?.prediction || "";

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
              Watch our 1 MB model predict the next bytes. This is what a golden plate looks like in action.
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
                {showPrediction && (
                  <span className="text-glacier bg-glacier/20 px-1 rounded animate-pulse">
                    {currentPrediction}
                  </span>
                )}
                <span className="inline-block w-0.5 h-5 bg-glacier ml-0.5 animate-pulse" />
              </div>

              {/* Prediction confidence bar */}
              {showPrediction && (
                <div className="mt-6 flex items-center gap-3 text-sm">
                  <Sparkles className="w-4 h-4 text-ember" />
                  <span className="text-muted-foreground">Prediction:</span>
                  <span className="font-mono text-glacier">"{currentPrediction}"</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-ember font-mono">93.2% confidence</span>
                </div>
              )}
            </div>

            {/* Stats footer */}
            <div className="mt-8 pt-4 border-t border-border/50 flex flex-wrap gap-6 text-xs font-mono text-muted-foreground">
              <span>Model: <span className="text-glacier">ByteLM-GRU</span></span>
              <span>Size: <span className="text-ember">999,847 bytes</span></span>
              <span>Context: <span className="text-foreground">512 bytes</span></span>
              <span>BPB: <span className="text-glacier">1.6734</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IcelandicDemo;
