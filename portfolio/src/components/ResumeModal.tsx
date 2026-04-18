import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { FileText, Download, Mail, Phone, ExternalLink } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const actionCards = [
  {
    id: "view",
    icon: ExternalLink,
    label: "View Resume",
    description: "Open in new tab",
    bgColor: "#93CDFF",
    action: () => window.open("/Atharv-Dange.pdf", "_blank"),
  },
  {
    id: "download",
    icon: Download,
    label: "Download Resume",
    description: "Save PDF to device",
    bgColor: "#B8F0D4",
    action: () => {
      const link = document.createElement("a");
      link.href = "/Atharv-Dange.pdf";
      link.download = "Atharv-Dange-Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
  {
    id: "email",
    icon: Mail,
    label: "Email Me",
    description: "atharvdange.dev@gmail.com",
    bgColor: "#FFD6C0",
    action: () => window.open("mailto:atharvdange.dev@gmail.com", "_blank"),
  },
  {
    id: "call",
    icon: Phone,
    label: "Call Me",
    description: "7875273298",
    bgColor: "#FFB494",
    action: () => window.open("tel:+917875273298", "_self"),
  },
];

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl bg-white dark:bg-[#18181b] border-3 border-black dark:border-white p-0"
        style={{
          borderWidth: "3px",
          boxShadow: "8px 8px 0px #60B5FF",
        }}
      >
        <DialogHeader
          className="px-6 pt-6 pb-4 border-b-3 border-black dark:border-white"
          style={{ borderBottomWidth: "3px" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="p-2 bg-[#60B5FF] border-2 border-black dark:border-white"
              style={{ borderWidth: "2px" }}
            >
              <FileText size={24} className="text-black" />
            </div>
            <div>
              <DialogTitle className="font-heading text-2xl font-bold text-black dark:text-white">
                Get My Resume
              </DialogTitle>
              <DialogDescription className="font-body text-sm text-gray-600 dark:text-gray-400 mt-1">
                Choose how you'd like to proceed
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {actionCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.button
                  key={card.id}
                  onClick={() => {
                    card.action();
                    if (card.id === "download") {
                      setTimeout(() => onClose(), 300);
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98, x: 2, y: 2 }}
                  className="p-4 border-3 border-black dark:border-white text-left transition-all duration-200 cursor-pointer"
                  style={{
                    borderWidth: "3px",
                    backgroundColor: card.bgColor,
                    boxShadow: "4px 4px 0px #1A1A1A",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="p-2 bg-white border-2 border-black mt-0.5"
                      style={{ borderWidth: "2px" }}
                    >
                      <Icon size={20} className="text-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-lg font-bold text-black mb-0.5">
                        {card.label}
                      </h3>
                      <p className="font-body text-sm text-black/70 truncate">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="font-body text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors underline underline-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
