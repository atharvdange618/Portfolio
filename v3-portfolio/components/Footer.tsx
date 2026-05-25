import Link from "next/link";

import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MdOutlineAttachEmail } from "react-icons/md";
import { LuBookOpenText } from "react-icons/lu";

const links = [
  {
    label: "X",
    href: "https://x.com/atharvdangedev",
    icon: FaXTwitter,
  },
  {
    label: "GitHub",
    href: "https://github.com/atharvdange618",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/atharv-dange",
    icon: FaLinkedinIn,
  },
  {
    label: "Email",
    href: "mailto:atharvdange.dev@gmail.com",
    icon: MdOutlineAttachEmail,
  },
  {
    label: "Blog",
    href: "https://blog.atharvdangedev.in",
    icon: LuBookOpenText,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border mt-24 py-8">
      <div className="max-w-content mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="text-comment text-lg">
          <span className="text-green">~</span>/atharv-dange
        </Link>
        <div className="flex items-center gap-6">
          {links.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-comment hover:text-purple transition-colors duration-200"
              aria-label={label}
            >
              <Icon className="w-4 h-4" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
