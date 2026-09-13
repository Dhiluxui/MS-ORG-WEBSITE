import { GlitchText } from "@/components/ui/GlitchText";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { StatsTicker } from "@/components/home/StatsTicker";
import { GameDivisions } from "@/components/home/GameDivisions";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { TournamentSpotlight } from "@/components/home/TournamentSpotlight";
import { MerchStream } from "@/components/home/MerchStream";
import { Sponsors } from "@/components/home/Sponsors";
import { CommunityJoinCTA } from "@/components/home/CommunityJoinCTA";
import Link from "next/link";
import { HeroSection } from "@/components/home/HeroSection";
import { AuthRedirect } from "@/components/auth/AuthRedirect";

export default function Home() {
  return (
    <>
      <AuthRedirect />
      <HeroSection />

      {/* S2: STATS TICKER */}
      <StatsTicker />

      {/* S3: GAME DIVISIONS */}
      <GameDivisions />

      {/* S4: ABOUT TEASER */}
      <AboutTeaser />

      {/* S5: TOURNAMENTS */}
      <TournamentSpotlight />

      {/* S6: MERCH + STREAM */}
      <MerchStream />

      {/* S7: SPONSORS */}
      <Sponsors />

      {/* S8: COMMUNITY */}
      <CommunityJoinCTA />
    </>
  );
}

