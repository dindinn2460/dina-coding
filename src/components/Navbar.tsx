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
  const targetRef = useRef<string | null>(null);

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

  useLayoutEffect(() => {
    const index = navItems.findIndex((i) => i.href === active);
    if (index !== -1) updatePosition(index);
  }, [active]);

  useEffect(() => {
    const handleResize = () => {
      const index = navItems.findIndex((i) => i.href === active);
      if (index !== -1) updatePosition(index);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [active]);

  // Intersection Observer
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navItems.forEach((item, index) => {
      const section = document.querySelector(item.href);
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];

          if (!entry.isIntersecting) return;

          if (targetRef.current && targetRef.current !== item.href) return;

          setActive(item.href);
          updatePosition(index);

          if (targetRef.current === item.href) {
            targetRef.current = null;
          }
        },
        {
          threshold: 0.6,
          rootMargin: '0px 0px -10% 0px',
        }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = (href: string, index: number) => {
    const el = document.querySelector(href);
    if (!el) return;

    targetRef.current = href;
    setActive(href);
    updatePosition(index);

    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">

      {/* SOFT NEON GLOW */}
      <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-fuchsia-400/30 via-pink-300/20 to-rose-400/30 rounded-full pointer-events-none" />

      <div
        className={`
          relative flex items-center gap-2 px-3 py-2
          rounded-full backdrop-blur-xl border
          transition-all duration-500 ease-out shadow-xl
          ${
            isDark
              ? 'bg-fuchsia-500/10 border-fuchsia-300/20'
              : 'bg-white/80 border-rose-300/40'
          }
        `}
      >

        {/* NAV */}
        <div className="relative flex items-center">

          {/* ACTIVE CAPSULE */}
          <motion.div
            className="absolute top-0 bottom-0 rounded-full"
            animate={{
              left: position.left,
              width: position.width,
              opacity: 1,
              scale: 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 180,
              damping: 25,
              mass: 0.8,
            }}
          >
            <div
              className={`
                w-full h-full rounded-full
                ${isDark ? 'bg-fuchsia-400/20' : 'bg-rose-300/40'}
                shadow-[0_0_12px_rgba(217,70,239,0.35),0_0_25px_rgba(217,70,239,0.25),0_0_45px_rgba(217,70,239,0.2),inset_0_0_8px_rgba(255,255,255,0.25)]
                transition-all duration-500
              `}
            />
          </motion.div>

          {navItems.map((item, index) => (
            <button
              key={item.href}
              ref={(el) => (itemRefs.current[index] = el)}
              onClick={() => scrollToSection(item.href, index)}
              className={`
                relative px-3 py-1.5 text-sm font-medium
                transition-all duration-500 ease-out
                ${
                  active === item.href
                    ? 'text-fuchsia-400 dark:text-fuchsia-300 font-semibold scale-105'
                    : isDark
                      ? 'text-white/70 hover:text-white hover:scale-105'
                      : 'text-black/70 hover:text-black hover:scale-105'
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* divider */}
        <div
          className={`w-px h-4 mx-1 transition-all duration-500 ${
            isDark ? 'bg-fuchsia-300/20' : 'bg-rose-300/40'
          }`}
        />

        {/* theme toggle */}
        <button
          onClick={toggleTheme}
          className={`
            p-1.5 rounded-full transition-all duration-500
            ${isDark ? 'hover:bg-fuchsia-300/10' : 'hover:bg-rose-200/40'}
          `}
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <Sun className="w-4 h-4 text-fuchsia-200" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <Moon className="w-4 h-4 text-fuchsia-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

      </div>
    </div>
  );
}