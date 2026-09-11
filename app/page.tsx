import { Hero } from "@/components/hero/hero";
import { LoadingScreen } from "@/components/ui/loading-screen";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Hero />
    </>
  );
}
