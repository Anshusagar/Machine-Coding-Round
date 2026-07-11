import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Society from '@/components/Society';
import Journey from '@/components/Journey';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Society />
        <Journey />
      </main>
      <Footer />
    </>
  );
}
