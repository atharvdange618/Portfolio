import { FaGithub } from "react-icons/fa";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { Button } from "../ui/button";

export default function Footer() {
  const socials = [
    {
      title: "GitHub",
      href: "https://github.com/atharvdange618",
      icon: <FaGithub className="w-4 h-4" />,
    },
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/atharv-dange",
      icon: <FaLinkedinIn className="w-4 h-4" />,
    },
    {
      title: "Twitter",
      href: "https://x.com/atharvdangedev",
      icon: <FaXTwitter className="w-4 h-4" />,
    },
  ];
  return (
    <div className="flex flex-row gap-4 justify-center">
      {socials.map((social) => (
        <a href={social.href} key={social.title} target="_blank">
          <Button
            variant="outline"
            className="gap-2 text-purple border-muted"
          >
            {social.icon}
            {social.title}
          </Button>
        </a>
      ))}
    </div>
  );
}
