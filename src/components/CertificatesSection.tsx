import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const certificates = [
  {
    title: '📚 Partisipasi Kegiatan Literasi Sekolah',
    issuer: 'Sekolah / Perpustakaan',
    date: '2025',
    credentialId: 'SCH-LIT-001',
    image: '📚',
    color: 'from-fuchsia-500 via-pink-500 to-rose-500',
    link: '#',
  },
  {
    title: '🎤 Kegiatan Presentasi Kelas',
    issuer: 'Mapel Bahasa Indonesia',
    date: '2025',
    credentialId: 'SCH-PRES-002',
    image: '🎤',
    color: 'from-pink-400 via-rose-400 to-fuchsia-400',
    link: '#',
  },
  {
    title: '🌍 Tugas Proyek Geografi',
    issuer: 'Mapel Geografi',
    date: '2024',
    credentialId: 'SCH-GEO-003',
    image: '🌍',
    color: 'from-rose-400 via-pink-400 to-fuchsia-500',
    link: '#',
  },
  {
    title: '🎨 Kegiatan Seni & Kreativitas Sekolah',
    issuer: 'Ekstrakurikuler Seni',
    date: '2024',
    credentialId: 'SCH-ART-004',
    image: '🎨',
    color: 'from-fuchsia-400 via-pink-400 to-rose-400',
    link: '#',
  },
  {
    title: '🏃 Kegiatan Olahraga & Kebugaran',
    issuer: 'PJOK Sekolah',
    date: '2024',
    credentialId: 'SCH-SPORT-005',
    image: '🏃',
    color: 'from-pink-500 via-rose-500 to-fuchsia-500',
    link: '#',
  },
  {
    title: '🤝 Kegiatan Gotong Royong Sekolah',
    issuer: 'Lingkungan Sekolah',
    date: '2023',
    credentialId: 'SCH-SOCIAL-006',
    image: '🤝',
    color: 'from-rose-300 via-pink-300 to-fuchsia-300',
    link: '#',
  },
];

export default function CertificatesSection() {
  return (
    <section
      id="certificates"
      className="
        py-20 md:py-32
        bg-gradient-to-b
        from-fuchsia-50 via-pink-50 to-rose-50
        dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950
      "
    >
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-fuchsia-500 font-medium">
            🎓 Aktivitas Sekolah
          </span>

          <h2 className="text-3xl md:text-5xl font-bold mt-2">
            <span className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
              Pengalaman & Kegiatan
            </span>{' '}
            ✨
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 mx-auto mt-3 rounded-full" />
        </motion.div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -5 }}
              className="
                group relative p-6 rounded-2xl
                bg-white/70 dark:bg-zinc-900/40
                backdrop-blur-xl
                border border-pink-200/40 dark:border-zinc-700
                shadow-sm hover:shadow-lg
                transition
              "
            >
              {/* glow */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${cert.color} opacity-0 group-hover:opacity-20 blur-2xl transition`} />

              {/* ICON */}
              <div className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${cert.color}`}>
                <span className="text-2xl">{cert.image}</span>
              </div>

              {/* TITLE */}
              <div className="flex items-start gap-2">
                <Award className="h-5 w-5 text-fuchsia-500 mt-1" />
                <h3 className="font-semibold text-zinc-900 dark:text-white group-hover:text-fuchsia-500 transition">
                  {cert.title}
                </h3>
              </div>

              {/* ISSUER */}
              <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2">
                {cert.issuer}
              </p>

              {/* DATE */}
              <div className="flex items-center gap-2 text-xs text-zinc-500 mt-2">
                <Calendar className="h-4 w-4" />
                <span>{cert.date}</span>
              </div>

              {/* ID */}
              <p className="text-[11px] font-mono text-zinc-400 mt-2">
                ID: {cert.credentialId}
              </p>

              {/* BUTTON */}
              <Button
                variant="outline"
                size="sm"
                className="
                  mt-4 rounded-full
                  border-fuchsia-300 text-fuchsia-500
                  hover:bg-fuchsia-500 hover:text-white
                  transition
                "
                asChild
              >
                <a href={cert.link}>
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Lihat Detail
                </a>
              </Button>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}