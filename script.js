window.onerror = function(message, source, line) {
    alert("ОШИБКА PC FORGE:\n" + message + "\nСтрока: " + line);
};

const components = {

    "Процессор": [
        // Intel LGA1700
        ["Intel Core i3-12100F", 6500, "LGA1700"],
        ["Intel Core i3-13100F", 8500, "LGA1700"],
        ["Intel Core i5-12400F", 10500, "LGA1700"],
        ["Intel Core i5-12400", 12500, "LGA1700"],
        ["Intel Core i5-12600KF", 15500, "LGA1700"],
        ["Intel Core i5-13400F", 16500, "LGA1700"],
        ["Intel Core i5-13500", 19000, "LGA1700"],
        ["Intel Core i5-13600KF", 23000, "LGA1700"],
        ["Intel Core i7-12700F", 19000, "LGA1700"],
        ["Intel Core i7-12700KF", 22000, "LGA1700"],
        ["Intel Core i7-13700F", 29000, "LGA1700"],
        ["Intel Core i7-13700KF", 33000, "LGA1700"],
        ["Intel Core i9-12900K", 35000, "LGA1700"],
        ["Intel Core i9-13900KF", 47000, "LGA1700"],
        ["Intel Core i9-14900K", 55000, "LGA1700"],

        // AMD AM4
        ["AMD Ryzen 3 4100", 4500, "AM4"],
        ["AMD Ryzen 5 3600", 5500, "AM4"],
        ["AMD Ryzen 5 5500", 6500, "AM4"],
        ["AMD Ryzen 5 5600", 8500, "AM4"],
        ["AMD Ryzen 5 5600X", 10500, "AM4"],
        ["AMD Ryzen 7 5700X", 13500, "AM4"],
        ["AMD Ryzen 7 5700X3D", 22000, "AM4"],
        ["AMD Ryzen 7 5800X", 16000, "AM4"],
        ["AMD Ryzen 7 5800X3D", 26000, "AM4"],
        ["AMD Ryzen 9 5900X", 24000, "AM4"],
        ["AMD Ryzen 9 5950X", 30000, "AM4"],

        // AMD AM5
        ["AMD Ryzen 5 7500F", 14500, "AM5"],
        ["AMD Ryzen 5 7600", 17000, "AM5"],
        ["AMD Ryzen 5 7600X", 19000, "AM5"],
        ["AMD Ryzen 5 8400F", 14000, "AM5"],
        ["AMD Ryzen 7 7700", 23000, "AM5"],
        ["AMD Ryzen 7 7700X", 25000, "AM5"],
        ["AMD Ryzen 7 7800X3D", 35000, "AM5"],
        ["AMD Ryzen 7 9700X", 30000, "AM5"],
        ["AMD Ryzen 7 9800X3D", 45000, "AM5"],
        ["AMD Ryzen 9 7900X", 35000, "AM5"],
        ["AMD Ryzen 9 7950X", 45000, "AM5"],
        ["AMD Ryzen 9 9950X", 55000, "AM5"]
    ],

    "Видеокарта": [
        // NVIDIA GTX 16
        ["GTX 1650 MSI 4GB", 15000],
        ["GTX 1650 ASUS 4GB", 15000],
        ["GTX 1660 SUPER MSI 6GB", 25000],
        ["GTX 1660 SUPER ASUS 6GB", 25000],
        ["GTX 1660 SUPER Gigabyte 6GB", 25000],
        ["GTX 1660 Ti Palit 6GB", 24000],

        // NVIDIA RTX 20
        ["RTX 2060 MSI 6GB", 30000],
        ["RTX 2060 ASUS 6GB", 30000],
        ["RTX 2060 SUPER Gigabyte 8GB", 29000],
        ["RTX 2070 SUPER MSI 8GB", 31000],
        ["RTX 2080 ASUS 8GB", 40000],
        ["RTX 2080 SUPER MSI 8GB", 43000],
        ["RTX 2080 Ti ASUS 11GB", 47000],

        // NVIDIA RTX 30
        ["RTX 3050 MSI 8GB", 19000],
        ["RTX 3050 Palit 8GB", 19000],
        ["RTX 3060 MSI 12GB", 45000],
        ["RTX 3060 ASUS 12GB", 45000],
        ["RTX 3060 Gigabyte 12GB", 45000],
        ["RTX 3060 Ti MSI 8GB", 42000],
        ["RTX 3070 ASUS 8GB", 45000],
        ["RTX 3070 Ti Gigabyte 8GB", 48000],
        ["RTX 3080 MSI 10GB", 60000],
        ["RTX 3080 Ti ASUS 12GB", 65000],
        ["RTX 3090 MSI 24GB", 85000],
        ["RTX 3090 Ti ASUS 24GB", 100000],

        // NVIDIA RTX 40
        ["RTX 4060 MSI 8GB", 30000],
        ["RTX 4060 ASUS 8GB", 30000],
        ["RTX 4060 Gigabyte 8GB", 30000],
        ["RTX 4060 Ti MSI 8GB", 38000],
        ["RTX 4060 Ti ASUS 16GB", 50000],
        ["RTX 4070 MSI 12GB", 55000],
        ["RTX 4070 SUPER ASUS 12GB", 65000],
        ["RTX 4070 Ti MSI 12GB", 75000],
        ["RTX 4070 Ti SUPER ASUS 16GB", 85000],
        ["RTX 4080 MSI 16GB", 100000],
        ["RTX 4080 SUPER ASUS 16GB", 110000],
        ["RTX 4090 MSI 24GB", 180000],

        // NVIDIA RTX 50
        ["RTX 5050 MSI 8GB", 45000],
        ["RTX 5060 MSI 8GB", 54000],
        ["RTX 5060 ASUS 8GB", 54000],
        ["RTX 5060 Ti MSI 8GB", 60000],
        ["RTX 5060 Ti ASUS 16GB", 90000],
        ["RTX 5070 MSI 12GB", 105000],
        ["RTX 5070 ASUS 12GB", 105000],
        ["RTX 5070 Ti MSI 16GB", 150000],
        ["RTX 5080 ASUS 16GB", 180000],
        ["RTX 5090 MSI 32GB", 350000],

        // AMD RX 5000
        ["RX 5500 XT 8GB", 14000],
        ["RX 5600 XT 6GB", 18000],
        ["RX 5700 XT Sapphire 8GB", 8500],

        // AMD RX 6000
        ["RX 6400 4GB", 10000],
        ["RX 6500 XT 4GB", 12000],
        ["RX 6600 Sapphire 8GB", 18000],
        ["RX 6600 XT MSI 8GB", 22000],
        ["RX 6650 XT ASUS 8GB", 25000],
        ["RX 6700 XT Sapphire 12GB", 30000],
        ["RX 6750 XT MSI 12GB", 33000],
        ["RX 6800 XT ASUS 16GB", 45000],
        ["RX 6900 XT Sapphire 16GB", 55000],
        ["RX 6950 XT MSI 16GB", 60000],

        // AMD RX 7000
        ["RX 7600 MSI 8GB", 27000],
        ["RX 7600 XT Sapphire 16GB", 35000],
        ["RX 7700 XT ASUS 12GB", 45000],
        ["RX 7800 XT Sapphire 16GB", 50000],
        ["RX 7900 GRE ASUS 16GB", 60000],
        ["RX 7900 XT Sapphire 20GB", 75000],
        ["RX 7900 XTX ASUS 24GB", 95000],

        // AMD RX 9000
        ["RX 9060 XT 8GB", 40000],
        ["RX 9060 XT 16GB", 50000],
        ["RX 9070 16GB", 65000],
        ["RX 9070 XT 16GB", 75000]
    ],

    "Материнская плата": [
        // LGA1700 DDR4
        ["Gigabyte H610M H DDR4", 6500, "LGA1700", "DDR4"],
        ["MSI PRO H610M-E DDR4", 7000, "LGA1700", "DDR4"],
        ["ASUS PRIME H610M-K D4", 7500, "LGA1700", "DDR4"],
        ["ASRock H610M-HDV/M.2 DDR4", 7500, "LGA1700", "DDR4"],
        ["Gigabyte B760M DS3H DDR4", 9500, "LGA1700", "DDR4"],
        ["MSI PRO B760M-P DDR4", 10000, "LGA1700", "DDR4"],
        ["ASUS PRIME B760M-K D4", 11000, "LGA1700", "DDR4"],
        ["MSI MAG B760 TOMAHAWK DDR4", 16000, "LGA1700", "DDR4"],

        // LGA1700 DDR5
        ["Gigabyte H610M H DDR5", 8000, "LGA1700", "DDR5"],
        ["MSI PRO B760M-A DDR5", 14000, "LGA1700", "DDR5"],
        ["ASUS PRIME B760-PLUS DDR5", 15000, "LGA1700", "DDR5"],
        ["Gigabyte B760 GAMING X DDR5", 16000, "LGA1700", "DDR5"],
        ["MSI MAG Z790 TOMAHAWK DDR5", 25000, "LGA1700", "DDR5"],

        // AM4 DDR4
        ["ASUS PRIME A520M-K", 6000, "AM4", "DDR4"],
        ["MSI A520M-A PRO", 6500, "AM4", "DDR4"],
        ["Gigabyte B450M DS3H", 7000, "AM4", "DDR4"],
        ["MSI B550M PRO-VDH", 8500, "AM4", "DDR4"],
        ["Gigabyte B550M DS3H", 9000, "AM4", "DDR4"],
        ["ASUS PRIME B550M-A", 10000, "AM4", "DDR4"],
        ["MSI MAG B550 TOMAHAWK", 13000, "AM4", "DDR4"],
        ["ASUS TUF GAMING B550-PLUS", 14000, "AM4", "DDR4"],

        // AM5 DDR5
        ["ASRock A620M-HDV/M.2", 10000, "AM5", "DDR5"],
        ["MSI PRO A620M-E", 10500, "AM5", "DDR5"],
        ["Gigabyte A620M S2H", 11000, "AM5", "DDR5"],
        ["ASUS PRIME B650M-K", 13000, "AM5", "DDR5"],
        ["MSI PRO B650M-A WIFI", 15000, "AM5", "DDR5"],
        ["Gigabyte B650M DS3H", 15000, "AM5", "DDR5"],
        ["ASUS TUF GAMING B650-PLUS", 19000, "AM5", "DDR5"],
        ["MSI MAG B650 TOMAHAWK WIFI", 22000, "AM5", "DDR5"],
        ["Gigabyte X670 AORUS ELITE AX", 27000, "AM5", "DDR5"],
        ["ASUS ROG STRIX X870-E GAMING", 40000, "AM5", "DDR5"]
    ],

    "Оперативная память": [
        // DDR4 8GB
        ["Kingston Fury Beast 8GB DDR4 3200", 3000, "DDR4"],
        ["ADATA Premier 8GB DDR4 3200", 2500, "DDR4"],
        ["Patriot Signature 8GB DDR4 3200", 2700, "DDR4"],

        // DDR4 16GB
        ["Kingston Fury Beast 16GB (2x8) DDR4 3200", 6500, "DDR4"],
        ["Corsair Vengeance LPX 16GB DDR4 3200", 6800, "DDR4"],
        ["G.Skill Ripjaws V 16GB DDR4 3200", 7000, "DDR4"],
        ["ADATA XPG Gammix D10 16GB DDR4 3200", 6200, "DDR4"],
        ["Patriot Viper Steel 16GB DDR4 3200", 6400, "DDR4"],
        ["Netac Shadow 16GB DDR4 3200", 5800, "DDR4"],
        ["TeamGroup T-Force Vulcan Z 16GB DDR4", 6500, "DDR4"],

        // DDR4 32GB
        ["Kingston Fury Beast 32GB DDR4 3200", 11500, "DDR4"],
        ["Corsair Vengeance LPX 32GB DDR4 3600", 12500, "DDR4"],
        ["G.Skill Ripjaws V 32GB DDR4 3600", 13000, "DDR4"],
        ["ADATA XPG Spectrix D35G 32GB DDR4", 12000, "DDR4"],
        ["Patriot Viper Steel 32GB DDR4", 11000, "DDR4"],
        ["Netac Shadow 32GB DDR4 3200", 10500, "DDR4"],

        // DDR4 64GB
        ["Kingston Fury Beast 64GB DDR4", 22000, "DDR4"],
        ["Corsair Vengeance LPX 64GB DDR4", 25000, "DDR4"],

        // DDR5 16GB
        ["Kingston Fury Beast 16GB DDR5 5600", 8500, "DDR5"],
        ["Corsair Vengeance 16GB DDR5 5600", 9500, "DDR5"],
        ["ADATA XPG Lancer 16GB DDR5 6000", 9000, "DDR5"],
        ["G.Skill Flare X5 16GB DDR5 6000", 9500, "DDR5"],

        // DDR5 32GB
        ["Kingston Fury Beast 32GB DDR5 6000", 15500, "DDR5"],
        ["Corsair Vengeance RGB 32GB DDR5 6000", 18000, "DDR5"],
        ["G.Skill Trident Z5 32GB DDR5 6000", 19000, "DDR5"],
        ["ADATA XPG Lancer Blade 32GB DDR5 6000", 16000, "DDR5"],
        ["Patriot Viper Venom 32GB DDR5 6000", 15000, "DDR5"],
        ["TeamGroup T-Force Delta RGB 32GB DDR5", 17500, "DDR5"],

        // DDR5 64GB
        ["Kingston Fury Beast 64GB DDR5 6000", 29000, "DDR5"],
        ["Corsair Vengeance 64GB DDR5 6000", 32000, "DDR5"],
        ["G.Skill Trident Z5 64GB DDR5", 35000, "DDR5"],
        ["ADATA XPG Lancer 64GB DDR5", 30000, "DDR5"],

        // DDR5 128GB
        ["Kingston Fury Beast 128GB DDR5", 60000, "DDR5"],
        ["Corsair Vengeance 128GB DDR5", 65000, "DDR5"]
    ],

    "SSD": [
        ["Kingston A400 240GB SATA", 2500],
        ["Crucial BX500 480GB SATA", 3500],
        ["Samsung 870 EVO 500GB SATA", 5500],
        ["Kingston NV2 500GB NVMe", 4000],
        ["WD Blue SN580 500GB NVMe", 5000],
        ["Samsung 980 500GB NVMe", 6000],
        ["Kingston NV2 1TB NVMe", 6500],
        ["WD Blue SN580 1TB NVMe", 7500],
        ["Samsung 990 EVO 1TB NVMe", 9500],
        ["Samsung 990 PRO 1TB NVMe", 12000],
        ["Crucial P3 Plus 1TB NVMe", 7500],
        ["Kingston KC3000 1TB NVMe", 10000],
        ["Kingston NV2 2TB NVMe", 12000],
        ["WD Black SN850X 2TB NVMe", 18000],
        ["Samsung 990 PRO 2TB NVMe", 22000],
        ["Crucial P3 Plus 2TB NVMe", 14000],
        ["Samsung 870 EVO 2TB SATA", 17000],
        ["Kingston KC3000 2TB NVMe", 18000]
    ],

    "Блок питания": [
        // 450-550W
        ["DeepCool PF450 450W", 2900],
        ["DeepCool PF500 500W", 3200],
        ["DeepCool PF550 550W", 3900],
        ["Cougar VTE500 500W", 3800],
        ["AeroCool VX Plus 500W", 3200],
        ["Chieftec Smart 500W", 3900],
        ["MSI MAG A550BN 550W", 4300],

        // 600-650W
        ["DeepCool PF600 600W", 4100],
        ["DeepCool PF650 650W", 4000],
        ["DeepCool PF650X 650W Bronze", 4500],
        ["MSI MAG A650BN 650W Bronze", 5100],
        ["Corsair CV650 650W", 6000],
        ["Cougar VTE600 600W", 4500],
        ["Thermaltake TR2 S 650W", 4800],
        ["Gigabyte P650B 650W", 5500],
        ["Chieftec Proton 650W", 5700],

        // 700-750W
        ["DeepCool PF700 700W", 4600],
        ["DeepCool PF750 750W", 4700],
        ["DeepCool PF750X 750W Bronze", 5200],
        ["MSI MAG A750BN 750W", 6200],
        ["Corsair CV750 750W", 7000],
        ["Gigabyte UD750GM 750W", 7500],
        ["Thermaltake Toughpower 750W", 7800],
        ["be quiet! System Power 10 750W", 8500],

        // 850W
        ["DeepCool PK850D 850W", 7500],
        ["MSI MAG A850GL 850W Gold", 9500],
        ["Corsair RM850e 850W Gold", 12000],
        ["Seasonic Focus GX-850 850W", 14000],
        ["ASUS TUF Gaming 850W Gold", 13000],

        // 1000W+
        ["DeepCool PX1000G 1000W Gold", 14000],
        ["MSI MPG A1000G 1000W Gold", 15000],
        ["Corsair RM1000e 1000W Gold", 16000],
        ["Seasonic Focus GX-1000 1000W", 18000]
    ],

    "Корпус": [
        ["Zalman T6", 2500],
        ["DeepCool Matrexx 30", 3000],
        ["DeepCool Matrexx 40", 3500],
        ["DeepCool CC560", 4500],
        ["DeepCool CC560 ARGB", 5500],
        ["Cougar MX330", 4000],
        ["Cougar MX360", 4500],
        ["Zalman S2", 3500],
        ["Zalman i3 Neo", 5500],
        ["AeroCool Bolt Mini", 3500],
        ["AeroCool Trinity Mini", 4000],
        ["MSI MAG Forge 100R", 5500],
        ["MSI MAG Forge 112R", 6500],
        ["Montech X3 Mesh", 6000],
        ["Montech Air 100 ARGB", 6500],
        ["Corsair 4000D Airflow", 10000],
        ["NZXT H5 Flow", 11000],
        ["Lian Li Lancool 216", 12000],
        ["Fractal Design Pop Air", 11000],
        ["ASUS TUF Gaming GT301", 9000]
    ]
};

