const components = {
    "Процессор": [
        ["Intel Core i5-12400F", 10500, "LGA1700"],
        ["Intel Core i5-13400F", 16500, "LGA1700"],
        ["AMD Ryzen 5 5600", 8500, "AM4"],
        ["AMD Ryzen 5 7500F", 14500, "AM5"]
    ],

    "Видеокарта": [

    // GTX 16
    ["GTX 1660 SUPER MSI 6GB", 25000],
    ["GTX 1660 SUPER ASUS 6GB", 25000],
    ["GTX 1660 SUPER Gigabyte 6GB", 25000],
    ["GTX 1660 SUPER Palit 6GB", 25000],

    ["GTX 1660 Ti MSI 6GB", 24000],
    ["GTX 1660 Ti ASUS 6GB", 24000],
    ["GTX 1660 Ti Gigabyte 6GB", 24000],
    ["GTX 1660 Ti Palit 6GB", 24000],

    // RTX 20
    ["RTX 2060 MSI 6GB", 30000],
    ["RTX 2060 ASUS 6GB", 30000],
    ["RTX 2060 Gigabyte 6GB", 30000],
    ["RTX 2060 Palit 6GB", 30000],
    ["RTX 2060 Zotac 6GB", 30000],

    ["RTX 2060 SUPER MSI 8GB", 29000],
    ["RTX 2060 SUPER ASUS 8GB", 29000],
    ["RTX 2060 SUPER Gigabyte 8GB", 29000],
    ["RTX 2060 SUPER Palit 8GB", 29000],

    ["RTX 2070 MSI 8GB", 39500],
    ["RTX 2070 ASUS 8GB", 39500],
    ["RTX 2070 Gigabyte 8GB", 39500],
    ["RTX 2070 Palit 8GB", 39500],

    ["RTX 2070 SUPER MSI 8GB", 31000],
    ["RTX 2070 SUPER ASUS 8GB", 31000],
    ["RTX 2070 SUPER Gigabyte 8GB", 31000],
    ["RTX 2070 SUPER Palit 8GB", 31000],

    ["RTX 2080 MSI 8GB", 40000],
    ["RTX 2080 ASUS 8GB", 40000],
    ["RTX 2080 Gigabyte 8GB", 40000],
    ["RTX 2080 Palit 8GB", 40000],

    ["RTX 2080 SUPER MSI 8GB", 43000],
    ["RTX 2080 SUPER ASUS 8GB", 43000],
    ["RTX 2080 SUPER Gigabyte 8GB", 43000],
    ["RTX 2080 SUPER Palit 8GB", 43000],

    ["RTX 2080 Ti MSI 11GB", 47000],
    ["RTX 2080 Ti ASUS 11GB", 47000],
    ["RTX 2080 Ti Gigabyte 11GB", 47000],
    ["RTX 2080 Ti Palit 11GB", 47000],

    // RTX 30
    ["RTX 3050 MSI 8GB", 19000],
    ["RTX 3050 ASUS 8GB", 19000],
    ["RTX 3050 Gigabyte 8GB", 19000],
    ["RTX 3050 Palit 8GB", 19000],

    ["RTX 3060 MSI 12GB", 45000],
    ["RTX 3060 ASUS 12GB", 45000],
    ["RTX 3060 Gigabyte 12GB", 45000],
    ["RTX 3060 Palit 12GB", 45000],
    ["RTX 3060 Zotac 12GB", 45000],

    ["RTX 3060 Ti MSI 8GB", 42000],
    ["RTX 3060 Ti ASUS 8GB", 42000],
    ["RTX 3060 Ti Gigabyte 8GB", 42000],
    ["RTX 3060 Ti Palit 8GB", 42000],

    ["RTX 3070 MSI 8GB", 45000],
    ["RTX 3070 ASUS 8GB", 45000],
    ["RTX 3070 Gigabyte 8GB", 45000],
    ["RTX 3070 Palit 8GB", 45000],

    ["RTX 3070 Ti MSI 8GB", 48000],
    ["RTX 3070 Ti ASUS 8GB", 48000],
    ["RTX 3070 Ti Gigabyte 8GB", 48000],
    ["RTX 3070 Ti Palit 8GB", 48000],

    ["RTX 3080 MSI 10GB", 60000],
    ["RTX 3080 ASUS 10GB", 60000],
    ["RTX 3080 Gigabyte 10GB", 60000],
    ["RTX 3080 Palit 10GB", 60000],

    ["RTX 3080 Ti MSI 12GB", 65000],
    ["RTX 3080 Ti ASUS 12GB", 65000],
    ["RTX 3080 Ti Gigabyte 12GB", 65000],
    ["RTX 3080 Ti Palit 12GB", 65000],

    ["RTX 3090 MSI 24GB", 85000],
    ["RTX 3090 ASUS 24GB", 85000],
    ["RTX 3090 Gigabyte 24GB", 85000],
    ["RTX 3090 Palit 24GB", 85000],

    ["RTX 3090 Ti MSI 24GB", 100000],
    ["RTX 3090 Ti ASUS 24GB", 100000],
    ["RTX 3090 Ti Gigabyte 24GB", 100000],

    // RTX 40
    ["RTX 4060 MSI 8GB", 30000],
    ["RTX 4060 ASUS 8GB", 30000],
    ["RTX 4060 Gigabyte 8GB", 30000],
    ["RTX 4060 Palit 8GB", 30000],

    ["RTX 4060 Ti MSI 8GB", 38000],
    ["RTX 4060 Ti ASUS 8GB", 38000],
    ["RTX 4060 Ti Gigabyte 8GB", 38000],
    ["RTX 4060 Ti Palit 8GB", 38000],

    ["RTX 4070 MSI 12GB", 55000],
    ["RTX 4070 ASUS 12GB", 55000],
    ["RTX 4070 Gigabyte 12GB", 55000],
    ["RTX 4070 Palit 12GB", 55000],

    ["RTX 4070 SUPER MSI 12GB", 65000],
    ["RTX 4070 SUPER ASUS 12GB", 65000],
    ["RTX 4070 SUPER Gigabyte 12GB", 65000],
    ["RTX 4070 SUPER Palit 12GB", 65000],

    ["RTX 4070 Ti MSI 12GB", 75000],
    ["RTX 4070 Ti ASUS 12GB", 75000],
    ["RTX 4070 Ti Gigabyte 12GB", 75000],
    ["RTX 4070 Ti Palit 12GB", 75000],

    ["RTX 4070 Ti SUPER MSI 16GB", 85000],
    ["RTX 4070 Ti SUPER ASUS 16GB", 85000],
    ["RTX 4070 Ti SUPER Gigabyte 16GB", 85000],
    ["RTX 4070 Ti SUPER Palit 16GB", 85000],

    ["RTX 4080 MSI 16GB", 100000],
    ["RTX 4080 ASUS 16GB", 100000],
    ["RTX 4080 Gigabyte 16GB", 100000],
    ["RTX 4080 Palit 16GB", 100000],

    ["RTX 4080 SUPER MSI 16GB", 110000],
    ["RTX 4080 SUPER ASUS 16GB", 110000],
    ["RTX 4080 SUPER Gigabyte 16GB", 110000],
    ["RTX 4080 SUPER Palit 16GB", 110000],

    ["RTX 4090 MSI 24GB", 180000],
    ["RTX 4090 ASUS 24GB", 180000],
    ["RTX 4090 Gigabyte 24GB", 180000],
    ["RTX 4090 Palit 24GB", 180000],

    // RTX 50
    ["RTX 5050 MSI 8GB", 45000],
    ["RTX 5050 ASUS 8GB", 45000],
    ["RTX 5050 Gigabyte 8GB", 45000],
    ["RTX 5050 Palit 8GB", 45000],

    ["RTX 5060 MSI 8GB", 54000],
    ["RTX 5060 ASUS 8GB", 54000],
    ["RTX 5060 Gigabyte 8GB", 54000],
    ["RTX 5060 Palit 8GB", 54000],

    ["RTX 5060 Ti MSI 8GB", 60000],
    ["RTX 5060 Ti ASUS 8GB", 60000],
    ["RTX 5060 Ti Gigabyte 8GB", 60000],
    ["RTX 5060 Ti Palit 8GB", 60000],

    ["RTX 5060 Ti MSI 16GB", 90000],
    ["RTX 5060 Ti ASUS 16GB", 90000],
    ["RTX 5060 Ti Gigabyte 16GB", 90000],
    ["RTX 5060 Ti Palit 16GB", 90000],

    ["RTX 5070 MSI 12GB", 105000],
    ["RTX 5070 ASUS 12GB", 105000],
    ["RTX 5070 Gigabyte 12GB", 105000],
    ["RTX 5070 Palit 12GB", 105000],

    ["RTX 5070 Ti MSI 16GB", 150000],
    ["RTX 5070 Ti ASUS 16GB", 150000],
    ["RTX 5070 Ti Gigabyte 16GB", 150000],
    ["RTX 5070 Ti Palit 16GB", 150000]

],
    ],

    "Материнская плата": [
        ["H610M DDR4", 6500, "LGA1700"],
        ["B760M DDR4", 9500, "LGA1700"],
        ["B550M", 8000, "AM4"],
        ["B650M", 12000, "AM5"]
    ],

    "Оперативная память": [
        ["16GB DDR4", 4000],
        ["32GB DDR4", 7500],
        ["16GB DDR5", 6500],
        ["32GB DDR5", 11000]
    ],

    "SSD": [
        ["500GB SSD", 3500],
        ["1TB SSD", 6000],
        ["2TB SSD", 11500]
    ],

    "Блок питания": [
        ["550W", 4500],
        ["650W", 6000],
        ["750W", 8500]
    ],

    "Корпус": [
        ["Обычный корпус", 3000],
        ["Корпус с подсветкой", 5500]
    ]
};

