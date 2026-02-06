export interface Gewerk {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
}

export interface Application {
  id: string
  name: string
  slug: string
  description: string | null
  gewerk: Gewerk
  recommended_product_ids: string[]
}
