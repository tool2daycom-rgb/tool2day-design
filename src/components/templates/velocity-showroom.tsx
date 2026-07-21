"use client";

import { useState } from "react";
import Link from "next/link";

type Car = {
  id: string;
  name: string;
  trim: string;
  price: string;
  power: string;
  type: string;
  image: string;
  video?: string;
  tone: string;
};

const cars: Car[] = [
  {
    id: "1",
    name: "Aurora GT",
    trim: "Performance",
    price: "285,000",
    power: "510 hp",
    type: "كوبيه",
    tone: "#1a1a1f",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80",
    video: "/brand/velocity-media/hero.mp4",
  },
  {
    id: "2",
    name: "Summit X7",
    trim: "Luxury",
    price: "198,000",
    power: "375 hp",
    type: "SUV",
    tone: "#152028",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
    video: "/brand/velocity-media/suv.mp4",
  },
  {
    id: "3",
    name: "Pulse EV",
    trim: "Range+",
    price: "149,000",
    power: "450 km",
    type: "كهربائية",
    tone: "#121a16",
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
    video: "/brand/velocity-media/ev.mp4",
  },
  {
    id: "4",
    name: "Noir S",
    trim: "Executive",
    price: "162,000",
    power: "290 hp",
    type: "سيدان",
    tone: "#1c1520",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
  },
];

