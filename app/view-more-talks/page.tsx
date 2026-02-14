"use client"

import MoreTalks from "../components/view-more-talks-comp";
import { useSearchParams } from "next/navigation";

export default function ViewMorePage() {
  const searchParams = useSearchParams();
  const leftPlayerId = searchParams.get("leftPlayerId");
  const rightPlayerId = searchParams.get("rightPlayerId");
  
  return <MoreTalks leftPlayerId={leftPlayerId} rightPlayerId={rightPlayerId} />;
}