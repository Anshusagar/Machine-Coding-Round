import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ArrowRight, 
  Code, 
  Layout, 
  Zap, 
  MessageSquare, 
  Clock, 
  CheckCircle,
  Menu,
  X,
  Github,
  Twitter,
  Linkedin,
  Sparkles,
  Loader
} from 'lucide-react';

/**
 * Hook for the Hero Canvas Animation (Dots & Waves)
 */
const useWaveShader = (canvasRef) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const render = () => {
      time += 0.01;
      ctx.fillStyle = '#09090b'; // Zinc-950 background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      
      const gap = 30;
      const rows = Math.ceil(canvas.height / gap);
      const cols = Math.ceil(canvas.width / gap);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * gap;
          const py = y * gap;
          
          // Wave logic based on sine/cosine
          const distanceFromCenter = Math.sqrt(
            Math.pow(x - cols/2, 2) + Math.pow(y - rows/2, 2)
          );
          
          const offset = Math.sin(distanceFromCenter * 0.1 - time * 2) * 5;
          const sizeOffset = Math.cos(x * 0.1 + time) * 1.5;

          const size = Math.max(0.5, 1.5 + sizeOffset);
          
          ctx.beginPath();
          ctx.arc(px, py + offset, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
};

/**
 * Components
 */

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-black rounded-full" />
          </div>
          Aceternity
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a href="#features" className="hover:text-white transition-colors">Approach</a>
          <a href="#about" className="hover:text-white transition-colors">Studio</a>
          <button className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-zinc-200 transition-colors">
            Book a Call
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-zinc-950 border-b border-zinc-800 p-6 flex flex-col gap-4 md:hidden">
          <a href="#work" className="text-zinc-400 hover:text-white text-lg">Work</a>
          <a href="#features" className="text-zinc-400 hover:text-white text-lg">Approach</a>
          <a href="#about" className="text-zinc-400 hover:text-white text-lg">Studio</a>
          <button className="bg-white text-black w-full py-3 rounded-lg font-bold mt-2">Book a Call</button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const canvasRef = useRef(null);
  useWaveShader(canvasRef);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
        <div className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm text-zinc-400 text-xs uppercase tracking-widest font-medium animate-fade-in-up">
          Design & Development Studio
        </div>
        <h1 className="text-5xl md:text-8xl font-medium tracking-tight text-white leading-[1.1] animate-fade-in-up animation-delay-100">
          We craft digital <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-600">
            masterpieces.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
          Aceternity bridges the gap between functional engineering and aesthetic perfection.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-8 animate-fade-in-up animation-delay-300">
          <button className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105">
            <span className="relative z-10 flex items-center gap-2">
              Start Project <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <button className="px-8 py-4 text-white font-medium hover:text-zinc-300 transition-colors">
            View Our Work
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-600 to-transparent"></div>
      </div>
    </section>
  );
};

