import type { ReactNode } from "react";

/**
 * The one horizontal content grid every Stack Up section shares —
 * same max-width, same side padding, at every breakpoint. Sections
 * used to each pick their own max-width (max-w-4xl for some, max-w-6xl
 * for others) with identical padding, which put their content edges at
 * different horizontal positions once centered — this is what actually
 * fixes that, rather than nudging individual sections' margins.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}
