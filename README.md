#  SkyFlow // Modern Weather Dashboard

SkyFlow is a premium, lightweight, and ultra-responsive weather dashboard designed with a modern **Glassmorphism** aesthetic. It provides real-time meteorological data instantly by leveraging open-source, keyless APIs and native browser capabilities.

![Glassmorphism Design](https://img.shields.io/badge/Design-Glassmorphism-blueviolet)
![JavaScript ES6+](https://img.shields.io/badge/Language-JavaScript%20ES6+-yellow)
![API-Keyless](https://img.shields.io/badge/API-Keyless%20%2F%20Open--Meteo-green)

---

##  Features

* **Auto-Location Detection:** Uses native HTML5 Geolocation to fetch the weather for your current position instantly upon load.
* **Smart City Search:** Integrated with a Geocoding API to resolve city names into precise geographical coordinates.
* **Comprehensive Metrics:** Displays real-time temperature, perceived temperature, humidity levels, wind speed, UV Index (with risk scaling), surface pressure, and visibility range.
* **Dynamic WMO Weather Mapping:** Translates World Meteorological Organization codes into beautiful, context-specific FontAwesome icons and descriptions.
* **Premium Glassmorphism UI:** Built using cutting-edge CSS filters (`backdrop-filter`) and smooth transitions for an elegant, translucent glass appearance.

---

##  Tech Stack & Architecture

SkyFlow embraces a **JAMstack** philosophy, ensuring high performance, zero backend dependencies, and static hosting readiness.

* **Markup:** Semantic HTML5 structured for optimal accessibility (A11y).
* **Styles:** Advanced CSS3 utilizing CSS Grid, Flexbox, and Custom Properties for responsive layouts.
* **Logic:** Native JavaScript (ES6+) utilizing the asynchronous `Fetch API` with `async/await` patterns.
* **APIs (Free & Open Source):**
    * [Open-Meteo Weather Forecast API](https://open-meteo.com/) (No API Key required)
    * [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
* **Iconography:** FontAwesome v6 (SVG/Webfonts)

---

##  Project Structure

```text
skyflow/
│
├── index.html          # Semantic page structure and dashboard layout
├── style.css           # Premium styling, animations, and grid architecture
└── script.js           # Asynchronous logic, API management, and DOM parsing