const BentoCard = ({ title, desc, icon: Icon, size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "md:col-span-1 md:row-span-1",
    md: "md:col-span-2 md:row-span-1",
    lg: "md:col-span-2 md:row-span-2",
  };

  return (
    <div className={`${sizeClasses[size]} ${className} group relative bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 overflow-hidden hover:border-zinc-600 transition-colors duration-500`}>
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Icon className="text-zinc-500" size={24} />
      </div>
      <div className="h-full flex flex-col justify-between relative z-10">
        <div className="mb-4">
          <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-500">
            <Icon size={24} strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
        </div>
        
        {/* Abstract decorative elements based on card type */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 blur-[50px] rounded-full group-hover:bg-white/10 transition-colors duration-500" />
      </div>
    </div>
  );
};

const Features = () => (
  <section id="features" className="py-32 px-6 bg-zinc-950 border-t border-zinc-900">
    <div className="max-w-7xl mx-auto">
      <div className="mb-20 max-w-2xl">
        <h2 className="text-4xl font-bold text-white mb-6">Our Approach</h2>
        <p className="text-zinc-400 text-lg">
          We don't just build websites; we engineer systems. Our methodology ensures speed, precision, and scalability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[280px]">
        <BentoCard 
          size="md"
          title="Web Design" 
          desc="Award-winning aesthetics that align with your brand identity. Minimal, clean, and purposeful."
          icon={Layout}
          className="bg-gradient-to-br from-zinc-900 to-zinc-950"
        />
        <BentoCard 
          size="md"
          title="Web Development" 
          desc="Clean, semantic code built on the latest React and Next.js stacks. SEO optimized and accessible."
          icon={Code}
        />
        <BentoCard 
          size="sm"
          title="TDD" 
          desc="Test Driven Development ensures bulletproof reliability."
          icon={CheckCircle}
        />
        <BentoCard 
          size="sm"
          title="Lightning Fast" 
          desc="4-5 days delivery for standard landing pages."
          icon={Clock}
          className="border-white/20"
        />
        <BentoCard 
          size="md"
          title="Quick Feedback" 
          desc="Direct access to developers. No middle-management. Iterations happen in hours, not days."
          icon={MessageSquare}
        />
      </div>
    </div>
  </section>
);

const TestimonialCard = ({ name, role, quote, image }) => (
  <div className="flex-shrink-0 w-[350px] md:w-[400px] bg-zinc-900 border border-zinc-800 p-8 rounded-2xl select-none mx-4 hover:bg-zinc-800/50 transition-colors cursor-grab active:cursor-grabbing">
    <div className="flex items-center gap-4 mb-6">
      <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover border-2 border-zinc-700" />
      <div>
        <h4 className="text-white font-bold">{name}</h4>
        <p className="text-zinc-500 text-sm">{role}</p>
      </div>
    </div>
    <p className="text-zinc-300 italic leading-relaxed">"{quote}"</p>
  </div>
);

const Testimonials = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "CTO, FinTech Global",
      quote: "Aceternity didn't just build a site, they built an engine for our marketing. The speed of delivery was shocking.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
    },
    {
      name: "David Chen",
      role: "Founder, Bloom AI",
      quote: "The attention to detail in the micro-interactions is what separates them from every other agency we've worked with.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80"
    },
    {
      name: "Elena Rodriguez",
      role: "Director, ArtHouse",
      quote: "Minimalism is hard to get right. Aceternity nailed it. Our conversion rates doubled within a week.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80"
    },
    {
      name: "Marcus Johnson",
      role: "Product Lead, Sytem",
      quote: "Clean code, TDD practices, and a 4-day turnaround? I thought it was impossible until I saw the PR.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
    }
  ];

  return (
    <section className="py-32 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
        <div>
           <h2 className="text-3xl font-bold text-white mb-2">Client Voices</h2>
           <p className="text-zinc-500">Drag to explore what people are saying.</p>
        </div>
        <div className="hidden md:flex gap-2">
           <div className="w-12 h-1 bg-zinc-800 rounded-full"></div>
           <div className="w-4 h-1 bg-zinc-600 rounded-full"></div>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing px-6 pb-12 -mx-6 md:mx-0"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </section>
  );
};

const Founder = () => (
  <section className="py-32 px-6 bg-black">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <div className="relative group">
        <div className="absolute inset-0 bg-white/5 rounded-2xl transform rotate-3 transition-transform group-hover:rotate-6 duration-500"></div>
        <div className="absolute inset-0 bg-zinc-800/50 rounded-2xl transform -rotate-3 transition-transform group-hover:-rotate-6 duration-500"></div>
        <img 
          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80" 
          alt="Founder" 
          className="relative rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl w-full object-cover aspect-[4/5]"
        />
        
        {/* Micro-interaction badge */}
        <div className="absolute -bottom-6 -right-6 bg-white text-black p-6 rounded-full font-bold text-sm uppercase tracking-wider animate-spin-slow shadow-lg hidden md:block">
          <svg viewBox="0 0 100 100" width="100" height="100">
            <defs>
              <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
            </defs>
            <text fontSize="11">
              <textPath xlinkHref="#circle">
                • Founder • Designer • Developer •
              </textPath>
            </text>
          </svg>
        </div>
      </div>
      
      <div className="space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white">Meet Alex</h2>
        <div className="w-12 h-1 bg-white"></div>
        <p className="text-zinc-400 text-lg leading-relaxed">
          I started Aceternity with a simple belief: <span className="text-white font-medium">software should feel like magic.</span>
        </p>
        <p className="text-zinc-400 text-lg leading-relaxed">
          With over 10 years of experience in full-stack engineering and product design, I personally oversee every pixel and line of code that leaves our studio. We aren't a factory; we are craftsmen.
        </p>
        
        <div className="flex gap-6 pt-4">
           <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Twitter /></a>
           <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Github /></a>
           <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Linkedin /></a>
        </div>
      </div>
    </div>
  </section>
);

