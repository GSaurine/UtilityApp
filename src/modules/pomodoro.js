/**
 * Módulo Pomodoro Timer
 */
const PomodoroModule = {
    timer: null,
    timeLeft: 25 * 60,
    isRunning: false,
    isBreak: false,

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.updateDisplay();
    },

    cacheDOM() {
        this.minutesDisplay = document.getElementById('timer-minutes');
        this.secondsDisplay = document.getElementById('timer-seconds');
        this.labelDisplay = document.getElementById('timer-label');
        this.startBtn = document.getElementById('timer-start');
        this.pauseBtn = document.getElementById('timer-pause');
        this.resetBtn = document.getElementById('timer-reset');
        this.focusInput = document.getElementById('focus-time');
        this.breakInput = document.getElementById('break-time');
    },

    bindEvents() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        
        this.focusInput.addEventListener('change', () => {
            if (!this.isRunning) this.reset();
        });
    },

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.startBtn.classList.add('hidden');
        this.pauseBtn.classList.remove('hidden');

        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();

            if (this.timeLeft <= 0) {
                this.handleTimerEnd();
            }
        }, 1000);
    },

    pause() {
        this.isRunning = false;
        clearInterval(this.timer);
        this.startBtn.classList.remove('hidden');
        this.pauseBtn.classList.add('hidden');
    },

    reset() {
        this.pause();
        this.isBreak = false;
        const mins = parseInt(this.focusInput.value) || 25;
        this.timeLeft = mins * 60;
        this.labelDisplay.innerText = 'Foco';
        this.updateDisplay();
    },

    handleTimerEnd() {
        this.pause();
        
        // Notificação sonora (opcional)
        const bell = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
        bell.play().catch(() => {});

        // Alterna entre foco e pausa
        if (!this.isBreak) {
            this.isBreak = true;
            this.labelDisplay.innerText = 'Pausa';
            this.timeLeft = (parseInt(this.breakInput.value) || 5) * 60;
            alert('Hora de uma pausa!');
        } else {
            this.isBreak = false;
            this.labelDisplay.innerText = 'Foco';
            this.timeLeft = (parseInt(this.focusInput.value) || 25) * 60;
            alert('Voltar ao trabalho!');
        }
        
        this.updateDisplay();
        // Opcional: Auto-start após o alerta
        // this.start();
    },

    updateDisplay() {
        const mins = Math.floor(this.timeLeft / 60);
        const secs = this.timeLeft % 60;
        
        this.minutesDisplay.innerText = mins.toString().padStart(2, '0');
        this.secondsDisplay.innerText = secs.toString().padStart(2, '0');
        
        // Atualiza título da aba do Electron se quiser
        // document.title = `${this.minutesDisplay.innerText}:${this.secondsDisplay.innerText} - UtilityApp`;
    }
};

window.PomodoroModule = PomodoroModule;
