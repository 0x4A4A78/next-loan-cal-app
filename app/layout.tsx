import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lendly | คำนวณสินเชื่อ",
  description: "คำนวณค่างวดและตารางผ่อนชำระสินเชื่อ",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
