import { yanaDass } from "@/lib/yana-prototype-content";
import { YanaFrame, YANA_SCREEN_Y } from "@/components/yana/frame";
import { YanaSectionHeading } from "@/components/yana/section-heading";

const HAIRLINE = "color-mix(in srgb, var(--yana-purple) 16%, transparent)";

function Points({ title, points }: { title: string; points: readonly string[] }) {
  return (
    <div>
      <h3 className="text-[19px] font-semibold sm:text-[20px]" style={{ color: "var(--yana-ink)" }}>
        {title}
      </h3>
      <ul className="mt-4 flex flex-col gap-3">
        {points.map((point) => (
          <li key={point} className="flex gap-3 text-[16px] leading-relaxed sm:text-[17px]" style={{ color: "var(--yana-muted)" }}>
            <span aria-hidden="true" className="mt-[0.6em] size-2 shrink-0 rounded-full" style={{ background: "var(--yana-purple)" }} />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * "Mental Health Assessment using DASS-21": the explainer card (pink as
 * in the reference) leads, Why / How sit side by side under it, and the
 * scoring table takes the right column. The table stays a quiet card;
 * the only signal of severity is a dot that deepens row by row, so it
 * reads as a reference, not a clinical dashboard.
 */
export function YanaDassSection() {
  const { heading, what, why, how, table, note } = yanaDass;
  return (
    <section aria-label="Mental health assessment using DASS-21" className={YANA_SCREEN_Y}>
      <YanaFrame>
        <YanaSectionHeading>{heading}</YanaSectionHeading>

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:gap-14">
          <div className="flex flex-col gap-9">
            <div
              className="rounded-[24px] p-6 sm:p-8"
              style={{ background: "color-mix(in srgb, var(--yana-pink-light) 28%, white)", border: "1px solid color-mix(in srgb, var(--yana-pink) 22%, transparent)" }}
            >
              <h3 className="text-[19px] font-semibold sm:text-[20px]" style={{ color: "var(--yana-purple)" }}>
                {what.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {what.points.map((point) => (
                  <li key={point} className="flex gap-3 text-[16px] leading-relaxed sm:text-[17px]" style={{ color: "var(--yana-ink)" }}>
                    <span aria-hidden="true" className="mt-[0.6em] size-2 shrink-0 rounded-full" style={{ background: "var(--yana-pink)" }} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-9 sm:grid-cols-2 sm:gap-8">
              <Points {...why} />
              <Points {...how} />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="overflow-hidden rounded-[24px] bg-white" style={{ border: `1px solid ${HAIRLINE}` }}>
              <table className="w-full border-collapse text-left text-[14px] sm:text-[17px]">
                <caption className="sr-only">DASS-21 severity ratings by score</caption>
                <thead>
                  <tr style={{ background: "var(--yana-purple-light)", color: "var(--yana-purple)" }}>
                    <th scope="col" className="px-3 py-3.5 font-semibold sm:px-5">
                      <span className="sr-only">Severity</span>
                    </th>
                    {table.columns.map((col) => (
                      <th key={col} scope="col" className="px-1.5 py-3.5 text-center font-semibold sm:px-4">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, i) => (
                    <tr key={row.level} style={{ borderTop: i ? `1px solid ${HAIRLINE}` : undefined }}>
                      <th scope="row" className="px-3 py-3.5 font-medium sm:px-5" style={{ color: "var(--yana-ink)" }}>
                        <span className="flex items-center gap-2.5">
                          <span
                            aria-hidden="true"
                            className="hidden size-2.5 shrink-0 rounded-full sm:block"
                            style={{ background: `color-mix(in srgb, var(--yana-purple) ${20 + i * 20}%, var(--yana-purple-light))` }}
                          />
                          {row.level}
                        </span>
                      </th>
                      {row.values.map((value, j) => (
                        <td key={j} className="px-1.5 py-3.5 text-center whitespace-nowrap tabular-nums sm:px-4" style={{ color: "var(--yana-ink)" }}>
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-[15px] leading-relaxed font-semibold sm:text-[16px]" style={{ color: "var(--yana-ink)" }}>
              {note}
            </p>
          </div>
        </div>
      </YanaFrame>
    </section>
  );
}
