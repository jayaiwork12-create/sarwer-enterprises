import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  onOpenModal: () => void;
}

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'Testimonials', href: '#testimonials' },
];

export default function Navbar({ isDark, toggleTheme, onOpenModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? isDark
              ? 'bg-midnight/90 backdrop-blur-xl border-b border-white/10'
              : 'glass-nav-light shadow-lg'
            : 'bg-transparent'
        }`}
        style={{ height: scrolled ? 64 : 80 }}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className={`font-display font-bold text-xl tracking-tight transition-colors ${
              scrolled || isDark ? 'text-white' : 'text-white'
            }`}
            style={{ color: scrolled ? undefined : '#FFFFFF' }}
          >
            <span className="text-amber">SARWER</span> ENTERPRISES
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-sm font-medium transition-colors hover:text-amber ${
                  scrolled || isDark ? 'text-white/80' : 'text-white/80'
                }`}
                style={{ color: scrolled ? undefined : 'rgba(255,255,255,0.8)' }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full transition-colors hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber" />
              ) : (
                <Moon className="w-5 h-5 text-white" />
              )}
            </button>
            <button
              onClick={onOpenModal}
              className="btn-primary text-sm py-3 px-6"
            >
              Get Free Quote
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-midnight/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-2xl font-display font-medium text-white hover:text-amber transition-colors"
              style={{
                animationDelay: `${i * 0.1}s`,
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.4s ease ${i * 0.1}s`,
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenModal();
            }}
            className="btn-primary mt-4"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.4s ease 0.4s',
            }}
          >
            Get Free Quote
          </button>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 text-white/60 hover:text-amber transition-colors mt-4"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transition: 'opacity 0.4s ease 0.5s',
            }}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </>
  );
}
