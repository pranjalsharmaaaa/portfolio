import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * True only once the component has hydrated on the client.
 *
 * Used to defer theme-dependent rendering (next-themes doesn't know the
 * visitor's preference during SSR) without the classic
 * `useState(false)` + `useEffect(() => setState(true))` pattern, which
 * causes an avoidable extra render.
 */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
