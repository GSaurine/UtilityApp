/**
 * Módulo de Relógio Mundial
 */
const WorldclockModule = {
    intervalId: null,

    init() {
        this.cacheDOM();
        this.startClocks();
    },

    cacheDOM() {
        this.clockCards = document.querySelectorAll('.clock-card');
    },

    startClocks() {
        // Limpa intervalo anterior se existir para evitar múltiplos loops
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        this.updateTime();
        this.intervalId = setInterval(() => this.updateTime(), 1000);
    },

    updateTime() {
        const now = new Date();

        this.clockCards.forEach(card => {
            const timezone = card.getAttribute('data-timezone');
            const timeElement = card.querySelector('.time');
            const dateElement = card.querySelector('.date');

            let options = {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            };

            let dateOptions = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            };

            if (timezone !== 'local') {
                options.timeZone = timezone;
                dateOptions.timeZone = timezone;
            }

            try {
                const timeStr = new Intl.DateTimeFormat('pt-BR', options).format(now);
                const dateStr = new Intl.DateTimeFormat('pt-BR', dateOptions).format(now);

                timeElement.innerText = timeStr;
                dateElement.innerText = dateStr;
            } catch (e) {
                console.error(`Erro ao formatar hora para timezone ${timezone}:`, e);
            }
        });
    },

    // Útil para quando saímos da view, podemos parar o intervalo
    // Embora o renderer atual não chame um destroy, podemos pensar nisso no futuro
    stopClocks() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
};

window.WorldclockModule = WorldclockModule;
