"use client";

import { Children, useLayoutEffect, useRef, type ReactNode } from "react";

/**
 * Narrowest width (design px) a screen's composition is laid out at
 * once the stack is active (≥1024px viewports). A 1024–1279px viewport
 * scales the whole composition down rather than reflowing it, so each
 * PDF page keeps its desktop arrangement on small laptops / landscape
 * tablets. Portrait tablets and phones get the normal-flow layout.
 */
const DESIGN_MIN_WIDTH = 1280;

/**
 * The Sales Coach page-stack — same model as Stack Up's (sibling
 * `position: sticky; top: 0; height: 100svh` screens in one ordinary
 * document scroll; each next screen rises over the pinned previous one
 * by plain sticky geometry), re-implemented here so Stack Up's own
 * component stays untouched.
 *
 * One difference: Sales Coach's PDF pages vary a lot in height (p3 is
 * almost square, p15 is a wide landscape), so instead of one shared
 * canvas height every screen measures its OWN content and picks the
 * uniform scale that fits it: min(1, viewportW / canvasW,
 * viewportH / contentH). The content height doesn't depend on the
 * scale (transforms don't affect layout size), so there is no
 * measure→scale feedback loop. Measured with ResizeObserver only —
 * nothing runs on scroll, nothing intercepts the wheel.
 *
 * Screens clip with `overflow: clip` (not hidden/auto), which never
 * creates a scroll container: the browser scrollbar is the only one.
 *
 * Below 1024px (phones, portrait tablets) none of this applies: screens
 * are plain blocks and the page is a normal top-to-bottom document,
 * laid out by the sections' own 640px container breakpoint (40px
 * gutters on tablet, 20px on phones).
 */
export function ScreenStack({ children }: { children: ReactNode }) {
  return (
    <div>
      {Children.map(children, (child, i) => (
        <Screen index={i}>{child}</Screen>
      ))}
    </div>
  );
}

function Screen({ children, index }: { children: ReactNode; index: number }) {
  const screenRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const screen = screenRef.current;
    const canvas = canvasRef.current;
    const content = contentRef.current;
    if (!screen || !canvas || !content) return;
    const mq = window.matchMedia("(min-width: 1024px)");

    const apply = () => {
      if (!mq.matches) {
        canvas.style.removeProperty("width");
        canvas.style.removeProperty("height");
        canvas.style.removeProperty("transform");
        return;
      }
      const vw = screen.clientWidth;
      const vh = screen.clientHeight;
      const canvasW = Math.max(vw, DESIGN_MIN_WIDTH);
      canvas.style.width = `${canvasW}px`;
      const contentH = content.offsetHeight;
      const scale = Math.min(1, vw / canvasW, vh / Math.max(contentH, 1));
      const left = (vw - canvasW * scale) / 2;
      canvas.style.height = `${vh / scale}px`;
      canvas.style.transform = `translateX(${left}px) scale(${scale})`;
    };

    const ro = new ResizeObserver(apply);
    ro.observe(screen);
    ro.observe(content);
    mq.addEventListener("change", apply);
    apply();
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", apply);
    };
  }, []);

  return (
    <div
      ref={screenRef}
      data-sc-screen={index}
      className="relative bg-[var(--sc-bg)] lg:sticky lg:top-0 lg:h-svh lg:overflow-clip"
    >
      <div
        ref={canvasRef}
        className="@container lg:absolute lg:top-0 lg:left-0 lg:flex lg:origin-top-left lg:flex-col lg:justify-center"
      >
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
}
