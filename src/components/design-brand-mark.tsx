/** شعار الأربع مربعات بأسلوب Bento — ثابت أو متحرك (توسّع + دوران) */
export function DesignBrandMark({
  size = 20,
  className = "",
  animated = false,
}: {
  size?: number;
  className?: string;
  animated?: boolean;
}) {
  if (animated) {
    return (
      <video
        className={`shrink-0 object-cover ${className}`}
        style={{ width: size, height: size }}
        src="/brand/brand-mark-spin.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
      />
    );
  }

  return (
    <span
      className={`inline-grid shrink-0 grid-cols-2 grid-rows-2 ${className}`}
      style={{
        width: size,
        height: size,
        gap: Math.max(1.5, size * 0.1),
      }}
      aria-hidden
    >
      <span
        className="block"
        style={{
          background: "#F5C518",
          borderRadius: Math.max(3, size * 0.22),
        }}
      />
      <span
        className="block"
        style={{
          background: "#5BCCF6",
          borderRadius: Math.max(3, size * 0.22),
        }}
      />
      <span
        className="block"
        style={{
          background: "#B48CF0",
          borderRadius: Math.max(3, size * 0.22),
        }}
      />
      <span
        className="block"
        style={{
          background: "#F071A8",
          borderRadius: Math.max(3, size * 0.22),
        }}
      />
    </span>
  );
}
