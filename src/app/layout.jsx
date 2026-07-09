import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import AppFrame from "@/components/AppFrame";

export const metadata = {
  title: "Metis Client Hub",
  description: "Firm-wide client intelligence, personalized to your engagements.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AppFrame>{children}</AppFrame>
        </AuthProvider>
      </body>
    </html>
  );
}
