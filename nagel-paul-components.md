# Nagel Paul – Component Library

## Basis-Komponenten

### Button
```tsx
// Varianten: primary (rot), secondary (outline), ghost, lignoloc (grün)
<Button variant="primary" size="lg">In den Warenkorb</Button>
<Button variant="lignoloc" size="md">🌿 Nachhaltige Alternative ansehen</Button>
```

### ProductCard
```tsx
<ProductCard
  product={product}
  showCompatibility={true}    // Zeigt "Passend für: Nagler XY"
  showLignolocBadge={true}    // 🌿 Badge wenn LignoLoc
  showQuickAdd={true}         // Schnell-Hinzufügen Button
/>
```

### CompatibilityBadge
```tsx
// Zeigt an, ob Nagel in Nagler passt
<CompatibilityBadge
  status="compatible"          // compatible | recommended | incompatible
  deviceName="HiKOKI NR1890"
/>
```

### ApplicationCard
```tsx
// Klickbare Karte für Anwendungsbereiche
<ApplicationCard
  gewerk="Zimmerer"
  anwendung="Dachlatten befestigen"
  icon={<HammerIcon />}
  productCount={12}
/>
```

### PriceDisplay
```tsx
// Zeigt Preis mit optionalem UVP-Durchstreichpreis
<PriceDisplay
  price={89.90}
  compareAtPrice={109.00}     // UVP durchgestrichen
  unit="Stück"                // oder "pro 1000 Stk.", "pro Rolle"
  showMwst={true}             // "inkl. 19% MwSt."
/>
```

### TechSpecsTable
```tsx
// Strukturierte technische Daten
<TechSpecsTable specs={[
  { label: "Magazinwinkel", value: "21°" },
  { label: "Nagellänge", value: "50-90mm" },
  { label: "Nageldicke", value: "2,8-3,1mm" },
  { label: "Magazinkapazität", value: "60 Nägel" },
  { label: "Gewicht", value: "3,2 kg" },
  { label: "Antrieb", value: "Druckluft 5-8 bar" },
]} />
```

### Navigation
