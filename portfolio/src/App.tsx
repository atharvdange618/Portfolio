import About from "./components/About";
import BlogPosts from "./components/BlogPosts";
import Contact from "./components/Contact";
import Essence from "./components/Essence";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./context/ThemeContext";
import FloatingParticles from "./components/FloatingParticles";

const App = () => {
  return (
    <ThemeProvider>
      <Toaster />
      <FloatingParticles />
      <div className="App min-h-screen bg-white dark:bg-[#09090b] relative">
        <Navbar />
        <main id="main" role="main">
          <Hero />
          <About />
          <Essence />
          <Projects />
          <BlogPosts />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
