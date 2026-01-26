"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { poppins } from "../fonts";

function Footer ({
  setHeaderText,
}: {
  setHeaderText: (text: string) => void;
}) {
  const pathname = usePathname();
  const footerLinks = [
    {
      to: "/",
      icon: "/images/home-light.png",
      activeIcon: "/images/home-light-fill.png",
      alt: "home-icon",
      header: "Footy IQ",
      title: "Home",
      width: 7,
      height: 7,
    },
    {
      to: "/compare",
      icon: "/images/swap-light.png",
      activeIcon: "/images/swap-light-fill.png",
      alt: "compare-icon",
      header: "Compare",
      title: "Compare",
      width: 7,
      height: 7,
    },
    {
      to: "/history",
      icon: "/images/history-light.png",
      activeIcon: "/images/history-light-fill.png",
      alt: "history-icon",
      header: "History",
      title: "History",
      width: 7,
      height: 7,
    },
  ];
  const isActive = (to: string) => pathname === to;

  return (
    <main className="bg-black w-full fixed bottom-0 flex flex-row justify-between pl-6 pr-6 pt-3 pb-3 border-t border-gray-700">
      {footerLinks.map((link) => (
        <Link href={link.to} key={link.to}>
          <div className="flex flex-col gap-1 items-center">
            <div className="relative w-6 h-6">
              <Image src={isActive(link.to) ? link.activeIcon : link.icon} alt={link.alt} fill sizes="32px" className="relative w-6 h-6" onClick={() => {
                setHeaderText(link.header);
              }}/>
            </div>
          
            <p className={`text-white ${poppins.className}`}>{link.title}</p>
          </div>
        </Link>
      ))}
      
    </main>
  );
}

export default Footer;