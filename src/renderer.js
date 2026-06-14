// Dicionário de títulos para cada view
const viewTitles = {
    'todo': 'To-Do List',
    'pomodoro': 'Timer Pomodoro',
    'passgen': 'Gerador de Senhas',
    'jsonformat': 'Formatador JSON',
    'weather': 'Previsão do Tempo'
};

// Referências aos elementos do DOM
const navButtons = document.querySelectorAll('.nav-btn');
const viewTitle = document.getElementById('view-title');
const viewContainer = document.getElementById('view-container');
const loader = document.getElementById('loader');
const authContainer = document.getElementById('auth-container');

/**
 * Sistema de Inicialização Forçada com Login
 */
async function initApp() {
    // 1. Carrega a tela de Login obrigatoriamente
    try {
        const response = await fetch('components/auth.html');
        const html = await response.text();
        authContainer.innerHTML = html;

        // Carrega o script de auth se necessário
        if (!document.getElementById('script-auth')) {
            const script = document.createElement('script');
            script.id = 'script-auth';
            script.src = 'modules/auth.js';
            document.body.appendChild(script);
            
            script.onload = () => {
                window.AuthModule.init();
            };
        }
    } catch (err) {
        console.error('Erro ao carregar sistema de autenticação:', err);
    }
}

// Escuta o sucesso do login para liberar a app
window.addEventListener('auth-success', () => {
    loadView('todo');
});

// Função para carregar a view selecionada
async function loadView(viewId) {
    showLoader(true);
    
    // Atualiza título da barra superior
    viewTitle.innerText = viewTitles[viewId] || 'Utilitário';

    // Limpa o container atual
    viewContainer.innerHTML = '';

    try {
        // 1. Tentar carregar o HTML parcial do componente
        const response = await fetch(`components/${viewId}.html`);
        if (response.ok) {
            const html = await response.text();
            viewContainer.innerHTML = html;
        } else {
            // Fallback se o arquivo não existir ainda
            viewContainer.innerHTML = `
                <div class="view-placeholder">
                    <h2>Funcionalidade: ${viewTitles[viewId]}</h2>
                    <p>Crie o arquivo <code>src/components/${viewId}.html</code> para esta tela.</p>
                </div>
            `;
        }

        // 2. Carregar e inicializar o módulo JS se existir
        // Em Electron com contextIsolation: false, podemos usar require ou scripts dinâmicos
        try {
            // Se o script ainda não foi carregado, carregamos dinamicamente
            if (!document.getElementById(`script-${viewId}`)) {
                const script = document.createElement('script');
                script.id = `script-${viewId}`;
                script.src = `modules/${viewId}.js`;
                
                // Espera o script carregar antes de inicializar
                await new Promise((resolve, reject) => {
                    script.onload = resolve;
                    script.onerror = reject;
                    document.body.appendChild(script);
                });
            }

            // Inicializa o módulo (seguindo a convenção NomeModule.init())
            const moduleName = viewId.charAt(0).toUpperCase() + viewId.slice(1) + 'Module';
            if (window[moduleName] && typeof window[moduleName].init === 'function') {
                window[moduleName].init();
            }
        } catch (jsErr) {
            console.warn(`Aviso: Módulo JS para ${viewId} não encontrado ou falhou ao carregar.`, jsErr);
        }

    } catch (error) {
        console.error('Erro ao carregar view:', error);
        viewContainer.innerHTML = '<p class="error">Erro crítico ao carregar a funcionalidade.</p>';
    } finally {
        showLoader(false);
    }
}

function showLoader(show) {
    if (show) {
        loader.classList.remove('hidden');
    } else {
        loader.classList.add('hidden');
    }
}

// Configura listeners para os botões da sidebar
navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove 'active' de todos e adiciona no clicado
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const target = btn.getAttribute('data-target');
        loadView(target);
    });
});

// Carrega o sistema de Login ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});
