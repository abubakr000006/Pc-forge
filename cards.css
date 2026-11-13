/* PC FORGE — cards layer. Keeps the original selects and build logic intact. */
(() => {
  const icons = {
    "Процессор": "◈", "Видеокарта": "▰", "Материнская плата": "▦",
    "Оперативная память": "▤", "SSD": "▱", "Блок питания": "ϟ", "Корпус": "▣"
  };
  const money = value => `${Number(value).toLocaleString("ru-RU")} ₽`;

  function enhancePart(part) {
    const label = part.querySelector(":scope > label");
    const select = part.querySelector(":scope > select");
    if (!label || !select || part.dataset.cardsReady) return;
    part.dataset.cardsReady = "1";

    const toolbar = document.createElement("div");
    toolbar.className = "card-toolbar";
    const search = document.createElement("input");
    search.className = "card-search";
    search.type = "search";
    search.placeholder = `Найти: ${label.textContent.toLowerCase()}...`;
    search.setAttribute("aria-label", `Поиск: ${label.textContent}`);
    const count = document.createElement("span");
    count.className = "card-count";
    toolbar.append(search, count);

    const grid = document.createElement("div");
    grid.className = "product-grid";
    part.insertBefore(toolbar, select);
    part.insertBefore(grid, select);

    function render() {
      const query = search.value.trim().toLowerCase();
      const options = [...select.options].filter(option =>
        option.textContent.toLowerCase().includes(query)
      );
      count.textContent = `${options.length} / ${select.options.length}`;
      grid.replaceChildren();

      if (!options.length) {
        const empty = document.createElement("div");
        empty.className = "product-empty";
        empty.textContent = "Ничего не найдено. Попробуй другой запрос.";
        grid.append(empty);
        return;
      }

      options.forEach(option => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "product-card" + (option.value === select.value ? " is-selected" : "");
        card.setAttribute("aria-pressed", option.value === select.value ? "true" : "false");

        const top = document.createElement("span");
        top.className = "product-card-top";
        const icon = document.createElement("span");
        icon.className = "product-icon";
        icon.textContent = icons[label.textContent] || "◇";
        const check = document.createElement("span");
        check.className = "product-check";
        check.textContent = "✓";
        top.append(icon, check);

        const text = option.textContent;
        const splitAt = text.lastIndexOf(" — ");
        const name = document.createElement("span");
        name.className = "product-name";
        name.textContent = splitAt > -1 ? text.slice(0, splitAt) : text;
        const price = document.createElement("span");
        price.className = "product-price";
        price.textContent = splitAt > -1 ? text.slice(splitAt + 3) : "";

        card.append(top, name, price);
        card.addEventListener("click", () => {
          select.value = option.value;
          select.dispatchEvent(new Event("change", { bubbles: true }));
          render();
        });
        grid.append(card);
      });
    }

    search.addEventListener("input", render);
    select.addEventListener("change", render);
    new MutationObserver(render).observe(select, { childList: true });
    render();
  }

  function init() {
    document.querySelectorAll("#parts .part").forEach(enhancePart);
    // Motherboard options are rebuilt when CPU/RAM changes; refresh its cards too.
    const parts = document.getElementById("parts");
    if (parts) new MutationObserver(() => {
      parts.querySelectorAll(".part").forEach(enhancePart);
      parts.querySelectorAll(".part select").forEach(select => {
        select.dispatchEvent(new Event("change", { bubbles: false }));
      });
    }).observe(parts, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
    
