import Link from 'next/link';

interface MemberCardProps {
  id: string;
  name: string;
  age: number;
  profession: string;
  imageUrl: string;
}

export default function MemberCard({ id, name, age, profession, imageUrl }: MemberCardProps) {
  return (
    <Link href={`/profile/${id}`} className="group relative block w-full aspect-[3/4] rounded-lg overflow-hidden border border-white/5 bg-surface-card transition-all duration-500 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] ease-in-out group-hover:scale-105"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#121414] via-[#121414]/60 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
        <h3 className="font-playfair text-2xl font-semibold text-ink-primary mb-1 flex items-baseline gap-2">
          {name}, <span className="font-inter text-lg text-ink-muted">{age}</span>
        </h3>
        <p className="font-inter text-gold text-sm tracking-wide uppercase mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{profession}</p>
        
        <div className="h-px w-0 bg-gold/50 group-hover:w-full transition-all duration-700 ease-out"></div>
      </div>
    </Link>
  );
}
