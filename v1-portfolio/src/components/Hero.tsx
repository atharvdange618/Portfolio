import { Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
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
            Full-stack engineer with nearly 2 years of professional experience
            specializing in backend architecture and framework development. I
            build production-grade web applications, mobile apps, and maintain
            open-source frameworks with growing adoption across the developer
            community.
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
              href="https://www.linkedin.com/in/atharvdange"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 hover:scale-105"
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:atharvdange.dev@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all duration-200 hover:scale-105"
            >
              <Mail size={20} />
              <span>Contact Me</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

// function useCountUp(target: number | null, duration = 1000) {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (target === null) return;

//     const startTime = performance.now();

//     const animate = (time: number) => {
//       const elapsed = time - startTime;
//       const progress = Math.min(elapsed / duration, 1);
//       const value = Math.floor(progress * target);
//       setCount(value);

//       if (progress < 1) {
//         requestAnimationFrame(animate);
//       }
//     };

//     requestAnimationFrame(animate);
//   }, [target, duration]);

//   return target === null ? null : count;
// }
