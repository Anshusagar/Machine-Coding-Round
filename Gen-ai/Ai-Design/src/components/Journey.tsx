export default function Journey() {
  return (
    <section id="journey" className="py-16 px-8 mx-auto text-center bg-[#1a1a1a] border-y border-white/5">
      <h2 className="font-playfair text-gold text-3xl md:text-4xl font-semibold mb-16">The Journey</h2>
      
      <div className="flex flex-col md:flex-row justify-between gap-12 max-w-[1000px] mx-auto">
        <div className="group flex-1 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-gold/15 group-hover:-translate-y-1">
            <span className="text-2xl text-gold">✧</span>
          </div>
          <h3 className="font-inter text-ink-primary text-base font-semibold mb-2">1. The Application</h3>
          <p className="font-inter text-ink-muted text-sm leading-[1.6] max-w-[280px]">Submit your credentials. Our membership committee reviews each application for authenticity and intent.</p>
        </div>
        
        <div className="group flex-1 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-gold/15 group-hover:-translate-y-1">
            <span className="text-2xl text-gold">✦</span>
          </div>
          <h3 className="font-inter text-ink-primary text-base font-semibold mb-2">2. The Collection</h3>
          <p className="font-inter text-ink-muted text-sm leading-[1.6] max-w-[280px]">Once accepted, browse a highly curated selection of potential matches tailored to your refined preferences.</p>
        </div>
        
        <div className="group flex-1 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-gold/15 group-hover:-translate-y-1">
            <span className="text-2xl text-gold">✧</span>
          </div>
          <h3 className="font-inter text-ink-primary text-base font-semibold mb-2">3. The Connection</h3>
          <p className="font-inter text-ink-muted text-sm leading-[1.6] max-w-[280px]">Engage in meaningful dialogue or meet at one of our exclusive, member-only offline events.</p>
        </div>
      </div>
    </section>
  );
}
