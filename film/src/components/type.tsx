import { Fragment, type CSSProperties, type ReactNode } from "react";
import { useCurrentFrame } from "remotion";
import { settle } from "../motion/ease";
import { color, type } from "../theme/tokens";

/**
 * Inline markup: **bold** and ==green accent==. Keeps scene copy readable
 * and identical to the case study's emphasis.
 */
export const Rich = ({ text, boldColor }: { text: string; boldColor?: string }) => {
  const parts = text.split(/(\*\*[^*]+\*\*|==[^=]+==)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") ? <strong key={i} style={{ fontWeight: 700, color: boldColor }}>{p.slice(2, -2)}</strong>
        : p.startsWith("==") ? <span key={i} style={{ color: color.brand }}>{p.slice(2, -2)}</span>
        : <Fragment key={i}>{p}</Fragment>,
      )}
    </>
  );
};

type Placed = { x: number; y: number; start: number; width?: number; align?: "left" | "center"; exit?: number; style?: CSSProperties };

const Block = ({ x, y, width, align = "left", style, children, opacityMul = 1 }: Placed & { children: ReactNode; opacityMul?: number }) => (
  <div style={{
    position: "absolute", left: align === "center" ? x - (width ?? 1600) / 2 : x, top: y, width: width ?? (align === "center" ? 1600 : undefined),
    textAlign: align, opacity: opacityMul, ...style,
  }}>{children}</div>
);

const useExit = (exit?: number) => {
  const frame = useCurrentFrame();
  if (exit === undefined) return 1;
  return 1 - Math.min(Math.max((frame - exit) / 10, 0), 1);
};

export const Label = ({ text, ...p }: Placed & { text: string }) => {
  const frame = useCurrentFrame();
  return (
    <Block {...p} opacityMul={useExit(p.exit)}>
      <div style={{ ...type.label, ...settle(frame, p.start) }}>{text}</div>
    </Block>
  );
};

/**
 * Two-tone display heading, the case study's signature: ink line(s) first,
 * the green accent line 6 frames later. Each line settles in.
 */
export const Display = ({
  lines, size = type.display.fontSize, ...p
}: Placed & { lines: { text: string; green?: boolean }[]; size?: number }) => {
  const frame = useCurrentFrame();
  return (
    <Block {...p} opacityMul={useExit(p.exit)}>
      {lines.map((l, i) => (
        <div key={i} style={{
          fontSize: size, lineHeight: `${Math.round(size * 1.08)}px`, fontWeight: 700, letterSpacing: "-0.02em",
          color: l.green ? color.brand : color.ink, ...settle(frame, p.start + i * 6),
        }}>{l.text}</div>
      ))}
    </Block>
  );
};

export const Statement = ({ text, ...p }: Placed & { text: string }) => {
  const frame = useCurrentFrame();
  return (
    <Block {...p} opacityMul={useExit(p.exit)}>
      <div style={{ ...type.statement, color: color.ink, ...settle(frame, p.start, 14) }}><Rich text={text} /></div>
    </Block>
  );
};

export const Body = ({ text, size = type.body.fontSize, ...p }: Placed & { text: string; size?: number }) => {
  const frame = useCurrentFrame();
  return (
    <Block {...p} opacityMul={useExit(p.exit)}>
      <div style={{ fontSize: size, lineHeight: `${Math.round(size * 1.4)}px`, color: color.ink, ...settle(frame, p.start) }}><Rich text={text} /></div>
    </Block>
  );
};

/** Inter Italic note in deep green — the designer's hand (borrowed from Direction A). */
export const Annotation = ({ text, ...p }: Placed & { text: string }) => {
  const frame = useCurrentFrame();
  return (
    <Block {...p} opacityMul={useExit(p.exit)}>
      <div style={{ ...type.annotation, ...settle(frame, p.start) }}>{text}</div>
    </Block>
  );
};
