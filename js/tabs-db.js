// ============================================
// БАЗА ТАБУЛАТУР ДЛЯ ПЕРЕБОРОВ
// ============================================
// Добавляй новые переборы сюда!
// Формат:
// {
//   id: "уникальный_идентификатор",
//   name: "Название перебора",
//   difficulty: "easy|medium|hard",
//   strings: [6, 5, 4, 3, 2, 1] — порядок струн для перебора
// }

const TABS_DB = {
    // --- Классические переборы ---
    classic1: {
        id: "classic1",
        name: "Классика (бас-3-2-1-2-3)",
        difficulty: "easy",
        pattern: ["Бас", "3", "2", "1", "2", "3"],
        description: "Самый популярный перебор"
    },
    classic2: {
        id: "classic2",
        name: "Классика (бас-3-2-1-2-3-2-3)", 
        difficulty: "easy",
        pattern: ["Бас", "3", "2", "1", "2", "3", "2", "3"],
        description: "Расширенная версия"
    },
    classic3: {
        id: "classic3",
        name: "Восьмёрка (бас-3-2-3-1-3-2-3)",
        difficulty: "medium",
        pattern: ["Бас", "3", "2", "3", "1", "3", "2", "3"],
        description: "Часто используется в балладах"
    },

    // --- Переборы с басом на разных струнах ---
    bass4: {
        id: "bass4",
        name: "Бас на 4-й струне",
        difficulty: "easy",
        pattern: ["Бас(4)", "3", "2", "1", "2", "3"],
        description: "Для аккордов с корнем на 4-й струне"
    },
    bass5: {
        id: "bass5",
        name: "Бас на 5-й струне", 
        difficulty: "easy",
        pattern: ["Бас(5)", "3", "2", "1", "2", "3"],
        description: "Для аккордов с корнем на 5-й струне"
    },
    bass6: {
        id: "bass6",
        name: "Бас на 6-й струне",
        difficulty: "easy", 
        pattern: ["Бас(6)", "3", "2", "1", "2", "3"],
        description: "Для аккордов с корнем на 6-й струне"
    },

    // --- Сложные переборы (фламенко, арпеджио) ---
    flamenco1: {
        id: "flamenco1",
        name: "Фламенко (бас-3-2-1)",
        difficulty: "hard",
        pattern: ["Бас(6)", "3", "2", "1", "3", "2", "1", "3"],
        description: "Ритмичный испанский перебор"
    },
    arpeggio1: {
        id: "arpeggio1",
        name: "Арпеджио (снизу вверх)",
        difficulty: "medium",
        pattern: ["Бас", "3", "2", "1", "2", "3", "4"],
        description: "Классическое арпеджио"
    },
    arpeggio2: {
        id: "arpeggio2",
        name: "Арпеджио кругом",
        difficulty: "hard",
        pattern: ["Бас", "3", "2", "1", "2", "3", "Бас", "3", "2", "1"],
        description: "Полный оборот"
    },

    // --- Переборы для баллад ---
    ballad1: {
        id: "ballad1",
        name: "Баллада (бас-3-2-1-2-3-2-1-2)",
        difficulty: "medium",
        pattern: ["Бас", "3", "2", "1", "2", "3", "2", "1", "2"],
        description: "Для медленных песен"
    },
    ballad2: {
        id: "ballad2",
        name: "Баллада (бас-3-1-3-2-3-1-3)",
        difficulty: "hard",
        pattern: ["Бас", "3", "1", "3", "2", "3", "1", "3"],
        description: "Более сложный вариант"
    },

    // --- Простые для новичков ---
    simple1: {
        id: "simple1",
        name: "Простой (бас-1-2-3)",
        difficulty: "easy",
        pattern: ["Бас", "1", "2", "3"],
        description: "Для самых маленьких"
    },
    simple2: {
        id: "simple2",
        name: "Перебор вверх-вниз",
        difficulty: "easy",
        pattern: ["Бас", "3", "2", "1", "2", "3"],
        description: "Идеально для первого раза"
    },

    // --- Необычные переборы ---
    syncopated1: {
        id: "syncopated1",
        name: "Синкопированный с паузой",
        difficulty: "hard",
        pattern: ["Бас", "3", "—", "2", "1", "—", "3", "2"],
        description: "Есть паузы! (— это пауза)"
    },
    tremolo1: {
        id: "tremolo1",
        name: "Тремоло (быстрый)",
        difficulty: "hard",
        pattern: ["Бас", "1", "1", "1", "2", "2", "2", "3", "3", "3"],
        description: "Требует скорости"
    }
};

// ============================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================

// Получить все переборы
function getAllTabs() {
    return Object.values(TABS_DB);
}

// Получить перебор по ID
function getTabById(id) {
    return TABS_DB[id];
}

// Получить переборы по сложности
function getTabsByDifficulty(difficulty) {
    return Object.values(TABS_DB).filter(tab => tab.difficulty === difficulty);
}

// Получить случайный перебор
function getRandomTab() {
    const tabs = getAllTabs();
    return tabs[Math.floor(Math.random() * tabs.length)];
}

// Количество переборов в базе
function getTabsCount() {
    return Object.keys(TABS_DB).length;
}

// ============================================
// КАК ДОБАВИТЬ НОВЫЙ ПЕРЕБОР:
// ============================================
// 1. Скопируй один из блоков выше
// 2. Измени id (должен быть уникальным)
// 3. Измени name, difficulty, pattern, description
// 4. Вставь в объект TABS_DB
//
// Пример:
//   myCoolTab: {
//       id: "myCoolTab",
//       name: "Мой крутой перебор",
//       difficulty: "medium",
//       pattern: ["Бас", "3", "2", "1", "2", "3"],
//       description: "Придумал сам"
//   }
// ============================================

// Экспортируем для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TABS_DB, getAllTabs, getTabById, getTabsByDifficulty, getRandomTab, getTabsCount };
}