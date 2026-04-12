# GoHigherLevel Template System — Full Guide

## What is a Template?

A template is an HTML file (index.html, optionally booking.html) with {{placeholders}} that get dynamically replaced with real values when generating a website for a lead. Builders pick a template, fill in values via a form, and deploy.

---

## How It Works

Everything goes through the **GoHigherLevel API**. The API handles storage, versioning, and deployment.

- **API base URL:** `https://go-higher-level-five.vercel.app/api/proxy`
- **All template endpoints are under:** `/templates/`
- **No auth required** for template CRUD — just send JSON or raw HTML.
- **IMPORTANT: Never delete templates.** Archive them instead.

---

## API Endpoints

### Template CRUD (JSON)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /templates/ | List all templates (add ?niche=garage to filter) |
| GET | /templates/{id} | Get full template (name, niche, index_html, field_schema, everything) |
| POST | /templates/ | Create new template (send name, niche, index_html, field_schema as JSON) |
| PATCH | /templates/{id} | Partial update (only send the fields you want to change) |
| PATCH | /templates/{id}/archive | Archive (soft-delete) |
| PATCH | /templates/{id}/unarchive | Restore archived template |

### Raw File Endpoints (recommended for editing HTML)

These let you work with template content like regular files — no JSON escaping needed.

| Method | Endpoint | Content-Type | Description |
|--------|----------|-------------|-------------|
| GET | /templates/{id}/html | text/html | Get raw index HTML — like reading a file |
| PUT | /templates/{id}/html | text/html | Replace index HTML — like writing a file |
| GET | /templates/{id}/booking-html | text/html | Get raw booking page HTML |
| PUT | /templates/{id}/booking-html | text/html | Replace booking page HTML |
| GET | /templates/{id}/schema | application/json | Get field_schema as a JSON array |
| PUT | /templates/{id}/schema | application/json | Replace full field_schema |

### Assets & Deployment

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /templates/upload-asset | Upload any file (image, CSS, JS, font) → get a public URL |
| POST | /templates/preview | Preview rendered HTML with test values (no deploy) |
| POST | /templates/auto-fill | Auto-fill field values from lead data + Google Places + AI |
| POST | /templates/generate | Render + deploy a live website for a lead |
| GET | /templates/niches | List supported niches |

---

## Recommended Workflow for Editing Templates

The best workflow is: **fetch → edit locally → push back**. Work with raw HTML files, not JSON.

### Step 1: Find the template
```bash
# List all templates
curl https://go-higher-level-five.vercel.app/api/proxy/templates/

# Get a specific template's metadata
curl https://go-higher-level-five.vercel.app/api/proxy/templates/{id}
```

### Step 2: Fetch the raw HTML
```bash
# Download index HTML to a local file
curl https://go-higher-level-five.vercel.app/api/proxy/templates/{id}/html -o template.html

# Download the field schema
curl https://go-higher-level-five.vercel.app/api/proxy/templates/{id}/schema -o schema.json
```

### Step 3: Edit locally
Edit template.html and schema.json with your code editor or AI.

### Step 4: Push back
```bash
# Upload the edited HTML
curl -X PUT https://go-higher-level-five.vercel.app/api/proxy/templates/{id}/html \
  -H "Content-Type: text/html" --data-binary @template.html

# Upload the edited schema
curl -X PUT https://go-higher-level-five.vercel.app/api/proxy/templates/{id}/schema \
  -H "Content-Type: application/json" -d @schema.json
```

### Creating a brand new template
```bash
curl -X POST https://go-higher-level-five.vercel.app/api/proxy/templates/ \
  -H "Content-Type: application/json" -d '{
  "name": "My Template",
  "niche": "garage",
  "description": "Professional garage website",
  "index_html": "<html><body>placeholder</body></html>",
  "field_schema": []
}'
# Then use PUT /templates/{id}/html and PUT /templates/{id}/schema
```

