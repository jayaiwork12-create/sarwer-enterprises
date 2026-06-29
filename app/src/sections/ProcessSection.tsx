import { ClipboardCheck, PenTool, Wrench, Activity } from 'lucide-react';

const steps = [
  {
    icon: ClipboardCheck,
    title: 'Site Assessment',
    description: 'Our engineers visit your property to evaluate roof space, sun exposure, and energy needs.',
  },
  {
    icon: PenTool,
    title: 'Custom Design',
    description: 'We create a tailored solar system design optimized for your specific requirements and budget.',
  },
  {
    icon: Wrench,
    title: 'Expert Installation',
    description: 'Certified technicians install your system with premium components and full safety compliance.',
  },
  {
    icon: Activity,
    title: '24/7 Monitoring',
    description: 'Real-time energy monitoring and maintenance support to ensure peak performance year-round.',
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-20 md:py-28 bg-midnight">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 section-reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-teal" />
            <span className="text-teal text-sm font-semibold uppercase tracking-[3px]">
              How It Works
            </span>
            <div className="w-8 h-[2px] bg-teal" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Your Path to <span className="text-amber">Solar Freedom</span>
          </h2>
          <p className="text-slate max-w-2xl mx-auto">
            From initial assessment to lifetime monitoring, we handle every step of your
            solar journey with precision and care.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-[2px]">
            <div className="w-full h-full bg-gradient-to-r from-teal via-amber to-teal" />
          </div>

          <div className="grid md:grid-cols-4 gap-8 md:gap-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative text-center section-reveal"
                style={{ transitionDelay: `${i * 0.2}s` }}
              >
                {/* Icon */}
                <div className="relative z-10 w-16 h-16 mx-auto mb-6 bg-midnight border-2 border-teal rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <step.icon className="w-7 h-7 text-amber" />
                </div>

                {/* Step Number */}
                <div className="text-amber font-display font-bold text-sm mb-2">
                  Step {i + 1}
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-slate text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