const VisionRefiner = () => {
  const [idea, setIdea] = useState('');
  const [blueprint, setBlueprint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateBlueprint = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    setError('');
    setBlueprint(null);

    const apiKey = ""; // System provides this
    const prompt = `You are the AI lead for Aceternity, a high-end, minimal design studio. A client has an idea: '${idea}'.
    Analyze this and generate a "Project Blueprint" with the following sections. Do not use markdown bolding, just plain text headers:
    1. Codename (Abstract one-word name)
    2. The Pitch (1-sentence high-concept)
    3. Core Features (3 bullet points)
    4. Tech Stack (Recommended modern stack)
    5. Aesthetic (1-sentence visual vibe)
    Keep the tone minimal, confident, and sophisticated. Use emojis sparingly but effectively.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );
      
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate.";
      setBlueprint(text);
    } catch (err) {
      console.error(err);
      setError("Our AI servers are currently meditating. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-32 px-6 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm mb-6">
          <Sparkles size={16} className="text-yellow-500" />
          <span>Powered by Gemini AI</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Vision Refiner</h2>
        <p className="text-zinc-400 text-lg mb-12 max-w-2xl mx-auto">
          Not ready to book? Describe your rough idea, and our AI will generate a preliminary project blueprint and tech stack recommendation.
        </p>

        <div className="relative max-w-2xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-zinc-700 to-zinc-800 rounded-2xl blur opacity-25"></div>
          <div className="relative bg-black border border-zinc-800 rounded-2xl p-2 flex flex-col md:flex-row gap-2">
            <input
              type="text"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g., 'Uber for dog walkers but with a premium aesthetic'"
              className="flex-1 bg-transparent text-white px-6 py-4 focus:outline-none placeholder:text-zinc-700 text-lg"
              onKeyDown={(e) => e.key === 'Enter' && generateBlueprint()}
            />
            <button 
              onClick={generateBlueprint}
              disabled={loading || !idea.trim()}
              className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 min-w-[160px]"
            >
              {loading ? <Loader size={20} className="animate-spin" /> : <>Generate <Sparkles size={18} /></>}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-6 text-red-400 bg-red-400/10 inline-block px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {blueprint && (
          <div className="mt-12 text-left bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 md:p-12 animate-fade-in-up">
            <div className="flex items-start gap-4 mb-8">
              <div className="p-3 bg-zinc-800 rounded-xl">
                 <Zap size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Project Blueprint</h3>
                <p className="text-zinc-500 text-sm">Generated exclusively for you</p>
              </div>
            </div>
            <div className="prose prose-invert max-w-none prose-p:text-zinc-300 prose-headings:text-white">
               <pre className="whitespace-pre-wrap font-sans text-lg leading-relaxed">{blueprint}</pre>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const CTA = () => (
  <section className="py-32 px-6 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden text-center">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>
    
    <div className="relative z-10 max-w-3xl mx-auto space-y-10">
      <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
        Ready to build the<br/>future?
      </h2>
      <p className="text-xl text-zinc-400">
        We only take on <span className="text-white font-bold underline decoration-zinc-700 underline-offset-4">3 projects</span> per month to ensure quality.
      </p>
      
      <div className="flex flex-col items-center gap-4">
        <button className="bg-white text-black px-12 py-5 rounded-full text-xl font-bold hover:bg-zinc-200 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]">
          Book Your Slot
        </button>
        <p className="text-sm text-zinc-600 mt-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          2 slots remaining for November
        </p>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 bg-black text-zinc-600 text-sm text-center border-t border-zinc-900">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
      <p>&copy; 2024 Aceternity Studio. All rights reserved.</p>
      <div className="flex gap-6 mt-4 md:mt-0">
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
        <a href="#" className="hover:text-white transition-colors">Twitter</a>
      </div>
    </div>
  </footer>
);

export default function AceternityStudio() {
  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-200 font-sans selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <Founder />
      <VisionRefiner />
      <CTA />
      <Footer />
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}