import { useEffect, useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';

interface HeroSectionProps {
  onOpenModal: () => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const scrollToCalculator = () => {
    document.querySelector('#calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] flex items-end md:items-center overflow-hidden"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/service-residential.jpg"
      >
        <source src="/videos/hero-solar-night-sky.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, #0B1D2E 0%, rgba(11,29,46,0.5) 50%, rgba(11,29,46,0.3) 100%)',
        }}
      />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,166,35,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,166,35,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 md:pb-0 md:pt-32 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-teal" />
            <span className="text-teal text-sm font-semibold uppercase tracking-[3px]">
              AEDB Certified &bull; 15+ Years
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight mb-6">
            DI Khan&apos;s{' '}
            <span className="text-amber">Premium</span>{' '}
            Solar Partner
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-xl">
            Reduce your electricity bills by up to{' '}
            <span className="text-amber font-semibold">65%</span> with tailored
            solar solutions for homes, farms, and industries across DI Khan.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={onOpenModal} className="btn-primary group">
              Get Free Quote
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button onClick={scrollToCalculator} className="btn-secondary group">
              <Play className="mr-2 w-5 h-5" />
              Calculate Savings
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
