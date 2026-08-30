# Vortex Conciergerie — Site vitrine

Landing page one-page pour Vortex Conciergerie (conciergerie & gestion locative opérationnelle à Paris et en Île-de-France). Site statique HTML/CSS/JS vanilla, sans framework, pensé pour GitHub Pages puis un nom de domaine personnalisé.

---

## 1. Aperçu du projet

```
/
├── index.html          → page principale (tout le contenu du site)
├── legal.html           → mentions légales (placeholders à compléter)
├── privacy.html          → politique de confidentialité
├── 404.html              → page d'erreur personnalisée
├── styles.css            → l'intégralité du design (variables en haut de fichier)
├── script.js              → config WhatsApp + interactions (menu, FAQ, animations)
├── robots.txt             → indexation
├── sitemap.xml            → plan du site pour les moteurs de recherche
└── assets/images/         → dossier réservé aux futures images locales
```

Aucune dépendance, aucun build : le site s'ouvre directement en local en double-cliquant sur `index.html`, et se déploie tel quel sur GitHub Pages.

---

## 2. MODIFICATIONS RAPIDES

C'est la section la plus importante si vous n'êtes pas développeur. Chaque élément ci-dessous indique **le fichier** et **l'endroit exact** à modifier.

### 📱 Numéro WhatsApp (le plus important)
Fichier : `script.js`, tout en haut, bloc `VORTEX_CONFIG`.
```js
const VORTEX_CONFIG = {
  whatsappNumber: "WHATSAPP_NUMBER_TO_REPLACE", // ← remplacer ici
  defaultMessage: "Bonjour, je souhaiterais obtenir des informations concernant la gestion de mon logement.",
};
```
Remplacez `WHATSAPP_NUMBER_TO_REPLACE` par votre numéro au format international, **sans le `+`, sans espaces** (exemple pour un numéro français 06 12 34 56 78 → `33612345678`). C'est le seul endroit à modifier : tous les boutons WhatsApp du site (header, hero, sections, bouton flottant, footer) utilisent automatiquement cette valeur.

### 💬 Message WhatsApp prérempli
Même bloc, variable `defaultMessage`.

### ✉️ E-mail de contact
Recherchez `EMAIL_TO_REPLACE` dans `index.html` (footer) et `[EMAIL_À_COMPLÉTER]` dans `legal.html` / `privacy.html`.

### 🏷️ Nom de marque
Recherchez `VORTEX` / `Vortex Conciergerie` dans `index.html`, `legal.html`, `privacy.html`, `404.html`.

### 📍 Zone géographique
Section "Zone d'intervention" dans `index.html` (id `zone`) : modifiez le texte et les `zone-tag` (Paris intramuros, Hauts-de-Seine, etc.).

