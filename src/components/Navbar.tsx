import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [active, setActive] = useState('#home');
  const [position, setPosition] = useState({ left: 0, width: 0 });

  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isScrollingRef = useRef(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Know Me', href: '#about' },
    { label: 'Subjects', href: '#skills' },
    { label: 'Favorites', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const updatePosition = (index: number) => {
    const el = itemRefs.current[index];
    if (!el) return;

    setPosition({
      left: el.offsetLeft,
      width: el.offsetWidth,
    });
  };

  const setActiveSection = (href: string) => {
    const index = navItems.findIndex((i) => i.href === href);
    if (index === -1) return;

    setActive(href);
    updatePosition(index);
  };

  // sync capsule on active change
  useLayoutEffect(() => {
    const index = navItems.findIndex((i) => i.href === active);
    if (index !== -1) updatePosition(index);
  }, [active]);

  // ✅ FIX OBSERVER: ignore saat scroll dari klik
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return; // 🔥 IMPORTANT FIX

        let best: IntersectionObserverEntry | null = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!best || entry.intersectionRatio > best.intersectionRatio) {
              best = entry;
            }
          }
        });

        if (best?.target) {
          const id = '#' + (best.target as HTMLElement).id;
          setActiveSection(id);
        }
      },
      {
        threshold: [0.3, 0.5, 0.7],
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  // ✅ CLICK SCROLL LOCK FIX
  const scrollToSection = (href: string, index: number) => {
    const el = document.querySelector(href);
    if (!el) return;

    isScrollingRef.current = true; // LOCK ON

    setActiveSection(href);
    updatePosition(index);

    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    // unlock setelah scroll selesai
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 700);
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">

      <div className="absolute inset-0 blur-2xl opacity-30 bg-fuchsia-400/20 rounded-full pointer-events-none" />

      <div
        className={`relative flex items-center gap-2 px-3 py-2 rounded-full border backdrop-blur-xl transition ${
          isDark
            ? 'bg-neutral-900/80 border-white/10'
            : 'bg-white/80 border-black/10'
        }`}
      >

        {/* NAV */}
        <div className="relative flex items-center">

          {/* CAPSULE */}
          <motion.div
            className="absolute top-0 bottom-0 rounded-full"
            animate={{
              left: position.left,
              width: position.width,
            }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 28,
            }}
          >
            <div
              className={`w-full h-full rounded-full ${
                isDark ? 'bg-fuchsia-500/20' : 'bg-rose-200/50'
              } shadow-[0_0_20px_rgba(217,70,239,0.35)]`}
            />
          </motion.div>

          {navItems.map((item, index) => (
            <button
              key={item.href}
              ref={(el) => (itemRefs.current[index] = el)}
              onClick={() => scrollToSection(item.href, index)}
              className={`relative px-3 py-1.5 text-sm font-medium transition ${
                active === item.href
                  ? 'text-fuchsia-400'
                  : isDark
                  ? 'text-white/70'
                  : 'text-black/70'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* divider */}
        <div className={`w-px h-4 mx-1 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />

        {/* toggle */}
        <button onClick={toggleTheme} className="p-1.5 rounded-full">
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <Sun className="w-4 h-4 text-fuchsia-300" />
              </motion.div>
            ) : (
              <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Moon className="w-4 h-4 text-fuchsia-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

      </div>
    </div>
  );
}