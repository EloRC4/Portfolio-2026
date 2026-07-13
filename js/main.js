// ============================================================
// Portfolio — EloRC4
// Theme toggle, mobile nav, scroll-spy, typed effect, reveal
// animations, project tabs and on-demand iframe embeds.
// ============================================================

// ---------- Theme (persisted, defaults to system preference) ----------

const THEME_KEY = "portfolio-theme";

function aplicarTema(tema) {
    document.documentElement.dataset.theme = tema;
}

const temaGuardado = localStorage.getItem(THEME_KEY);
if (temaGuardado) {
    aplicarTema(temaGuardado);
} else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    aplicarTema("light");
}

document.getElementById("theme-toggle").addEventListener("click", () => {
    const actual = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    aplicarTema(actual);
    localStorage.setItem(THEME_KEY, actual);
});

// ---------- Mobile navigation ----------

const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
    const abierto = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!abierto));
    navMenu.classList.toggle("open", !abierto);
});

// Close the menu after navigating to a section
navMenu.addEventListener("click", (e) => {
    if (e.target.matches("a")) {
        navToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("open");
    }
});

// ---------- Scroll-spy: highlight the section in view ----------

const enlacesNav = [...navMenu.querySelectorAll('a[href^="#"]')];

const spy = new IntersectionObserver(
    (entradas) => {
        for (const entrada of entradas) {
            if (!entrada.isIntersecting) continue;
            for (const enlace of enlacesNav) {
                enlace.setAttribute(
                    "aria-current",
                    String(enlace.hash === `#${entrada.target.id}`)
                );
            }
        }
    },
    { rootMargin: "-40% 0px -55% 0px" }
);

document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));

// ---------- Typed effect in the hero ----------

const FRASES = [
    "Java · Spring Boot · MySQL",
    "JavaScript · React · Vite",
    "Docker · nginx · Linux",
    "APIs REST con Spring Security",
];

const nodoTyped = document.getElementById("typed");
const sinAnimaciones = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (sinAnimaciones) {
    nodoTyped.textContent = FRASES[0];
} else {
    let fraseIdx = 0;
    let charIdx = 0;
    let borrando = false;

    function teclear() {
        const frase = FRASES[fraseIdx];
        nodoTyped.textContent = frase.slice(0, charIdx);

        let retardo = borrando ? 32 : 62;

        if (!borrando && charIdx === frase.length) {
            borrando = true;
            retardo = 1900; // pause with the full phrase on screen
        } else if (borrando && charIdx === 0) {
            borrando = false;
            fraseIdx = (fraseIdx + 1) % FRASES.length;
            retardo = 350;
        } else {
            charIdx += borrando ? -1 : 1;
        }

        setTimeout(teclear, retardo);
    }

    teclear();
}

// ---------- Reveal-on-scroll animations ----------

const revelador = new IntersectionObserver(
    (entradas) => {
        for (const entrada of entradas) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
                revelador.unobserve(entrada.target);
            }
        }
    },
    { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => revelador.observe(el));

// ---------- Project tabs ----------

document.querySelectorAll("[data-tabs]").forEach((contenedor) => {
    const pestanas = [...contenedor.querySelectorAll('[role="tab"]')];

    pestanas.forEach((pestana) => {
        pestana.addEventListener("click", () => {
            for (const p of pestanas) {
                const activa = p === pestana;
                p.setAttribute("aria-selected", String(activa));
                document.getElementById(p.getAttribute("aria-controls")).hidden = !activa;
            }
        });
    });
});

// ---------- Live site embeds ----------
// Embedded sites show a static preview first: their cookie banners and
// third-party requests only appear if the visitor opts into the live
// view. Slots with data-autoload skip the preview and load on approach.

document.querySelectorAll("[data-embed]").forEach((slot) => {
    if (!slot.dataset.src) return;

    const cargarIframe = () => {
        if (slot.querySelector("iframe")) return;
        const iframe = document.createElement("iframe");
        iframe.src = slot.dataset.src;
        iframe.title = slot.dataset.title || "Demo en vivo";
        iframe.loading = "lazy";
        iframe.referrerPolicy = "no-referrer";

        slot.querySelector(".embed-load")?.remove();
        slot.querySelector(".embed-preview")?.remove();
        (slot.querySelector(".browser-frame") || slot).appendChild(iframe);
    };

    if ("autoload" in slot.dataset) {
        const observador = new IntersectionObserver(
            (entradas) => {
                if (entradas.some((e) => e.isIntersecting)) {
                    cargarIframe();
                    observador.disconnect();
                }
            },
            { rootMargin: "600px 0px" }
        );
        observador.observe(slot);
    } else {
        // Both the button and the preview image load the live site
        slot.querySelector(".embed-load")?.addEventListener("click", cargarIframe);
        slot.querySelector(".embed-preview")?.addEventListener("click", cargarIframe);
    }
});

// ---------- Image lightbox ----------
// Project screenshots enlarge on click. Clicking the backdrop or
// pressing Escape closes the enlarged view. The overlay lives in the
// DOM permanently and is toggled with a class: while hidden it has
// pointer-events: none, so it never intercepts clicks.

const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.setAttribute("role", "dialog");
lightbox.setAttribute("aria-label", "Imagen ampliada");
lightbox.setAttribute("aria-hidden", "true");
const lightboxImg = document.createElement("img");
lightbox.appendChild(lightboxImg);
document.body.appendChild(lightbox);

function abrirLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("visible");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function cerrarLightbox() {
    lightbox.classList.remove("visible");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

lightbox.addEventListener("click", cerrarLightbox);
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("visible")) cerrarLightbox();
});

document.querySelectorAll(".shots-grid img").forEach((img) => {
    img.classList.add("zoomable");
    img.addEventListener("click", () => abrirLightbox(img.src, img.alt));
});

// ---------- Footer year ----------

document.getElementById("year").textContent = new Date().getFullYear();
