
const title = document.getElementById("title");
const text = document.getElementById("text");
const buttons = document.getElementById("buttons");
const flowers = document.getElementById("flowers");
const card = document.getElementById("card");

let noScale = 1;
let flowerTimer = null;

function addButton(label, cls, action) {
    const btn = document.createElement("button");

    btn.textContent = label;
    btn.className = cls;
    btn.type = "button";
    btn.addEventListener("click", action);

    buttons.appendChild(btn);
    return btn;
}

function showPage(t, p, renderButtons) {
    title.textContent = t;
    text.textContent = p || "";
    buttons.replaceChildren();

    card.classList.remove("enter");
    void card.offsetWidth;
    card.classList.add("enter");

    renderButtons();
}

function stopFlowers() {
    if (flowerTimer) {
        clearInterval(flowerTimer);
        flowerTimer = null;
    }

    flowers.style.display = "none";
    flowers.replaceChildren();
}

function startFlowers() {
    stopFlowers();
    flowers.style.display = "block";

    const petals = [
        "🌸", "🌹", "🌷", "🌺",
        "💐", "🌼", "💮", "💗"
    ];

    function addFlower() {
        const f = document.createElement("span");

        f.className = "flower";
        f.textContent =
            petals[Math.floor(Math.random() * petals.length)];

        f.style.left = Math.random() * 100 + "vw";
        f.style.fontSize = (22 + Math.random() * 26) + "px";

        const duration = 3 + Math.random() * 4;
        f.style.animationDuration = duration + "s";

        flowers.appendChild(f);

        setTimeout(() => f.remove(), duration * 1000);
    }

    addFlower();
    flowerTimer = setInterval(addFlower, 300);
}

function firstPage() {
    noScale = 1;
    stopFlowers();

    showPage(
        "آشتی؟ 🥺💗",
        "دلم نمی‌خواد بینمون ناراحتی بمونه...\nمیای دوباره باهم خوب بشیم؟ 💕",
        () => {
            addButton("آره، آشتی 💗", "primary", happyPage);
            addButton("نه 🙄", "secondary", noPage);
        }
    );
}

function happyPage() {
    startFlowers();

    showPage(
        "یوهووو! 🥹💗",
        "می‌دونستم دلت با منه! 🌸\n\nبیا همه ناراحتی‌ها رو بذاریم کنار.\nیه بغل محکم طلبت! 🫂💕",
        () => {
            addButton("یه بغل مجازی 🫂", "primary", () => {
                showPage(
                    "بغلللل! 🫂💖",
                    "محکم بغلت کردم! 💗🌷\nامیدوارم همیشه دلامون به هم نزدیک باشه.",
                    () => {
                        addButton(
                            "از اول ببینیم 💕",
                            "secondary",
                            firstPage
                        );
                    }
                );
            });

            addButton("دوباره از اول 🔄", "secondary", firstPage);
        }
    );
}

function noPage() {
    showPage(
        "مطمئنی؟ 🥺",
        "یه فرصت کوچولو بهم می‌دی؟ 💔\nفقط دوست دارم باهم حرف بزنیم. 💗",
        () => {
            addButton(
                "باشه، حرف بزنیم 💕",
                "primary",
                talkPage
            );

            const noButton = addButton(
                "هنوز نه 🙈",
                "secondary",
                () => {
                    noScale *= 0.85;
                    noButton.style.transform = `scale(${noScale})`;

                    if (noScale < 0.45) {
                        noButton.textContent = "یه کم فکر می‌کنم 🥺";
                        noButton.style.transform = "scale(.7)";
                    }
                }
            );
        }
    );
}

function talkPage() {
    showPage(
        "بیا حرف بزنیم 💌",
        "نمی‌خوام مجبورت کنم آشتی کنی.\nفقط می‌خوام بدونی که برام مهمی.\n\nهر وقت آماده بودی، من گوش می‌دم. 💗",
        () => {
            addButton("باشه، آشتی 💖", "primary", happyPage);
            addButton("برگردیم اول", "secondary", firstPage);
        }
    );
}

firstPage();
