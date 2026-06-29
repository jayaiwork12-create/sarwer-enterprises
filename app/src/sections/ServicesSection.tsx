import { Home, Building2, Tractor, CheckCircle } from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Residential Solar',
    description:
      'Custom solar systems designed for homes from 5 Marla to 2 Kanal. Eliminate WAPDA bills and enjoy 25 years of free electricity.',
    image: '/images/service-residential.jpg',
    features: [
      '5 Marla to 2 Kanal setups',
      'Net metering enabled',
      '25-year panel warranty',
      'Zero load-shedding backup',
    ],
  },
  {
    icon: Building2,
    title: 'Commercial Solar',
    description:
      'Industrial-grade solar solutions for rice mills, cold storage, hospitals, and commercial plazas across DI Khan.',
    image: '/images/service-commercial.jpg',
    features: [
      'Rice mills & cold storage',
      'Hospitals & schools',
      'Shopping plazas',
      '3-phase industrial inverters',
    ],
  },
  {
    icon: Tractor,
    title: 'Agricultural Solar',
    description:
      'Solar-powered tube wells and irrigation systems. Reduce diesel costs and increase farm productivity year-round.',
    image: '/images/service-agri.jpg',
    features: [
      'Solar tube wells',
      'Drip irrigation systems',
      'Battery backup for night pumping',
      'Govt subsidy assistance',
    ],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28 bg-white dark:bg-midnight">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 section-reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-teal" />
            <span className="text-teal text-sm font-semibold uppercase tracking-[3px]">
              Our Services
            </span>
            <div className="w-8 h-[2px] bg-teal" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal dark:text-white mb-4">
            Solar Solutions for <span className="text-amber">Every Need</span>
          </h2>
          <p className="text-slate max-w-2xl mx-auto">
            From residential rooftops to large-scale commercial installations, we deliver
            premium solar systems tailored to DI Khan&apos;s unique energy landscape.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="group bg-cloud dark:bg-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover section-reveal"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-amber rounded-xl flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-midnight" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-charcoal dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-slate text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-charcoal dark:text-white/80">
                      <CheckCircle className="w-4 h-4 text-teal flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
