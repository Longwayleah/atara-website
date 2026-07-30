import { Cormorant_Garamond, Inter } from "next/font/google";

/**
 * Primary brand font is Canela.
 * Until licensed Canela files are placed in /public/fonts, Cormorant Garamond
 * provides a refined editorial serif stand-in for headings.
 */
export const fontDisplay = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const fontBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const fontVariables = `${fontDisplay.variable} ${fontBody.variable}`;
