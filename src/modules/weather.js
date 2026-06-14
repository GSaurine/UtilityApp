/**
 * Módulo de Previsão do Tempo
 */
const WeatherModule = {
    // Nota: Em uma app real, você pegaria isso de um .env
    API_KEY: '8ac526783d2012019488e63784b2571c', // Chave de exemplo (pode expirar)

    init() {
        this.cacheDOM();
        this.bindEvents();
    },

    cacheDOM() {
        this.input = document.getElementById('city-input');
        this.btn = document.getElementById('weather-search-btn');
        this.display = document.getElementById('weather-display');
        this.emptyMsg = document.getElementById('weather-empty');
        
        this.cityName = document.getElementById('city-name');
        this.dateText = document.getElementById('weather-date');
        this.temp = document.getElementById('temperature');
        this.desc = document.getElementById('weather-desc');
        this.humidity = document.getElementById('humidity');
        this.wind = document.getElementById('wind-speed');
        this.icon = document.getElementById('weather-icon');
    },

    bindEvents() {
        this.btn.addEventListener('click', () => this.fetchWeather());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.fetchWeather();
        });
    },

    async fetchWeather() {
        const city = this.input.value.trim();
        if (!city) return;

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${this.API_KEY}`;
            const response = await fetch(url);
            
            if (!response.ok) throw new Error('Cidade não encontrada');
            
            const data = await response.json();
            this.render(data);
        } catch (error) {
            alert(error.message);
        }
    },

    render(data) {
        this.emptyMsg.classList.add('hidden');
        this.display.classList.remove('hidden');

        this.cityName.innerText = `${data.name}, ${data.sys.country}`;
        this.dateText.innerText = new Date().toLocaleDateString('pt-br', { weekday: 'long', day: 'numeric', month: 'long' });
        this.temp.innerText = Math.round(data.main.temp);
        this.desc.innerText = data.weather[0].description;
        this.humidity.innerText = `${data.main.humidity}%`;
        this.wind.innerText = `${Math.round(data.wind.speed * 3.6)} km/h`;

        // Mapeamento de ícones (simplificado)
        const iconCode = data.weather[0].icon;
        this.updateIcon(iconCode);
    },

    updateIcon(code) {
        const iconMap = {
            '01': 'fa-sun',
            '02': 'fa-cloud-sun',
            '03': 'fa-cloud',
            '04': 'fa-cloud-meatball',
            '09': 'fa-cloud-showers-heavy',
            '10': 'fa-cloud-sun-rain',
            '11': 'fa-bolt',
            '13': 'fa-snowflake',
            '50': 'fa-smog'
        };
        const prefix = code.substring(0, 2);
        const iconClass = iconMap[prefix] || 'fa-cloud';
        this.icon.className = `fas ${iconClass}`;
    }
};

window.WeatherModule = WeatherModule;
