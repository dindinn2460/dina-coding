import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowDown, Github, Youtube, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ThreeScene from './ThreeScene';

export default function HeroSection() {
  const [isHover, setIsHover] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-120, 120], [15, -15]);
  const rotateY = useTransform(x, [-120, 120], [-15, 15]);

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
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >

      {/* 🌌 BACKGROUND OVERKILL */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-50 via-pink-50 to-rose-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950" />

        <div className="absolute w-[500px] h-[500px] bg-fuchsia-400/30 blur-[160px] top-[-120px] left-[-120px] animate-pulse" />
        <div className="absolute w-[450px] h-[450px] bg-pink-400/30 blur-[160px] bottom-[-140px] right-[-120px] animate-pulse" />
        <div className="absolute w-[350px] h-[350px] bg-purple-400/20 blur-[140px] top-[40%] left-[50%] animate-pulse" />
      </div>

      <ThreeScene />

      <div className="container mx-auto px-6 relative z-10 flex justify-center">
        <div className="flex flex-col md:flex-row items-center gap-14 max-w-5xl">

          {/* 💎 FLOATING PHOTO ULTRA PREMIUM */}
          <motion.div
            style={{ rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            className="relative group"
          >

            {/* aura layer */}
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 opacity-40 rounded-[2.5rem] group-hover:opacity-70 transition" />

            {/* floating animation */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-[220px] md:w-[270px] lg:w-[300px] aspect-[3/4]"
            >

              {/* neon frame */}
              <div className="absolute inset-0 rounded-[2.5rem] p-[2px] bg-gradient-to-br from-fuchsia-400 via-pink-400 to-rose-400">
                <div className="w-full h-full rounded-[2.5rem] bg-black/20 backdrop-blur-xl" />
              </div>

              {/* image */}
              <img
                src="/fotodina1.jpg"
                className="relative z-10 w-full h-full object-cover rounded-[2.5rem] shadow-2xl group-hover:scale-105 transition duration-500"
              />
            </motion.div>
          </motion.div>

          {/* ✨ TEXT ULTRA CLEAN PREMIUM */}
          <div className="text-center md:text-left max-w-lg space-y-6">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-500/10 text-fuchsia-500 border border-fuchsia-300/20"
            >
              <Sparkles className="w-4 h-4" />
              Student Developer Mode
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-extrabold leading-tight text-black dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Halo 👋 aku{' '}
              <span className="bg-gradient-to-r from-fuchsia-400 via-pink-300 to-rose-400 bg-clip-text text-transparent">
                Dina Nafisah
              </span>
              <span className="text-fuchsia-400"> ✨</span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-black/70 dark:text-white/70 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Anak sekolah yang lagi “naik level” di dunia coding 💻🚀  
              masih belajar, tapi progress jalan terus.
            </motion.p>

            {/* BUTTONS */}
            <div className="flex gap-4 flex-wrap justify-center md:justify-start">

              <Button
                onClick={() => scrollTo('#projects')}
                className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-8 rounded-full shadow-lg hover:shadow-fuchsia-500/40 transition"
              >
                Explore 🚀
              </Button>

              <Button
                onClick={() => scrollTo('#contact')}
                variant="outline"
                className="border-fuchsia-400 text-fuchsia-500 px-8 rounded-full hover:scale-105 transition"
              >
                Contact 💌
              </Button>

            </div>

            {/* SOCIAL GLOW */}
            <div className="flex gap-4 mt-6 justify-center md:justify-start">

              {[
                { icon: Github, href: 'https://github.com/dindinn2460/dina-coding.git' },
                { icon: Youtube, href: 'https://www.youtube.com/' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-fuchsia-400 hover:shadow-[0_0_30px_rgba(217,70,239,0.6)] transition"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <ArrowDown className="text-fuchsia-500" />
      </button>
    </section>
  );
}