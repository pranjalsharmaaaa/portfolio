import { CLOUD_PATH } from "@/components/hero/sky-background";

/**
 * Square cover art for /listen.
 *
 * The rap has no standalone cover image in this repo (the MP3 carries
 * no embedded artwork, and the homepage presents it inside the CSS
 * cassette, not an image). So this is composed only from motifs the
 * site already uses: the hero sky gradient stops, the layered sun
 * colours and the hero's own cloud silhouette (CLOUD_PATH).
 *
 * To use a real cover instead, pass `src` (e.g. "/images/listen/cover.jpg")
 * and this renders that image in the same square.
 */
export function ListenArtwork({ src }: { src?: string }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element -- fixed-size square, already optimised by the author
    return <img src={src} alt="" className="block h-full w-full object-cover" />;
  }

  const clouds = [
    { x: 196, y: 118, s: 1.05, o: 1, cls: "listen-cloud-a" },
    { x: 18, y: 78, s: 0.62, o: 0.82, cls: "listen-cloud-b" },
    { x: -46, y: 250, s: 1.7, o: 1, cls: "listen-cloud-b" },
    { x: 208, y: 282, s: 1.45, o: 0.96, cls: "listen-cloud-a" },
  ];

  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden="true"
      focusable="false"
      className="block h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="listen-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a9de4" />
          <stop offset="0.55" stopColor="#6fb3ec" />
          <stop offset="1" stopColor="#fdf1dc" />
        </linearGradient>
        <radialGradient id="listen-sun-glow">
          <stop offset="0" stopColor="rgb(255 197 120)" stopOpacity="0.55" />
          <stop offset="1" stopColor="rgb(255 197 120)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="400" fill="url(#listen-sky)" />

      <circle cx="292" cy="122" r="96" fill="url(#listen-sun-glow)" />
      <circle cx="292" cy="122" r="44" fill="#ffb84d" />
      <circle cx="292" cy="122" r="33" fill="#ffdf94" />

      {clouds.map((c, i) => (
        <g key={i} className={c.cls}>
          <path
            d={CLOUD_PATH}
            fill="#fffaf2"
            opacity={c.o}
            transform={`translate(${c.x} ${c.y}) scale(${c.s})`}
          />
        </g>
      ))}
    </svg>
  );
}
