/* ==========================================================================
   VORTEX CONCIERGERIE — SCRIPT.JS
   ==========================================================================
   Sommaire :
   1. CONFIGURATION — numéro WhatsApp & message (À MODIFIER ICI)
   2. Application du lien WhatsApp à tous les CTA
   3. Header : état "scrolled" + menu mobile
   4. Accordéon FAQ
   5. Apparitions au scroll (IntersectionObserver)
   6. Bouton WhatsApp flottant (masqué en bas de page)
   7. Année dynamique dans le footer
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. CONFIGURATION — SEUL ENDROIT À MODIFIER POUR CHANGER LE NUMÉRO
   --------------------------------------------------------------------------
   - whatsappNumber : numéro au format international, SANS le "+", SANS espaces.
     Exemple réel : "33612345678" pour un numéro français 06 12 34 56 78.
   - defaultMessage : message prérempli envoyé par le visiteur.
   Pour changer le numéro dans quelques mois, il suffit de remplacer
   la valeur ci-dessous puis d'enregistrer le fichier.
   -------------------------------------------------------------------------- */
const VORTEX_CONFIG = {
  // ⚠️ NUMÉRO FICTIF — REMPLACER avant mise en ligne réelle.
  whatsappNumber: "WHATSAPP_NUMBER_TO_REPLACE",
  defaultMessage:
    "Bonjour, je souhaiterais obtenir des informations concernant la gestion de mon logement.",
};

/**
 * Construit l'URL WhatsApp à partir de la configuration ci-dessus.
 * Utilise l'API officielle wa.me : https://wa.me/<numero>?text=<message encodé>
 */
function buildWhatsAppUrl() {
  const number = VORTEX_CONFIG.whatsappNumber.replace(/[^\d]/g, "");
  const text = encodeURIComponent(VORTEX_CONFIG.defaultMessage);
  // Si le numéro n'a pas encore été remplacé, le lien reste fonctionnel
  // mais pointera vers un numéro invalide — à corriger avant publication.
  return `https://wa.me/${number || "WHATSAPP_NUMBER_TO_REPLACE"}?text=${text}`;
}

/* --------------------------------------------------------------------------
   2. APPLICATION DU LIEN WHATSAPP À TOUS LES CTA
   -------------------------------------------------------------------------- */
function applyWhatsAppLinks() {
  const url = buildWhatsAppUrl();
  document.querySelectorAll(".js-whatsapp-link").forEach((el) => {
    el.setAttribute("href", url);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });
}

/* --------------------------------------------------------------------------
   3. HEADER — état au scroll + menu mobile
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.getElementById("site-header");
  const toggle = document.getElementById("menu-toggle");
  const navMobile = document.getElementById("nav-mobile");

  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (toggle && navMobile) {
    const closeMenu = () => {
      toggle.setAttribute("aria-expanded", "false");
      navMobile.classList.remove("is-open");
      document.body.style.overflow = "";
    };
    const openMenu = () => {
      toggle.setAttribute("aria-expanded", "true");
      navMobile.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });

    navMobile.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }
}

/* --------------------------------------------------------------------------
   4. ACCORDÉON FAQ — accessible au clavier
   -------------------------------------------------------------------------- */
function initFaq() {
  const items = document.querySelectorAll(".faq-item");

  items.forEach((item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const inner = item.querySelector(".faq-answer-inner");

    button.addEventListener("click", () => {
      const isOpen = item.getAttribute("data-open") === "true";

      // Ferme les autres items pour garder une liste lisible
      items.forEach((other) => {
        if (other !== item) {
          other.setAttribute("data-open", "false");
          other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
          other.querySelector(".faq-answer").style.maxHeight = null;
        }
      });

      item.setAttribute("data-open", String(!isOpen));
      button.setAttribute("aria-expanded", String(!isOpen));
      answer.style.maxHeight = !isOpen ? inner.scrollHeight + "px" : null;
    });
  });
}

/* --------------------------------------------------------------------------
   5. APPARITIONS AU SCROLL
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll("[data-reveal]");

  if (prefersReduced || !("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  targets.forEach((t) => observer.observe(t));
}

/* --------------------------------------------------------------------------
   6. BOUTON WHATSAPP FLOTTANT — masqué au-dessus du footer
   -------------------------------------------------------------------------- */
function initFloatingButton() {
  const floatBtn = document.getElementById("wa-float");
  const footer = document.querySelector(".site-footer");
  if (!floatBtn || !footer || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        floatBtn.classList.toggle("is-hidden", entry.isIntersecting);
      });
    },
    { threshold: 0 }
  );
  observer.observe(footer);
}

/* --------------------------------------------------------------------------
   7. ANNÉE DYNAMIQUE
   -------------------------------------------------------------------------- */
function initFooterYear() {
  const el = document.getElementById("footer-year");
  if (el) {
    const year = new Date().getFullYear();
    el.textContent = `© ${year} Vortex Conciergerie`;
  }
}

/* --------------------------------------------------------------------------
   INITIALISATION
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  applyWhatsAppLinks();
  initHeader();
  initFaq();
  initScrollReveal();
  initFloatingButton();
  initFooterYear();
});
