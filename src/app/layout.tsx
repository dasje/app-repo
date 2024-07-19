"use server";

import "@/app/globals.css";

import { Providers } from "./providers";
import Header from "./components/layoutComponents/Header";
import { auth, signOut } from "@/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body>
        <Providers>
          <Header session={session} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
