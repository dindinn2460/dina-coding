import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const movies = [
  {
    title: "🎓 Study Group",
    description: "Aksi & sekolah penuh konflik dan strategi 💥",
    image: "/study.webp",
    color: "from-fuchsia-500 via-pink-500 to-rose-500",
  },
  {
    title: "🌙 Night Has Come",
    description: "Survival game malam penuh misteri 🕶️",
    image: "/hascome.webp",
    color: "from-indigo-500 via-purple-500 to-slate-600",
  },
  {
    title: "🏫 Duty After School",
    description: "Siswa melawan ancaman tak dikenal 🔥",
    image: "/dutyafter.webp",
    color: "from-orange-500 via-red-500 to-pink-500",
  },
  {
    title: "🧟 All of Us Are Dead",
    description: "Zombie outbreak di sekolah 😱",
    image: "/aredead.webp",
    color: "from-green-500 via-emerald-500 to-teal-500",
  },
  {
    title: "⚽ Racket Boys",
    description: "Perjuangan tim badminton penuh semangat 🏸",
    image: "/racketboys.webp",
    color: "from-sky-500 via-blue-500 to-indigo-500",
  },
  {
    title: "👨‍👩‍👧 Family by Choice",
    description: "Ikatan keluarga bukan karena darah ❤️",
    image: "/familyby.webp",
    color: "from-rose-400 via-pink-400 to-purple-400",
  },
];

export default function MoviesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section
      id="projects"
      className="
        relative py-24 overflow-hidden
        bg-gradient-to-b
        from-fuchsia-50 via-pink-50 to-rose-50
        dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950
      "
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-fuchsia-300/20 blur-[200px] top-[-250px] left-[-200px]" />
        <div className="absolute w-[700px] h-[700px] bg-pink-300/20 blur-[200px] bottom-[-250px] right-[-200px]" />
        <div className="absolute w-[600px] h-[600px] bg-rose-300/15 blur-[200px] top-[30%] left-[20%]" />
      </div>

      {/* HEADER */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-5xl font-bold">
          🎬 Favorite Movies
        </h2>
        <p className="text-pink-500 dark:text-pink-300 mt-2">
          Drama & survival yang bikin nagih 🔥
        </p>
      </div>

      {/* CAROUSEL */}
      <div className="relative max-w-6xl mx-auto px-4">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-6">

            {movies.map((movie, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33%]"
              >
                <div className="
                  group p-4 rounded-2xl
                  bg-white/70 dark:bg-white/5
                  backdrop-blur-xl
                  border border-white/20 dark:border-white/10
                  hover:-translate-y-2 transition duration-500
                ">

                  {/* IMAGE + GLOW */}
                  <div className="relative">
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${movie.color} blur-2xl opacity-40 group-hover:opacity-80 transition`} />

                    <div className={`relative rounded-xl p-[2px] bg-gradient-to-r ${movie.color}`}>
                      <div className="overflow-hidden rounded-xl aspect-[2/3] bg-black">
                        <img
                          src={movie.image}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* TEXT */}
                  <h3 className="mt-4 font-bold text-lg text-zinc-900 dark:text-white">
                    {movie.title}
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2">
                    {movie.description}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* BUTTON NAV */}
        <Button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-white/10 backdrop-blur-md"
        >
          <ChevronLeft />
        </Button>

        <Button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-white/10 backdrop-blur-md"
        >
          <ChevronRight />
        </Button>

      </div>
    </section>
  );
}