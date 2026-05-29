import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Code2, Video, Coffee, Rocket } from "lucide-react";

export default function AboutSection() {
  const [open, setOpen] = useState<number | null>(0);

  const bio = [
    {
      title: "👋 Tentang Aku",
      content:
        "Hai aku Dina Nafisah, pelajar dari MAN 1 Banda Aceh kelas X-11 ✨ Aku lagi belajar coding 💻 untuk memahami dunia teknologi dan mengembangkan skill digital aku.",
    },
    {
      title: "🌸 Kehidupan & Hobi",
      content:
        "Aku lahir di Banda Aceh pada 24 Juni 2010 🌷 Aku suka travelling ✈️, nonton film 🎬, dan menjadikannya sebagai cara untuk refreshing serta cari inspirasi.",
    },
    {
      title: "🎯 Cita-cita",
      content:
        "Aku punya cita-cita menjadi IPDN 🚀 di masa depan. Selain itu aku juga ingin terus berkembang di dunia teknologi dan kreativitas digital 💡",
    },
  ];

  const highlights = [
    { icon: Code2, label: "💻 Belajar Coding" },
    { icon: Video, label: "🎥 Content Creator" },
    { icon: Coffee, label: "☕ Penikmat Kopi" },
    { icon: Rocket, label: "🚀 Mimpi Besar" },
  ];

  return (
    <section
      id="about"
      className="py-20 md:py-32 bg-gradient-to-b from-fuchsia-50 via-pink-50 to-rose-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950"
    >
      <div className="container mx-auto px-4 max-w-6xl">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-fuchsia-500 font-semibold tracking-wide">
            ✨ About Me
          </span>

          <h2 className="text-3xl md:text-5xl font-bold mt-2 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
            Know Me Better 💖
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-6 items-center">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative group inline-block w-full max-w-sm isolate">

              {/* 🔥 GLOW */}
              <div className="absolute -inset-4 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition" />

              {/* FRAME */}
              <div className="relative rounded-3xl overflow-hidden border border-pink-200 dark:border-zinc-700 shadow-2xl">

                {/* BASE IMAGE (STATIC) */}
                <img
                  src="/fotodina2.jpg"
                  alt="Profile"
                  className="block w-full h-auto object-cover object-center"
                />

                {/* ZOOM LAYER (NO SHIFT) */}
                <img
                  src="/fotodina2.jpg"
                  alt="Profile zoom"
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-110 transition duration-500 ease-out"
                />
              </div>
            </div>
          </motion.div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-fuchsia-600 dark:text-pink-400">
              💕 Passionate Learner & Creator
            </h3>

            {/* ACCORDION */}
            <div className="space-y-2">
              {bio.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-pink-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/40 backdrop-blur"
                >
                  <button
                    onClick={() =>
                      setOpen(open === index ? null : index)
                    }
                    className="w-full flex justify-between items-center p-3 text-left hover:bg-pink-100/40 dark:hover:bg-zinc-800/50 transition"
                  >
                    <span className="font-medium">{item.title}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-pink-500 transition-transform ${
                        open === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {open === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4 text-gray-600 dark:text-gray-300"
                      >
                        {item.content}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* HIGHLIGHTS */}
            <div className="grid grid-cols-2 gap-3 pt-3">
              {highlights.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-pink-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/40 hover:shadow-lg transition"
                >
                  <item.icon className="h-5 w-5 text-pink-500 mb-2" />
                  <p className="text-sm font-medium">{item.label}</p>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}