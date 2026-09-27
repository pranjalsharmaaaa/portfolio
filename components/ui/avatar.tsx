import Image from "next/image";

/**
 * Small circular photo used in the glass nav.
 *
 * Ships with a placeholder gradient monogram — replace by dropping a
 * real photo at /public/images/avatar.jpg and swapping the `src` below.
 * No other component needs to change.
 */
export function Avatar() {
  return (
    <Image
      src="/images/avatar-placeholder.svg"
      alt="Pranjal Sharma"
      width={32}
      height={32}
      priority
      className="h-8 w-8 shrink-0 rounded-full ring-1 ring-ink/10"
    />
  );
}
