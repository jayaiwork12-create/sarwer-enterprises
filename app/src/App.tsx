import { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { useLenis } from './hooks/useLenis';
import Navbar from './sections/Navbar';
import HeroSection from './sections/HeroSection';
import TrustBar from './sections/TrustBar';
import ServicesSection from './sections/ServicesSection';
import ProcessSection from './sections/ProcessSection';
import CalculatorSection from './sections/CalculatorSection';
import TestimonialsSection from './sections/TestimonialsSection';
import FooterSection from './sections/FooterSection';
import MobileBottomBar from './sections/MobileBottomBar';
import PopupModal from './sections/PopupModal';

export default function App() {
  const { isDark, toggle } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  useLenis();

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.section-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
        <Navbar
          isDark={isDark}
          toggleTheme={toggle}
          onOpenModal={() => setModalOpen(true)}
        />
        <main>
          <HeroSection onOpenModal={() => setModalOpen(true)} />
          <TrustBar />
          <ServicesSection />
          <ProcessSection />
          <CalculatorSection />
          <TestimonialsSection />
        </main>
        <FooterSection onOpenModal={() => setModalOpen(true)} />
        <MobileBottomBar />
        <PopupModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </div>
  );
}
