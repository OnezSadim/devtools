# Alp Autoservice — Website Update Prompt voor Claude Code

Kopieer alles hieronder en plak het in Claude Code op je computer:

---

Update de live website van Alp Autoservice (alpautoservice.com). De nieuwe template staat klaar in het GitHub repo.

## Stappen

### 1. Clone het repo en pak de template
```
git clone https://github.com/OnezSadim/devtools.git
cd devtools
git checkout claude/ghl-template-system-Zixgw
```
De bestanden staan in `templates/alp-autoservice/`:
- `index.html` — volledige HTML met 3 foto-carrousels (APK, Reparatie, Onderhoud)
- `schema.json` — field schema voor het GHL formulier

### 2. Haal eerst de huidige site op (backup)
```
curl https://go-higher-level-five.vercel.app/api/proxy/sites/ghl-alp-autoservice -o backup-site.json
```

### 3. Upload de nieuwe HTML naar de live site
```
curl -X PUT https://go-higher-level-five.vercel.app/api/proxy/sites/ghl-alp-autoservice/html \
  -H "Content-Type: text/html" --data-binary @templates/alp-autoservice/index.html
```

### 4. Upload het schema
```
curl -X PUT https://go-higher-level-five.vercel.app/api/proxy/sites/ghl-alp-autoservice/schema \
  -H "Content-Type: application/json" -d @templates/alp-autoservice/schema.json
```

### 5. Upload alle foto's en vul de URLs in
Upload elke foto via:
```
curl -X POST https://go-higher-level-five.vercel.app/api/proxy/templates/upload-asset \
  -F "file=@BESTANDSNAAM.jpg" -F "folder=alp-autoservice"
```
Elke upload geeft een publieke URL terug. Gebruik die URLs om de carrousel-velden in te vullen.

De foto's zijn ingedeeld in 3 categorieën:

**APK Foto's (apkGallery) — 3 stuks:**
1. VW T-Roc op de brug met banden
2. Opel Astra + Dacia op de brug (werkplaats overzicht)
3. Range Rover Evoque voor de garage met RDW bord

**Reparatie Foto's (repairGallery) — 4 stuks:**
1. Motorblok open met nokkenas en distributieketting
2. Motorblok zonder cilinderkop (cilinders zichtbaar)
3. Motorblok close-up
4. Cilinderkop en timing-onderdelen los

**Onderhoud Foto's (maintenanceGallery) — 7 stuks:**
1. Luchtfilters cilindrisch (oud vs nieuw)
2. Vervuild oliefilter (zwart, dichtgeslibd)
3. Mercedes AMG remschijf + remklauw
4. Versleten remblokken
5. Audi Q8 op de brug (motorkap open)
6. Luchtfilters plat (oud vs nieuw)
7. Luchtfilters + Bosch onderdelen

### 6. Verifieer
Open https://alpautoservice.com en controleer:
- [ ] Header met logo + Afspraak Maken knop
- [ ] Hero sectie met RDW badge
- [ ] USP balk (RDW Erkend, 15+ Jaar Ervaring, etc.)
- [ ] APK carrousel (3 foto's, swipeable)
- [ ] Reparatie carrousel (4 foto's, swipeable)
- [ ] Onderhoud carrousel (7 foto's, swipeable)
- [ ] Diensten grid
- [ ] Reviews sectie
- [ ] Openingstijden
- [ ] Contact sectie
- [ ] Sticky mobile bar (Bel Direct + Afspraak Maken)
- [ ] Booking URL werkt

## API Info
- API base: https://go-higher-level-five.vercel.app/api/proxy
- Site endpoint: /sites/ghl-alp-autoservice
- Upload endpoint: /templates/upload-asset
- Geen auth nodig
- PUT is idempotent (veilig om opnieuw te proberen)

## Bedrijfsinfo
- Naam: Alp Autoservice
- Telefoon: +31 6 40608806
- Actief sinds: 2023
- Ervaring: 15+ jaar in de autosector
- Kleurenschema: Rood (#cc0000) / Wit / Donker
- NIET gebruiken: naam eigenaar (Ali Ozcan — mag niet op de site)
