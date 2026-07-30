import "@/app/globals.css";
import React from "react";
import AppShell from "../shared/components/app-shell";
import { Montserrat, Poppins } from "next/font/google";

import { ThemeProvider } from "../providers/providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

const oswald = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-oswald",
});

export const metadata = {
  title: "FootyIQ",
  description: "Your Ultimate Football Comparison App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${oswald.variable}`.trim()}>
      <body className="flex flex-col bg-light-background-main dark:bg-dark-background-main min-h-screen">
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
