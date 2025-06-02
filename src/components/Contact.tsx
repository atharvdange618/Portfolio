import { Mail, Github, Linkedin, ExternalLink, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { sendForm } from "@emailjs/browser";

const Contact = () => {
  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendForm(SERVICE_ID, TEMPLATE_ID, e.target as HTMLFormElement, PUBLIC_KEY)
      .then(() => {
        toast("Message Sent!", {
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        toast.error("Failed to send message. Please try again later.");
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-300 to-purple-300 mx-auto rounded"></div>
          <p className="text-gray-700 mt-6 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or
            just having a chat about technology. Feel free to reach out!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Let's Connect
              </h3>
              <div className="space-y-4">
                <a
                  href="mailto:atharvdange.dev@gmail.com"
                  className="flex items-center gap-4 p-4 bg-white/80 rounded-lg border border-blue-200 hover:border-blue-300 transition-all duration-200 group shadow-sm"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-200">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="text-gray-800 font-medium">Email</div>
                    <div className="text-gray-600">
                      atharvdange.dev@gmail.com
                    </div>
                  </div>
                </a>

                <a
                  href="https://github.com/atharvdange618"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white/80 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 group shadow-sm"
                >
                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors duration-200">
                    <Github size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-800 font-medium">GitHub</div>
                    <div className="text-gray-600">@atharvdange618</div>
                  </div>
                  <ExternalLink
                    size={16}
                    className="text-gray-500 group-hover:text-blue-500"
                  />
                </a>

                <a
                  href="https://www.linkedin.com/in/atharvdange"
                  className="flex items-center gap-4 p-4 bg-white/80 rounded-lg border border-blue-200 hover:border-blue-300 transition-all duration-200 group shadow-sm"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-200">
                    <Linkedin size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-800 font-medium">LinkedIn</div>
                    <div className="text-gray-600">Connect with me</div>
                  </div>
                  <ExternalLink
                    size={16}
                    className="text-gray-500 group-hover:text-blue-500"
                  />
                </a>
              </div>
            </div>

            {/* <div className="rounded-xl p-6 backdrop-blur-sm border border-blue-200">
              <h4 className="text-lg font-semibold text-blue-700 mb-3">
                Open to Opportunities
              </h4>
              <p className="text-gray-700 leading-relaxed">
                I'm currently open to new opportunities in full-stack
                development, framework development, and technical leadership
                roles. Let's build something amazing together!
              </p>
            </div> */}
          </div>

          {/* Contact Form */}
          <div className="bg-white/80 rounded-xl p-8 backdrop-blur-sm border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 placeholder-gray-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 placeholder-gray-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 placeholder-gray-500 resize-none"
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center cursor-pointer justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                <Send size={18} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
