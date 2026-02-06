export interface DeviceFastenerMapping {
  id: string
  device_id: string
  fastener_id: string
  is_recommended: boolean
  notes: string | null
}

export interface CompatibilityResult {
  status: "compatible" | "recommended" | "incompatible"
  device_name: string
  fastener_name: string
  notes: string | null
}
