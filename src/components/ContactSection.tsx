import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';

const contactSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

const contactInfo = [
  {
    icon: Mail,
    label: 'Email 📧',
    value: 'dindinn2460@gmail.com',
    href: 'mailto:dindinn2460@gmail.com',
  },
  {
    icon: Phone,
    label: 'Telepon 📱',
    value: '+62 812-6098-6198',
    href: 'tel:+6281260986198',
  },
  {
    icon: MapPin,
    label: 'Lokasi 📍',
    value: 'Banda Aceh, Indonesia',
    href: 'https://maps.app.goo.gl/WRV7Armbab77cELg9',
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) return;

    setIsSubmitting(true);

    try {
      await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      toast({
        title: '💌 Pesan terkirim!',
        description: 'Makasih ya sudah menghubungi aku ✨',
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast({
        title: '😢 Gagal mengirim',
        description: 'Coba lagi nanti ya',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="
        py-20 md:py-32
        bg-gradient-to-b
        from-fuchsia-50 via-pink-50 to-rose-50
        dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950
      "
    >
      <div className="container mx-auto px-4 max-w-6xl">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-fuchsia-500 font-medium">
            💌 Contact Me
          </span>

          <h2 className="text-3xl md:text-5xl font-bold mt-2">
            <span className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
              Yuk Ngobrol
            </span>{' '}
            ✨
          </h2>

          <p className="text-sm text-zinc-500 mt-3">
            Kalau mau kenal lebih dekat atau sekadar say hi 🌸
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* INFO */}
          <div className="space-y-5">
            {contactInfo.map((info, i) => (
              <motion.a
                key={i}
                href={info.href}
                whileHover={{ scale: 1.03 }}
                className="
                  flex items-center gap-4 p-4
                  rounded-2xl
                  bg-white/60 dark:bg-zinc-900/40
                  backdrop-blur-xl
                  border border-pink-200/40 dark:border-zinc-700
                  hover:shadow-lg transition
                "
              >
                <div className="p-3 rounded-xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 text-white">
                  <info.icon className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-zinc-500">{info.label}</p>
                  <p className="font-medium">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="
              space-y-4 p-6 rounded-2xl
              bg-white/60 dark:bg-zinc-900/40
              backdrop-blur-xl
              border border-pink-200/40 dark:border-zinc-700
              shadow-sm
            "
          >

            <div className="grid sm:grid-cols-2 gap-3">
              <Input name="name" placeholder="Nama kamu 🌸" onChange={handleChange} value={formData.name} />
              <Input name="email" placeholder="Email 📧" onChange={handleChange} value={formData.email} />
            </div>

            <Input name="subject" placeholder="Subjek 💬" onChange={handleChange} value={formData.subject} />

            <Textarea
              name="message"
              placeholder="Tulis pesan kamu di sini... 💖"
              rows={5}
              onChange={handleChange}
              value={formData.message}
            />

            <Button
              disabled={isSubmitting}
              className="
                w-full rounded-full
                bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500
                hover:opacity-90 text-white
              "
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Kirim Pesan 💌
                </>
              )}
            </Button>

          </form>

        </div>
      </div>
    </section>
  );
}