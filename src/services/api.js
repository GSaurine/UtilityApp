const BASE_URL = 'http://localhost:3000';

/**
 * Serviço centralizado para comunicação com o Backend
 */
const ApiService = {
    // Armazena o token se houver sistema de login no futuro
    token: null,

    setToken(token) {
        this.token = token;
    },

    getHeaders() {
        const headers = {
            'Content-Type': 'application/json'
        };
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        return headers;
    },

    async get(endpoint) {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'GET',
                headers: this.getHeaders()
            });
            return await response.json();
        } catch (error) {
            console.error(`Erro GET ${endpoint}:`, error);
            throw error;
        }
    },

    async post(endpoint, data) {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error(`Erro POST ${endpoint}:`, error);
            throw error;
        }
    },

    async patch(endpoint, data) {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'PATCH',
                headers: this.getHeaders(),
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error(`Erro PATCH ${endpoint}:`, error);
            throw error;
        }
    },

    async delete(endpoint) {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'DELETE',
                headers: this.getHeaders()
            });
            return await response.json();
        } catch (error) {
            console.error(`Erro DELETE ${endpoint}:`, error);
            throw error;
        }
    }
};

// No CommonJS do Electron, podemos precisar exportar ou deixar global
// Para simplificar no renderer process sem módulos complexos por enquanto:
window.ApiService = ApiService;
