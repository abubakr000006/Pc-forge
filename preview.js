/* =====================================
   PC FORGE — ПРЕДПРОСМОТР СБОРКИ
===================================== */

(function () {

    const parts = document.getElementById("parts");
    const specifications = document.getElementById("pc-specs");

    if (!parts || !specifications) return;

    function updatePCPreview() {

        specifications.innerHTML = "";

        const selects = parts.querySelectorAll("select");

        selects.forEach(select => {

            const name = select.dataset.name || "Комплектующая";

            const selectedOption =
                select.options[select.selectedIndex];

            const value = selectedOption
                ? selectedOption.textContent.trim()
                : "Не выбрано";

            const row = document.createElement("div");
            row.className = "pc-spec-row";

            const label = document.createElement("span");
            label.textContent = name;

            const component = document.createElement("strong");
            component.textContent = value;

            row.appendChild(label);
            row.appendChild(component);

            specifications.appendChild(row);

        });

    }

    parts.addEventListener("change", updatePCPreview);

    const observer = new MutationObserver(updatePCPreview);

    observer.observe(parts, {
        childList: true,
        subtree: true
    });

    updatePCPreview();

})();
