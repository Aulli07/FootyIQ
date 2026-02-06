"use client"

import ViewComparison from "../components/view-comparison-comp";
import { useSearchParams } from "next/navigation";

export default function ViewComparisonPage() {
  const searchParams = useSearchParams();
  const leftPlayerId = searchParams.get("leftPlayerId");
  const rightPlayerId = searchParams.get("rightPlayerId");
  
  return <ViewComparison leftPlayerId={leftPlayerId} rightPlayerId={rightPlayerId} />;
}