# Tech Spec — Sarwer Enterprises Solar Website

## Dependencies
- `three` — WebGL engine for refraction shader effect
- `@react-three/fiber` — React renderer for Three.js
- `@react-three/drei` — R3F helpers
- `gsap` + `@gsap/react` — Scroll animations, entrance reveals, counter animations
- `@studio-freight/lenis` — Smooth scroll
- `lucide-react` — Icons (sun, building, tractor, phone, message-square, x, menu, moon, sun, star, map-pin, clock, dollar-sign, calculator, check-circle, arrow-right, zap, chevron-down)

## Component Inventory

### Layout
- **Navbar** — Glassmorphism fixed header with scroll-shrink, mobile menu overlay, theme toggle, CTA
- **MobileBottomBar** — Fixed bottom bar with Call Now / WhatsApp (mobile only)
- **PopupModal** — Consultation form overlay triggered by CTAs

### Sections
- **HeroSection** — Video background, headline, CTAs
- **TrustBar** — 4-column animated counters
- **ServicesSection** — 3-card grid with hover lifts
- **ProcessSection** — 4-step horizontal timeline on dark bg
- **CalculatorSection** — 50/50 split: text left, calculator + refraction canvas right
- **TestimonialsSection** — 3-column review cards with star ratings
- **FooterSection** — 3-column: form, contact details, payment logos + map

### Reusable Components
- **CounterCard** — Animated number counter (GSAP ScrollTrigger)
- **ServiceCard** — Card with icon, title, description, bullet list, hover lift
- **TestimonialCard** — Quote, author, star rating
- **ThemeToggle** — Sun/moon toggle with smooth transition

### Hooks
- **useLenis** — Initialize and manage Lenis smooth scroll
- **useTheme** — Dark/light mode with localStorage persistence
- **useScrollReveal** — GSAP ScrollTrigger fade-up entrance
- **useCalculator** — Savings calculator logic (system size, payback, lifetime savings)

## Animation Implementation

| Animation | Library | Implementation | Complexity |
|-----------|---------|----------------|------------|
| Refraction Glass Gallery (Core Effect) | Three.js + R3F + Custom GLSL | Two-pass render: FBO simulation shader → refraction fragment shader overlay | **High** 🔒 |
| Number Counters (Trust Bar) | GSAP + ScrollTrigger | ScrollTrigger onEnter → gsap.to tween from 0 to target over 2s | Medium |
| Section Entrance Reveals | GSAP + ScrollTrigger | Each section: opacity 0→1, y 30→0, stagger 0.1s for children | Medium |
| Hero Video Background | Native HTML5 | `<video autoPlay muted loop playsInline>` with CSS gradient overlay | Low |
| Mobile Menu Overlay | CSS transitions | Full-screen overlay, links stagger in with translateY + opacity | Low |
| Popup Modal | CSS transitions | Backdrop blur + slide-down entrance, close on backdrop/esc | Low |
| Button Hover Effects | CSS transitions | scale(1.05), box-shadow glow, fill inversion on secondary | Low |
| Navbar Scroll Shrink | CSS + scroll listener | Reduce height 80→64px, increase blur on scroll > 80px | Low |
| Theme Toggle | CSS transitions | CSS variables transition, sun↔moon icon rotate | Low |
| Service Card Hover | CSS transitions | translateY(-8px), shadow-xl, duration-300 | Low |
| Process Timeline | CSS + GSAP | Line draws on scroll, nodes scale in sequentially | Medium |
| Calculator Live Update | Vanilla JS | Input onChange → compute systemSize, payback, lifetimeSavings | Low |
| Godray Sweep (in shader) | Custom GLSL | Built into refraction fragment shader, driven by uTime | High |

## State & Logic
- **Theme**: React Context or class-based toggle on `<html>` element
- **Calculator**: Local state for bill input, computed values derived
- **Modal**: Global state (React Context or prop drilling from App) — triggered by any CTA click
- **Mobile Menu**: Local state in Navbar
- **Scroll Position**: Used for navbar shrink and video pause optimization

## Other Key Decisions
- **Calculator Logic**: System Size = bill / 3500 (1 decimal), Payback = static "~3.5 Years", Lifetime Savings = bill × 12 × 25 (comma-formatted)
- **Refraction Effect GPU Optimization**: Reduce `uDustCount` to 15 on mobile (<768px), pause hero video when scrolled past
- **Lenis Config**: `lerp: 0.1`, `duration: 1.2` for premium weighty scroll feel
- **Video**: Hero video paused/unpaused via IntersectionObserver to save GPU for shader
