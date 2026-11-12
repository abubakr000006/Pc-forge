const components = {
    "Процессор": [
        ["Intel Core i5-12400F", 10500, "LGA1700"],
        ["Intel Core i5-13400F", 16500, "LGA1700"],
        ["AMD Ryzen 5 5600", 8500, "AM4"],
        ["AMD Ryzen 5 7500F", 14500, "AM5"]
    ],

    "Видеокарта": [
        ["RTX 3050 8GB", 19000],
        ["RTX 3060 12GB", 25000],
        ["RTX 4060 8GB", 30000],
        ["RTX 5060 8GB", 35000]
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