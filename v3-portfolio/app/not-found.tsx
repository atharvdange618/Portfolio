import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-green text-sm">$ cd ~</p>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-fg">404 - Not found</h1>
        <p className="text-comment">
          That path doesn&apos;t exist. Maybe it moved, maybe it never did.
        </p>
      </div>
      <Link
        href="/"
        className="flex items-center gap-2 text-sm text-comment hover:text-purple transition-colors duration-200 w-fit"
      >
        <FaArrowLeftLong className="w-3 h-3" />
        Back to home
      </Link>
    </div>
  );
}