const parts = document.getElementById("parts");

if (!parts) {
    throw new Error("Не найден HTML-элемент с id='parts'");
}

parts.innerHTML = "";

const selects = {};

for (const [name, items] of Object.entries(components)) {
    const div = document.createElement("div");
    div.className = "part";

    const label = document.createElement("label");
    label.textContent = name;

    const select = document.createElement("select");
    select.dataset.name = name;
    selects[name] = select;

    items.forEach(([title, price], index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent =
            `${title} — ${price.toLocaleString("ru-RU")} ₽`;
        select.appendChild(option);
    });

    select.addEventListener("change", () => {
        if (name === "Процессор") {
            updateMemoryForCPU();
            updateMotherboards();
        }

        if (name === "Оперативная память") {
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
    return selects[name];
}

function getSelected(name) {
    const select = getSelect(name);
    return components[name][Number(select.value)];
}

function updateMemoryForCPU() {
    const cpu = getSelected("Процессор");
    const memory = getSelect("Оперативная память");

    let requiredType = "DDR4";

    if (cpu[2] === "AM5") {
        requiredType = "DDR5";
    }

    const available = components["Оперативная память"]
        .map((item, index) => ({ item, index }))
        .filter(entry => entry.item[2] === requiredType);

    if (!available.some(entry => entry.index === Number(memory.value))) {
        memory.value = available[0].index;
    }
}

function updateMotherboards() {
    const cpu = getSelected("Процессор");
    const memory = getSelected("Оперативная память");

    const motherboard = getSelect("Материнская плата");
    const previous = Number(motherboard.value);

    const available = components["Материнская плата"]
        .map((item, index) => ({ item, index }))
        .filter(entry =>
            entry.item[2] === cpu[2] &&
            entry.item[3] === memory[2]
        );

    motherboard.innerHTML = "";

    available.forEach(entry => {
        const option = document.createElement("option");
        option.value = entry.index;
        option.textContent =
            `${entry.item[0]} — ${entry.item[1].toLocaleString("ru-RU")} ₽`;

        motherboard.appendChild(option);
    });

    if (available.some(entry => entry.index === previous)) {
        motherboard.value = previous;
    }

    showCompatibility();
}

function showCompatibility() {
    const cpu = getSelected("Процессор");
    const board = getSelected("Материнская плата");
    const memory = getSelected("Оперативная память");

    const compatible =
        cpu[2] === board[2] &&
        memory[2] === board[3];

    if (compatible) {
        compatibility.textContent =
            `✓ Комплектующие совместимы: ${cpu[2]} / ${memory[2]}`;

        compatibility.className = "compatibility good";
    } else {
        compatibility.textContent =
            "✕ Проверь совместимость комплектующих";

        compatibility.className = "compatibility bad";
    }
}

function calculate() {
    let total = 0;

    const summary = document.getElementById("summary");
    const totalElement = document.getElementById("total");

    summary.innerHTML = "";

    document.querySelectorAll("#parts select").forEach(select => {
        const name = select.dataset.name;
        const item = getSelected(name);

        total += item[1];

        const row = document.createElement("div");
        row.className = "summary-item";

        const left = document.createElement("span");
        left.textContent = item[0];

        const right = document.createElement("strong");
        right.textContent =
            item[1].toLocaleString("ru-RU") + " ₽";

        row.append(left, right);
        summary.appendChild(row);
    });

    totalElement.textContent =
        total.toLocaleString("ru-RU") + " ₽";

    showCompatibility();
}

document.getElementById("reset").addEventListener("click", () => {
    getSelect("Процессор").selectedIndex = 0;
    getSelect("Видеокарта").selectedIndex = 0;
    getSelect("Оперативная память").selectedIndex = 0;
    getSelect("SSD").selectedIndex = 0;
    getSelect("Блок питания").selectedIndex = 0;
    getSelect("Корпус").selectedIndex = 0;

    updateMemoryForCPU();
    updateMotherboards();
    calculate();
});

document.getElementById("copy").addEventListener("click", async () => {
    const text = [...document.querySelectorAll("#parts select")]
        .map(select => {
            const name = select.dataset.name;
            const item = getSelected(name);

            return `${name}: ${item[0]} — ${item[1].toLocaleString("ru-RU")} ₽`;
        })
        .join("\n");

    try {
        await navigator.clipboard.writeText(text);
        alert("Сборка скопирована!");
    } catch {
        alert(text);
    }
});

updateMemoryForCPU();
updateMotherboards();
calculate();
