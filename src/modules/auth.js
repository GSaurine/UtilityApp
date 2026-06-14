/**
 * Módulo de Autenticação
 */
const AuthModule = {
    isLoginMode: true,

    init() {
        this.cacheDOM();
        this.bindEvents();
    },

    cacheDOM() {
        this.form = document.getElementById('auth-form');
        this.emailInput = document.getElementById('auth-email');
        this.passInput = document.getElementById('auth-password');
        this.submitBtn = document.getElementById('auth-submit-btn');
        this.toggleLink = document.getElementById('auth-toggle');
        this.switchText = document.getElementById('auth-switch-text');
        this.errorMsg = document.getElementById('auth-error');
        this.overlay = document.querySelector('.auth-overlay');
    },

    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        this.toggleLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMode();
        });
    },

    toggleMode() {
        this.isLoginMode = !this.isLoginMode;
        this.hideError();
        
        if (this.isLoginMode) {
            this.switchText.innerText = 'Entre na sua conta para continuar';
            this.submitBtn.querySelector('span').innerText = 'Entrar';
            this.toggleLink.innerHTML = 'Não tem uma conta? <a href="#">Cadastre-se</a>';
        } else {
            this.switchText.innerText = 'Crie sua conta gratuita agora';
            this.submitBtn.querySelector('span').innerText = 'Cadastrar';
            this.toggleLink.innerHTML = 'Já tem uma conta? <a href="#">Faça Login</a>';
        }
    },

    async handleSubmit() {
        this.hideError();
        const username = this.emailInput.value;
        const password = this.passInput.value;
        
        const endpoint = this.isLoginMode ? '/auth/login' : '/auth/register';
        
        try {
            this.submitBtn.disabled = true;
            this.submitBtn.querySelector('span').innerText = 'Processando...';

            const response = await window.ApiService.post(endpoint, { username, password });
            
            if (response.token) {
                // Sucesso! Salva o token e libera a app
                window.ApiService.setToken(response.token);
                
                // Atualiza UI global (nome do usuário se o backend retornar)
                document.getElementById('user-display').innerText = username;
                document.getElementById('app-status').innerText = 'Autenticado';
                
                // Remove o overlay de login
                this.overlay.classList.add('hidden');
                
                // Dispara evento para o renderer saber que pode iniciar
                window.dispatchEvent(new CustomEvent('auth-success'));
            } else if (response.error) {
                throw new Error(response.error);
            } else {
                // No caso de registro com sucesso mas sem auto-login
                if (!this.isLoginMode) {
                    alert('Conta criada com sucesso! Agora faça login.');
                    this.toggleMode();
                }
            }
        } catch (error) {
            this.showError(error.message || 'Erro na conexão com o servidor');
        } finally {
            this.submitBtn.disabled = false;
            this.submitBtn.querySelector('span').innerText = this.isLoginMode ? 'Entrar' : 'Cadastrar';
        }
    },

    showError(msg) {
        this.errorMsg.innerText = msg;
        this.errorMsg.classList.remove('hidden');
    },

    hideError() {
        this.errorMsg.classList.add('hidden');
    }
};

window.AuthModule = AuthModule;
