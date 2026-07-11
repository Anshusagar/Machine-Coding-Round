import Link from 'next/link';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,34,34,0.4)_0%,#161616_80%)] z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#161616]/20 to-surface-dark"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-[800px] flex flex-col items-center gap-8 mt-20">
        <span className="font-inter text-gold uppercase tracking-[0.15em] text-xs font-semibold">An Exclusive Enclave</span>
        <h1 className="font-playfair text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.1] text-ink-primary m-0">Where Intimacy Meets Elegance.</h1>
        <p className="font-inter text-lg leading-[1.6] text-ink-muted max-w-[600px] mx-auto m-0">
          A highly curated community for discerning individuals seeking meaningful connections in a secure, elevated environment.
        </p>
        <Link href="/apply" className="mt-2 bg-primary text-white rounded-full px-12 py-4 font-inter font-medium text-base transition-all inline-block hover:bg-[#ba263e] hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(163,33,54,0.2)]">
          Apply to Join
        </Link>
      </div>
    </section>
  );
}
