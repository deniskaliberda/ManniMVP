import { groq } from "next-sanity";

// ===== THEORIE-BLOCKWOCHEN =====

// Alle aktiven Theorie-Blockwochen (chronologisch)
export const THEORY_TERMS_QUERY = groq`
  *[_type == "theoryTerm" && isActive == true] | order(startDate asc) {
    _id,
    title,
    month,
    startDate,
    endDate,
    totalSpots,
    availableSpots,
    status,
    location,
    times[] {
      day,
      time
    },
    description,
    topics[]
  }
`;

// Einzelne Theorie-Blockwoche nach ID
export const THEORY_TERM_BY_ID_QUERY = groq`
  *[_type == "theoryTerm" && _id == $id][0] {
    _id,
    title,
    month,
    startDate,
    endDate,
    totalSpots,
    availableSpots,
    status,
    location,
    times[] {
      day,
      time
    },
    description,
    topics[]
  }
`;

// Nächste verfügbare Theorie-Blockwochen
export const UPCOMING_THEORY_TERMS_QUERY = groq`
  *[_type == "theoryTerm" && isActive == true && startDate >= now()] | order(startDate asc) [0...3] {
    _id,
    title,
    month,
    startDate,
    endDate,
    availableSpots,
    status,
    location
  }
`;

// ===== PREISE & FÜHRERSCHEINKLASSEN =====

// Alle aktiven Preise
export const PRICING_QUERY = groq`
  *[_type == "pricing" && isActive == true] | order(sortOrder asc) {
    _id,
    name,
    slug,
    licenseClass,
    category,
    description,
    basePrice,
    priceDetails {
      grundgebuehr,
      fahrstunden,
      sonderfahrten,
      pruefungsgebuehren,
      lernmaterial
    },
    icon,
    highlights[],
    requirements[] {
      label,
      value
    },
    duration {
      theory,
      practice,
      special
    },
    popular,
    sortOrder
  }
`;

// Preise nach Kategorie filtern
export const PRICING_BY_CATEGORY_QUERY = groq`
  *[_type == "pricing" && isActive == true && category == $category] | order(sortOrder asc) {
    _id,
    name,
    slug,
    licenseClass,
    description,
    basePrice,
    icon,
    highlights[],
    popular
  }
`;

// Einzelner Preis nach Slug
export const PRICING_BY_SLUG_QUERY = groq`
  *[_type == "pricing" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    licenseClass,
    category,
    description,
    longDescription,
    basePrice,
    priceDetails {
      grundgebuehr,
      fahrstunden,
      sonderfahrten,
      pruefungsgebuehren,
      lernmaterial
    },
    icon,
    highlights[],
    requirements[] {
      label,
      value
    },
    duration {
      theory,
      practice,
      special
    },
    popular
  }
`;

// Beliebte Führerscheinklassen
export const POPULAR_PRICING_QUERY = groq`
  *[_type == "pricing" && isActive == true && popular == true] | order(sortOrder asc) {
    _id,
    name,
    slug,
    licenseClass,
    description,
    basePrice,
    icon,
    highlights[]
  }
`;

// ===== TESTIMONIALS =====

// Alle aktiven Testimonials
export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial" && isActive == true] | order(sortOrder asc, date desc) {
    _id,
    name,
    age,
    license,
    text,
    rating,
    date,
    image,
    isFeatured
  }
`;

// Hervorgehobene Testimonials
export const FEATURED_TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial" && isActive == true && isFeatured == true] | order(sortOrder asc) {
    _id,
    name,
    age,
    license,
    text,
    rating,
    date,
    image
  }
`;

// Testimonials mit Limit
export const TESTIMONIALS_LIMIT_QUERY = groq`
  *[_type == "testimonial" && isActive == true] | order(date desc) [0...$limit] {
    _id,
    name,
    age,
    license,
    text,
    rating,
    date,
    image
  }
`;

// Alle Pricing-Daten (für /preise Seite)
export const ALL_PRICING_QUERY = groq`
  *[_type == "pricing" && isActive == true] | order(sortOrder asc) {
    _id,
    name,
    licenseClass,
    category,
    description,
    basePrice,
    priceDetails,
    highlights,
    popular,
    azavCertified
  }
`;

// ===== TEAM MEMBERS =====

// Alle aktiven Team-Mitglieder
export const TEAM_MEMBERS_QUERY = groq`
  *[_type == "teamMember" && isActive == true] | order(isOwner desc, sortOrder asc) {
    _id,
    name,
    role,
    isOwner,
    image,
    classes[],
    specialties[],
    bio,
    yearsExperience
  }
`;

// Nur Inhaber
export const OWNER_QUERY = groq`
  *[_type == "teamMember" && isActive == true && isOwner == true][0] {
    _id,
    name,
    role,
    image,
    classes[],
    bio,
    yearsExperience
  }
`;

// ===== LEGACY QUERIES (für Kompatibilität) =====

// Query für Termine/Theorie-Wochen (Legacy)
export const TERMINE_QUERY = THEORY_TERMS_QUERY;

// Query für Preise (Legacy)
export const PREISE_QUERY = PRICING_QUERY;
