/**
 * Módulo Gerador de Senhas
 */
const PassgenModule = {
    chars: {
        upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lower: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
    },

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.generate(); // Gera uma inicial
    },

    cacheDOM() {
        this.resultInput = document.getElementById('pass-result');
        this.lengthInput = document.getElementById('pass-length');
        this.lengthVal = document.getElementById('length-val');
        this.upperCheck = document.getElementById('include-upper');
        this.lowerCheck = document.getElementById('include-lower');
        this.numberCheck = document.getElementById('include-numbers');
        this.symbolCheck = document.getElementById('include-symbols');
        this.generateBtn = document.getElementById('generate-btn');
        this.copyBtn = document.getElementById('copy-pass-btn');
    },

    bindEvents() {
        this.generateBtn.addEventListener('click', () => this.generate());
        
        this.lengthInput.addEventListener('input', (e) => {
            this.lengthVal.innerText = e.target.value;
        });

        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
    },

    generate() {
        const length = parseInt(this.lengthInput.value);
        let charset = '';

        if (this.upperCheck.checked) charset += this.chars.upper;
        if (this.lowerCheck.checked) charset += this.chars.lower;
        if (this.numberCheck.checked) charset += this.chars.numbers;
        if (this.symbolCheck.checked) charset += this.chars.symbols;

        if (charset === '') {
            alert('Selecione pelo menos uma opção!');
            return;
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }

        this.resultInput.value = password;
    },

    copyToClipboard() {
        const password = this.resultInput.value;
        if (!password) return;

        navigator.clipboard.writeText(password).then(() => {
            const originalIcon = this.copyBtn.innerHTML;
            this.copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                this.copyBtn.innerHTML = originalIcon;
            }, 2000);
        });
    }
};

window.PassgenModule = PassgenModule;
