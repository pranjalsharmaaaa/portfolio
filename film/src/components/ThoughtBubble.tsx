import { useCurrentFrame } from "remotion";
import { prog } from "../motion/ease";
import { color } from "../theme/tokens";

/**
 * Hand-drawn thought bubble: outline strokes on, then text fades in,
 * then the two tail dots pop toward the character. Matches the kit's
 * bubble style (white fill, 2.5px ink, soft wobble).
 */
export const ThoughtBubble = ({
  x, y, w, h, text, start, tail = "left", fontSize = 30, opacity = 1, scale = 1,
}: {
  x: number; y: number; w: number; h: number; text: string; start: number;
  tail?: "left" | "right"; fontSize?: number; opacity?: number; scale?: number;
}) => {
  const frame = useCurrentFrame();
  const draw = prog(frame, start, 14);
  const txt = prog(frame, start + 10, 10);
  const dots = [prog(frame, start + 14, 6), prog(frame, start + 18, 6)];
  // a soft, slightly irregular rounded blob
  const d = `M ${w * 0.5} 2 C ${w * 0.86} 0, ${w - 2} ${h * 0.2}, ${w - 2} ${h * 0.5} C ${w} ${h * 0.84}, ${w * 0.8} ${h - 2}, ${w * 0.5} ${h - 2} C ${w * 0.16} ${h}, 2 ${h * 0.82}, 2 ${h * 0.5} C 0 ${h * 0.18}, ${w * 0.18} 4, ${w * 0.5} 2 Z`;
  const side = tail === "right" ? 1 : -1;
  const dot = (i: number) => ({
    cx: w / 2 + side * (w * 0.18 + i * 26),
    cy: h + 22 + i * 28,
    r: 12 - i * 4,
  });
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h + 90, opacity, transform: `scale(${scale})`, transformOrigin: "50% 100%" }}>
      <svg width={w} height={h + 90} style={{ position: "absolute", overflow: "visible" }}>
        <path d={d} fill="white" fillOpacity={draw} stroke={color.ink} strokeWidth={2.5} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
        {[0, 1].map((i) => (
          <circle key={i} {...dot(i)} fill="white" stroke={color.ink} strokeWidth={2.5} style={{ transform: `scale(${dots[i]})`, transformOrigin: `${dot(i).cx}px ${dot(i).cy}px` }} />
        ))}
      </svg>
      <div style={{
        position: "absolute", inset: 0, height: h, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "0 34px", textAlign: "center", fontSize, lineHeight: `${fontSize * 1.25}px`, fontWeight: 500, color: color.ink, opacity: txt,
      }}>{text}</div>
    </div>
  );
};
