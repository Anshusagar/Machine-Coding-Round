import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between px-4 md:px-32 py-8 max-w-[1400px] mx-auto absolute top-0 left-0 right-0 z-50 font-inter">
      <Link href="/" className="font-playfair text-4xl font-semibold text-gold tracking-wide">
        Velvet
      </Link>
      <ul className="hidden md:flex gap-16 list-none m-0 p-0">
        <li>
          <Link href="/discover" className="font-medium text-sm text-ink-primary transition-colors hover:text-gold hover:drop-shadow-[0_0_8px_rgba(212,178,84,0.2)] tracking-wide relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-px after:bg-ink-primary after:opacity-0 hover:after:opacity-100 after:transition-opacity">
            Discover
          </Link>
        </li>
        <li>
          <Link href="/profile/1" className="font-medium text-sm text-ink-primary transition-colors hover:text-gold hover:drop-shadow-[0_0_8px_rgba(212,178,84,0.2)] tracking-wide relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-px after:bg-ink-primary after:opacity-0 hover:after:opacity-100 after:transition-opacity">
            Narrative
          </Link>
        </li>
        <li>
          <Link href="/messages" className="font-medium text-sm text-ink-primary transition-colors hover:text-gold hover:drop-shadow-[0_0_8px_rgba(212,178,84,0.2)] tracking-wide relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-px after:bg-ink-primary after:opacity-0 hover:after:opacity-100 after:transition-opacity">
            Dialogue
          </Link>
        </li>
      </ul>
      <div>
        <Link href="/messages" className="text-gold border border-gold/30 rounded-full px-7 py-2.5 font-medium text-sm transition-all tracking-wide hover:bg-gold/10 hover:border-gold hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(212,178,84,0.1)] inline-block">
          Sign In
        </Link>
      </div>
    </nav>
  );
}
