import { 
  Hero, 
  LeistungenBento, 
  LicenseConfigurator,
  FleetAndSimulator,
  TrustAndSupport,
  Team,
} from "@/components/sections";

export default function Home() {
  return (
    <main>
      <Hero />
      <LeistungenBento />
      <FleetAndSimulator />
      <TrustAndSupport />
      <Team />
      <LicenseConfigurator />
    </main>
  );
}
