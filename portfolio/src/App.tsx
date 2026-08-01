import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./context/ThemeContext";
import FloatingParticles from "./components/FloatingParticles";
import MinimalistRedirect from "./components/MinimalistRedirect";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import RedirectPage from "./pages/RedirectPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Toaster />
          <FloatingParticles />
          <MinimalistRedirect />
          <div className="App min-h-screen bg-white dark:bg-[#09090b] relative">
            <Navbar />
            <main id="main" role="main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route
                  path="/shikai/testing"
                  element={
                    <RedirectPage
                      url="https://play.google.com/store/apps/details?id=com.atharvdange618.Shikai"
                      title="Shikai on Google Play"
                      description="Redirecting you to Shikai on the Google Play Store. Download the app and try it out."
                    />
                  }
                />
                <Route
                  path="/testing"
                  element={
                    <RedirectPage
                      url="https://play.google.com/store/apps/details?id=com.atharvdange618.Shikai"
                      title="Shikai on Google Play"
                      description="Redirecting you to Shikai on the Google Play Store. Download the app and try it out."
                    />
                  }
                />
                <Route
                  path="/shikai/feedback"
                  element={
                    <RedirectPage
                      url="https://forms.gle/SkU5CR4CMyaMh3Y17"
                      title="Shikai Feedback"
                      description="Redirecting you to the feedback form for Shikai. Your responses help shape the app."
                    />
                  }
                />
                <Route
                  path="/feedback"
                  element={
                    <RedirectPage
                      url="https://forms.gle/SkU5CR4CMyaMh3Y17"
                      title="Shikai Feedback"
                      description="Redirecting you to the feedback form for Shikai. Your responses help shape the app."
                    />
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
