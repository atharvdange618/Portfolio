import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-300 to-blue-600 bg-clip-text text-transparent mb-2">
              Atharv Dange
            </div>
            <p className="text-gray-700 font-medium">
              Software Engineer & Framework Author
            </p>
            <p className="text-gray-600 text-sm mt-1">
              Building the future, one line of code at a time
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/atharvdange618"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white hover:bg-purple-50 rounded-lg flex items-center justify-center transition-colors duration-200 border border-purple-200 text-gray-700 hover:text-purple-600"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/atharvdange"
              className="w-10 h-10 bg-white hover:bg-blue-50 rounded-lg flex items-center justify-center transition-colors duration-200 border border-blue-200 text-gray-700 hover:text-blue-600"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:atharvdange.dev@gmail.com"
              className="w-10 h-10 bg-white hover:bg-pink-50 rounded-lg flex items-center justify-center transition-colors duration-200 border border-pink-200 text-gray-700 hover:text-pink-600"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-purple-200 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Atharv Dange. Built with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
