/**
 * Módulo Formatador JSON
 */
const JsonformatModule = {
    init() {
        this.cacheDOM();
        this.bindEvents();
    },

    cacheDOM() {
        this.input = document.getElementById('json-input');
        this.formatBtn = document.getElementById('format-btn');
        this.minifyBtn = document.getElementById('minify-btn');
        this.clearBtn = document.getElementById('clear-json-btn');
        this.copyBtn = document.getElementById('copy-json-btn');
        this.errorMsg = document.getElementById('json-error');
    },

    bindEvents() {
        this.formatBtn.addEventListener('click', () => this.process(true));
        this.minifyBtn.addEventListener('click', () => this.process(false));
        this.clearBtn.addEventListener('click', () => {
            this.input.value = '';
            this.hideError();
        });
        this.copyBtn.addEventListener('click', () => this.copy());
    },

    process(format) {
        const val = this.input.value.trim();
        if (!val) return;

        try {
            const obj = JSON.parse(val);
            const result = format ? JSON.stringify(obj, null, 4) : JSON.stringify(obj);
            this.input.value = result;
            this.hideError();
        } catch (e) {
            this.showError(e.message);
        }
    },

    showError(msg) {
        this.errorMsg.innerText = `Erro: ${msg}`;
        this.errorMsg.classList.remove('hidden');
    },

    hideError() {
        this.errorMsg.classList.add('hidden');
    },

    copy() {
        if (!this.input.value) return;
        navigator.clipboard.writeText(this.input.value).then(() => {
            const originalText = this.copyBtn.innerHTML;
            this.copyBtn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
            setTimeout(() => {
                this.copyBtn.innerHTML = originalText;
            }, 2000);
        });
    }
};

window.JsonformatModule = JsonformatModule;
