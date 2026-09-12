import { AboutSection } from "@/components/about/about-section";
import { CloudTransition } from "@/components/hero/cloud-transition";
import { Hero } from "@/components/hero/hero";
import { LoadingScreen } from "@/components/ui/loading-screen";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Hero />
      <CloudTransition />
      <AboutSection />
    </>
  );
}
