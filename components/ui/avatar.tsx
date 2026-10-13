import Image from "next/image";

/**
 * Small circular photo used in the glass nav: Pranjal's portrait,
 * pre-cropped square around the face (public/images/pranjal-avatar.jpg,
 * 256px, so it stays sharp on 2× screens). `object-cover` with the focus
 * a little above centre keeps the face in frame; the soft ring separates
 * it from the translucent nav in either theme.
 */
export function Avatar() {
  return (
    <Image
      src="/images/pranjal-avatar.jpg"
      alt="Pranjal"
      width={34}
      height={34}
      sizes="34px"
      priority
      className="h-[34px] w-[34px] shrink-0 rounded-full object-cover object-[50%_40%] ring-1 ring-ink/15"
    />
  );
}
