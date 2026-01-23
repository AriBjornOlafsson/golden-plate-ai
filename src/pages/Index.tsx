import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import IcelandicDemo from "@/components/IcelandicDemo";
import ConstraintWall from "@/components/ConstraintWall";
import DataPipeline from "@/components/DataPipeline";
import ModelEvolution from "@/components/ModelEvolution";
import MethodsSection from "@/components/MethodsSection";
import ExperimentLog from "@/components/ExperimentLog";
import CompressionAlchemy from "@/components/CompressionAlchemy";
import ResultsSection from "@/components/ResultsSection";
import TechnicalDetails from "@/components/TechnicalDetails";
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

        <section id="demo">
          <IcelandicDemo />
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

        <section id="methods">
          <MethodsSection />
        </section>

        <section id="experiments">
          <ExperimentLog />
        </section>
        
        <section id="compression">
          <CompressionAlchemy />
        </section>
        
        <section id="results">
          <ResultsSection />
        </section>

        <section id="technical">
          <TechnicalDetails />
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
