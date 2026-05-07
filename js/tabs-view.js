// ============================================
// ОТРИСОВКА ТАБУЛАТУРЫ
// ============================================

class TabView {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentTab = null;
    }

    // Отрисовать табулатуру
    renderTab(tab) {
        this.currentTab = tab;
        if (!this.container) return;

        // Создаём DOM структуру
        this.container.innerHTML = `
            <div class="tab-header">
                <div class="tab-name">${this.escapeHtml(tab.name)}</div>
                <div class="tab-difficulty difficulty-${tab.difficulty}">
                    ${this.getDifficultyIcon(tab.difficulty)}
                </div>
            </div>
            <div class="tab-description">${this.escapeHtml(tab.description || '')}</div>
            <div class="tab-strings" id="tabStrings">
                ${this.renderStrings(tab.pattern)}
            </div>
        `;

        // Сохраняем ссылки на элементы нот
        this.noteElements = {};
        const noteItems = this.container.querySelectorAll('.note-item');
        noteItems.forEach((el, idx) => {
            this.noteElements[idx] = el;
        });
    }

    // Отрисовать струны/ноты
    renderStrings(pattern) {
        return `
            <div class="notes-row">
                ${pattern.map((note, idx) => `
                    <div class="note-item" data-note-index="${idx}" data-note-value="${this.escapeHtml(note)}">
                        <span class="note-badge">${this.escapeHtml(this.formatNote(note))}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Форматировать отображение ноты
    formatNote(note) {
        if (note === "—") return "⏸";
        if (note === "Бас") return "●";
        if (note === "Бас(4)") return "●⁴";
        if (note === "Бас(5)") return "●⁵";
        if (note === "Бас(6)") return "●⁶";
        return note;
    }

    // Подсветить текущую ноту
    highlightNote(index) {
        // Снимаем подсветку со всех
        Object.values(this.noteElements).forEach(el => {
            el.classList.remove('active');
        });
        
        // Подсвечиваем текущую
        if (this.noteElements[index]) {
            this.noteElements[index].classList.add('active');
        }
    }

    // Снять подсветку
    clearHighlight() {
        Object.values(this.noteElements).forEach(el => {
            el.classList.remove('active');
        });
    }

    // Получить иконку сложности
    getDifficultyIcon(difficulty) {
        switch(difficulty) {
            case 'easy': return '🟢 Лёгкий';
            case 'medium': return '🟡 Средний';
            case 'hard': return '🔴 Сложный';
            default: return '⚪';
        }
    }

    // Эскейп HTML
    escapeHtml(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
}