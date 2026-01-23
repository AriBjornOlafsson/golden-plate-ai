const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <div className="w-8 h-8 rounded-lg bg-glacier/20 flex items-center justify-center">
                <span className="font-display font-bold text-glacier">Þ</span>
              </div>
              <span className="font-display font-semibold">Golden Plate at Þingvellir</span>
            </div>
            <p className="text-sm text-muted-foreground">
              GKI2026 • Gervigreindarkeppni Íslands
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>Built with constraints</span>
            <span className="text-border">•</span>
            <span>Shipped with pride</span>
          </div>

          {/* Competition badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-glacier/30 bg-glacier/5">
            <span className="text-sm font-mono text-glacier">1.65 bpb</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-sm font-mono text-ember">949 KB</span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 Valdimar Eggertsson & Ari Bjorn Olafsson. Icelandic AI Competition Entry.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
