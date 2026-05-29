import { motion } from 'framer-motion';

const subjects = {
  science: [
    { name: '📘 Matematika', level: 90 },
    { name: '🔬 Fisika', level: 85 },
    { name: '🧪 Kimia', level: 80 },
    { name: '🌱 Biologi', level: 88 },
    { name: '🌍 Geografi', level: 82 },
  ],
  language: [
    { name: '📖 Bahasa Indonesia', level: 95 },
    { name: '🗣️ Bahasa Inggris', level: 90 },
    { name: '📚 Sastra', level: 78 },
    { name: '🌏 Bahasa Arab', level: 75 },
    { name: '📝 Literasi', level: 92 },
  ],
  social: [
    { name: '🏛️ Sejarah', level: 88 },
    { name: '💰 Ekonomi', level: 85 },
    { name: '⚖️ PPKn', level: 90 },
    { name: '🧭 Sosiologi', level: 80 },
    { name: '🌐 IPS Terpadu', level: 83 },
  ],
};

function ProgressBar({
  name,
  level,
  delay,
}: {
  name: string;
  level: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
          {name}
        </span>

        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {level}%
        </span>
      </div>

      <div className="h-2 bg-zinc-200/60 dark:bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.1 }}
          className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500"
        />
      </div>
    </motion.div>
  );
}

function Card({
  title,
  color,
  children,
  delay,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="
        p-6 rounded-2xl
        bg-white/70 dark:bg-zinc-900/40
        backdrop-blur-xl
        border border-zinc-200/60 dark:border-zinc-700
        shadow-sm hover:shadow-md
        transition
      "
    >
      <h3 className={`text-lg font-semibold mb-5 ${color}`}>
        {title}
      </h3>

      <div className="space-y-4">
        {children}
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="
        py-20 md:py-32
        bg-gradient-to-b
        from-fuchsia-50/60 via-pink-50/40 to-rose-50/60
        dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950
      "
    >
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-fuchsia-500 text-sm font-medium">
            🎓 Mata Pelajaran
          </span>

          <h2 className="text-3xl md:text-5xl font-bold mt-2 text-zinc-900 dark:text-white">
            Favourite Subjects 📚✨
          </h2>

          <div className="w-20 h-[2px] bg-fuchsia-500 mx-auto mt-3 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          <Card title="🔬 Sains & Alam" color="text-fuchsia-600" delay={0}>
            {subjects.science.map((s, i) => (
              <ProgressBar key={s.name} {...s} delay={i * 0.08} />
            ))}
          </Card>

          <Card title="📖 Bahasa & Komunikasi" color="text-pink-500" delay={0.05}>
            {subjects.language.map((s, i) => (
              <ProgressBar key={s.name} {...s} delay={i * 0.08} />
            ))}
          </Card>

          <Card title="🌍 Sosial & Kehidupan" color="text-rose-500" delay={0.1}>
            {subjects.social.map((s, i) => (
              <ProgressBar key={s.name} {...s} delay={i * 0.08} />
            ))}
          </Card>

        </div>
      </div>
    </section>
  );
}