import { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "../data/mock";
import {
  Mail,
  Linkedin,
  Github,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const formatTimeIST = (date: Date | string | number) =>
  new Date(date).toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ContactFormData>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const messageLength = watch("message")?.length || 0;

  const onSubmit = async (data: ContactFormData) => {
    try {
      const now = new Date();

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
        {
          name: data.name,
          email: data.email,
          message: data.message,
          time: formatTimeIST(now),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY!,
      );

      setIsSubmitted(true);
      reset();

      toast.success("Message sent successfully!", {
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);

      toast.error("Failed to send message", {
        description: "Please try again or contact me directly via email.",
      });
    }
  };

  return (
    <section
      id="contact"
      className="py-20  dark:bg-[#09090b] relative"
      aria-labelledby="contact-heading"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-black dark:bg-white" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2
            id="contact-heading"
            className="font-heading text-4xl sm:text-5xl font-bold text-black dark:text-white inline-block relative"
          >
            Get In Touch
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#60B5FF] -z-10 -rotate-1" />
          </h2>
          <p className="font-body text-gray-700 dark:text-gray-300 mt-4 max-w-lg">
            Want to collaborate, chat about tech, or just say hi? Drop me a
            message.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h3 className="font-heading text-2xl font-bold text-black dark:text-white">
              Find me online
            </h3>

            <div className="space-y-4">
              {[
                {
                  icon: <Linkedin size={22} />,
                  label: "LinkedIn",
                  href: personalInfo.social.linkedin,
                  desc: "/in/atharvdange",
                  color: "#60B5FF",
                },
                {
                  icon: (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                  label: "X (Twitter)",
                  href: personalInfo.social.twitter,
                  desc: "@atharvdangedev",
                  color: "#1a1a1a",
                },
                {
                  icon: <Github size={22} />,
                  label: "GitHub",
                  href: personalInfo.social.github,
                  desc: "atharvdange618",
                  color: "#FF9149",
                },
                {
                  icon: <Mail size={22} />,
                  label: "Email",
                  href: personalInfo.social.email,
                  desc: "atharvdange.dev@gmail.com",
                  color: "#E0FFF1",
                },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98, x: 2, y: 2 }}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-[#09090b] border-3 border-black dark:border-white transition-all duration-200 group"
                  style={{
                    borderWidth: "3px",
                    boxShadow: `4px 4px 0px ${item.color}`,
                  }}
                >
                  <div className="p-2 border-2 border-black dark:border-white bg-gray-50 dark:bg-[#27272a] text-black dark:text-white group-hover:bg-[#60B5FF] group-hover:text-white transition-colors duration-200">
                    {item.icon}
                  </div>
                  <div>
                    <span className="font-heading font-bold text-black dark:text-white block">
                      {item.label}
                    </span>
                    <span className="font-mono text-sm text-gray-500 dark:text-gray-400">
                      {item.desc}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          <div
            className="bg-white dark:bg-[#09090b] p-6 sm:p-8 border-3 border-black dark:border-white"
            style={{ borderWidth: "3px", boxShadow: "8px 8px 0px #000" }}
          >
            <h3 className="font-heading text-2xl font-bold text-black dark:text-white mb-6">
              Send a Message
            </h3>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-3 bg-[#E0FFF1] border-2 border-black mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h4 className="font-heading text-xl font-bold text-black dark:text-white mb-2">
                  Message Sent!
                </h4>
                <p className="font-body text-gray-600 dark:text-gray-400">
                  Thanks for reaching out. I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <Label
                    htmlFor="name"
                    className="font-mono text-sm font-bold text-black dark:text-white mb-1.5 block"
                  >
                    Name *
                  </Label>
                  <Input
                    id="name"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                    placeholder="Your name"
                    className="border-2 border-black dark:border-white dark:text-white bg-gray-50 dark:bg-[#27272a] font-body rounded-none focus:ring-2 focus:ring-[#60B5FF] focus:shadow-[8px_8px_0px_#60B5FF] transition-shadow duration-200"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="font-mono text-xs text-red-600 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="email"
                    className="font-mono text-sm font-bold text-black dark:text-white mb-1.5 block"
                  >
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="you@example.com"
                    className="border-2 border-black dark:border-white bg-gray-50 dark:text-white dark:bg-[#27272a] font-body rounded-none focus:ring-2 focus:ring-[#60B5FF] focus:shadow-[8px_8px_0px_#60B5FF] transition-shadow duration-200"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="font-mono text-xs text-red-600 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <Label
                      htmlFor="message"
                      className="font-mono text-sm font-bold text-black dark:text-white"
                    >
                      Message *
                    </Label>
                    <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
                      {messageLength}/500
                    </span>
                  </div>
                  <Textarea
                    id="message"
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                      maxLength: {
                        value: 500,
                        message: "Message must not exceed 500 characters",
                      },
                    })}
                    placeholder="What's on your mind?"
                    rows={5}
                    className="border-2 border-black dark:border-white bg-gray-50 dark:text-white dark:bg-[#27272a] font-body rounded-none focus:ring-2 focus:ring-[#60B5FF] focus:shadow-[8px_8px_0px_#60B5FF] transition-shadow duration-200 resize-none"
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="font-mono text-xs text-red-600 mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95, x: 2, y: 2 }}
                  className="cursor-pointer w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF9149] text-black font-body font-semibold border-3 border-black hover:shadow-brutal-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ borderWidth: "3px", boxShadow: "4px 4px 0px #000" }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
