import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "TicTacToe Game",
  description:
    "Tic Tac Toe is a classic two-player strategy game played on a NxN grid. Players take turns marking X or O in empty squares, aiming to align N of their symbols horizontally, vertically, or diagonally. The first to achieve this wins, while a full grid with no winner results in a draw. Simple yet engaging, it's perfect for quick, competitive fun!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-w-[360px]">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
