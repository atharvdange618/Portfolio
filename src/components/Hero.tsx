import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [downloads, setDownloads] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.npmjs.org/downloads/point/last-week/reiatsu")
      .then((res) => res.json())
      .then((data) => setDownloads(data.downloads))
      .catch(() => setDownloads(null))
      .finally(() => setLoading(false));
  }, []);

  const animatedDownloads = useCountUp(downloads);
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Atharv Dange</span>
          </h1>
          <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-700 mb-4 font-light">
            Software Engineer & Framework Author
          </h2>
          <div className="flex items-center justify-center gap-2 mb-8 text-blue-600 font-medium">
            <span className="animate-pulse">⚡</span>
            <span>Creator of Reiatsu Framework</span>
          </div>
        </div>

        <div className="animate-fade-in delay-300">
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Full-stack engineer with 1.5+ years of professional experience. I
            build scalable web applications and maintain open-source frameworks
            with growing adoption across the developer community.
          </p>
        </div>

        <div className="animate-fade-in delay-500">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a
              href="https://github.com/atharvdange618"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 hover:scale-105"
            >
              <Github size={20} />
              <span>GitHub</span>
            </a>
            <a
              href="www.linkedin.com/in/atharvdange"
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 hover:scale-105"
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:atharvdange.dev@gmail.com"
              className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all duration-200 hover:scale-105"
            >
              <Mail size={20} />
              <span>Contact Me</span>
            </a>
          </div>
        </div>

        <div className="animate-fade-in delay-700">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-200 shadow-lg pastel-glow-purple">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl">🚀</span>
              <h3 className="text-xl font-semibold text-blue-700">
                Reiatsu Framework
              </h3>
            </div>
            <p className="text-gray-700 mb-4">
              Production-ready TypeScript web framework with{" "}
              {loading ? (
                <span className="inline-block w-6 h-4 bg-gray-300 animate-pulse rounded-sm align-middle ease-out" />
              ) : downloads !== null ? (
                <strong>{animatedDownloads?.toLocaleString()}</strong>
              ) : (
                "—"
              )}{" "}
              weekly npm downloads
            </p>

            <a
              href="https://www.npmjs.com/package/reiatsu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
            >
              <span>View on npm</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

function useCountUp(target: number | null, duration = 1000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === null) return;

    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      setCount(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return target === null ? null : count;
}
