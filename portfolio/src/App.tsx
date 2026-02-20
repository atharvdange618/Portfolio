import About from "./components/About";
import BlogPosts from "./components/BlogPosts";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <Toaster />
      <div className="App min-h-screen bg-white dark:bg-[#09090b]">
        <Navbar />
        <main id="main" role="main">
          <Hero />
          <About />
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
