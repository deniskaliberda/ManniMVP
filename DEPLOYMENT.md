# Deployment Guide - Vercel

## 🚀 Vercel Deployment (Empfohlen)

### **Schnellste Methode: Vercel Dashboard**

1. **Zu Vercel gehen:**
   - Öffne https://vercel.com
   - Klicke "Sign Up" oder "Login"
   - Wähle "Continue with GitHub"

2. **Projekt importieren:**
   - Klicke "Add New..." → "Project"
   - Suche nach "ManniMVP"
   - Klicke "Import"

3. **Konfiguration:**
   ```
   Framework Preset: Next.js ✅ (automatisch erkannt)
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **Environment Variables hinzufügen:**
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=dein-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=dein-token (optional für Preview)
   ```

5. **Deploy klicken:**
   - Vercel baut dein Projekt
   - Nach ~2-3 Minuten ist es live!
   - Du bekommst eine URL: `https://manni-mvp.vercel.app`

---

### **Alternative: Vercel CLI**

```bash
# Vercel CLI installieren (global)
npm i -g vercel

# In Projekt-Ordner
cd C:\Users\denis\Webseiten\ManniMVP

# Login
vercel login

# Deployen
vercel

# Production Deploy
vercel --prod
```

---

## 🔧 Vor dem Deployment

### **1. Environment Variables (.env.local)**

Erstelle die `.env.local` Datei lokal:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=dein-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=dein-read-token

# Optional
NEXT_PUBLIC_SITE_URL=https://deine-domain.de
```

**In Vercel Dashboard:**
- Settings → Environment Variables
- Füge die gleichen Variablen hinzu
- Scope: Production, Preview, Development

### **2. Sanity Studio deployen**

```bash
# In deinem Projekt
npx sanity deploy

# Wähle einen Studio-Hostnamen
# z.B. "mannis-fahrschule"
# → https://mannis-fahrschule.sanity.studio
```

**ODER:**

Studio läuft bereits in Next.js unter `/studio`:
- https://deine-domain.de/studio
- Kein separates Deployment nötig!

### **3. CORS in Sanity konfigurieren**

1. Gehe zu https://sanity.io/manage
2. Wähle dein Projekt
3. Settings → API → CORS Origins
4. Füge hinzu:
   ```
   https://deine-vercel-domain.vercel.app
   https://deine-custom-domain.de (falls vorhanden)
   http://localhost:3000 (für lokale Entwicklung)
   ```

---

## 📊 Nach dem Deployment

### **1. Domain verbinden (Optional)**

**In Vercel:**
- Settings → Domains
- Add Domain: `www.mannis-fahrschule.de`
- Folge den DNS-Anweisungen

**Bei deinem Domain-Provider:**
- A Record: `76.76.21.21` (Vercel)
- CNAME: `cname.vercel-dns.com`

### **2. Performance optimieren**

**Vercel Analytics (Kostenlos):**
```bash
npm install @vercel/analytics
```

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### **3. Environment Variables testen**

Nach Deployment:
- Öffne https://deine-app.vercel.app/studio
- Prüfe, ob Sanity lädt
- Teste alle Seiten

---

## 🔍 Troubleshooting

### **Build Fehler**

```
Error: Module not found
→ Lösung: npm install lokal ausführen, prüfen ob alles funktioniert
```

```
Error: Environment variable missing
→ Lösung: In Vercel Dashboard unter Settings → Environment Variables hinzufügen
```

### **Sanity Daten werden nicht geladen**

```
→ Lösung 1: CORS in Sanity konfigurieren
→ Lösung 2: Environment Variables in Vercel prüfen
→ Lösung 3: Sanity API Token korrekt?
```

### **3D Simulator lädt nicht**

```
→ Lösung: Client-Side Rendering prüfen (dynamic import mit ssr: false)
→ Bereits implementiert ✅
```

---

## 📋 Deployment Checklist

### **Vor dem ersten Deploy:**

- [ ] `.env.local` erstellt (lokal)
- [ ] Sanity Project ID & Dataset konfiguriert
- [ ] GitHub Repository gepusht ✅
- [ ] `vercel.json` vorhanden ✅

### **In Vercel:**

- [ ] Mit GitHub verbunden
- [ ] ManniMVP importiert
- [ ] Environment Variables gesetzt
- [ ] Build erfolgreich
- [ ] Preview-URL funktioniert

### **Nach dem Deploy:**

- [ ] CORS in Sanity hinzugefügt
- [ ] Alle Seiten getestet
- [ ] Sanity Studio funktioniert
- [ ] WhatsApp-Links funktionieren
- [ ] 3D Simulator lädt
- [ ] Responsive auf Mobile

---

## 🎯 Empfohlene Einstellungen

### **vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["fra1"]
}
```

- `regions: ["fra1"]`: Frankfurt (näher an deinen Nutzern in Bayern)

### **Auto-Deploy:**
- Jeder Push zu `main` → automatisches Deployment
- Pull Requests → Preview-Deployments
- Instant Rollback möglich

---

## ✨ Nach dem Deployment hast du:

✅ Live-Website unter `https://manni-mvp.vercel.app`  
✅ Automatische Deployments bei jedem Push  
✅ Preview-URLs für Testing  
✅ SSL/HTTPS automatisch  
✅ CDN weltweit  
✅ Analytics (optional)  
✅ Domain-Management  

---

## 🔗 Wichtige Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Deployment Docs:** https://vercel.com/docs/deployments/overview
- **Next.js on Vercel:** https://nextjs.org/docs/deployment
- **Sanity CORS:** https://www.sanity.io/docs/cors

---

Viel Erfolg mit dem Deployment! 🚀
