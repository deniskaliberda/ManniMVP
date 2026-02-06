import { Button } from "@/components/ui/Button"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-neutral-900">
          Nagel Paul
        </h1>
        <p className="mt-4 text-lg text-neutral-500">
          Ihr Fachhändler für Nagler, Befestigungstechnik &amp; LignoLoc
        </p>
      </div>

      <div className="flex flex-col gap-8 items-center">
        {/* Sizes */}
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Klein (sm)</Button>
          <Button size="md">Mittel (md)</Button>
          <Button size="lg">Groß (lg)</Button>
        </div>

        {/* Variants */}
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">In den Warenkorb</Button>
          <Button variant="secondary">Details ansehen</Button>
          <Button variant="ghost">Mehr erfahren</Button>
          <Button variant="lignoloc">Nachhaltige Alternative</Button>
        </div>

        {/* Disabled */}
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" disabled>Ausverkauft</Button>
          <Button variant="secondary" disabled>Nicht verfügbar</Button>
          <Button variant="lignoloc" disabled>Deaktiviert</Button>
        </div>

        {/* Tech specs font demo */}
        <div className="mt-4 rounded-lg border border-neutral-200 p-4">
          <p className="text-sm text-neutral-500 mb-2">Technische Daten (font-mono):</p>
          <p className="font-mono text-sm text-neutral-700">
            Magazinwinkel: 21° | Nagellänge: 50-90mm | Ø 2,8-3,1mm
          </p>
        </div>
      </div>
    </main>
  )
}
