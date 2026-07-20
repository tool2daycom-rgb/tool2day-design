import { Gallery } from "@/components/gallery";
import { DesignBrandMark } from "@/components/design-brand-mark";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050505]/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="inline-flex items-center gap-2.5 font-extrabold tracking-tight text-white"
            >
              <DesignBrandMark size={24} animated />
              <span>
                tool2day<span className="font-semibold text-white/45"> design</span>
              </span>
            </a>
            <a
              href="https://tool2day.com"
              className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white sm:inline-flex"
            >
              ← Tools
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-white/40 md:inline">
              Web & App UI templates
            </span>
            <a
              href="https://tool2day.com"
              className="rounded-full bg-[#f5c518] px-3.5 py-1.5 text-xs font-bold text-[#111] transition hover:brightness-110"
            >
              Get templates
            </a>
          </div>
        </div>
      </header>

      <main className="pt-6">
        <div className="mx-auto mb-6 max-w-[1400px] px-4 sm:px-6">
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Design templates for web & apps
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
            Bento-style UI kits and landing systems — browse now, buy soon.
            Inspired by modern product galleries; we&apos;ll refine together.
          </p>
        </div>
        <Gallery />
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/35">
        © {new Date().getFullYear()} Tool2Day Design ·{" "}
        <a href="https://tool2day.com" className="underline hover:text-white/60">
          tool2day.com
        </a>
      </footer>
    </div>
  );
}
