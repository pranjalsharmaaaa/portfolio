/**
 * The small sky in the /about page's top right corner: two soft cloud
 * banks and a hatched sun behind them (a pale moon at night). Purely
 * decorative; colours come from the `.about-page` tokens.
 */
export function AboutSky() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 380 120"
      className="pointer-events-none absolute top-[64px] right-0 hidden w-[clamp(220px,26vw,400px)] sm:block"
    >
      <defs>
        <pattern id="about-sun-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <rect width="3.6" height="7" style={{ fill: "var(--ap-sun)" }} />
        </pattern>
      </defs>
      <circle cx="268" cy="44" r="34" fill="url(#about-sun-hatch)" />
      <g style={{ fill: "var(--ap-cloud)", transition: "fill 500ms ease" }}>
        <ellipse cx="128" cy="92" rx="118" ry="26" />
        <circle cx="92" cy="74" r="28" />
        <circle cx="140" cy="62" r="38" />
        <circle cx="190" cy="78" r="26" />
      </g>
      <g style={{ fill: "var(--ap-cloud-front)", transition: "fill 500ms ease" }}>
        <ellipse cx="318" cy="104" rx="86" ry="18" />
        <circle cx="296" cy="88" r="24" />
        <circle cx="338" cy="84" r="28" />
      </g>
    </svg>
  );
}
