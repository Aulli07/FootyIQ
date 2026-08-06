"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { poppins } from "@/app/font-icons/fonts";

import { footerLinks } from "../data/footer-link-data";






function Footer() {
  const pathname = usePathname();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";


  const normalizePath = (p: string) =>
    p.length > 1 ? p.replace(/\/+$/, "") : p;
  const current = normalizePath(pathname);
  const isActive = (to: string) => {
    const target = normalizePath(to);
    if (target === "/") return current === "/";
    return current === target || current.startsWith(target + "/");
  };

  return (
    <nav className="bg-light-background-card dark:bg-dark-background-card/90 backdrop-blur fixed bottom-13 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-50 flex flex-row justify-between px-6 border border-light-ui-border dark:border-dark-ui-border rounded-full items-center h-17 w-[90%] shadow-md">
      {footerLinks.map((link) => {
        const active = isActive(link.to);
        const iconSrc = active
          ? isDark
            ? link.lightActiveIcon
            : link.darkActiveIcon
          : isDark
            ? link.lightIcon
            : link.darkIcon;

        return (
          <Link
            href={link.to}
            key={link.to}
            className="flex flex-col gap-1 items-center select-none"
            aria-current={active ? "page" : undefined}
          >
            <div className="relative w-6 h-6">
              {mounted ? (
                <Image
                  key={`${link.to}-${currentTheme}-${active ? "active" : "idle"}`}
                  src={iconSrc}
                  alt={link.alt}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              ) : null}
            </div>

            <p
              className={`${poppins.className} text-xs ${
                active
                  ? "text-light-text-primary dark:text-dark-text-primary text-md"
                  : "text-light-text-secondary dark:text-dark-text-secondary"
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
