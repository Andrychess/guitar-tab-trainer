// ============================================
// ПЛЕЕР / ПОЛЗУНОК
// ============================================

class TabPlayer {
    constructor(sliderId, speedMultiplier = 1) {
        this.slider = document.getElementById(sliderId);
        this.currentTab = null;
        this.currentIndex = 0;
        this.maxIndex = 0;
        this.speedMultiplier = speedMultiplier;
        this.animationId = null;
        this.isPlaying = false;
        this.onNoteChange = null; // Callback при смене ноты
    }

    // Загрузить табулатуру
    loadTab(tab) {
        this.currentTab = tab;
        this.maxIndex = tab.pattern.length - 1;
        this.currentIndex = 0;
        
        if (this.slider) {
            this.slider.max = this.maxIndex;
            this.slider.value = 0;
        }
        
        if (this.onNoteChange) {
            this.onNoteChange(0, tab.pattern[0]);
        }
    }

    // Установить позицию
    setPosition(index) {
        if (!this.currentTab) return;
        
        this.currentIndex = Math.max(0, Math.min(this.maxIndex, index));
        if (this.slider) {
            this.slider.value = this.currentIndex;
        }
        
        if (this.onNoteChange) {
            this.onNoteChange(this.currentIndex, this.currentTab.pattern[this.currentIndex]);
        }
    }

    // Следующая нота
    next() {
        if (!this.currentTab) return;
        let newIndex = this.currentIndex + 1;
        if (newIndex > this.maxIndex) {
            newIndex = 0; // Зацикливание
        }
        this.setPosition(newIndex);
    }

    // Предыдущая нота
    prev() {
        if (!this.currentTab) return;
        let newIndex = this.currentIndex - 1;
        if (newIndex < 0) {
            newIndex = this.maxIndex;
        }
        this.setPosition(newIndex);
    }

    // Автоматическое движение (имитация скорости)
    startAutoPlay(speedMs = 1000) {
        this.stopAutoPlay();
        
        const interval = speedMs / this.speedMultiplier;
        
        this.animationId = setInterval(() => {
            this.next();
        }, interval);
        
        this.isPlaying = true;
        return this.animationId;
    }

    stopAutoPlay() {
        if (this.animationId) {
            clearInterval(this.animationId);
            this.animationId = null;
        }
        this.isPlaying = false;
    }

    setSpeedMultiplier(multiplier) {
        this.speedMultiplier = multiplier;
        if (this.isPlaying) {
            // Перезапускаем с новой скоростью
            this.startAutoPlay(1000); // Базовое время = 1 сек
        }
    }

    // Для ручного управления слайдером
    onSliderChange(callback) {
        if (!this.slider) return;
        
        this.slider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            this.currentIndex = val;
            if (this.onNoteChange) {
                this.onNoteChange(val, this.currentTab.pattern[val]);
            }
            if (callback) callback(val);
        });
    }
}