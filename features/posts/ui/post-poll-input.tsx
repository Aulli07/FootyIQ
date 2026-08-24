// export function PostPollInputUI() {
//   return (
//     {composerMode === "poll" &&
//     selectedPollPlayers[0] &&
//     selectedPollPlayers[1] ? (
//       <div className="relative rounded-2xl border border-light-ui-border p-3 dark:border-white/10">
//         <img
//           src="/images/swap-light-fill.png"
//           alt="no pic"
//           className="absolute -right-1 -top-3 h-7 w-7 object-cover"
//           onClick={() => {
//             setSelectedPollPlayers((prev) => {
//               const next = [...prev];
//               next[0] = "";
//               next[1] = "";
//               return next;
//             });
//           }}
//         />
//         <PollUISection
//           selectedPlayers={selectedPollPlayers}
//           setSelectedPollPlayers={setSelectedPollPlayers}
//         />
//       </div>
//     ) : null}
//   )
// }