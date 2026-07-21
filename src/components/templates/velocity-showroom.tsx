"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Car = {
  id: string;
  name: string;
  trim: string;
  price: string;
  year: number;
  power: string;
  type: string;
  image: string;
};

const cars: Car[] = [
  {
    id: "1",
    name: "Aurora GT",
    trim: "Performance",
    price: "285,000",
    year: 2026,
    power: "510 hp",
    type: "كوبيه",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "2",
    name: "Summit X7",
    trim: "Luxury",
    price: "198,000",
    year: 2025,
    power: "375 hp",
    type: "SUV",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "3",
    name: "Noir S",
    trim: "Executive",
    price: "162,000",
    year: 2026,
    power: "290 hp",
    type: "سيدان",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "4",
    name: "Pulse EV",
    trim: "Range+",
    price: "149,000",
    year: 2026,
    power: "450 km",
    type: "كهربائية",
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "5",
    name: "Ridge Trail",
    trim: "Off-Road",
    price: "175,000",
    year: 2025,
    power: "340 hp",
    type: "بيك أب",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "6",
    name: "Cielo Cabrio",
    trim: "Open Air",
    price: "220,000",
    year: 2026,
    power: "420 hp",
    type: "مكشوفة",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
  },
];

const filters = ["الكل", "SUV", "سيدان", "كوبيه", "كهربائية"] as const;

