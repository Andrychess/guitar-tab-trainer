// ============================================
// ГЛАВНЫЙ ФАЙЛ ПРИЛОЖЕНИЯ
// ============================================

// Ждём загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // Инициализация компонентов
    const tabView = new TabView('tabContainer');
    const player = new TabPlayer('noteSlider');
    const speedBtns = document.querySelectorAll('.speed-btn');
    const speedValueSpan = document.getElementById('speedValue');
    const currentNoteSpan = document.getElementById('currentNote');
    const randomBtn = document.getElementById('randomTabBtn');
    
    let autoPlayInterval = null;
    let currentTabId = null;
    
    // Колбэк при смене ноты
    player.onNoteChange = (index, note) => {
        tabView.highlightNote(index);
        if (currentNoteSpan) {
            currentNoteSpan.textContent = tabView.formatNote(note);
        }
    };
    
    // Обработчик слайдера
    player.onSliderChange((index) => {
        // При ручном перемещении останавливаем автопроигрывание
        stopAutoPlay();
    });
    
    // Загрузка табулатуры
    function loadTab(tab) {
        if (!tab) return;
        
        currentTabId = tab.id;
        tabView.renderTab(tab);
        player.loadTab(tab);
        
        // Обновляем информацию
        updateTabInfo(tab);
    }
    
    // Обновление информации о текущей табулатуре
    function updateTabInfo(tab) {
        const tabInfo = document.getElementById('tabInfo');
        if (tabInfo) {
            tabInfo.innerHTML = `
                <span class="tab-badge">📌 ${tab.name}</span>
                <span class="pattern-length">• ${tab.pattern.length} нот</span>
            `;
        }
    }
    
    // Запуск автопроигрывания
    function startAutoPlay() {
        stopAutoPlay();
        
        const speed = getCurrentSpeed();
        const baseDelay = 1000; // 1 секунда на ноту базово
        
        autoPlayInterval = setInterval(() => {
            player.next();
        }, baseDelay / speed);
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    // Получить текущую скорость
    function getCurrentSpeed() {
        const activeBtn = document.querySelector('.speed-btn.active');
        if (activeBtn) {
            return parseFloat(activeBtn.dataset.speed);
        }
        return 1;
    }
    
    // Обновить UI скорости
    function updateSpeedUI(speed) {
        if (speedValueSpan) {
            speedValueSpan.textContent = speed + 'x';
        }
        
        // Обновляем активную кнопку
        speedBtns.forEach(btn => {
            const btnSpeed = parseFloat(btn.dataset.speed);
            if (btnSpeed === speed) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Перезапускаем автопроигрывание если оно было
        if (autoPlayInterval) {
            startAutoPlay();
        }
    }
    
    // Загрузить случайную табулатуру
    function loadRandomTab() {
        const randomTab = getRandomTab();
        loadTab(randomTab);
    }
    
    // --- Обработчики событий ---
    
    // Случайный перебор
    if (randomBtn) {
        randomBtn.addEventListener('click', () => {
            loadRandomTab();
        });
    }
    
    // Кнопки скорости
    speedBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const speed = parseFloat(btn.dataset.speed);
            updateSpeedUI(speed);
        });
    });
    
    // Автопроигрывание по кнопке Play (если есть)
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
    
    // Кнопки ручного управления
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            player.prev();
            if (playBtn) playBtn.textContent = '▶';
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            player.next();
            if (playBtn) playBtn.textContent = '▶';
        });
    }
    
    // ========== ЗАГРУЗКА ПЕРВОЙ ТАБУЛАТУРЫ ==========
    // Загружаем первый перебор из базы
    const firstTab = getAllTabs()[0];
    if (firstTab) {
        loadTab(firstTab);
    }
    
    // Выводим в консоль количество доступных переборов
    console.log(`🎸 Загружено ${getTabsCount()} переборов!`);
    console.log('Добавить новый перебор можно в файле js/tabs-db.js');
});