import { motion } from 'framer-motion';
import { Github, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/dindinn2460/dina-coding.git',
      label: 'GitHub',
    },
    {
      icon: Youtube,
      href: 'https://www.youtube.com/',
      label: 'YouTube',
    },
  ];

  return (
    <footer
      className="
        relative py-10
        bg-gradient-to-b from-fuchsia-50 via-pink-50 to-rose-50
        dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950
        border-t border-pink-200/40 dark:border-zinc-800
        overflow-hidden
      "
    >
      {/* glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[300px] h-[300px] bg-fuchsia-400/20 blur-[120px] bottom-[-120px] left-[-80px]" />
        <div className="absolute w-[300px] h-[300px] bg-pink-400/20 blur-[120px] top-[-120px] right-[-80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              © {currentYear} • Dibuat dengan{' '}
              <span className="text-pink-500 font-semibold">💖 semangat belajar</span>
            </p>

            {/* SIGNATURE */}
            <p className="text-xs mt-2 text-zinc-500">
              ✨ by <span className="text-pink-500 font-medium">Dina Nafisah</span>
            </p>
          </motion.div>

          {/* SOCIAL */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group p-3 rounded-full
                  bg-white/60 dark:bg-zinc-900/40
                  backdrop-blur-xl
                  border border-pink-200/40 dark:border-zinc-700
                  hover:shadow-lg hover:-translate-y-1
                  transition
                "
              >
                <social.icon className="h-5 w-5 text-zinc-700 dark:text-zinc-200 group-hover:text-pink-500 transition" />
              </a>
            ))}
          </motion.div>

        </div>

        {/* bottom line */}
        <div className="mt-6 text-center">
          <span className="text-xs text-zinc-400">
            Built with Chat GPT • Gemini • and a little bit of pink energy 🌸
          </span>
        </div>

      </div>
    </footer>
  );
}