import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowDown, Github, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ThreeScene from './ThreeScene';

export default function HeroSection() {
  const [isHover, setIsHover] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-24"
    >

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-50 via-pink-50 to-rose-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950" />

        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-fuchsia-400/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-120px] right-[-100px] w-[350px] h-[350px] bg-pink-400/20 blur-[120px] rounded-full animate-pulse" />
      </div>

      <ThreeScene />

      <div className="container mx-auto px-6 relative z-10 flex justify-center">
        <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl">

          {/* FOTO */}
          <motion.div
            style={{ rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            className="relative"
          >
            <div className="absolute inset-0 blur-3xl bg-fuchsia-500/30 opacity-40 rounded-2xl" />

            <div className="relative w-[260px] md:w-[320px] lg:w-[360px] aspect-[3/4]">
              <img
                src="/fotodina1.jpg"
                alt="Profile"
                className="w-full h-full object-cover rounded-[2rem] border border-fuchsia-300/20 shadow-2xl"
              />
            </div>
          </motion.div>

          {/* TEXT */}
          <div className="text-center md:text-left max-w-lg">

            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-2 rounded-full mb-5 bg-fuchsia-500/10 text-fuchsia-500 dark:text-fuchsia-300 border border-fuchsia-300/20"
            >
              👋 Welcome 🌸
            </motion.span>

            <motion.h1
              className="text-4xl md:text-6xl font-bold leading-tight mb-5 text-black dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Hello, I’m{' '}
              <span className="bg-gradient-to-r from-fuchsia-400 via-pink-300 to-rose-400 bg-clip-text text-transparent">
                Dina Nafisah ✨
              </span>
            </motion.h1>

            <motion.p
              className="text-lg mb-6 text-black/70 dark:text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Aku masih pelajar yang lagi belajar ngoding 💻✨
              khususnya <span className="text-fuchsia-500">web development</span> 🚀
            </motion.p>

            {/* BUTTON FIX */}
            <div className="flex gap-4 flex-wrap justify-center md:justify-start">

              <Button
                onClick={() => scrollTo('#projects')}
                className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-8 rounded-full"
              >
                Movies 🚀
              </Button>

              <Button
                onClick={() => scrollTo('#contact')}
                variant="outline"
                className="border-fuchsia-400 text-fuchsia-500 dark:text-fuchsia-300 rounded-full px-8"
              >
                Call Me 💌
              </Button>

            </div>

            {/* SOCIAL */}
            <div className="flex gap-4 mt-6 justify-center md:justify-start">
              {[
                { icon: Github, href: 'https://github.com/dindinn2460/dina-coding.git' },
                { icon: Youtube, href: 'https://www.youtube.com/' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-fuchsia-400 hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] transition"
                  whileHover={{ scale: 1.15, y: -3 }}
                >
                  <social.icon className="h-5 w-5 text-black dark:text-white" />
                </motion.a>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* SCROLL */}
      <button
        onClick={() => scrollTo('#about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="text-fuchsia-500" />
      </button>
    </section>
  );
}