import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/provider/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vivid - AI PPT Generator",
  description: "AI Power Presentation Builder",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/dark-icon.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${manrope.className} antialiased`}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute={"class"}
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
