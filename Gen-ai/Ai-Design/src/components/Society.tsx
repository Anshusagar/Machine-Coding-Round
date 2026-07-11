export default function Society() {
  return (
    <section id="society" className="py-32 px-8 max-w-[1200px] mx-auto flex flex-col gap-16">
      <div className="text-center max-w-[600px] mx-auto">
        <h2 className="font-playfair text-gold text-4xl font-semibold mb-4">The Velvet Society</h2>
        <p className="font-inter text-ink-primary text-base leading-[1.6]">
          Quality over quantity. Our rigorous application process ensures a community of like-minded professionals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8">
        <div className="group bg-surface-card rounded-lg border border-white/10 overflow-hidden relative flex flex-col min-h-[400px] md:min-h-[450px]">
          <div className="absolute inset-0 z-0 opacity-50 transition-all duration-700 ease-in-out group-hover:opacity-70 group-hover:scale-105" style={{ background: 'url(https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=800) center/cover' }}></div>
          <div className="relative z-10 mt-auto p-8 md:p-16 bg-gradient-to-t from-[#161616] via-[#161616]/80 to-transparent">
            <span className="inline-flex items-center gap-1.5 font-inter text-gold uppercase text-[0.7rem] font-semibold tracking-[0.05em] mb-2">✔ Verified Member</span>
            <h3 className="font-playfair text-gold text-3xl font-semibold mb-2">Curated Profiles</h3>
            <p className="font-inter text-ink-muted text-sm leading-[1.6]">Every member is individually reviewed by our committee to ensure alignment with our community values.</p>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="group bg-surface-card rounded-lg border border-white/10 overflow-hidden relative flex flex-col flex-1 min-h-[284px]">
            <div className="absolute inset-0 z-0 opacity-50 transition-all duration-700 ease-in-out group-hover:opacity-70 group-hover:scale-105" style={{ background: 'url(https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800) center/cover' }}></div>
            <div className="relative z-10 mt-auto p-8 bg-gradient-to-t from-[#161616] via-[#161616]/80 to-transparent">
              <h3 className="font-playfair text-gold text-2xl font-semibold mb-2">Private Events</h3>
              <p className="font-inter text-ink-muted text-sm leading-[1.6]">Access to invite-only gatherings at premier venues worldwide.</p>
            </div>
          </div>

          <div className="group bg-surface-card rounded-lg border border-white/10 overflow-hidden relative flex flex-col flex-1 min-h-[284px]">
            <div className="absolute inset-0 z-0 opacity-50 transition-all duration-700 ease-in-out group-hover:opacity-70 group-hover:scale-105" style={{ background: 'url(https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=800) center/cover' }}></div>
            <div className="relative z-10 mt-auto p-8 bg-gradient-to-t from-[#161616] via-[#161616]/80 to-transparent">
              <h3 className="font-playfair text-gold text-2xl font-semibold mb-2">Total Discretion</h3>
              <p className="font-inter text-ink-muted text-sm leading-[1.6]">Your privacy is paramount. Profiles are hidden from public view.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
