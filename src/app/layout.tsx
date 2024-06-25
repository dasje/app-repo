import "@/app/globals.css";

import { Providers } from "./providers";
import Header from "./components/layoutComponents/Header";
import LoginOptions from "./login/loginComponents/LoginOptions";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
