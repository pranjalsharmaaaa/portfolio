import { stackupBenchmark, type BenchmarkProduct } from "@/lib/stackup-content";
import { Container, SECTION_Y } from "@/components/stackup/container";
import { ProductLogo } from "@/components/stackup/product-logo";

function ProductRow({ product }: { product: BenchmarkProduct }) {
  return (
    <div className="flex items-center gap-4">
      {/* Phones: every logo sits in the same 4.5rem square tile, so each
          name and description starts at the same x. Money Bhai's badge is
          a wide rectangle, not a square crop like the others: it sits
          whole, centred in a white tile (like Groww's and Frontpage's own
          white tiles), instead of claiming 40% of the row. From 640px the
          tile steps aside (`contents`) and the logo is the row's own item,
          at its natural width, as before. */}
      <div className="flex size-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white @min-[640px]:contents">
        <ProductLogo
          src={product.logo}
          name={product.name}
          className="h-full w-full shrink-0 @min-[640px]:h-[4.5rem] @min-[640px]:w-auto"
        />
      </div>
      <div className="min-w-0">
        <h3 className="font-bold" style={{ color: "var(--stackup-ink)" }}>
          {product.name}
        </h3>
        <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--stackup-muted)" }}>
          {product.description}
        </p>
      </div>
    </div>
  );
}

export function BenchmarkSection() {
  return (
    <section className={`relative ${SECTION_Y}`} style={{ background: "var(--stackup-bg)" }} aria-label="Narrowing the benchmark">
      <Container className="flex flex-col gap-10">
        <div className="w-full">
          <p className="text-xl font-bold tracking-wide uppercase @min-[640px]:text-2xl @min-[1024px]:text-3xl" style={{ color: "var(--stackup-label)" }}>
            {stackupBenchmark.label}
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed @min-[640px]:text-lg" style={{ color: "var(--stackup-ink)" }}>
            {stackupBenchmark.body}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-16 gap-y-10 @min-[1024px]:grid-cols-2">
          <div className="flex flex-col gap-10">
            {stackupBenchmark.left.map((product) => (
              <ProductRow key={product.name} product={product} />
            ))}
          </div>
          <div className="flex flex-col gap-10">
            {stackupBenchmark.right.map((product) => (
              <ProductRow key={product.name} product={product} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
