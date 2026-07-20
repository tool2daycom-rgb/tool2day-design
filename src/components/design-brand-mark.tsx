/** شعار الأربع مربعات شفاف — مع حركة توسّع ودوران اختيارية */
export function DesignBrandMark({
  size = 20,
  className = "",
  animated = false,
}: {
  size?: number;
  className?: string;
  animated?: boolean;
}) {
  const gap = Math.max(1.5, size * 0.1);
  const radius = Math.max(3, size * 0.22);

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span
        className={`inline-grid grid-cols-2 grid-rows-2 ${
          animated ? "animate-brand-spin" : ""
        }`}
        style={{
          width: "100%",
          height: "100%",
          gap,
        }}
      >
        <span
          className="block"
          style={{ background: "#F5C518", borderRadius: radius }}
        />
        <span
          className="block"
          style={{ background: "#5BCCF6", borderRadius: radius }}
        />
        <span
          className="block"
          style={{ background: "#B48CF0", borderRadius: radius }}
        />
        <span
          className="block"
          style={{ background: "#F071A8", borderRadius: radius }}
        />
      </span>
    </span>
  );
}
