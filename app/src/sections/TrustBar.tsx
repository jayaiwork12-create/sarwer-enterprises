import { useEffect, useRef, useState } from 'react';
import { Zap, Leaf, Clock, Star } from 'lucide-react';

const stats = [
  { icon: Zap, value: 10000, suffix: '+', label: 'Installations' },
  { icon: Leaf, value: 50000, suffix: '+', label: 'Tons CO\u2082 Saved' },
  { icon: Clock, value: 15, suffix: '+', label: 'Years Experience' },
  { icon: Star, value: 4.9, suffix: '/5', label: 'Star Rating', isDecimal: true },
];

function AnimatedCounter({ target, suffix, isDecimal }: { target: number; suffix: string; isDecimal?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;

            if (isDecimal) {
              setCount(parseFloat(current.toFixed(1)));
            } else {
              setCount(Math.floor(current));
            }

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, isDecimal]);

  const display = isDecimal ? count.toFixed(1) : count.toLocaleString('en-PK');

  return (
    <span ref={ref} className="stat-number">
      {display}
      {suffix}
    </span>
  );
}

export default function TrustBar() {
  return (
    <section className="bg-cloud dark:bg-midnight/50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center section-reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <stat.icon className="w-8 h-8 text-amber mx-auto mb-4" />
              <div className="font-display text-3xl md:text-4xl font-bold text-charcoal dark:text-white mb-2">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  isDecimal={stat.isDecimal}
                />
              </div>
              <p className="text-slate text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
