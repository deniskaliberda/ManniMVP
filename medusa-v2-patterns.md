# Medusa v2 Development Patterns

## Modul-Erstellung
Medusa v2 nutzt ein modulares System. Custom Module erstellen:
```typescript
// src/modules/compatibility/index.ts
import { Module } from "@medusajs/framework/utils"
import CompatibilityModuleService from "./service"

export const COMPATIBILITY_MODULE = "compatibilityModuleService"

export default Module(COMPATIBILITY_MODULE, {
  service: CompatibilityModuleService,
})
```

## Data Models (mit MikroORM)
```typescript
// src/modules/compatibility/models/device-fastener.ts
import { model } from "@medusajs/framework/utils"

const DeviceFastener = model.define("device_fastener", {
  id: model.id().primaryKey(),
  device_id: model.text(),
  fastener_id: model.text(),
  is_recommended: model.boolean().default(false),
  notes: model.text().nullable(),
})

export default DeviceFastener
```

## API Routes
```typescript
// src/api/store/compatibility/[deviceId]/route.ts
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { COMPATIBILITY_MODULE } from "../../../../modules/compatibility"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const compatibilityService = req.scope.resolve(COMPATIBILITY_MODULE)
  const { deviceId } = req.params

  const fasteners = await compatibilityService.getFastenersForDevice(deviceId)
  res.json({ fasteners })
}
```

## Subscribers (Event Handler)
```typescript
// src/subscribers/product-created.ts
import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"

export default async function productCreatedHandler({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  // Reagiere auf Produkt-Erstellung
  const productId = event.data.id
  // z.B. Meilisearch Index aktualisieren
}

export const config: SubscriberConfig = {
  event: "product.created",
}
```

## Workflows
```typescript
// src/workflows/import-products.ts
import { createWorkflow, createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

const importStep = createStep("import-products", async (input, { container }) => {
  const productService = container.resolve("productModuleService")
  // Import-Logik
  return new StepResponse({ imported: count })
})

export const importProductsWorkflow = createWorkflow(
  "import-products",
  (input) => {
    const result = importStep(input)
    return result
  }
)
```

## Medusa SDK im Frontend (Next.js)
```typescript
// lib/medusa.ts
import Medusa from "@medusajs/js-sdk"

export const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_URL!,
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
})

// In Server Components:
const { products } = await medusa.store.product.list({
  limit: 20,
  fields: "+metadata,+categories",
})
```

## Wichtige Medusa v2 Unterschiede zu v1
- Module statt Services
- MikroORM statt TypeORM
- `@medusajs/framework` statt `@medusajs/medusa`
- Workflows für komplexe Operationen
- API Routes in `src/api/` mit Datei-basiertem Routing
- Admin UI Erweiterungen über `src/admin/`
