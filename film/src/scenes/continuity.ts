/**
 * Positions shared across scene boundaries. When a scene ends on a "cut"
 * or a match-cut, the next scene starts from these same numbers, so the
 * world never jumps. Change a value here and both sides move together.
 */
export const C = {
  /** S1–S2: the salary coin stack and the character at the desk. */
  stackX: 700,
  deskCharX: 1400,
  /** S3: two leftover coins at the character's feet. */
  leftoverX: 700,

  /** S8–S9: the five-part "bigger picture" row on the ground line. */
  rowX: [250, 520, 790, 1060, 1330] as const,
  rowCharX: 1660,

  /** S9–S10: where the Stack Up mark is born (stage centre). */
  markCenter: { x: 960, y: 470 },

  /** Phone centre-x per scene, start → end (Acts 4–6). */
  phone: {
    S10: 1240,
    S11: 1240,
    S12: 760,
    S13: 960,
    S14: 960,
    S15: 1260,
    S16: 480,
  },
} as const;
