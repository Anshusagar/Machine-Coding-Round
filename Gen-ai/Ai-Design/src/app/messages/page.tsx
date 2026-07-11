import Navigation from '@/components/Navigation';

export default function Messages() {
  const connections = [
    { id: '1', name: 'Eleanor', lastMessage: 'Precisely. It\'s the balance of form and function...', unread: true },
    { id: '2', name: 'Marcus', lastMessage: 'Let us coordinate for the event next Thursday.', unread: false },
    { id: '3', name: 'Sophia', lastMessage: 'That exhibition was exactly what I needed.', unread: false },
  ];

  return (
    <>
      <Navigation />
      <main className="h-screen pt-32 pb-8 px-4 md:px-8 max-w-[1400px] mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-1/3 md:max-w-[400px] flex flex-col bg-surface-card rounded-xl border border-white/5 overflow-hidden shadow-2xl h-[40vh] md:h-auto">
          <div className="p-6 border-b border-white/5">
            <h2 className="font-playfair text-2xl font-semibold text-ink-primary">The Dialogue</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {connections.map((conn) => (
              <button key={conn.id} className="w-full p-6 text-left border-b border-white/5 hover:bg-white/5 transition-colors flex flex-col gap-2 relative">
                {conn.unread && (
                  <span className="absolute top-6 right-6 w-2 h-2 rounded-full bg-primary"></span>
                )}
                <span className="font-playfair text-xl font-semibold text-ink-primary">{conn.name}</span>
                <span className="font-inter text-ink-muted text-sm line-clamp-1 leading-relaxed">{conn.lastMessage}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Chat Area */}
        <section className="flex-1 flex flex-col bg-surface-card rounded-xl border border-white/5 overflow-hidden shadow-2xl relative h-[50vh] md:h-auto">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,178,84,0.03)_0%,transparent_100%)] pointer-events-none" />
          
          <div className="p-8 border-b border-white/5 relative z-10 flex items-center justify-between">
            <div>
              <h3 className="font-playfair text-3xl font-semibold text-ink-primary mb-1">Eleanor</h3>
              <p className="font-inter text-gold text-xs uppercase tracking-[0.1em]">Art Director</p>
            </div>
            <button className="text-ink-muted hover:text-gold transition-colors text-sm font-inter tracking-wide uppercase hidden sm:block">
              View Profile
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-8 relative z-10">
            {/* Mock Messages */}
            <div className="max-w-[90%] md:max-w-[80%] self-start flex flex-col gap-2">
              <div className="bg-[#1a1a1a] p-5 md:p-6 rounded-2xl rounded-tl-sm border border-white/5 font-inter text-ink-primary text-[15px] leading-relaxed">
                I noticed you have an affinity for mid-century design. Have you seen the recent curation at the MOMA?
              </div>
              <span className="font-inter text-ink-muted text-xs px-2">Yesterday, 8:42 PM</span>
            </div>

            <div className="max-w-[90%] md:max-w-[80%] self-end flex flex-col gap-2 items-end">
              <div className="bg-primary/10 border border-primary/20 p-5 md:p-6 rounded-2xl rounded-tr-sm font-inter text-ink-primary text-[15px] leading-relaxed">
                I have. I completely agree about the mid-century aesthetics, there's a certain timeless restraint to it that modern pieces often miss.
              </div>
              <span className="font-inter text-ink-muted text-xs px-2">Yesterday, 10:15 PM</span>
            </div>
            
            <div className="max-w-[90%] md:max-w-[80%] self-start flex flex-col gap-2">
              <div className="bg-[#1a1a1a] p-5 md:p-6 rounded-2xl rounded-tl-sm border border-white/5 font-inter text-ink-primary text-[15px] leading-relaxed">
                Precisely. It's the balance of form and function without excess. We should discuss this over coffee sometime.
              </div>
              <span className="font-inter text-ink-muted text-xs px-2">Today, 9:00 AM</span>
            </div>
          </div>

          <div className="p-4 md:p-6 relative z-10">
            <div className="bg-[#1a1a1a] rounded-full border border-white/10 p-1.5 md:p-2 flex items-center">
              <input 
                type="text" 
                placeholder="Compose your message..." 
                className="flex-1 bg-transparent border-none outline-none font-inter text-ink-primary px-4 md:px-6 placeholder:text-ink-muted/50"
              />
              <button className="bg-primary text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-transform hover:scale-105 shadow-[0_4px_12px_rgba(163,33,54,0.3)]">
                ↑
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
