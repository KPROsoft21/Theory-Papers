import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
});

export const metadata = {
  title: "Theory Papers",
  description: "Share and discover theories and papers in any field",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${spaceMono.variable}`}>
        <div className="paintbrush-stroke paintbrush-stroke-1">
          <img src="/images/brush-stroke-1.svg" alt="" />
        </div>
        <div className="paintbrush-stroke paintbrush-stroke-2">
          <img src="/images/brush-stroke-2.svg" alt="" />
        </div>
        <div className="paintbrush-stroke paintbrush-stroke-3">
          <img src="/images/brush-stroke-3.svg" alt="" />
        </div>
        <div className="paintbrush-stroke paintbrush-stroke-4">
          <img src="/images/brush-stroke-4.svg" alt="" />
        </div>
        {children}
      </body>
    </html>
  );
}
