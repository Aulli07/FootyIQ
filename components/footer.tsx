"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { poppins } from "../app/fonts";

function Footer() {
  const pathname = usePathname();
  const footerLinks = [
    {
      to: "/",
      icon: "/images/home-light.png",
      activeIcon: "/images/home-light-fill.png",
      alt: "home-icon",
      header: "Footy IQ",
      title: "Home",
      width: 6,
      height: 6,
    },
    {
      to: "/compare",
      icon: "/images/swap-light.png",
      activeIcon: "/images/swap-light-fill.png",
      alt: "compare-icon",
      header: "Compare",
      title: "Compare",
      width: 6,
      height: 6,
    },
    {
      to: "/talks",
      icon: "/images/history-light.png",
      activeIcon: "/images/history-light-fill.png",
      alt: "talks-icon",
      header: "Talks",
      title: "Talks",
      width: 6,
      height: 6,
    },
    {
      to: "/profile",
      icon: "/images/history-light.png",
      activeIcon: "/images/history-light-fill.png",
      alt: "profile-icon",
      header: "Profile",
      title: "Profile",
      width: 6,
      height: 6,
    },
    // {
    //   to: "/history",
    //   icon: "/images/history-light.png",
    //   activeIcon: "/images/his
    // tory-light-fill.png",
    //   alt: "history-icon",
    //   header: "History",
    //   title: "History",
    //   width: 7,
    //   height: 7,
    // },
  ];
  const normalizePath = (p: string) =>
    p.length > 1 ? p.replace(/\/+$/, "") : p;
  const current = normalizePath(pathname);
  const isActive = (to: string) => {
    const target = normalizePath(to);
    if (target === "/") return current === "/";
    return current === target || current.startsWith(target + "/");
  };

  return (
    <nav className="bg-black/90 backdrop-blur w-full fixed bottom-0 left-0 right-0 z-50 flex flex-row justify-between px-6 py-5 border-t border-white/50">
      {footerLinks.map((link) => {
        const active = isActive(link.to);
        return (
          <Link
            href={link.to}
            key={link.to}
            className="flex flex-col gap-1 items-center select-none"
            aria-current={active ? "page" : undefined}
          >
            <div className="relative w-6 h-6">
              <Image
                src={active ? link.activeIcon : link.icon}
                alt={link.alt}
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>

            <p
              className={`${poppins.className} text-sm ${
                active ? "text-white text-md" : "text-white/70"
              } font-semibold tracking-wide`}
            >
              {link.title}
            </p>
          </Link>
        );
      })}
    </nav>
  );
}

export default Footer;
