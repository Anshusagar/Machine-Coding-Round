import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-16 px-8 bg-[#111111]">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:text-left text-center">
        <div className="font-playfair text-3xl font-semibold text-gold">Velvet</div>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="#privacy" className="font-inter text-xs font-semibold uppercase tracking-[0.05em] text-ink-muted transition-colors hover:text-ink-primary">Privacy Policy</Link>
          <Link href="#terms" className="font-inter text-xs font-semibold uppercase tracking-[0.05em] text-ink-muted transition-colors hover:text-ink-primary">Terms of Service</Link>
          <Link href="#cookie" className="font-inter text-xs font-semibold uppercase tracking-[0.05em] text-ink-muted transition-colors hover:text-ink-primary">Cookie Policy</Link>
          <Link href="#safety" className="font-inter text-xs font-semibold uppercase tracking-[0.05em] text-ink-muted transition-colors hover:text-ink-primary">Safety Guidelines</Link>
        </div>
        <div className="font-inter text-xs uppercase tracking-[0.05em] text-ink-muted">
          © {new Date().getFullYear()} Velvet Dating. Intimacy By Design.
        </div>
      </div>
    </footer>
  );
}
