/**
 * Only one registered <audio> element plays at a time.
 *
 * If a player is mounted more than once (two instances on a page, or a
 * stray remount), starting one pauses every other registered element,
 * so the recording can never play over itself.
 */
const registered = new Set<HTMLAudioElement>();

function onPlay(this: HTMLAudioElement) {
  for (const other of registered) {
    if (other !== this && !other.paused) other.pause();
  }
}

/** Register an element; returns the cleanup that unregisters it. */
export function registerExclusiveAudio(audio: HTMLAudioElement) {
  registered.add(audio);
  audio.addEventListener("play", onPlay);
  return () => {
    audio.removeEventListener("play", onPlay);
    registered.delete(audio);
  };
}
