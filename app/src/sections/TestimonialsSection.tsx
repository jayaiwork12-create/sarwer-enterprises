import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Muhammad Aslam',
    role: 'Homeowner, DI Khan Cantt',
    text: 'Sarwer Enterprises installed a 10kW system on our rooftop. Our WAPDA bill dropped from PKR 45,000 to zero! The team was professional and the installation was completed in just 3 days.',
    rating: 5,
  },
  {
    name: 'Haji Rafiq Ahmed',
    role: 'Rice Mill Owner',
    text: 'We installed a 50kW commercial system for our rice mill. The savings on diesel generator costs alone paid for the system in under 3 years. Highly recommended for any business in DI Khan.',
    rating: 5,
  },
  {
    name: 'Dr. Farhan Khan',
    role: 'Agricultural Farm Owner',
    text: 'The solar tube well system has transformed our farm operations. No more diesel costs, and we have reliable water pumping even during load-shedding. Best investment for any farmer.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-cloud dark:bg-midnight/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 section-reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-teal" />
            <span className="text-teal text-sm font-semibold uppercase tracking-[3px]">
              Testimonials
            </span>
            <div className="w-8 h-[2px] bg-teal" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal dark:text-white mb-4">
            Trusted by <span className="text-amber">Thousands</span> in DI Khan
          </h2>
          <p className="text-slate max-w-2xl mx-auto">
            Hear from our satisfied customers who have made the switch to clean,
            affordable solar energy across Dera Ismail Khan.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="bg-white dark:bg-white/5 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 section-reveal"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-amber/30 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-amber text-amber" />
                ))}
              </div>

              {/* Text */}
              <p className="text-charcoal dark:text-white/80 leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t border-gray-100 dark:border-white/10 pt-4">
                <p className="font-display font-bold text-charcoal dark:text-white">
                  {testimonial.name}
                </p>
                <p className="text-slate text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
