import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { isDark } = useTheme();

  return (
    <Sonner
      theme={isDark ? "dark" : "light"}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "bg-white dark:bg-[#09090b] border-2 border-black dark:border-white shadow-lg",
          title: "text-black dark:text-white font-heading font-bold",
          description: "text-gray-700 dark:text-gray-400 font-body",
          actionButton: "bg-[#60B5FF] text-white border-2 border-black",
          cancelButton:
            "bg-gray-200 dark:bg-gray-700 text-black dark:text-white border-2 border-black dark:border-white",
          error: "bg-red-50 dark:bg-red-950 border-red-500",
          success: "bg-green-50 dark:bg-green-950 border-green-500",
          warning: "bg-yellow-50 dark:bg-yellow-950 border-yellow-500",
          info: "bg-blue-50 dark:bg-blue-950 border-blue-500",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
