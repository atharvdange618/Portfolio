import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-green text-sm">$ cd ~</p>
      <pre className="text-red text-xs md:text-sm whitespace-pre leading-tight">
        {`
Error: path not found
  at navigate (/app/router.ts:42)
  at Object.<anonymous> (/app/page.tsx:1)

Hint: check the URL or head back home.
`}
      </pre>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-fg">404</h1>
        <p className="text-comment">
          That path doesn&apos;t exist. Maybe it moved, maybe it never did.
        </p>
      </div>
      <Link
        href="/"
        className="flex items-center gap-2 text-sm text-comment hover:text-purple transition-colors duration-200 w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple focus-visible:outline-offset-2"
      >
        <FaArrowLeftLong className="w-3 h-3" />
        Back to home
      </Link>
    </div>
  );
}