export function VelocityShowroom() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("الكل");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered =
    filter === "الكل" ? cars : cars.filter((c) => c.type === filter);

  return (
    <div
      dir="rtl"
      className="velocity-root min-h-screen bg-[#0a0a0b] text-[#f4f1ea] antialiased"
      style={{ fontFamily: "var(--font-cairo), system-ui, sans-serif" }}
    >
      <style>{`
        .velocity-root {
          --v-amber: #e8a317;
          --v-steel: #9aa3ad;
          --v-line: rgba(255,255,255,0.1);
        }
        @keyframes v-rise {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes v-pan {
          from { transform: scale(1.08) translateX(-1.5%); }
          to { transform: scale(1) translateX(0); }
        }
        .v-rise { animation: v-rise 0.9s ease both; }
        .v-rise-2 { animation: v-rise 0.9s ease 0.12s both; }
        .v-rise-3 { animation: v-rise 0.9s ease 0.22s both; }
        .v-hero-img { animation: v-pan 8s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .v-rise, .v-rise-2, .v-rise-3, .v-hero-img { animation: none; }
        }
      `}</style>

      {/* Nav */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition ${
          scrolled
            ? "border-b border-white/10 bg-[#0a0a0b]/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#top" className="inline-flex items-center gap-2.5">
            <img
              src="/brand/velocity-logo-mark.png"
              alt=""
              width={44}
              height={44}
              className="size-10 object-contain sm:size-11"
            />
            <span className="text-lg font-extrabold tracking-tight">
              Velocity
              <span className="ms-1.5 font-semibold text-[var(--v-amber)]">
                Motors
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a href="#inventory" className="transition hover:text-white">
              المعرض
            </a>
            <a href="#why" className="transition hover:text-white">
              لماذا نحن
            </a>
            <a href="#visit" className="transition hover:text-white">
              زيارة المعرض
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              ← القوالب
            </Link>
            <a
              href="#visit"
              className="rounded-full bg-[var(--v-amber)] px-3.5 py-1.5 text-xs font-bold text-[#111] transition hover:brightness-110"
            >
              احجز تجربة
            </a>
          </div>
        </div>
      </header>

      {/* Hero — one composition, brand first, full-bleed */}
      <section
        id="top"
        className="relative flex min-h-[100svh] items-end overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="v-hero-img h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/55 to-[#0a0a0b]/25" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0b]/70 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
          <div className="v-rise mb-5 inline-flex items-center gap-3">
            <img
              src="/brand/velocity-logo-3d.png"
              alt="Velocity Motors"
              width={72}
              height={72}
              className="size-14 object-contain drop-shadow-[0_8px_24px_rgba(232,163,23,0.35)] sm:size-16"
            />
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--v-amber)]">
              معرض سيارات فاخر
            </p>
          </div>
          <h1 className="v-rise-2 mt-0 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
            Velocity
          </h1>
          <p className="v-rise-3 mt-4 max-w-md text-base leading-7 text-white/70 sm:text-lg">
            اختر سيارتك التالية من مجموعة منتقاة — عرض حي، تجربة قيادة، وتسليم
            بنفس اليوم.
          </p>
          <div className="v-rise-3 mt-8 flex flex-wrap gap-3">
            <a
              href="#inventory"
              className="rounded-full bg-[var(--v-amber)] px-5 py-2.5 text-sm font-bold text-[#111] transition hover:brightness-110"
            >
              تصفّح المعرض
            </a>
            <a
              href="#visit"
              className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              احجز موعداً
            </a>
          </div>
        </div>
      </section>

      {/* Inventory */}
      <section id="inventory" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              المعرض
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-white/55">
              سيارات جاهزة للعرض والقيادة — مواصفات واضحة وسعر معلن.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  filter === f
                    ? "bg-white text-[#0a0a0b]"
                    : "border border-white/15 text-white/65 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((car) => (
            <article
              key={car.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#121214] transition hover:-translate-y-0.5 hover:border-white/20"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute start-3 top-3 rounded-md bg-black/65 px-2 py-1 text-[10px] font-bold text-white backdrop-blur">
                  {car.type}
                </span>
              </div>
              <div className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight">
                      {car.name}
                    </h3>
                    <p className="text-xs text-white/45">
                      {car.trim} · {car.year} · {car.power}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-bold text-[var(--v-amber)]">
                    {car.price}{" "}
                    <span className="text-[10px] font-semibold text-white/40">
                      ر.س
                    </span>
                  </p>
                </div>
                <a
                  href="#visit"
                  className="inline-flex text-xs font-semibold text-white/70 underline-offset-4 transition hover:text-[var(--v-amber)] hover:underline"
                >
                  اطلب تفاصيل ←
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why */}
      <section
        id="why"
        className="border-y border-white/10 bg-[#0f0f11] py-20"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              تجربة شراء بلا ضجيج
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/55">
              نعرض فقط سيارات مفحوصة، بأسعار شفافة ومواصفات كاملة. جرّب القيادة
              في مسار خاص، ثم أتمم الشراء خلال زيارة واحدة.
            </p>
            <ul className="mt-8 space-y-4 text-sm text-white/80">
              {[
                "فحص شامل قبل العرض",
                "تجربة قيادة في نفس اليوم",
                "تمويل مرن وشحن منزلي للسيارات الكهربائية",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="inline-block size-1.5 rounded-full bg-[var(--v-amber)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=80"
              alt=""
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/4]"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
              <p className="text-sm font-semibold">صالة العرض · الرياض</p>
              <p className="mt-1 text-xs text-white/55">يومياً 10 ص — 10 م</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#161618] to-[#0c0c0e] px-6 py-12 sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            جاهز للزيارة؟
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-7 text-white/55">
            احجز موعد مشاهدة أو تجربة قيادة — نرد خلال ساعة عمل.
          </p>
          <form
            className="mt-8 grid gap-3 sm:grid-cols-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none ring-[var(--v-amber)] placeholder:text-white/30 focus:ring-1"
              placeholder="الاسم"
              required
            />
            <input
              className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none ring-[var(--v-amber)] placeholder:text-white/30 focus:ring-1"
              placeholder="الجوال"
              required
            />
            <input
              className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none ring-[var(--v-amber)] placeholder:text-white/30 focus:ring-1 sm:col-span-2"
              placeholder="السيارة المهتم بها (اختياري)"
            />
            <button
              type="submit"
              className="rounded-xl bg-[var(--v-amber)] px-4 py-3 text-sm font-bold text-[#111] transition hover:brightness-110 sm:col-span-2 sm:justify-self-start sm:px-8"
            >
              أرسل الطلب
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} Velocity Motors · قالب تجريبي من{" "}
            <Link href="/" className="text-white/60 underline hover:text-white">
              Tool2Day Design
            </Link>
          </p>
          <p className="text-xs">Web template · Car showroom</p>
        </div>
      </footer>
    </div>
  );
}
