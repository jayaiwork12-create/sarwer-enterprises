import { useState, useEffect } from 'react';
import { X, Send, CheckCircle, Phone, User, MessageSquare } from 'lucide-react';

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PopupModal({ isOpen, onClose }: PopupModalProps) {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.name || !formData.phone) return;

  const phoneNumber = "923425962073";

  const message = `🌞 *New Solar Consultation Request*

👤 *Name:* ${formData.name}

📞 *Phone:* ${formData.phone}

💬 *Message:* ${formData.message || "No message provided"}

— Sent from Sarwer Enterprises Website`;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank");

  setFormData({
    name: "",
    phone: "",
    message: "",
  });

  onClose();
};

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-midnight/60 backdrop-blur-md animate-fade-in" />

      {/* Modal Card */}
      <div className="relative bg-white dark:bg-midnight rounded-2xl shadow-2xl w-full max-w-lg animate-slide-up overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-cloud dark:bg-white/10 rounded-full flex items-center justify-center hover:bg-amber hover:text-midnight transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-midnight to-[#0f2d3a] p-8 pb-6">
          <h3 className="font-display text-2xl font-bold text-white mb-2">
            Free Solar <span className="text-amber">Consultation</span>
          </h3>
          <p className="text-white/60 text-sm">
            Fill in your details and our team will contact you within 24 hours.
          </p>
        </div>

        {/* Body */}
        <div className="p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-growth/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-growth" />
              </div>
              <h4 className="font-display text-xl font-bold text-charcoal dark:text-white mb-2">
                Thank You!
              </h4>
              <p className="text-slate">
                We have received your request and will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-cloud dark:bg-white/5 border-2 border-transparent rounded-xl text-charcoal dark:text-white placeholder:text-slate/50 focus:outline-none focus:border-amber transition-colors"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
                <input
                  type="tel"
                  placeholder="Phone / WhatsApp Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-cloud dark:bg-white/5 border-2 border-transparent rounded-xl text-charcoal dark:text-white placeholder:text-slate/50 focus:outline-none focus:border-amber transition-colors"
                />
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate" />
                <textarea
                  placeholder="Tell us about your energy needs (Optional)"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full pl-12 pr-4 py-4 bg-cloud dark:bg-white/5 border-2 border-transparent rounded-xl text-charcoal dark:text-white placeholder:text-slate/50 focus:outline-none focus:border-amber transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-4"
              >
                <Send className="w-4 h-4 mr-2" />
                Request Free Consultation
              </button>

              <p className="text-center text-slate text-xs">
                Or call us directly:{' '}
                <a
                  href="tel:+923425962073"
                  className="text-amber font-semibold hover:underline"
                >
                  +92 342 5962073
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
