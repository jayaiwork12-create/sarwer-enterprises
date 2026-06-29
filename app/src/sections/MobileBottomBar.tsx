import { Phone, MessageCircle } from 'lucide-react';

export default function MobileBottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-midnight/95 backdrop-blur-lg border-t border-white/10">
      <div className="flex items-center gap-2 p-3">
        <a
          href="tel:+923425962073"
          className="flex-1 flex items-center justify-center gap-2 bg-amber text-midnight font-semibold py-3 px-4 rounded-xl min-h-[48px] transition-transform active:scale-95"
        >
          <Phone className="w-5 h-5" />
          Call Now
        </a>
        <a
          href="https://wa.me/923425962073"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-growth text-white font-semibold py-3 px-4 rounded-xl min-h-[48px] transition-transform active:scale-95"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp Chat
        </a>
      </div>
    </div>
  );
}
