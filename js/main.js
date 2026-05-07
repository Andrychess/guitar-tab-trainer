// ============================================
// ГЛАВНЫЙ ФАЙЛ ПРИЛОЖЕНИЯ (VK-совместимый)
// ============================================

// Функция для отложенной инициализации (ждём DOM)
function initApp() {
    console.log('🎸 Инициализация приложения...');
    
    // Инициализация компонентов
    const tabView = new TabView('tabContainer');
    
    // Проверяем наличие слайдера
    const slider = document.getElementById('noteSlider');
    if (!slider) {
        console.error('❌ Слайдер не найден!');
        return;
    }
    
    const player = new TabPlayer('noteSlider');
    const speedBtns = document.querySelectorAll('.speed-btn');
    const speedValueSpan = document.getElementById('speedValue');
    const currentNoteSpan = document.getElementById('currentNote');
    const randomBtn = document.getElementById('randomTabBtn');
    
    let autoPlayInterval = null;
    
    // Добавляем метод formatNote в TabView, если его нет
    if (!tabView.formatNote) {
        tabView.formatNote = function(note) {
            if (note === "—") return "⏸";
            if (note === "Бас") return "●";
            if (note === "Бас(4)") return "●⁴";
            if (note === "Бас(5)") return "●⁵";
            if (note === "Бас(6)") return "●⁶";
            return note;
        };
    }
    
    // Колбэк при смене ноты
    player.onNoteChange = (index, note) => {
        if (tabView && tabView.highlightNote) {
            tabView.highlightNote(index);
        }
        if (currentNoteSpan && tabView && tabView.formatNote) {
            currentNoteSpan.textContent = tabView.formatNote(note);
        }
    };
    
    // Обработчик слайдера
    if (player.onSliderChange) {
        player.onSliderChange((index) => {
            stopAutoPlay();
            if (playBtn) playBtn.textContent = '▶';
        });
    }
    
    // Функции управления
    function loadTab(tab) {
        if (!tab) return;
        
        if (tabView && tabView.renderTab) {
            tabView.renderTab(tab);
        }
        if (player && player.loadTab) {
            player.loadTab(tab);
        }
        
        // Обновляем информацию
        const tabNameEl = document.getElementById('tabName');
        if (tabNameEl) {
            tabNameEl.textContent = tab.name || '—';
        }
    }
    
    function startAutoPlay() {
        stopAutoPlay();
        
        const speed = getCurrentSpeed();
        const baseDelay = 1000;
        
        autoPlayInterval = setInterval(() => {
            if (player && player.next) {
                player.next();
            }
        }, baseDelay / speed);
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    function getCurrentSpeed() {
        const activeBtn = document.querySelector('.speed-btn.active');
        if (activeBtn) {
            return parseFloat(activeBtn.dataset.speed) || 1;
        }
        return 1;
    }
    
    function updateSpeedUI(speed) {
        if (speedValueSpan) {
            speedValueSpan.textContent = speed + 'x';
        }
        
        speedBtns.forEach(btn => {
            const btnSpeed = parseFloat(btn.dataset.speed);
            if (btnSpeed === speed) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        if (autoPlayInterval) {
            startAutoPlay();
        }
    }
    
    function loadRandomTab() {
        if (typeof getRandomTab === 'function') {
            const randomTab = getRandomTab();
            loadTab(randomTab);
        } else {
            console.error('getRandomTab not found');
        }
    }
    
    // Обработчики
    if (randomBtn) {
        randomBtn.addEventListener('click', () => {
            stopAutoPlay();
            if (playBtn) playBtn.textContent = '▶';
            loadRandomTab();
        });
    }
    
    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            if (autoPlayInterval) {
                stopAutoPlay();
                playBtn.textContent = '▶';
            } else {
                startAutoPlay();
                playBtn.textContent = '⏸';
            }
        });
    }
    
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            if (playBtn) playBtn.textContent = '▶';
            if (player && player.prev) player.prev();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            if (playBtn) playBtn.textContent = '▶';
            if (player && player.next) player.next();
        });
    }
    
    speedBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const speed = parseFloat(btn.dataset.speed);
            updateSpeedUI(speed);
        });
    });
    
    // Загрузка первого перебора
    if (typeof getAllTabs === 'function') {
        const tabs = getAllTabs();
        if (tabs && tabs.length > 0) {
            loadTab(tabs[0]);
            console.log(`🎸 Загружено ${tabs.length} переборов!`);
        }
    } else {
        console.error('tabs-db.js not loaded properly');
    }
}

// Ждём полной загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    // DOM уже загружен
    setTimeout(initApp, 100);
}

// Обработка ошибок VK (подавляем некоторые ошибки)
window.addEventListener('error', function(e) {
    // Игнорируем ошибки VK статистики (они не влияют на работу)
    if (e.message && (
        e.message.includes('stats.vk-portal.net') ||
        e.message.includes('apptracer.ru') ||
        e.message.includes('Cannot destructure property')
    )) {
        e.preventDefault();
        return false;
    }
});
