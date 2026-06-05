// Dizionario dei codici meteorologici WMO (World Meteorological Organization)
const wmoCodes = {
    0: { desc: "Cielo Sereno", icon: "fa-sun", color: "#ffeaa7" },
    1: { desc: "Prevalentemente Sereno", icon: "fa-cloud-sun", color: "#ffeaa7" },
    2: { desc: "Parzialmente Nuvoloso", icon: "fa-cloud-sun", color: "#b2bec3" },
    3: { desc: "Nuvoloso", icon: "fa-cloud", color: "#636e72" },
    45: { desc: "Nebbia", icon: "fa-smog", color: "#dfe6e9" },
    48: { desc: "Nebbia Brinata", icon: "fa-smog", color: "#dfe6e9" },
    51: { desc: "Pioviggine Leggera", icon: "fa-cloud-rain", color: "#74b9ff" },
    53: { desc: "Pioviggine Moderata", icon: "fa-cloud-rain", color: "#74b9ff" },
    55: { desc: "Pioviggine Intensa", icon: "fa-cloud-showers-heavy", color: "#0984e3" },
    61: { desc: "Pioggia Leggera", icon: "fa-cloud-rain", color: "#74b9ff" },
    63: { desc: "Pioggia Moderata", icon: "fa-cloud-rain", color: "#0984e3" },
    65: { desc: "Pioggia Forte", icon: "fa-cloud-showers-heavy", color: "#0984e3" },
    71: { desc: "Neve Leggera", icon: "fa-snowflake", color: "#81ecec" },
    73: { desc: "Neve Moderata", icon: "fa-snowflake", color: "#81ecec" },
    75: { desc: "Neve Intensa", icon: "fa-snowflake", color: "#00cec9" },
    80: { desc: "Rovesci di Pioggia Leggeri", icon: "fa-cloud-sun-rain", color: "#74b9ff" },
    81: { desc: "Rovesci di Pioggia Forti", icon: "fa-cloud-showers-heavy", color: "#0984e3" },
    95: { desc: "Temporale", icon: "fa-cloud-bolt", color: "#e84393" }
};

// Elementi DOM
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const infoMessage = document.getElementById('info-message');
const weatherBody = document.getElementById('weather-body');

// Avvio applicazione: Geolocalizzazione Utente
window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherData(latitude, longitude, "La tua Posizione");
            },
            () => {
                showMessage("Permesso negato. Cerca una città manualmente.");
            }
        );
    } else {
        showMessage("Geolocalizzazione non supportata. Cerca una città.");
    }
});

// Listener Eventi per la Ricerca
searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSearch(); });

async function handleSearch() {
    const cityName = cityInput.value.trim();
    if (!cityName) return;

    showLoading();
    try {
        // Chiamata all'API gratuita di Geocoding per ottenere lat/lon
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=it`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            showMessage("⚠️ Città non trovata. Riprova.");
            return;
        }

        const { latitude, longitude, name, country_code } = geoData.results[0];
        fetchWeatherData(latitude, longitude, `${name}, ${country_code}`);
    } catch (error) {
        showMessage("❌ Errore di connessione alla rete.");
    }
}

async function fetchWeatherData(lat, lon, displayName) {
    try {
        // Chiamata all'API Open-Meteo con tutti i dati richiesti
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m,uv_index,visibility&timezone=auto`;
        const response = await fetch(weatherUrl);
        const data = await response.json();

        updateUI(data.current, displayName);
    } catch (error) {
        showMessage("❌ Impossibile recuperare i dati meteo.");
    }
}

function updateUI(current, locationName) {
    // Aggiornamento informazioni testuali
    document.getElementById('city-name').textContent = locationName;
    document.getElementById('current-date').textContent = new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });
    
    // Elaborazione codice WMO
    const weatherInfo = wmoCodes[current.weather_code] || { desc: "Condizioni Variabili", icon: "fa-cloud", color: "#fff" };
    document.getElementById('weather-desc').textContent = weatherInfo.desc;
    
    const iconEl = document.getElementById('weather-icon');
    iconEl.className = `fa-solid ${weatherInfo.icon}`;
    iconEl.style.color = weatherInfo.color;

    // Aggiornamento Dati Numerici
    document.getElementById('temperature').textContent = `${Math.round(current.temperature_2m)}°C`;
    document.getElementById('feels-like').textContent = `${Math.round(current.apparent_temperature)}°C`;
    document.getElementById('humidity').textContent = `${current.relative_humidity_2m}%`;
    document.getElementById('wind-speed').textContent = `${current.wind_speed_10m} km/h`;
    document.getElementById('pressure').textContent = `${Math.round(current.surface_pressure)} hPa`;
    
    // Conversione Visibilità da metri a km
    document.getElementById('visibility').textContent = `${(current.visibility / 1000).toFixed(0)} km`;

    // Formattazione Indice UV con descrizione rischio
    const uv = current.uv_index;
    let uvDesc = "Basso";
    if (uv >= 3 && uv <= 5) uvDesc = "Mod.";
    else if (uv >= 6) uvDesc = "Alto";
    document.getElementById('uv-index').textContent = `${uv.toFixed(1)} (${uvDesc})`;

    // Cambio stati visivi del DOM
    infoMessage.classList.add('hidden');
    weatherBody.classList.remove('hidden');
}

function showLoading() {
    infoMessage.textContent = "Sintonizzazione con il cielo...";
    infoMessage.classList.remove('hidden');
    weatherBody.classList.add('hidden');
}

function showMessage(msg) {
    infoMessage.textContent = msg;
    infoMessage.classList.remove('hidden');
    weatherBody.classList.add('hidden');
}