export function VelocityShowroom() {
  const [active, setActive] = useState(0);

  return (
    <div
      dir="rtl"
      className="velocity-world min-h-screen bg-black text-white antialiased"
      style={{ fontFamily: "var(--font-cairo), system-ui, sans-serif" }}
    >
      <style>{`
        .velocity-world {
          --vw-red: #ef2b2d;
          --vw-blue: #2f6bff;
          --vw-amber: #e8a317;
          --vw-radius: 28px;
        }
        .vw-card {
          border-radius: var(--vw-radius);
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease;
        }
        .vw-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.45);
        }
        @keyframes vw-in {
          from { opacity: 0; transform: translateY(16px) scale(0.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .vw-in { animation: vw-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .vw-in-2 { animation: vw-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both; }
        .vw-in-3 { animation: vw-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.14s both; }
        .vw-in-4 { animation: vw-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both; }
        @media (prefers-reduced-motion: reduce) {
          .vw-card:hover { transform: none; }
          .vw-in, .vw-in-2, .vw-in-3, .vw-in-4 { animation: none; }
        }
        .vw-video {
          object-fit: cover;
          object-position: center;
          filter: saturate(1.08) contrast(1.03);
        }
      `}</style>

      {/* Minimal world-class header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[64px] max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <a href="#home" className="inline-flex items-center gap-2.5">
              <img
                src="/brand/velocity-logo-mark.png"
                alt=""
                width={40}
                height={40}
                className="size-9 object-contain"
              />
              <span className="text-[15px] font-extrabold tracking-tight">
                Velocity
              </span>
            </a>
            <nav className="hidden items-center gap-5 text-[13px] text-white/55 md:flex">
              <a href="#home" className="transition hover:text-white">
                للأفراد
              </a>
              <a href="#fleet" className="transition hover:text-white">
                المعرض
              </a>
              <a href="#services" className="transition hover:text-white">
                الخدمات
              </a>
              <a href="#visit" className="transition hover:text-white">
                تواصل
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden rounded-full px-3 py-1.5 text-xs text-white/45 transition hover:text-white sm:inline"
            >
              ← القوالب
            </Link>
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-full text-white/50 transition hover:bg-white/5 hover:text-white"
              aria-label="بحث"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
                <path d="M16.5 16.5 20 20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </button>
            <a
              href="#visit"
              className="rounded-full bg-[var(--vw-red)] px-4 py-2 text-xs font-bold text-white transition hover:brightness-110"
            >
              احجز الآن
            </a>
          </div>
        </div>
      </header>

      <main id="home" className="mx-auto max-w-[1280px] px-4 py-5 sm:px-6 sm:py-7">
        {/* Alfa-style asymmetric bento */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12 lg:grid-rows-[minmax(420px,auto)_minmax(220px,auto)]">
          {/* Hero card */}
          <article className="vw-card vw-in relative overflow-hidden bg-[var(--vw-blue)] lg:col-span-8 lg:row-span-2">
            <video
              className="vw-video absolute inset-0 h-full w-full opacity-35"
              autoPlay
              muted
              loop
              playsInline
              poster="/brand/velocity-media/hero.jpg"
            >
              <source src="/brand/velocity-media/hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_60%,rgba(255,255,255,0.16),transparent_55%)]" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#2f6bff]/80 via-[#2f6bff]/55 to-[#2f6bff]/90" />
            <div className="relative z-10 flex h-full min-h-[460px] flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div className="max-w-md">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                  Velocity Motors
                </p>
                <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.15] tracking-tight sm:text-5xl">
                  سيارة أحلامك
                  <br />
                  أقرب مما تتخيل
                </h1>
                <p className="mt-4 max-w-sm text-sm leading-6 text-white/75 sm:text-base">
                  تمويل مرن حتى 84 شهراً · تجربة قيادة مجانية · تسليم خلال 48 ساعة
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap items-center gap-3 pt-8">
                <a
                  href="#fleet"
                  className="rounded-full bg-[var(--vw-red)] px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
                >
                  اكتشف العروض
                </a>
                <a
                  href="#visit"
                  className="rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/25"
                >
                  احجز تجربة
                </a>
              </div>
            </div>
          </article>

          {/* Side card 1 — EV */}
          <article className="vw-card vw-in-2 relative overflow-hidden bg-[#d8ecff] text-[#0b1220] lg:col-span-4">
            <video
              className="vw-video absolute inset-0 h-full w-full opacity-30"
              autoPlay
              muted
              loop
              playsInline
              poster="/brand/velocity-media/ev.jpg"
            >
              <source src="/brand/velocity-media/ev.mp4" type="video/mp4" />
            </video>
            <div className="flex h-full min-h-[200px] flex-col justify-between p-5 sm:p-6">
              <div>
                <p className="text-xs font-bold text-[#2f6bff]">كهربائية</p>
                <h2 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight">
                  Pulse EV
                  <br />
                  مدى 450 كم
                </h2>
              </div>
              <div className="mt-4 flex items-end justify-between gap-3">
                <a
                  href="#fleet"
                  className="rounded-full bg-black px-4 py-2 text-xs font-bold text-white"
                >
                  التفاصيل
                </a>
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <video
                    className="h-20 w-28 object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/brand/velocity-media/ev.jpg"
                  >
                    <source src="/brand/velocity-media/ev.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </article>

          {/* Side card 2 — Finance */}
          <article className="vw-card vw-in-3 relative overflow-hidden bg-[#f3e8ff] text-[#1a1024] lg:col-span-4">
            <div className="flex h-full min-h-[200px] flex-col justify-between p-5 sm:p-6">
              <div>
                <p className="text-xs font-bold text-[#7c3aed]">تمويل</p>
                <h2 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight">
                  قسط من
                  <br />
                  1,999 ر.س / شهر
                </h2>
                <p className="mt-2 text-sm text-black/50">بدون دفعة أولى لأول 3 أشهر</p>
              </div>
              <a
                href="#visit"
                className="mt-4 inline-flex w-fit rounded-full bg-black px-4 py-2 text-xs font-bold text-white"
              >
                احسب قسطك
              </a>
            </div>
          </article>
        </div>

        {/* Second row — service tiles */}
        <div
          id="services"
          className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
        >
          {[
            {
              title: "تجربة قيادة",
              body: "احجز موعدك خلال دقائق",
              bg: "#ffe8c8",
              fg: "#3a2208",
              cta: "احجز",
            },
            {
              title: "ضمان 5 سنوات",
              body: "صيانة معتمدة في شبكتنا",
              bg: "#e8f8ef",
              fg: "#0f2a1a",
              cta: "اعرف أكثر",
            },
            {
              title: "استبدال فوري",
              body: "قيّم سيارتك الحالية الآن",
              bg: "#efe9ff",
              fg: "#1c1230",
              cta: "قيّم",
            },
            {
              title: "توصيل للمنزل",
              body: "في الرياض وجدة والدمام",
              bg: "#e7f0ff",
              fg: "#0e1a33",
              cta: "المناطق",
            },
          ].map((card, i) => (
            <article
              key={card.title}
              className={`vw-card overflow-hidden p-5 sm:p-6 ${
                i === 0 ? "vw-in" : i === 1 ? "vw-in-2" : i === 2 ? "vw-in-3" : "vw-in-4"
              }`}
              style={{ background: card.bg, color: card.fg }}
            >
              <h3 className="text-xl font-extrabold tracking-tight">{card.title}</h3>
              <p className="mt-2 text-sm opacity-60">{card.body}</p>
              <a
                href="#visit"
                className="mt-6 inline-flex rounded-full bg-black/90 px-3.5 py-1.5 text-xs font-bold text-white"
              >
                {card.cta}
              </a>
            </article>
          ))}
        </div>

        {/* Fleet gallery */}
        <section id="fleet" className="mt-14 sm:mt-16">
          <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                المعرض
              </h2>
              <p className="mt-2 text-sm text-white/45">
                موديلات مختارة — اضغط للتركيز على السيارة
              </p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {cars.map((car, i) => (
                <button
                  key={car.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                    active === i
                      ? "bg-white text-black"
                      : "bg-white/8 text-white/60 hover:bg-white/12 hover:text-white"
                  }`}
                >
                  {car.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:gap-4 lg:grid-cols-12">
            <article
              className="vw-card relative min-h-[320px] overflow-hidden lg:col-span-7"
              style={{ background: cars[active].tone }}
            >
              {cars[active].video ? (
                <video
                  key={cars[active].video}
                  className="vw-video absolute inset-0 h-full w-full opacity-80"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={cars[active].image}
                >
                  <source src={cars[active].video} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={cars[active].image}
                  alt={cars[active].name}
                  className="absolute inset-0 h-full w-full object-cover opacity-80"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-end p-6 sm:p-8">
                <p className="text-xs font-semibold text-[var(--vw-amber)]">
                  {cars[active].type} · {cars[active].trim}
                </p>
                <h3 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {cars[active].name}
                </h3>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <p className="text-lg font-bold">
                    {cars[active].price}{" "}
                    <span className="text-xs font-semibold text-white/45">ر.س</span>
                  </p>
                  <p className="text-sm text-white/55">{cars[active].power}</p>
                  <a
                    href="#visit"
                    className="rounded-full bg-[var(--vw-red)] px-4 py-2 text-xs font-bold"
                  >
                    احجز مشاهدة
                  </a>
                </div>
              </div>
            </article>

            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:col-span-5 lg:grid-cols-1">
              {cars
                .filter((_, i) => i !== active)
                .slice(0, 3)
                .map((car) => (
                  <button
                    key={car.id}
                    type="button"
                    onClick={() => setActive(cars.findIndex((c) => c.id === car.id))}
                    className="vw-card flex overflow-hidden bg-[#141416] text-start"
                  >
                    <img
                      src={car.image}
                      alt=""
                      className="h-28 w-32 shrink-0 object-cover sm:h-auto sm:w-36"
                    />
                    <div className="flex flex-1 flex-col justify-center p-4">
                      <p className="text-[10px] font-semibold text-white/40">
                        {car.type}
                      </p>
                      <p className="mt-1 text-base font-bold tracking-tight">
                        {car.name}
                      </p>
                      <p className="mt-1 text-xs text-white/45">
                        من {car.price} ر.س
                      </p>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </section>

        {/* Visit CTA band */}
        <section
          id="visit"
          className="vw-card mt-14 overflow-hidden bg-[#161618] sm:mt-16"
        >
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                جاهز للخطوة التالية؟
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-7 text-white/50">
                اترك بياناتك وسيتواصل معك مستشار Velocity خلال ساعة عمل — بدون
                التزام.
              </p>
            </div>
            <form
              className="grid gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm outline-none ring-[var(--vw-red)] placeholder:text-white/30 focus:ring-1"
                placeholder="الاسم"
                required
              />
              <input
                className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm outline-none ring-[var(--vw-red)] placeholder:text-white/30 focus:ring-1"
                placeholder="الجوال"
                required
              />
              <button
                type="submit"
                className="rounded-2xl bg-[var(--vw-red)] px-4 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
              >
                أرسل الطلب
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-[1280px] flex-col gap-3 px-4 py-10 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} Velocity Motors · قالب عالمي من{" "}
          <Link href="/" className="text-white/55 underline hover:text-white">
            Tool2Day Design
          </Link>
        </p>
        <p>World-class showroom template</p>
      </footer>
    </div>
  );
}