const parts = document.getElementById("parts");

for (const [name, items] of Object.entries(components)) {
    const div = document.createElement("div");
    div.className = "part";

    const label = document.createElement("label");
    label.textContent = name;

    const select = document.createElement("select");
    select.dataset.name = name;

    items.forEach(([title, price], index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent =
            `${title} — ${price.toLocaleString("ru-RU")} ₽`;
        select.appendChild(option);
    });

    select.addEventListener("change", () => {
        if (name === "Процессор") {
            updateMotherboards();
        }
        calculate();
    });

    div.append(label, select);
    parts.appendChild(div);
}

const compatibility = document.createElement("div");
compatibility.id = "compatibility";
compatibility.className = "compatibility";
parts.appendChild(compatibility);

function getSelect(name) {
    return document.querySelector(
        `select[data-name="${name}"]`
    );
}

function updateMotherboards() {
    const cpu = components["Процессор"][
        Number(getSelect("Процессор").value)
    ];

    const motherboard = getSelect("Материнская плата");
    const previous = motherboard.value;

    motherboard.innerHTML = "";

    components["Материнская плата"].forEach(
        ([title, price, socket], index) => {

            if (socket === cpu[2]) {
                const option = document.createElement("option");
                option.value = index;
                option.textContent =
                    `${title} — ${price.toLocaleString("ru-RU")} ₽`;
                motherboard.appendChild(option);
            }
        }
    );

    if ([...motherboard.options].some(
        option => option.value === previous
    )) {
        motherboard.value = previous;
    }

    showCompatibility();
}

