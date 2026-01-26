// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function Navigation({
//   setHeaderText,
// }: {
//   setHeaderText: (text: string) => void;
// }) {
//   const pathname = usePathname();
//   const navLinks = [
//     {
//       to: "/",
//       icon: "/images/home-light.png",
//       activeIcon: "/images/home-light-fill.png",
//       alt: "home-icon",
//       header: "FOOTY IQ",
//       width: 7,
//       height: 7,
//     },
//     {
//       to: "/history",
//       icon: "/images/history-dark.png",
//       activeIcon: "/images/history-dark-fill.png",
//       alt: "history-icon",
//       header: "HISTORY",
//       width: 7,
//       height: 7,
//     },
//   ];
//   const isActive = (to: string) => pathname === to;

//   return (
//     <nav className="flex flex-row gap-5">
//       {navLinks.map((link) => (
//         <Link href={link.to} key={link.to} className={"relative w-" + link.width + " h-" + link.height}>
//           <Image
//             src={isActive(link.to) ? link.activeIcon : link.icon}
//             alt={link.alt}
//             fill
//             sizes="32px"
//             onClick={() => {
//               setHeaderText(link.header);
              
//             }}
//           />
//         </Link>
//       ))}
      
//     </nav>
//   );
// }