### 🧾 Services
Chaque service est une carte `<article class="service-card">` dans la section `#services` de `index.html`. Pour ajouter un service, copiez un bloc `<article class="service-card">...</article>` existant et modifiez le titre et le texte (l'icône SVG peut être dupliquée depuis une autre carte).

### 🎨 Couleurs
Fichier `styles.css`, tout en haut, dans `:root { ... }`. Les variables principales :
- `--color-bg` : fond général
- `--color-ink` : texte / boutons noirs
- `--color-accent` : couleur d'accent laiton (peut être changée pour toute autre teinte premium)

### 🖼️ Images
L'image du hero est actuellement une image de démonstration (`picsum.photos`, voir section 8 ci-dessous). Remplacez le `src` de la balise `<img>` dans `.hero-visual` par le chemin de votre propre photo, par exemple `assets/images/hero.jpg` après avoir déposé votre fichier dans `assets/images/`.

### 🔍 SEO — titre et meta description
Fichier `index.html`, dans `<head>` : balises `<title>` et `<meta name="description">`.

### 🌐 Domaine (canonical)
Fichier `index.html`, balise `<link rel="canonical" href="...">`, et `sitemap.xml`, `robots.txt` (remplacer `https://vortex-conciergerie.fr` par votre domaine final).

### ⚖️ Informations légales
Fichier `legal.html` : tous les champs `[XXX_À_COMPLÉTER]` doivent être remplacés par vos vraies informations (SIREN, adresse, etc.) avant mise en ligne publique.

### 📊 Tracking (Google Ads / Analytics / GTM / Meta Pixel)
Fichier `index.html`, dans `<head>`, juste avant `</head>` : un commentaire indique où coller le script officiel de Google Tag Manager une fois votre compte créé. Ne jamais insérer d'identifiant fictif.

---

## 3. Direction artistique

- **Typographie** : Fraunces (display, empattements élégants) pour les titres, Inter pour le texte courant, IBM Plex Mono pour les labels/eyebrows — un trio volontairement différent des associations « cream + serif + terracotta » que l'on voit partout, pour donner une identité propre à Vortex.
- **Palette** : blanc cassé chaud (`#faf9f6`), encre presque noire (`#171613`), et un accent laiton discret (`#93744a`) qui évoque la clé, la serrurerie, le premium parisien — sans tomber dans le doré tape-à-l'œil.
- **Signature graphique** : un tracé en spirale ("vortex") réutilisé en filigrane dans le hero, en logo dans le header, en fond du CTA final et dans la carte de zone d'intervention — un fil rouge visuel qui rappelle le nom de la marque sans être too much.
- **Mouvement** : apparitions douces au scroll, header qui se fige légèrement, transitions courtes sur les boutons. `prefers-reduced-motion` est respecté partout.

---

## 4. Ce que vous devez absolument remplacer avant publication

| Élément | Fichier(s) | Statut actuel |
|---|---|---|
| Numéro WhatsApp | `script.js` | `WHATSAPP_NUMBER_TO_REPLACE` (fictif) |
| E-mail de contact | `index.html`, `legal.html`, `privacy.html` | `EMAIL_TO_REPLACE` / `[EMAIL_À_COMPLÉTER]` |
| Raison sociale, SIREN, adresse, responsable de publication | `legal.html` | Placeholders `[..._À_COMPLÉTER]` |
| Domaine final (canonical, sitemap, robots, JSON-LD, Open Graph) | `index.html`, `sitemap.xml`, `robots.txt` | `https://vortex-conciergerie.fr` (à confirmer ou modifier) |
| Photographies | `index.html` (`.hero-visual img`) | Image de démonstration Lorem Picsum — **à remplacer par de vraies photos avec les droits d'utilisation appropriés** |
| Image de partage Open Graph | `index.html` (`og:image`, `twitter:image`) | Chemin prévu (`assets/images/og-cover.jpg`) mais fichier non fourni — à ajouter |
| Scripts de tracking (GTM, GA4, Meta Pixel) | `index.html` | Emplacement commenté, aucun identifiant inséré |

---

## 5. Ce qui n'a volontairement PAS été inventé

Conformément au brief, le site ne contient :
- aucun avis client, témoignage ou compteur de logements/clients ;
- aucun chiffre d'affaires, taux d'occupation ou promesse de rendement ;
- aucune année d'expérience, certification ou partenariat revendiqué ;
- aucun logo Airbnb/Booking laissant croire à un partenariat officiel ;
- aucune adresse physique, aucun SIRET/SIREN réel ;
- aucun tarif affiché ;
- aucune donnée structurée mensongère.

La confiance est construite autrement : service humain, transparence, proximité géographique, simplicité du contact — voir la section « Pourquoi Vortex » du site.

---

## 6. Publier sur GitHub Pages

1. Créez un compte GitHub si nécessaire, puis créez un nouveau repository (par exemple `vortex-conciergerie`), public.
2. Sur votre ordinateur, ajoutez tous les fichiers de ce projet dans le repository (via l'interface web "Add file → Upload files", ou via `git`).
3. Une fois les fichiers en ligne (branche `main`), allez dans **Settings → Pages** du repository.
4. Dans "Build and deployment", sélectionnez **Deploy from a branch**, choisissez la branche `main` et le dossier `/ (root)`.
5. Enregistrez. GitHub vous donne une URL du type `https://VOTRE_USERNAME.github.io/vortex-conciergerie/`.
6. Patientez une à deux minutes puis ouvrez cette URL pour vérifier que le site fonctionne (tous les chemins CSS/JS/images sont relatifs, donc compatibles avec ce sous-répertoire).
7. Testez en particulier : le bouton WhatsApp, le menu mobile, la FAQ, et l'affichage sur téléphone.

### Connecter un nom de domaine personnalisé (plus tard)
1. Dans **Settings → Pages**, ajoutez votre domaine (ex. `vortex-conciergerie.fr`) dans le champ "Custom domain".
2. Chez votre registrar, créez les enregistrements DNS demandés par GitHub (généralement un `CNAME` vers `VOTRE_USERNAME.github.io`, ou des enregistrements `A` vers les IP GitHub Pages).
3. Une fois le domaine actif, mettez à jour les URLs `https://vortex-conciergerie.fr` dans `index.html`, `sitemap.xml` et `robots.txt` si vous utilisez un autre nom de domaine.

---

## 7. Pistes futures de SEO local / netlinking

Le site ne contient aucun faux lien ni backlink fabriqué — un backlink n'a de valeur que s'il est réellement obtenu depuis un site tiers pertinent. Quelques pistes à explorer une fois l'activité lancée :

- créer et compléter une fiche **Google Business Profile** pour Vortex Conciergerie, avec la zone Paris & Île-de-France ;
- s'inscrire sur des annuaires professionnels reconnus liés à l'immobilier ou à la conciergerie ;
- solliciter des mentions ou articles auprès de blogs immobiliers locaux une fois de premiers clients accompagnés ;
- publier ponctuellement du contenu utile (guide court, FAQ enrichie) pouvant être cité naturellement par des tiers ;
- veiller à la cohérence NAP (Nom, Adresse, Téléphone) dès que les informations légales réelles seront disponibles.

Ces actions doivent être menées progressivement et honnêtement ; aucune stratégie de liens artificiels n'a été intégrée au code.

---

## 8. Provenance des images

L'image utilisée actuellement dans le hero provient de **Lorem Picsum** (`https://picsum.photos`), un service de photos de démonstration basé sur des photos libres de droits, utilisé ici uniquement comme placeholder visuel le temps d'intégrer vos propres photographies. Elle doit être remplacée avant mise en ligne définitive par une photo dont vous détenez les droits d'utilisation (photo prise par vos soins, banque d'images sous licence appropriée, etc.).

---

## 9. Accessibilité & performance

- Contrastes vérifiés (texte foncé sur fond clair, blanc sur fond sombre pour le CTA final).
- Navigation complète au clavier, focus visibles (`:focus-visible`).
- FAQ en accordéon accessible (`aria-expanded`, boutons réels).
- HTML sémantique (`header`, `main`, `section`, `footer`, hiérarchie de titres H1 → H3).
- `prefers-reduced-motion` respecté : les animations sont désactivées si l'utilisateur l'a demandé au niveau système.
- Aucune dépendance externe lourde : HTML/CSS/JS natifs, une seule requête de polices Google Fonts.
- Images avec attributs `width`/`height` et `loading` appropriés pour limiter le CLS.

---

## 10. Limitations connues

- L'image du hero est un placeholder générique (voir section 8) et doit être remplacée.
- L'image Open Graph (`assets/images/og-cover.jpg`) n'est pas fournie : à créer (1200×630px recommandé) et déposer dans `assets/images/`.
- Le numéro WhatsApp est fictif tant qu'il n'a pas été remplacé dans `script.js`.
- Les informations légales sont des placeholders : le site ne doit pas être publié publiquement avant leur complétion.
- La carte de la section "Zone d'intervention" est une illustration schématique (spirale + cercles), pas une carte géographique réelle — un vrai plan pourra être intégré ultérieurement si souhaité.