### Uploading assets
```bash
curl -X POST https://go-higher-level-five.vercel.app/api/proxy/templates/upload-asset \
  -F "file=@hero-image.jpg" -F "folder=my-template"
# Returns: { url: "https://...public-url...", path, filename, size_bytes }
```

---

## Auto-Fill Keys

When a builder clicks "Auto-fill" on a lead, these keys get populated automatically.

### Lead Data (always available)
| Key | Source |
|-----|--------|
| salonName | Lead's business_name |
| salonFullName | Lead's business_name |
| business_name | Lead's business_name |
| city | Lead's city |
| owner_name | Lead's owner_name |
| barberName | Lead's owner_name |
| phone | Lead's phone |
| phoneHref | tel:{phone} |
| email | Lead's email (or info@{name}.nl) |
| emailHref | mailto:{email} |
| address | Lead's address |

### AI-Generated Text
| Key | What it generates |
|-----|-------------------|
| heading | "Welkom bij {name}" |
| heroHeading | Same as heading |
| tagline | AI-generated tagline |
| heroTagline | Same as tagline |
| aboutIntro | AI about text, paragraph 1 |
| aboutBody | AI about text, paragraph 2 |
| aboutText1 | Same as aboutIntro |
| aboutText2 | Same as aboutBody |
| aboutImage | Google Places photo #2 (or fallback) |
| pageTitle | "{name} – {city}" |
| footerTagline | "Uw vertrouwde kapper in {city}" |
| footerText | "© {name}" |
| copyrightText | "© {name}" |
| servicesSubtitle | "Ontdek onze professionele diensten" |

### English Translations
| Key | What it generates |
|-----|-------------------|
| heading_en | "Welcome to {name}" |
| tagline_en | AI tagline in English |
| servicesSubtitle_en | "Discover our professional services" |
| aboutIntro_en | AI about text (EN), paragraph 1 |
| aboutBody_en | AI about text (EN), paragraph 2 |
| footerText_en | "© {name}" |
| copyrightText_en | "© {name}" |

### Google Places Data
| Key | Source |
|-----|--------|
| heroImage | Google Places photo #1 |
| gallery | Google Places photos 2-6 (array: [{src, alt}]) |
| showGallery | true if photos found |
| reviews | Google Places reviews (array: [{name, text}]) |
| showReviews | true if reviews found |
| reviewScore | Lead's rating |
| reviewCount | Number of reviews |
| rating | Same as reviewScore |
| hours | Google Places opening hours (array: [{day, time}]) |

### Branding & Colors
| Key | Source |
|-----|--------|
| primaryColor | Niche brand color registry |
| primaryColorDark | Darker variant |
| primaryColorLight | Lighter/accent variant |
| primaryDark | Same as primaryColorDark |
| accentColor | Accent color from registry |

### Other Auto-Filled Keys
| Key | Source |
|-----|--------|
| bookingUrl | Lead's booking_settings slug → full URL |
| mapsUrl | Google Maps search link |
| mapsQuery | "{name} {address} {city}" |
| logoUrl | Empty string (builder uploads manually) |
| showScissorsLogo | true |
| services | Niche-specific default services (array: [{name, description, icon}]) |
| defaultLanguage | "nl" |

---

## Placeholder Syntax

### 1. Simple replacement: {{key}}
HTML-escaped replacement. Use for visible text content.
```html
<h1>{{salonName}}</h1>
<p>{{aboutIntro}}</p>
```

### 2. Raw replacement: {{raw:key}}
NOT escaped. Use for values inside CSS, URLs, href/src attributes, style attributes.
```html
<a href="{{raw:bookingUrl}}" class="btn">Book Now</a>
<img src="{{raw:heroImage}}" alt="Hero">
<style>
  :root { --primary: {{raw:primaryColor}}; }
</style>
```

**Rule of thumb:** If the value appears inside quotes in an HTML attribute or inside CSS, use `{{raw:key}}`. If it appears as visible text between tags, use `{{key}}`.

