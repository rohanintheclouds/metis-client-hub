import "./globals.css";
import localFont from "next/font/local";
import { AuthProvider } from "@/lib/auth";
import AppFrame from "@/components/AppFrame";

// Self-hosted Open Sans (the exact files Metis Strategy uses on its site), so
// builds have no network dependency and the app matches the brand typeface.
const openSans = localFont({
  src: [
    { path: "./fonts/OpenSansRegular.woff", weight: "400", style: "normal" },
    { path: "./fonts/OpenSansItalic.woff", weight: "400", style: "italic" },
    { path: "./fonts/OpenSansMedium.woff", weight: "500", style: "normal" },
    { path: "./fonts/OpenSansSemiBold.woff", weight: "600", style: "normal" },
    { path: "./fonts/OpenSansBold.woff", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Metis Client Hub",
  description: "Firm-wide client intelligence, personalized to your engagements.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={openSans.variable}>
      <body>
        <AuthProvider>
          <AppFrame>{children}</AppFrame>
        </AuthProvider>
      </body>
    </html>
  );
}
