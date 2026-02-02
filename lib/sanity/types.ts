import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { PortableTextBlock } from "sanity";

// ===== THEORIE-BLOCKWOCHEN =====

export type TheoryTermStatus = "available" | "limited" | "full";
export type TheoryTermLocation = "herrsching" | "tutzing";

export interface TheoryTermTime {
  day: string;
  time: string;
}

export interface TheoryTerm {
  _id: string;
  title: string;
  month: string;
  startDate: string;
  endDate: string;
  totalSpots: number;
  availableSpots: number;
  status: TheoryTermStatus;
  location: TheoryTermLocation;
  times: TheoryTermTime[];
  description?: string;
  topics?: string[];
}

// ===== PREISE & FÜHRERSCHEINKLASSEN =====

export type PricingCategory = "privat" | "gewerblich";

export interface PriceDetails {
  grundgebuehr?: number;
  fahrstunden?: number;
  sonderfahrten?: number;
  pruefungsgebuehren?: number;
  lernmaterial?: number;
}

export interface PricingRequirement {
  label: string;
  value: string;
}

export interface PricingDuration {
  theory?: number;
  practice?: number;
  special?: number;
}

export interface Pricing {
  _id: string;
  name: string;
  slug: { current: string };
  licenseClass: string;
  category: PricingCategory;
  description: string;
  longDescription?: PortableTextBlock[];
  basePrice: number;
  priceDetails?: PriceDetails;
  icon: string;
  highlights?: string[];
  requirements?: PricingRequirement[];
  duration?: PricingDuration;
  popular?: boolean;
  azavCertified?: boolean;
  sortOrder?: number;
}

// ===== TESTIMONIALS =====

export interface Testimonial {
  _id: string;
  name: string;
  age: number;
  license: string;
  text: string;
  rating: number;
  date: string;
  image?: SanityImageSource;
  isFeatured?: boolean;
}

// ===== TEAM MEMBERS =====

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  isOwner?: boolean;
  image: SanityImageSource;
  classes: string[];
  specialties?: string[];
  bio?: string;
  yearsExperience?: number;
}

// ===== LEGACY TYPES (für Kompatibilität) =====

export interface Termin {
  _id: string;
  titel: string;
  datum: string;
  uhrzeit: string;
  standort: string;
  beschreibung?: string;
}

export interface Preis {
  _id: string;
  titel: string;
  kategorie: string;
  preis: number;
  beschreibung?: string;
  highlights?: string[];
}

export interface Fahrzeug {
  _id: string;
  name: string;
  typ: "auto" | "motorrad" | "simulator";
  beschreibung: string;
  bild: SanityImageSource;
  highlights?: string[];
}

export interface Standort {
  _id: string;
  name: string;
  slug: { current: string };
  adresse: string;
  telefon: string;
  email: string;
  oeffnungszeiten: Array<{
    tag: string;
    zeiten: string;
  }>;
  beschreibung?: string;
}
