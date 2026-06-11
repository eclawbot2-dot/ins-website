/**
 * Tabor Agency typographic wordmark — pure text-based SVG, no raster assets.
 *
 * "TABOR" set strong and tight; "AGENCY" letterspaced beneath, separated by a
 * brass rule. Two color variants: "light" for white/light backgrounds (header)
 * and "dark" for navy backgrounds (footer).
 */
type WordmarkProps = {
  variant?: "light" | "dark";
  className?: string;
};

const COLORS = {
  light: { primary: "#101d33", accent: "#a47026" }, // navy-950 text, brass accent
  dark: { primary: "#ffffff", accent: "#d0a448" }, // white text, gold accent
} as const;

export default function Wordmark({ variant = "light", className = "h-10 w-auto" }: WordmarkProps) {
  const c = COLORS[variant];
  return (
    <svg
      viewBox="0 0 168 48"
      className={className}
      role="img"
      aria-label="Tabor Agency"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Tabor Agency</title>
      <text
        x="0"
        y="26"
        fill={c.primary}
        fontFamily="var(--font-inter), ui-sans-serif, system-ui, sans-serif"
        fontSize="27"
        fontWeight="800"
        letterSpacing="1.5"
      >
        TABOR
      </text>
      <rect x="1" y="33" width="22" height="2.5" rx="1.25" fill={c.accent} />
      <text
        x="30"
        y="44"
        fill={c.accent}
        fontFamily="var(--font-inter), ui-sans-serif, system-ui, sans-serif"
        fontSize="11"
        fontWeight="600"
        letterSpacing="6.5"
      >
        AGENCY
      </text>
    </svg>
  );
}
