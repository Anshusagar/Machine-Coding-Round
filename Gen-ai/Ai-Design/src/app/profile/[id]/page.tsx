import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Profile({ params }: { params: { id: string } }) {
  // Mock data for demonstration
  const member = {
    name: 'Eleanor',
    age: 28,
    profession: 'Art Director',
    location: 'New York City',
    bio: 'I believe in the power of visual storytelling and quiet moments. My weekends are usually spent exploring independent galleries in Chelsea or getting lost in the stacks of a vintage bookstore. I value authenticity and someone who knows how to hold a meaningful conversation over a perfectly crafted cortado.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200',
    affinities: ['Contemporary Art', 'Pour-over Coffee', 'French Cinema', 'Mid-century Design'],
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-surface-dark">
        <div className="h-[60vh] md:h-[80vh] relative w-full">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${member.imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 max-w-[1000px] mx-auto w-full transform translate-y-1/2">
            <div className="bg-surface-card border border-white/10 rounded-xl p-12 shadow-2xl backdrop-blur-sm relative z-10">
              <span className="font-inter text-gold uppercase tracking-[0.15em] text-xs font-semibold block mb-4">The Narrative</span>
              <h1 className="font-playfair text-5xl md:text-6xl font-semibold text-ink-primary mb-2">
                {member.name}, <span className="text-ink-muted">{member.age}</span>
              </h1>
              <p className="font-inter text-gold text-lg tracking-wide uppercase mb-12">{member.profession} · {member.location}</p>
              
              <div className="grid md:grid-cols-[2fr_1fr] gap-16">
                <div>
                  <h2 className="font-playfair text-2xl text-ink-primary mb-6">About</h2>
                  <p className="font-inter text-ink-muted text-lg leading-[1.8]">
                    {member.bio}
                  </p>
                </div>
                
                <div>
                  <h2 className="font-playfair text-2xl text-ink-primary mb-6">Affinities</h2>
                  <ul className="flex flex-col gap-4">
                    {member.affinities.map((affinity, i) => (
                      <li key={i} className="flex items-center gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/80"></span>
                        <span className="font-inter text-ink-primary text-base">{affinity}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-12">
                    <button className="w-full bg-primary text-white rounded-full py-4 font-inter font-medium text-base transition-all hover:bg-[#ba263e] hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(163,33,54,0.2)]">
                      Initiate Dialogue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[450px] md:h-[250px] bg-surface-dark"></div>
      </main>
      <Footer />
    </>
  );
}
