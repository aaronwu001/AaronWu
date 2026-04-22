import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Your Name — Portfolio",
  description: "Software projects, writing, and video walkthroughs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>
        <Nav />
        {children}
        <footer>
          <p>© {new Date().getFullYear()} Your Name</p>
        </footer>
      </body>
    </html>
  );
}
