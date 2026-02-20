import { motion } from "framer-motion";
import { personalInfo } from "../data/mock";
import {
  Swords,
  BookOpen,
  Mountain,
  Film,
  Quote,
  Heart,
  Disc3,
  Headphones,
} from "lucide-react";
import { useNowPlaying } from "../hooks/useNowPlaying";

const iconMap: Record<string, React.ElementType> = {
  Swords,
  BookOpen,
  Mountain,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

function NowPlayingCard() {
  const { track, loading } = useNowPlaying();

  return (
    <div className="flex flex-col h-full z-10 relative">
      {loading ? (
        <div className="flex-1 flex items-center justify-center py-4">
          <p className="font-mono text-xs text-gray-500">
            Fetching from Last.fm...
          </p>
        </div>
      ) : track ? (
        <div className="flex gap-4 items-center mt-2">
          {track.imageUrl ? (
            <div className="w-16 h-16 shrink-0 border-2 border-black overflow-hidden relative group-hover:scale-105 transition-transform duration-300">
              <img
                src={track.imageUrl}
                alt={track.album}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 shrink-0 border-2 border-black bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
              <Disc3
                size={18}
                className={`text-black dark:text-white ${track.isPlaying ? "animate-spin" : ""}`}
                style={{ animationDuration: "3s" }}
              />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h4 className="font-heading text-base font-bold text-black dark:text-white">
              {track.isPlaying ? "Now Playing" : "Recently Played"}
            </h4>

            <a
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline decoration-[#FF9149] decoration-2 underline-offset-2"
            >
              <p
                className="font-heading text-base font-bold text-black dark:text-white truncate"
                title={track.name}
              >
                {track.name}
              </p>
            </a>

            <p
              className="font-mono text-xs text-[#9B6BC7] dark:text-[#D8B4FF] truncate mt-1"
              title={track.artist}
            >
              {track.artist}
            </p>

            <div className="flex items-center justify-between">
              <p
                className="font-mono text-[10px] text-gray-500 truncate uppercase tracking-wider"
                title={track.album}
              >
                {track.album}
              </p>

              {track.isPlaying && (
                <div className="flex items-center gap-1" aria-label="Live">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#FF9149] animate-pulse"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#FF9149] animate-pulse"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#FF9149] animate-pulse"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="font-mono text-sm text-gray-500 py-4">
          No recent tracks found.
        </p>
      )}

      {track?.isPlaying && (
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#FF9149]/20 blur-3xl rounded-full pointer-events-none -z-10" />
      )}
    </div>
  );
}

export default function Essence() {
  const { characterEssence } = personalInfo;

  return (
    <section
      id="essence"
      className="py-20 bg-[#FFFFF0] dark:bg-[#09090b] relative overflow-hidden"
      aria-labelledby="essence-heading"
    >
      <div className="absolute inset-0 z-0 bg-linear-to-t from-[#f97316]/60 via-[#FF9149]/30 to-[#FFFFF0] dark:from-[#c2410c] dark:via-[#f97316]/30 dark:to-[#09090b]" />

      <div className="absolute top-0 left-0 right-0 h-1 bg-black dark:bg-white z-20" />

      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.div className="mb-14" variants={itemVariants}>
          <h2
            id="essence-heading"
            className="font-heading text-4xl sm:text-5xl font-bold text-black dark:text-white inline-block relative"
          >
            Beyond the Code
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#60B5FF] -z-10 -rotate-1" />
          </h2>
          <p className="font-body text-gray-600 dark:text-gray-400 mt-4 max-w-lg text-base sm:text-lg">
            The things that shape how I think, what I build, and why I care.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-3 gap-5 mb-12"
          variants={containerVariants}
        >
          {characterEssence.identity.map((pillar) => {
            const Icon = iconMap[pillar.icon] || Swords;
            return (
              <motion.div
                key={pillar.label}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 bg-white dark:bg-[#09090b] border-3 border-black dark:border-white group hover:border-[#D8B4FF] transition-colors duration-300"
                style={{ borderWidth: "3px", boxShadow: "5px 5px 0px #000" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#D8B4FF] border-2 border-black">
                    <Icon size={20} className="text-black" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-black dark:text-white">
                    {pillar.label}
                  </h3>
                </div>
                <p className="font-body text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-3 gap-5 mb-12"
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="p-6 bg-white dark:bg-[#09090b] border-3 border-black dark:border-white"
            style={{ borderWidth: "3px", boxShadow: "5px 5px 0px #FF9149" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#FF9149] border-2 border-black">
                <Swords size={18} className="text-black" />
              </div>
              <h3 className="font-heading text-base font-bold text-black dark:text-white">
                Anime that shaped me
              </h3>
            </div>
            <div className="space-y-2 mb-4">
              {characterEssence.anime.favourites.map((anime) => (
                <div key={anime} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#FF9149] rounded-full shrink-0" />
                  <span className="font-mono text-sm text-gray-700 dark:text-gray-300">
                    {anime}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <p className="font-mono text-sm text-gray-500 mb-1">
                Spirit Character
              </p>
              <p className="font-heading text-sm text-[#FF9149] font-semibold">
                {characterEssence.anime.spiritCharacter.name}
                <span className="text-gray-500 font-normal">
                  {" "}
                  - {characterEssence.anime.spiritCharacter.from}
                </span>
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-6 bg-white dark:bg-[#09090b] border-3 border-black dark:border-white"
            style={{ borderWidth: "3px", boxShadow: "5px 5px 0px #D8B4FF" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#D8B4FF] border-2 border-black">
                <Headphones size={18} className="text-black" />
              </div>
              <h3 className="font-heading text-base font-bold text-black dark:text-white">
                What I listen to
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {characterEssence.music.bands.map((band) => (
                <span
                  key={band}
                  className="font-mono text-xs px-3 py-1.5 bg-[#D8B4FF]/20 border-2 border-black text-black dark:text-white"
                >
                  {band}
                </span>
              ))}
            </div>
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-3">
              <NowPlayingCard />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-6 bg-white dark:bg-[#09090b] border-3 border-black dark:border-white"
            style={{ borderWidth: "3px", boxShadow: "5px 5px 0px #60B5FF" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#60B5FF] border-2 border-black">
                <Film size={18} className="text-black" />
              </div>
              <h3 className="font-heading text-base font-bold text-black dark:text-white">
                What I watch
              </h3>
            </div>
            <div className="space-y-2">
              {characterEssence.movies.genres.map((genre) => (
                <div key={genre} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#60B5FF] rounded-full shrink-0" />
                  <span className="font-mono text-sm text-gray-700 dark:text-gray-300">
                    {genre}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-12 bg-[#ec4899]/60" />
            <Heart size={18} className="text-[#ec4899] essence-glow" />
            <span className="h-px w-12 bg-[#ec4899]/60" />
          </div>
          <p className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white italic tracking-tight">
            "{characterEssence.philosophy}"
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
          <div className="p-6 border-l-4 border-[#FF9149] bg-white dark:bg-[#18181b]">
            <div className="flex gap-3">
              <Quote size={24} className="text-[#FF9149]/40 shrink-0 mt-1" />
              <div>
                <p className="font-body text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed italic">
                  {characterEssence.quote.text}
                </p>
                <p className="font-mono text-sm font-bold text-[#FF9149] mt-3">
                  — {characterEssence.quote.author}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
