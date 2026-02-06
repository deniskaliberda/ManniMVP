export interface Product {
  id: string
  title: string
  handle: string
  description: string | null
  sku: string | null
  brand: string | null
  thumbnail: string | null
  images: { url: string; alt?: string }[]
  categories: ProductCategory[]
  variants: ProductVariant[]
  metadata: Record<string, unknown> | null
}

export interface ProductVariant {
  id: string
  title: string
  sku: string | null
  prices: {
    amount: number
    currency_code: string
  }[]
  inventory_quantity: number
  metadata: Record<string, unknown> | null
}

export interface ProductCategory {
  id: string
  name: string
  handle: string
  description: string | null
  parent_category_id: string | null
}
