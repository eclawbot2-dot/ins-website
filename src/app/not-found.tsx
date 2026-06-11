import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-50 text-gold-700">
        <Compass className="h-8 w-8" aria-hidden="true" />
      </span>
      <h1 className="mt-6 text-3xl font-bold text-navy-950">Page not found</h1>
      <p className="mt-3 text-navy-600">
        Looks like this page drifted off the chart. Let&apos;s get you back to safe water.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/" className="rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-800">
          Back to Home
        </Link>
        <Link href="/quote" className="rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-navy-950 hover:bg-accent-400">
          Get a Quote
        </Link>
      </div>
    </div>
  );
}
