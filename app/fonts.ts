import { Poppins, Montserrat, Audiowide } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

export const oswald = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-oswald",
});

export const orbitron = Audiowide({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-orbitron",
});