function showCompatibility() {
    const cpu = components["Процессор"][
        Number(getSelect("Процессор").value)
    ];

    const board = components["Материнская плата"][
        Number(getSelect("Материнская плата").value)
    ];

    const compatible = cpu[2] === board[2];

    if (compatible) {
        compatibility.textContent =
            "✓ Процессор и материнская плата совместимы (" + cpu[2] + ")";
        compatibility.className = "compatibility good";
    } else {
        compatibility.textContent = "✕ Несовместимые комплектующие";
        compatibility.className = "compatibility bad";
    }
}function calculate() {
    let total = 0;

    const summary = document.getElementById("summary");
    summary.innerHTML = "";

    document.querySelectorAll("#parts select").forEach(select => {
        const name = select.dataset.name;
        const item = components[name][Number(select.value)];

        total += item[1];

        const row = document.createElement("div");
        row.className = "summary-item";

        const left = document.createElement("span");
        left.textContent = item[0];

        const right = document.createElement("strong");
        right.textContent = item[1].toLocaleString("ru-RU") + " ₽";

        row.append(left, right);
        summary.appendChild(row);
    });

    document.getElementById("total").textContent =
        total.toLocaleString("ru-RU") + " ₽";

    showCompatibility();
}

document.getElementById("reset").addEventListener("click", () => {
    document.querySelectorAll("#parts select").forEach(select => {
        select.selectedIndex = 0;
    });

    updateMotherboards();
    calculate();
});

document.getElementById("copy").addEventListener("click", async () => {
    const text = [...document.querySelectorAll("#parts select")]
        .map(select => {
            const name = select.dataset.name;
            const item = components[name][Number(select.value)];
            return `${name}: ${item[0]} — ${item[1]} ₽`;
        }).join("\n");

    try {
        await navigator.clipboard.writeText(text);
        alert("Сборка скопирована!");
    } catch {
        alert(text);
    }
});

updateMotherboards();
calculate();
