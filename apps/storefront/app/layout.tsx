import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Nagel Paul – Nagler, Befestigungstechnik & LignoLoc",
    template: "%s | Nagel Paul",
  },
  description:
    "Ihr Fachhändler für Druckluft- und Akku-Nagler, Befestigungstechnik und das innovative LignoLoc-Holznagelsystem. Marken: HiKOKI, Paslode, Prebena, BeA und mehr.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  )
}
