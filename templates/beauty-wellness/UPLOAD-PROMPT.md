# Beauty & Wellness Template — Upload naar GHL

Kopieer deze prompt naar Claude Code op je computer:

---

Upload de Beauty & Wellness template naar de GHL API. De bestanden staan in `templates/beauty-wellness/` op branch `claude/ghl-template-system-Zixgw` van het repo `OnezSadim/devtools`.

## Stappen

### 1. Clone het repo
```
git clone https://github.com/OnezSadim/devtools.git
cd devtools
git checkout claude/ghl-template-system-Zixgw
cd templates/beauty-wellness
```

### 2. Maak de template aan in GHL
```
curl -X POST https://go-higher-level-five.vercel.app/api/proxy/templates/ \
  -H "Content-Type: application/json" -d '{
  "name": "Beauty & Wellness",
  "niche": "nail_salon",
  "description": "Beauty/wellness template met 4 presets (nail salon, waxing, skin therapy, lash studio) en NL/EN taalschakelaar",
  "index_html": "<html><body>placeholder</body></html>",
  "field_schema": []
}'
```
Noteer de **template ID** uit de response.

### 3. Upload de HTML
```
curl -X PUT https://go-higher-level-five.vercel.app/api/proxy/templates/{ID}/html \
  -H "Content-Type: text/html" --data-binary @index.html
```

### 4. Upload de booking page
```
curl -X PUT https://go-higher-level-five.vercel.app/api/proxy/templates/{ID}/booking-html \
  -H "Content-Type: text/html" --data-binary @booking-template.html
```

### 5. Upload het schema
```
curl -X PUT https://go-higher-level-five.vercel.app/api/proxy/templates/{ID}/schema \
  -H "Content-Type: application/json" -d @schema.json
```

### 6. Test
- Open een lead → Website tab → kies "Beauty & Wellness" template
- Selecteer preset (nail_salon / waxing_studio / skin_therapy / lash_studio)
- Kleuren en defaults uit `presets.json` moeten automatisch geladen worden via auto-fill (of vul handmatig in)
- Test booking page via `{site-url}/booking`

## Belangrijke features

| Feature | Hoe |
|---------|-----|
| **4 Presets** | `preset` select field — kleuren/behandelingen per niche |
| **NL/EN switcher** | `languageMode`: `nl_en` / `en_nl` / `nl_only` / `en_only` |
| **Aparte booking page** | `booking-html` endpoint — eigen pagina met form |
| **Font Awesome icons** | Geen emojis, alle iconen via FA classes |
| **Behandeling kaarten** | Met foto, prijs, duur, FA icoon |
| **Booking form** | Behandeling-kaarten selecteren, datum/tijd, contact info |
| **Trust badges** | Veilig boeken, snelle bevestiging, geen voorschot |

## Preset Defaults

De `presets.json` bevat per niche:
- Kleuren (6 vars)
- Hero badge + icon
- Hero heading + tagline (NL/EN)
- USPs (4 met FA icons)
- Behandelingen (6 met namen NL/EN, prijs, duur)
- About features (4 NL/EN)

De builder kan via het `preset` veld kiezen welke set defaults gebruikt wordt. Implementatie tip: in de GHL builder UI, als `preset` verandert, vul automatisch de andere velden uit de presets.json.

## Files in deze map
- `index.html` — hoofd template (gebruikt {{placeholders}})
- `booking-template.html` — boekingspagina template
- `schema.json` — field schema voor het GHL formulier
- `presets.json` — preset configuraties (nail/wax/skin/lash)
- `preview-nail-salon.html` — rendered preview met sample data
- `booking.html` — rendered booking preview
