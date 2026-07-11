import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MemberCard from '@/components/MemberCard';

export default function Discover() {
  const MOCK_MEMBERS = [
    {
      id: '1',
      name: 'Eleanor',
      age: 28,
      profession: 'Art Director',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '2',
      name: 'Julian',
      age: 32,
      profession: 'Architect',
      imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '3',
      name: 'Sophia',
      age: 29,
      profession: 'Curator',
      imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '4',
      name: 'Marcus',
      age: 34,
      profession: 'Financier',
      imageUrl: 'https://images.unsplash.com/photo-1480429370139-e01abe113bc0?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-16 px-8 max-w-[1400px] mx-auto">
        <header className="mb-16 text-center md:text-left mt-8">
          <h1 className="font-playfair text-gold text-4xl md:text-5xl font-semibold mb-4">The Collection</h1>
          <p className="font-inter text-ink-muted text-lg max-w-[600px]">A curated selection of our newest members. Take your time, discover their stories.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_MEMBERS.map(member => (
            <MemberCard key={member.id} {...member} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
