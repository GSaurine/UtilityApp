/**
 * Módulo To-Do List
 */
const TodoModule = {
    async init() {
        this.cacheDOM();
        this.bindEvents();
        await this.loadTodos();
    },

    cacheDOM() {
        this.input = document.getElementById('todo-input');
        this.addBtn = document.getElementById('add-todo-btn');
        this.list = document.getElementById('todo-list');
    },

    bindEvents() {
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
    },

    async loadTodos() {
        try {
            // Usando o ApiService global
            const todos = await window.ApiService.get('/api/activities');
            this.render(todos);
        } catch (error) {
            console.error('Erro ao carregar tarefas:', error);
        }
    },

    async addTodo() {
        const text = this.input.value.trim();
        if (!text) return;

        try {
            const newTodo = await window.ApiService.post('/api/activities', { activity: text });
            this.input.value = '';
            await this.loadTodos(); // Recarrega para garantir ordem e ID
        } catch (error) {
            alert('Erro ao adicionar tarefa.');
        }
    },

    async toggleTodo(id, completed) {
        try {
            await window.ApiService.patch(`/api/activities/${id}`, { completed });
            this.loadTodos();
        } catch (error) {
            console.error('Erro ao atualizar status:', error);
        }
    },

    async deleteTodo(id) {
        if (!confirm('Deseja excluir esta tarefa?')) return;
        
        try {
            await window.ApiService.delete(`/api/activities/${id}`);
            this.loadTodos();
        } catch (error) {
            console.error('Erro ao deletar tarefa:', error);
        }
    },

    render(todos) {
        this.list.innerHTML = '';
        
        if (!Array.isArray(todos)) {
            this.list.innerHTML = '<p>Nenhuma tarefa encontrada.</p>';
            return;
        }

        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <span>${todo.activity}</span>
                <i class="fas fa-trash delete-btn"></i>
            `;

            // Listeners
            li.querySelector('.todo-checkbox').addEventListener('change', (e) => {
                this.toggleTodo(todo.id, e.target.checked);
            });

            li.querySelector('.delete-btn').addEventListener('click', () => {
                this.deleteTodo(todo.id);
            });

            this.list.appendChild(li);
        });
    }
};

// Deixa o módulo disponível globalmente
window.TodoModule = TodoModule;
