import { useEffect, useRef, useState } from "react";
import { Code2, Server, ExternalLink, Linkedin, Award } from "lucide-react";

const team = [
  {
    name: "Valdimar Eggertsson",
    role: "ML Ops Specialist",
    description: "Model architecture, training pipelines, quantization wizardry, and remote GPU operations.",
    icon: Server,
    linkedin: "https://www.linkedin.com/in/valdimar-%C3%A1g%C3%BAst-eggertsson-8210236",
  },
  {
    name: "Ari Björn Ólafsson",
    role: "Full Stack & DevOps",
    description: "Data infrastructure, compression packaging, submission validation, and this very website.",
    icon: Code2,
    linkedin: "https://www.linkedin.com/in/aribjorn",
  },
];

const TeamCredits = () => {
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
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-mono text-sm text-glacier uppercase tracking-widest">Gervigreindarreglan</span>
          <p className="text-xs text-muted-foreground mt-1 mb-4">(Order of the AI)</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Two engineers,<br />
            <span className="text-gradient-ember">on a mission</span>
          </h2>
        </div>

        {/* Team cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <a 
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="stat-card h-full text-center block group hover:border-glacier/50 transition-colors"
              >
                <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-6 flex items-center justify-center">
                  <member.icon className="w-10 h-10 text-glacier" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-1 group-hover:text-glacier transition-colors flex items-center justify-center gap-2">
                  {member.name}
                  <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-glacier" />
                </h3>
                <div className="text-sm font-mono text-ember mb-4">{member.role}</div>
                <p className="text-muted-foreground">{member.description}</p>
              </a>
            </div>
          ))}
        </div>

        {/* Special Thanks */}
        <div className={`text-center mb-16 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block p-6 rounded-xl border border-border/50 bg-secondary/30">
            <p className="text-sm text-muted-foreground mb-3">Special thanks to</p>
            <a 
              href="https://www.linkedin.com/in/bjartur-thorlacius/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 group"
            >
              <div className="w-12 h-12 rounded-full bg-glacier/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-glacier" />
              </div>
              <div className="text-left">
                <div className="font-display font-semibold group-hover:text-glacier transition-colors flex items-center gap-2">
                  Bjartur Thorlacius
                  <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-glacier" />
                </div>
                <div className="text-xs text-muted-foreground">Læknanemi og reikniverk- og tölvunarfræðingur</div>
              </div>
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block p-8 rounded-2xl border border-glacier/30 bg-glacier/5 max-w-2xl">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
              This is compression with soul.
            </h3>
            <p className="text-muted-foreground mb-6">
              A 1 MB golden plate carrying the Icelandic language into the future. 
              Built with constraints. Shipped with pride.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://github.com/AriBjornOlafsson/golden-plate-ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-glacier text-primary-foreground font-medium hover:bg-glacier/90 transition-colors"
              >
                View Repository
                <ExternalLink className="w-4 h-4" />
              </a>
              <a 
                href="#hero" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-secondary/50 hover:bg-secondary transition-colors"
              >
                Back to Top
              </a>
            </div>
          </div>
        </div>

        {/* Competition Link */}
        <div className={`text-center mt-12 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a 
            href="https://gervigreindarkeppni.is/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-8 py-6 rounded-xl bg-[#1a1f2e] hover:bg-[#242a3d] transition-colors group border border-border/30"
          >
            <img 
              src="https://gervigreindarkeppni.is/logos/GKI_Logo_Text_Blue_Horizontal.png" 
              alt="Gervigreindarkeppni Íslands" 
              className="h-12 w-auto"
            />
            <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-glacier" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TeamCredits;
