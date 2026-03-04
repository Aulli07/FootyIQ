import "./globals.css";
import React from "react";
import AppShell from "../components/app-shell";
import { oswald, poppins } from "./fonts";

import ThemeProvider from "./providers/providers";

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