### 3. Array loops: {{#arrayKey}}...{{/arrayKey}}
```html
{{#services}}
  <div class="service-card">
    <span class="icon">{{raw:icon}}</span>
    <h3>{{name}}</h3>
    <p>{{description}}</p>
  </div>
{{/services}}
```

### 4. Nested arrays
```html
{{#pricingCategories}}
  <div class="category">
    <h3>{{categoryTitle}}</h3>
    {{#items}}
      <li><span>{{name}}</span><span>{{prefix}}{{price}}</span></li>
    {{/items}}
  </div>
{{/pricingCategories}}
```

### 5. Conditionals: {{#if:key}}...{{/if:key}}
```html
{{#if:showGallery}}
  <section class="gallery">
    {{#gallery}}<img src="{{raw:src}}" alt="{{alt}}">{{/gallery}}
  </section>
{{/if:showGallery}}
```

---

## MANDATORY: Booking URL Integration

Every template MUST include at least one prominent "Book Now" button/link using `{{raw:bookingUrl}}`.

```html
<!-- CORRECT -->
<a href="{{raw:bookingUrl}}" class="btn-primary">Boek nu</a>

<!-- WRONG — will break the URL -->
<a href="{{bookingUrl}}" class="btn-primary">Boek nu</a>
```

---

## Field Schema

Each field in the schema:
```json
{
  "key": "salonName",
  "label": "Salon Name",
  "type": "text",
  "section": "general",
  "required": true,
  "default": "My Salon"
}
```

### Field Types
| Type | Description |
|------|-------------|
| text | Single line input |
| textarea | Multi-line text |
| color | Color picker |
| number | Numeric input |
| image | Image URL input |
| url | URL input |
| select | Dropdown (requires "options" array) |
| toggle | On/Off boolean |
| array | Repeating group (requires "fields" sub-array) |

### Recommended Sections
| Section | Fields |
|---------|--------|
| general | salonName, salonFullName, tagline, city |
| branding | primaryColor, primaryColorDark, primaryColorLight, font |
| hero | heroImage, heroTitle, heroSubtitle |
| about | aboutImage, aboutIntro, aboutBody |
| services | services (array), servicesSubtitle |
| pricing | pricingCategories (array) |
| gallery | showGallery (toggle), gallery (array) |
| reviews | showReviews (toggle), reviews (array), reviewScore, reviewCount |
| team | showTeam (toggle), team (array) |
| hours | hours (array) |
| contact | address, phone, phoneHref, email, emailHref, mapsUrl |
| social | instagramUrl, facebookUrl |
| footer | footerText, copyrightText |
| booking | bookingUrl (auto-injected, type: url, required: false) |

---

## Supported Niches
| Niche | Default services | Logo fallback |
|-------|-----------------|---------------|
| barbershop | Knippen, Knippen+baard, Scheren, Baard trimmen, Wash+Cut | scissors emoji |
| garage | APK Keuring, Onderhoudsbeurt, Bandenwissel, Remmen, Airco, Diagnose | Car SVG icon |
| nail salon | Manicure, Gellak, Acrylnagels, Spa Pedicure, Nail Art | nail polish emoji |

---

## Checklist Before Finalizing

- [ ] All {{placeholders}} in HTML have a matching field in field_schema
- [ ] CSS/URL values use {{raw:key}} syntax
- [ ] At least one prominent {{raw:bookingUrl}} CTA button exists
- [ ] Array fields have correct sub-fields defined
- [ ] Toggle fields pair with {{#if:key}} conditional blocks
- [ ] Sections are logically grouped
- [ ] Required fields are marked (at minimum: business name, city)
- [ ] Default values set where sensible (colors, toggle states)

---

## Rules

- **NEVER delete a template** — use archive/unarchive instead
- **NEVER break existing field keys** that are already used by deployed sites
- **Always test** by generating a preview before deploying
- Keep HTML self-contained (inline CSS, no external dependencies except Google Fonts)
- Mobile-responsive is mandatory — test at 375px width
- PUT is idempotent — safe to retry
- Every mutation response includes template_id and version
