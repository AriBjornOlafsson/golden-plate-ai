import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ConstraintWall from "@/components/ConstraintWall";
import DataPipeline from "@/components/DataPipeline";
import ModelEvolution from "@/components/ModelEvolution";
import CompressionAlchemy from "@/components/CompressionAlchemy";
import ResultsSection from "@/components/ResultsSection";
import RemoteOps from "@/components/RemoteOps";
import TeamCredits from "@/components/TeamCredits";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main>
        <section id="hero">
          <HeroSection />
        </section>
        
        <section id="constraints">
          <ConstraintWall />
        </section>
        
        <section id="data">
          <DataPipeline />
        </section>
        
        <section id="models">
          <ModelEvolution />
        </section>
        
        <section id="compression">
          <CompressionAlchemy />
        </section>
        
        <section id="results">
          <ResultsSection />
        </section>
        
        <section id="remote">
          <RemoteOps />
        </section>
        
        <section id="team">
          <TeamCredits />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
