
/* =================================
   ABRAR.exe - BIRTHDAY EXPERIENCE
================================= */

// START THE SURPRISE

function startExperience() {
    const intro = document.getElementById("intro");
    const main = document.getElementById("mainWebsite");

    intro.style.transition = "opacity 0.8s ease";
    intro.style.opacity = "0";

    setTimeout(() => {
        intro.classList.add("hidden");
        main.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        launchCelebration();
    }, 800);
}


// MATRIX DIGITAL RAIN

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

let columns;
let drops;

function setupMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
}

function drawMatrix() {
    ctx.fillStyle = "rgba(5, 8, 7, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#39ff88";
    ctx.font = "14px monospace";

    const characters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]";

    for (let i = 0; i < drops.length; i++) {
        const character = characters[
            Math.floor(Math.random() * characters.length)
        ];

        ctx.fillText(character, i * 14, drops[i] * 14);

        if (
            drops[i] * 14 > canvas.height &&
            Math.random() > 0.975
        ) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setupMatrix();
setInterval(drawMatrix, 60);
window.addEventListener("resize", setupMatrix);


// FLOATING HEARTS

function createFloatingHeart() {
    const heart = document.createElement("div");

    heart.className = "particle";
    heart.innerHTML = Math.random() > 0.5 ? "♥" : "♡";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (12 + Math.random() * 20) + "px";
    heart.style.animationDuration = (5 + Math.random() * 6) + "s";

    document.getElementById("particles").appendChild(heart);

    setTimeout(() => heart.remove(), 11000);
}

setInterval(createFloatingHeart, 600);


// CELEBRATION

function launchCelebration() {
    createConfetti();
    setTimeout(createConfetti, 1200);
}


// INTERACTIVE REASONS

function revealReason(card, message) {
    const paragraph = card.querySelector("p");

    if (card.dataset.revealed === "true") return;

    card.dataset.revealed = "true";
    paragraph.innerText = message;

    card.style.borderColor = "#ff5c9f";
    card.style.boxShadow = "0 0 25px #ff5c9f44";
}


// PASSWORD-PROTECTED LOVE LETTER

function unlockLetter() {
    const modal = document.getElementById("passwordModal");
    const passwordInput = document.getElementById("letterPassword");
    const error = document.getElementById("passwordError");

    error.innerText = "";
    passwordInput.value = "";

    modal.classList.remove("hidden");

    setTimeout(() => passwordInput.focus(), 100);
}

function checkLetterPassword() {
    const passwordInput = document.getElementById("letterPassword");
    const error = document.getElementById("passwordError");

    if (passwordInput.value === "LOVEYOU") {
        error.innerText = "";

        document.getElementById("passwordModal").classList.add("hidden");

        const lock = document.getElementById("lockedLetter");
        const letter = document.getElementById("loveLetter");

        lock.style.transition = "0.5s";
        lock.style.opacity = "0";

        setTimeout(() => {
            lock.classList.add("hidden");
            letter.classList.remove("hidden");

            letter.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            createConfetti();
        }, 500);

    } else {
        error.innerText = "⚠ ACCESS DENIED! WRONG PASSWORD.";

        passwordInput.value = "";
        passwordInput.focus();
    }
}

function closePasswordModal() {
    document.getElementById("passwordModal").classList.add("hidden");
}


// FINAL SURPRISE

function finalReveal() {
    const message = document.getElementById("finalReveal");

    message.classList.remove("hidden");

    createConfetti();
    setTimeout(createConfetti, 1000);
    setTimeout(createConfetti, 2000);

    message.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


// CONFETTI ANIMATION

function createConfetti() {
    const colors = [
        "#39ff88",
        "#ff5c9f",
        "#ff315b",
        "#ffffff",
        "#f7c66a"
    ];

    for (let i = 0; i < 100; i++) {
        const piece = document.createElement("div");

        piece.style.position = "fixed";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.top = "-20px";
        piece.style.width = "7px";
        piece.style.height = "12px";

        piece.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.borderRadius = "2px";
        piece.style.zIndex = "1000";
        piece.style.pointerEvents = "none";

        document.body.appendChild(piece);

        const duration = 2000 + Math.random() * 2500;

        const animation = piece.animate(
            [
                {
                    transform: "translateY(0) rotate(0deg)",
                    opacity: 1
                },
                {
                    transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`,
                    opacity: 0
                }
            ],
            {
                duration: duration,
                easing: "ease-in"
            }
        );

        animation.onfinish = () => piece.remove();
    }
}


// ENTER KEY PASSWORD VERIFICATION

document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("letterPassword");

    if (passwordInput) {
        passwordInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                checkLetterPassword();
            }
        });
    }
});
