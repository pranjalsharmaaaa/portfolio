import type { Metadata, Viewport } from "next";
import { ListenPlayer } from "@/components/listen/listen-player";
import { listen } from "@/lib/site-content";
import styles from "@/components/listen/listen.module.css";

export const metadata: Metadata = {
  title: `${listen.title} — ${listen.artist}`,
  description: listen.subtitle,
};

export const viewport: Viewport = {
  themeColor: "#fbf6ec",
  colorScheme: "light",
  // Lets the layout extend under notches/home indicators; the page
  // pads itself back in with env(safe-area-inset-*).
  viewportFit: "cover",
};

/**
 * /listen — a standalone listening page for the QR code in the PDF
 * portfolio. Deliberately nothing but the player: no nav, no footer,
 * no links back into the portfolio.
 */
export default function ListenPage() {
  return (
    <main id="main" className={`${styles.stage} font-sans`}>
      <ListenPlayer />
    </main>
  );
}
