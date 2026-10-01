import Image from "next/image";

/**
 * Intrinsic pixel size of each cropped product-logo asset, keyed by its
 * path. Every logo is rendered at a fixed height with `w-auto`, so this
 * is the one place that records each asset's real aspect ratio — most
 * are square crops, but Money Bhai's badge is a wide rectangle, and
 * forcing it into a square box (object-cover) would crop its wordmark.
 */
const LOGO_DIMS: Record<string, { width: number; height: number }> = {
  "/images/stackup/logo-groww.webp": { width: 73, height: 73 },
  "/images/stackup/logo-kuvera.webp": { width: 73, height: 73 },
  "/images/stackup/logo-indmoney.webp": { width: 73, height: 73 },
  "/images/stackup/logo-frontpage.webp": { width: 73, height: 73 },
  "/images/stackup/logo-moneybhai.webp": { width: 150, height: 51 },
};

export function ProductLogo({
  src,
  name,
  className = "h-12 w-auto",
}: {
  src: string;
  name: string;
  className?: string;
}) {
  const dims = LOGO_DIMS[src] ?? { width: 73, height: 73 };
  return (
    <Image
      src={src}
      alt={`${name} logo`}
      width={dims.width}
      height={dims.height}
      className={`rounded-lg object-contain ${className}`}
    />
  );
}
