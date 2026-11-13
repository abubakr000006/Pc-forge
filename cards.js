/* =====================================
   PC FORGE — PRODUCT CARDS
===================================== */

(() => {
    "use strict";

    const parts = document.getElementById("parts");

    if (!parts) {
        console.error("PC FORGE: элемент #parts не найден");
        return;
    }

    const icons = {
        "Процессор": "⚡",
        "Видеокарта": "🎮",
        "Материнская плата": "🧩",
        "Оперативная память": "💾",
        "SSD": "💿",
        "Блок питания": "🔋",
        "Корпус": "🖥️"
    };

    const descriptions = {
        "Процессор": "CPU / PROCESSOR",
        "Видеокарта": "GRAPHICS / GPU",
        "Материнская плата": "MOTHERBOARD",
        "Оперативная память": "MEMORY / RAM",
        "SSD": "STORAGE",
        "Блок питания": "POWER SUPPLY",
        "Корпус": "PC CASE"
    };

    function getProductData(option) {
        const text = option.textContent.trim();
        const separator = text.lastIndexOf("—");

        let title = text;
        let price = "";

        if (separator !== -1) {
            title = text.slice(0, separator).trim();
            price = text.slice(separator + 1).trim();
        }

        return { title, price };
    }

    function createInterface(part) {
        if (part.dataset.cardsReady === "true") return;

        const select = part.querySelector("select");

        if (!select) return;

        const name = select.dataset.name ||
            part.querySelector("label")?.textContent.trim() ||
            "Комплектующее";

        part.dataset.cardsReady = "true";

        const search = document.createElement("input");
        search.className = "product-search";
        search.type = "search";
        search.placeholder = "⌕  Поиск комплектующих...";
        search.setAttribute("aria-label", "Поиск: " + name);

        const grid = document.createElement("div");
        grid.className = "product-grid";

        const toolbar = document.createElement("div");
        toolbar.className = "product-toolbar";

        const count = document.createElement("span");
        count.className = "product-count";

        const selected = document.createElement("span");
        selected.className = "product-selected";

        toolbar.append(count, selected);

        part.append(toolbar, search, grid);

        // Скрываем оригинальный select,
        // но оставляем его для script.js.
        select.classList.add("product-native-select");

        function renderCards() {
            const query = search.value.toLowerCase().trim();

            grid.innerHTML = "";

            let visible = 0;

            [...select.options].forEach(option => {
                const data = getProductData(option);

                if (!data.title.toLowerCase().includes(query)) {
                    return;
                }

                visible++;

                const card = document.createElement("button");
                card.type = "button";
                card.className = "product-card";

                const isActive =
                    option.value === select.value;

                if (isActive) {
                    card.classList.add("active");
                }

                const icon = document.createElement("div");
                icon.className = "product-icon";
                icon.textContent = icons[name] || "⚙️";

                const category = document.createElement("div");
                category.className = "product-category";
                category.textContent =
                    descriptions[name] || "PC COMPONENT";

                const title = document.createElement("div");
                title.className = "product-title";
                title.textContent = data.title;

                const footer = document.createElement("div");
                footer.className = "product-card-footer";

                const price = document.createElement("strong");
                price.className = "product-price";
                price.textContent = data.price || "Цена неизвестна";

                const badge = document.createElement("span");
                badge.className = "product-check";
                badge.textContent = isActive ? "✓" : "+";

                footer.append(price, badge);
                card.append(icon, category, title, footer);

                card.addEventListener("click", () => {
                    select.value = option.value;

                    select.dispatchEvent(
                        new Event("change", { bubbles: true })
                    );

                    renderCards();
                });

                grid.appendChild(card);
            });

            count.textContent =
                `Найдено: ${visible} из ${select.options.length}`;

            const current = select.options[select.selectedIndex];

            selected.textContent = current
                ? "Выбрано: " + getProductData(current).title
                : "Ничего не выбрано";
        }

        search.addEventListener("input", renderCards);

        select.addEventListener("change", renderCards);

        // Следим за изменением списка материнских плат.
        const observer = new MutationObserver(() => {
            renderCards();
        });

        observer.observe(select, {
            childList: true
        });

        renderCards();
    }

    function initialize() {
        parts.querySelectorAll(".part").forEach(createInterface);
    }

    initialize();

    // Повторная инициализация при появлении новых деталей.
    const observer = new MutationObserver(() => {
        initialize();
    });

    observer.observe(parts, {
        childList: true
    });

})();
