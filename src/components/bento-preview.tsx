import type { ReactNode } from "react";
import type { DesignTemplate } from "@/lib/templates";

const cell =
  "rounded-xl border border-white/10 bg-white/[0.04] overflow-hidden relative";

function MiniChart({ color }: { color: string }) {
  return (
    <div className="flex h-full items-end gap-1 px-3 pb-3 pt-4">
      {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm opacity-90"
          style={{
            height: `${h}%`,
            background: `linear-gradient(180deg, ${color}, transparent)`,
          }}
        />
      ))}
    </div>
  );
}

export function BentoPreview({ item }: { item: DesignTemplate }) {
  const dark = item.theme === "dark";
  const shell = dark
    ? "bg-[#0c0c0e] text-white"
    : "bg-[#f3f4f6] text-[#111]";
  const tile = dark
    ? "border-white/10 bg-white/[0.05]"
    : "border-black/8 bg-white shadow-sm";

  const layouts: Record<DesignTemplate["layout"], ReactNode> = {
    a: (
      <div className="grid h-full grid-cols-3 grid-rows-3 gap-2 p-2.5">
        <div
          className={`${cell} ${tile} col-span-2 row-span-2 flex flex-col justify-between p-3`}
        >
          <p className="text-[10px] uppercase tracking-widest opacity-50">
            Product
          </p>
          <p className="text-lg font-semibold leading-tight">
            {item.title.split(" ")[0]}
          </p>
          <div
            className="mt-2 h-8 w-8 rounded-full"
            style={{ background: item.accent }}
          />
        </div>
        <div className={`${cell} ${tile} row-span-2`}>
          <MiniChart color={item.accent} />
        </div>
        <div
          className={`${cell} ${tile} col-span-2 flex items-center gap-2 px-3`}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: item.accent }}
          />
          <span className="text-[11px] opacity-70">Live metrics</span>
        </div>
        <div
          className={`${cell} flex items-center justify-center text-xs font-bold`}
          style={{ background: `${item.accent}22`, color: item.accent }}
        >
          UI
        </div>
      </div>
    ),
    b: (
      <div className="grid h-full grid-cols-4 grid-rows-3 gap-2 p-2.5">
        <div className={`${cell} ${tile} col-span-2 row-span-2 p-3`}>
          <p className="text-2xl font-bold tracking-tight">2.4k</p>
          <p className="mt-1 text-[10px] opacity-50">Active users</p>
          <div className="mt-4 h-16">
            <MiniChart color={item.accent} />
          </div>
        </div>
        <div className={`${cell} ${tile} col-span-2 p-3`}>
          <p className="text-[10px] opacity-50">Storage</p>
          <p className="text-xl font-semibold">1.6TB</p>
        </div>
        <div
          className={`${cell} ${tile} col-span-2 flex items-center gap-2 p-3`}
        >
          <div className="flex -space-x-1.5">
            {["#22d3ee", "#a78bfa", "#f472b6"].map((c) => (
              <span
                key={c}
                className="h-5 w-5 rounded-full border border-black/30"
                style={{ background: c }}
              />
            ))}
          </div>
          <span className="text-[10px] opacity-60">Integrations</span>
        </div>
        <div
          className={`${cell} col-span-4 flex items-center px-3 font-mono text-[10px]`}
          style={{ background: "#0a0a0a", color: item.accent }}
        >
          {`>`} deploy --prod ready
        </div>
      </div>
    ),
    c: (
      <div className="grid h-full grid-cols-3 grid-rows-4 gap-2 p-2.5">
        <div
          className={`${cell} col-span-3 row-span-2 relative overflow-hidden`}
          style={{
            background: `radial-gradient(circle at 70% 30%, ${item.accent}55, transparent 45%), #111`,
          }}
        >
          <div className="absolute inset-0 flex items-end p-3">
            <p className="text-sm font-semibold">{item.tags[0] ?? "App UI"}</p>
          </div>
        </div>
        <div className={`${cell} ${tile} p-2.5`}>
          <p className="text-lg font-bold">12K</p>
          <p className="text-[9px] opacity-50">Sessions</p>
        </div>
        <div className={`${cell} ${tile} p-2.5`}>
          <p className="text-lg font-bold">98%</p>
          <p className="text-[9px] opacity-50">Uptime</p>
        </div>
        <div className={`${cell} ${tile} p-2.5`}>
          <p className="text-lg font-bold">4.9</p>
          <p className="text-[9px] opacity-50">Rating</p>
        </div>
        <div
          className={`${cell} ${tile} col-span-3 flex items-center justify-between px-3`}
        >
          <span className="text-[11px] opacity-70">Mobile screens</span>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{ background: `${item.accent}33`, color: item.accent }}
          >
            {item.variants ?? 1} screens
          </span>
        </div>
      </div>
    ),
    d: (
      <div className="grid h-full grid-cols-2 grid-rows-3 gap-2 p-2.5">
        <div className={`${cell} ${tile} row-span-2 p-3`}>
          <div
            className="mb-3 aspect-square w-full rounded-lg"
            style={{
              background: `linear-gradient(135deg, ${item.accent}, #111)`,
            }}
          />
          <p className="text-xs font-semibold">Case study</p>
        </div>
        <div className={`${cell} ${tile} p-3`}>
          <p className="text-[10px] opacity-50">Brand</p>
          <p className="text-sm font-semibold">Identity</p>
        </div>
        <div className={`${cell} ${tile} p-3`}>
          <p className="text-[10px] opacity-50">Type</p>
          <p className="text-sm font-semibold">System</p>
        </div>
        <div
          className={`${cell} ${tile} col-span-2 flex items-center gap-2 px-3`}
        >
          <span className="text-[11px] opacity-70">{item.title}</span>
        </div>
      </div>
    ),
    e: (
      <div className="grid h-full grid-cols-3 grid-rows-3 gap-2 p-2.5">
        <div
          className={`${cell} ${tile} col-span-3 flex items-center justify-between px-3`}
        >
          <span className="text-xs font-semibold">Balance</span>
          <span className="text-sm font-bold" style={{ color: item.accent }}>
            $48,290
          </span>
        </div>
        <div className={`${cell} ${tile} col-span-2 row-span-2`}>
          <MiniChart color={item.accent} />
        </div>
        <div className={`${cell} ${tile} p-2.5`}>
          <p className="text-[9px] opacity-50">Cards</p>
          <p className="text-sm font-semibold">12</p>
        </div>
        <div className={`${cell} ${tile} p-2.5`}>
          <p className="text-[9px] opacity-50">Risk</p>
          <p className="text-sm font-semibold">Low</p>
        </div>
      </div>
    ),
    f: (
      <div className="grid h-full grid-cols-3 grid-rows-3 gap-2 p-2.5">
        <div
          className={`${cell} col-span-2 row-span-2 relative overflow-hidden`}
          style={{
            background: `radial-gradient(circle at 50% 40%, ${item.accent}, #050505 60%)`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="h-16 w-16 rounded-full opacity-80 blur-xl"
              style={{ background: item.accent }}
            />
          </div>
          <p className="absolute bottom-3 left-3 text-xs font-semibold">
            AI Core
          </p>
        </div>
        <div
          className={`${cell} ${tile} row-span-2 flex flex-col justify-center gap-2 p-2`}
        >
          <div className="rounded-lg bg-black/40 px-2 py-1.5 font-mono text-[9px] opacity-80">
            prompt()
          </div>
          <div className="rounded-lg bg-black/40 px-2 py-1.5 font-mono text-[9px] opacity-80">
            generate()
          </div>
        </div>
        <div
          className={`${cell} ${tile} col-span-3 flex items-center justify-between px-3`}
        >
          <span className="text-[11px]">25M tokens</span>
          <span className="text-[11px]" style={{ color: item.accent }}>
            Online
          </span>
        </div>
      </div>
    ),
    g: (
      <div className="relative h-full overflow-hidden bg-black p-2.5">
        <div className="grid h-full grid-cols-3 grid-rows-2 gap-2">
          <div className="relative col-span-2 row-span-2 overflow-hidden rounded-2xl bg-[#2f6bff]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.25),transparent_50%)]" />
            <p className="absolute start-2.5 top-2.5 text-[9px] font-bold text-white/80">
              Velocity
            </p>
            <p className="absolute start-2.5 bottom-2.5 max-w-[70%] text-[11px] font-extrabold leading-tight text-white">
              سيارة أحلامك
            </p>
            <div
              className="absolute -end-1 bottom-2 h-14 w-20 rounded-xl"
              style={{
                background: `linear-gradient(135deg, ${item.accent}, #1a1205)`,
                boxShadow: `0 8px 20px ${item.accent}55`,
              }}
            />
          </div>
          <div className="rounded-2xl bg-[#d8ecff] p-2">
            <p className="text-[8px] font-bold text-[#2f6bff]">EV</p>
            <p className="mt-1 text-[10px] font-extrabold text-[#0b1220]">
              450km
            </p>
          </div>
          <div className="rounded-2xl bg-[#f3e8ff] p-2">
            <p className="text-[8px] font-bold text-[#7c3aed]">Finance</p>
            <p className="mt-1 text-[10px] font-extrabold text-[#1a1024]">
              1,999
            </p>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div className={`h-full w-full ${shell}`}>{layouts[item.layout]}</div>
  );
}
