import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "./Provider";
import { cn } from "@/utils/cn";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-white text-black dark:bg-black/95 dark:text-white",
          inter.className
        )}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
