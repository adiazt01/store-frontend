import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import NavbarNext from "@/components/navbar/NavbarNext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "App home page",
  description: "This is the home page of the app",
};

export default function RootLayout({ children }) {
  return (
    <html className="dark" lang="en">
      <body className={inter.className}>
        <Providers>
          <NavbarNext />
          <div className="container">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
