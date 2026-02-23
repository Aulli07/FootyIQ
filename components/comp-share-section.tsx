import { PlayerType } from "@/app/types/players";
import { poppins } from "@/app/fonts";

export default function ComparisonShareSection( {
  leftPlayer,
  rightPlayer
} : {
  leftPlayer: PlayerType | null;
  rightPlayer: PlayerType | null;
})  {
  return (
    <main className="flex gap-3 justify-center items-center px-3">
      <div className="flex flex-col justify-center items-center py-2 px-3 rounded-lg bg-emerald-700 border-emerald-400 border border-white/10 shadow-lg w-full">
        <p className={`text-sm text-white ${poppins.className} font-semibold`}>Share Comparison</p>
      </div>
      <div className="flex flex-col justify-center items-center py-2 px-3 rounded-lg bg-emerald-700 border-emerald-400 border border-white/10 shadow-lg w-full">
        <p className={`text-sm text-white ${poppins.className} font-semibold`}>Make Post</p>
      </div>
    </main>
  )
}