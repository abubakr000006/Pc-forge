/* =====================================
   PC FORGE — PRODUCT CARDS FIXED
===================================== */

(() => {
    "use strict";

    const parts = document.getElementById("parts");

    if (!parts) {
        console.error("PC FORGE: #parts не найден");
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

        return {
            title: separator !== -1
                ? text.slice(0, separator).trim()
                : text,
            price: separator !== -1
                ? text.slice(separator + 1).trim()
                : "Цена неизвестна"
        };
    }

    function createInterface(part) {
        if (part.dataset.cardsReady === "true") return;

        const select = part.querySelector("select");
        if (!select) return;

        const name =
            select.dataset.name ||
            part.querySelector("label")?.textContent.trim() ||
            "Комплектующее";

        part.dataset.cardsReady = "true";

        const search = document.createElement("input");
        search.className = "product-search";
        search.type = "search";
        search.placeholder = "⌕ Поиск комплектующих...";

        const toolbar = document.createElement("div");
        toolbar.className = "product-toolbar";

        const count = document.createElement("span");
        const selected = document.createElement("span");
        selected.className = "product-selected";

        toolbar.append(count, selected);

        const grid = document.createElement("div");
        grid.className = "product-grid";

        select.classList.add("product-native-select");

        // Карточки размещаются после select.
        select.insertAdjacentElement("afterend", toolbar);
        toolbar.insertAdjacentElement("afterend", search);
        search.insertAdjacentElement("afterend", grid);

        function renderCards() {
            const query = search.value.toLowerCase().trim();

            grid.innerHTML = "";

            let visible = 0;

            [...select.options].forEach(option => {
                const data = getProductData(option);

                if (!data.title.toLowerCase().includes(query)) return;

                visible++;

                const card = document.createElement("button");
                card.type = "button";
                card.className = "product-card";

                const active = option.value === select.value;

                if (active) card.classList.add("active");

                const icon = document.createElement("div");
                icon.className = "product-icon";
                icon.textContent = icons[name] || "⚙️";

                const category = document.createElement("div");
                category.className = "product-category";
                category.textContent = descriptions[name] || "PC COMPONENT";

                const title = document.createElement("div");
                title.className = "product-title";
                title.textContent = data.title;

                const footer = document.createElement("div");
                footer.className = "product-card-footer";

                const price = document.createElement("strong");
                price.className = "product-price";
                price.textContent = data.price;

                const badge = document.createElement("span");
                badge.className = "product-check";
                badge.textContent = active ? "✓" : "+";

                footer.append(price, badge);
                card.append(icon, category, title, footer);

                card.addEventListener("click", () => {
                    select.value = option.value;

                    select.dispatchEvent(
                        new Event("change", { bubbles: true })
                    );

                    renderCards();
                });

                grid.append(card);
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

        new MutationObserver(renderCards).observe(select, {
            childList: true,
            subtree: true
        });

        renderCards();
    }

    function initialize() {
        parts.querySelectorAll(".part").forEach(createInterface);
    }

    initialize();

    new MutationObserver(initialize).observe(parts, {
        childList: true,
        subtree: true
    });

})();
