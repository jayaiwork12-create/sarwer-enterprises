  import { MapPin, Clock, Phone, Mail } from 'lucide-react';

interface FooterSectionProps {
  onOpenModal: () => void;
}

export default function FooterSection({ onOpenModal }: FooterSectionProps) {


  return (
    <footer className="bg-midnight pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Column 1 - Contact Form */}
<div className="section-reveal">
  <h3 className="font-display text-4xl font-bold text-white leading-tight mb-6">
     Your Trusted <span className="text-amber">Solar Energy Partner.</span>
  </h3>

  <p className="text-white/70 text-lg leading-8 max-w-md mb-6">
    Every solar installation is more than just panels—it's a long-term investment in lower electricity bills, energy independence, and a sustainable future.
  </p>

  <p className="text-white/50 leading-7 max-w-md">
    At Sarwer Enterprises, we combine premium products, expert installation, and trusted support to deliver solar solutions that are built to last for homes, businesses, farms, and industries.
  </p>
</div>

          {/* Column 2 - Contact Details */}
          <div className="section-reveal" style={{ transitionDelay: '0.15s' }}>
            <h3 className="font-display text-2xl font-bold text-white mb-6">
              Contact <span className="text-amber">Us</span>
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-amber" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Office Address</p>
                  <p className="text-white/60 text-sm">
                    Opposite District Food Control Office,<br />
                    Dera Ismail Khan, KPK, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-amber" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Business Hours</p>
                  <p className="text-white/60 text-sm">
                    Monday - Saturday: 9:00 AM - 6:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-amber" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Phone / WhatsApp</p>
                  <a
                    href="tel:+923425962073"
                    className="text-white/60 text-sm hover:text-amber transition-colors"
                  >
                    +92 342 5962073
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-amber" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Email</p>
                  <p className="text-white/60 text-sm">info@sarwerenterprises.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3 - Payment & Map */}
          <div className="section-reveal" style={{ transitionDelay: '0.3s' }}>
            <h3 className="font-display text-2xl font-bold text-white mb-6">
              Payment <span className="text-amber">Options</span>
            </h3>

            {/* Payment Methods */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:border-amber/30 transition-colors">
                <div className="text-2xl mb-1">&#128176;</div>
                <p className="text-white/60 text-xs font-medium">Cash</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:border-amber/30 transition-colors">
                <div className="text-2xl mb-1">&#128242;</div>
                <p className="text-white/60 text-xs font-medium">JazzCash</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:border-amber/30 transition-colors">
                <div className="text-2xl mb-1">&#128241;</div>
                <p className="text-white/60 text-xs font-medium">Easypaisa</p>
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-xl overflow-hidden border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3394.0!2d70.9000!3d31.8167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDQ5JzAwLjEiTiA3MMKwNTQnMDAuMCJF!5e0!3m2!1sen!2s!4v1"
                width="100%"
                height="200"
                style={{ border: 0, filter: 'grayscale(30%) brightness(0.8)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sarwer Enterprises Location"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Sarwer Enterprises. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="tel:+923425962073"
              className="text-white/60 text-sm hover:text-amber transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              +92 342 5962073
            </a>
            <button
              onClick={onOpenModal}
              className="text-amber text-sm font-semibold hover:underline"
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
