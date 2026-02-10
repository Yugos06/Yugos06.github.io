# World of Warships Fan Site

Site fan moderne, accessible et complet dédié à **World of Warships**, hébergé sur **GitHub Pages**.

[Visiter le Site](https://yugos06.github.io/)

---

## Fonctionnalités Principales

1. **Mode Sombre/Clair** - Thème sauvegardé automatiquement
2. **Recherche & Filtres** - Recherche temps réel + filtrage par nation (France, Allemagne, URSS, USA, Japon, UK)
3. **Galerie Interactive** - Carrousel modal avec navigation clavier
4. **Statistiques** - Graphiques comparatifs (Puissance, Armure, Vitesse)
5. **Blog** - Guides World of Warships intégrés
6. **PWA** - Fonctionne hors-ligne, installable sur mobile/desktop
7. **Accessibilité** - WCAG AA, navigation clavier complète, support lecteur d'écran
8. **Responsive** - Mobile, tablette, desktop optimisés

---

## Structure du Projet

```
.
├── index.html                  # Structure HTML5 sémantique
├── style.css                   # CSS moderne (variables, grid, flexbox)
├── script.js                   # Vanilla JavaScript ES6+ (0 dépendances)
├── manifest.json               # Configuration PWA
├── service-worker.js           # Cache offline strategy
├── service-worker-register.js  # Enregistrement du service worker
├── images/                     # Assets (navires + wave.webp + mix PNG/JPG/WEBP)
├── LICENSE                     # MIT License
└── README.md                   # Cette documentation
```

---

## Technologies

| Technologie | Usage |
|---|---|
| **HTML5** | Structure sémantique |
| **CSS3** | Design responsive + animations |
| **JavaScript ES6+** | Logique (vanilla, zéro dépendances) |
| **Service Worker API** | Cache + offline support |
| **localStorage API** | Persistance des préférences |
| **Intersection Observer** | Animations au scroll |
| **GitHub Pages** | Hébergement statique gratuit |

---

## Guide Utilisateur

### Mode Sombre/Clair

**Localisation**: Bouton en haut à droite du header

- Cliquez sur le bouton pour basculer entre modes sombre et clair
- Votre préférence est sauvegardée automatiquement
- Le thème choisi réapparaît au prochain chargement
- Économise de l'énergie sur écrans OLED

### Recherche & Filtres

**Localisation**: Barre de recherche sous le header

**Recherche**:
- Tapez le nom d'un navire (ex: "Bismarck")
- Les résultats s'affichent instantanément
- Recherche insensible à la casse
- Recherche partielle: "ric" trouve "Richelieu"

**Filtres par pays**:
- 6 boutons pour les nations (France, Allemagne, URSS, USA, Japon, UK)
- Bouton "Tous" pour réinitialiser
- Combinaison possible avec la recherche
- Le bouton actif devient orange

### Cartes de Navires

Chaque carte affiche:
- Image du navire
- Notation (étoiles)
- Description courte
- Bouton pour ouvrir la galerie

**Cliquez sur la carte** pour développer et voir les statistiques détaillées.

### Galerie & Carrousel

**Navigation**:
1. Cliquez sur "Galerie" dans une carte de navire
2. Une fenêtre modale s'ouvre avec l'image agrandie
3. Naviguez avec les flèches (← →)
4. Appuyez sur Escape ou cliquez dehors pour fermer

**Clavier**:
- Flèche gauche: Image précédente
- Flèche droite: Image suivante
- Escape: Fermer la galerie
- Tab: Accéder aux boutons (accessibilité)

### Statistiques & Comparaison

**Section**: "Comparateur de Navires"

Trois graphiques en barres affichent pour tous les navires:
- **Puissance**: Dégâts/Damage du navire
- **Armure**: Défense/Santé
- **Vitesse**: Mobilité/Déplacement

Les barres en gradient orange montrent la comparaison relative de chaque navire.

### Blog

La section Blog propose 4 guides World of Warships avec contenu éducatif sur le jeu.

### Installation PWA

**Sur mobile ou desktop**:
1. Visitez le site
2. Cliquez sur "Installer" (message du navigateur)
3. L'application s'installe sur votre écran d'accueil
4. Fonctionne hors-ligne avec les assets en cache

---

## Architecture Technique

### Mode Sombre/Clair

**Fichier**: `script.js` (fonction `initializeDarkMode()`)

- Toggle button avec 🌙 / ☀️ dans le header
- Sauvegarde en `localStorage` sous la clé "theme"
- Variables CSS pour theming dynamique
- Support de `data-theme="light"` sur l'élément HTML

### Recherche & Filtres

**Fichier**: `script.js` (fonctions `initializeSearch()` et `filterCards()`)

- Input text avec event listener en temps réel
- 7 boutons de filtrage avec data attributes
- Les cartes utilisent `data-country` et `data-type`
- Combinaison intelligente search + filter avec regex

### Galerie & Carrousel Modal

**Fichier**: `script.js` (fonctions `initializeGalleryModal()`, `openGallery()`)

- Modal fullscreen avec image agrandie
- Navigation carrousel (← →)
- Support clavier: Arrow Left/Right (navigation), Escape (fermeture)
- Fermeture au clic sur overlay
- 3 images par navire en démo

### Statistiques & Visualisation

**Fichier**: `script.js` (fonctions `initializeStats()` et `displayChart()`)

- 3 sections: Puissance, Armure, Vitesse
- Graphiques en barres avec gradient orange
- Extraction automatique des stats depuis les cartes HTML
- Affichage comparatif entre tous les navires
- Animations de remplissage avec Intersection Observer

### Notation Étoile

**Fichier**: `index.html` (classe `.rating` dans chaque carte)

- Notation ★★★★★ pour chaque navire
- Adaptation à la puissance du navire représentée

### Section Blog

**Fichier**: `index.html` (section `#blog`)

- 4 articles prédéfinis avec design moderne
- Hovers animés avec translateY
- Structure prête pour ajouter des liens vers articles détaillés

### PWA (Progressive Web App)

**Fichiers**:
- `manifest.json`: Métadonnées d'installation (nom, icône, couleurs)
- `service-worker.js`: Stratégie de cache (network-first)
- `service-worker-register.js`: Script d'enregistrement

**Caractéristiques**:
- Installable sur mobile et desktop
- Fonctionne hors-ligne
- Cache des assets principaux (HTML, CSS, JS, images)
- Support mode standalone

### Animations & Transitions

**Fichier**: `style.css` + `script.js`

- Fade-in au scroll avec Intersection Observer
- Animations sur les cartes au hover (translateY -5px)
- Transitions fluides (CSS transitions)
- Animations de remplissage des barres de statistiques

### Accessibilité

**Implémentations**:
- Aria-labels sur tous les boutons interactifs
- Navigation complète au clavier (Tab, Enter, Space)
- Focus states visibles et clairs
- Sémantique HTML5 appropriée (header, nav, main, section, article, button)
- Contraste de couleurs WCAG AA
- Support des lecteurs d'écran (NVDA, JAWS, VoiceOver)

### Design Responsive

**Fichier**: `style.css` (media queries)

**Breakpoints**:
- Desktop: 1200px+ (3 colonnes de navires)
- Tablette: 768px-1199px (2 colonnes)
- Mobile: 320px-767px (1 colonne)

**Adaptations**:
- Polices fluides et lisibles
- Flexbox/Grid responsive pour les layouts
- Boutons et modales optimisés pour tactile
- Navigation accessible sur petits écrans

---

## Navires Présentés (7 Bâtiments)

1. **Bismarck** (Allemagne)
2. **Hood** (Royaume-Uni)
3. **Iowa** (États-Unis)
4. **Prinz Eugen** (Allemagne)
5. **Richelieu** (France)
6. **Vladivostok** (URSS)
7. **Yamato** (Japon)

---

## Installation & Développement

### Cloner le repositoire

```bash
git clone https://github.com/Yugos06/Yugos06.github.io.git
cd Yugos06.github.io
```

### Serveur local (optionnel)

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server
```

Puis visitez `http://localhost:8000`

### Structure du code

- **HTML**: 251 lignes - Structure sémantique complète
- **CSS**: 500+ lignes - Design moderne, variables de couleur, responsive
- **JavaScript**: 350+ lignes - 8 fonctionnalités principales

### Dépendances

Aucune. Le projet utilise uniquement le vanilla JavaScript et les APIs natives du navigateur.

---

## Historique des Versions

### v2.0 (Current)
- 8 fonctionnalités principales
- PWA complète avec service worker
- Accessibilité WCAG AA
- Design responsive
- 7 navires avec galeries

### v1.5
- 5 fonctionnalités de base
- Recherche et filtres
- Mode sombre/clair

### v1.0
- Version initiale
- Présentation statique des navires

---

## License

MIT License - Vous êtes libre d'utiliser, modifier et redistribuer ce projet.

---

## Contact & Contribution

Pour toute question, suggestion ou contribution, n'hésitez pas à ouvrir une issue sur GitHub.
3. **Iowa** 🇺🇸 (USA)
4. **Prinz Eugen** 🇩🇪 (Allemagne)
5. **Richelieu** 🇫🇷 (France)
6. **Vladivostok** 🇷🇺 (URSS)
7. **Yamato** 🇯🇵 (Japon)

### Sections Principales
-  **Accueil** - Hero section avec présentation
-  **Navires** - Cartes interactives avec stats
-  **Recherche** - Filtrage avancé
-  **Stats** - Comparaison graphique
-  **Wiki** - Articles et guides
-  **Contact** - Liens externes

---

##  Démarrage Rapide

### Développement Local

```bash
# Cloner le repository
git clone https://github.com/Yugos06/Yugos06.github.io.git
cd Yugos06.github.io

# Lancer un serveur local
python3 -m http.server 8000
# Ou avec Python 2:
python -m SimpleHTTPServer 8000

# Ouvrir dans le navigateur
# http://localhost:8000
```

### Déploiement

Le site se déploie **automatiquement** sur GitHub Pages lors d'un `git push` sur la branche `main`.

```bash
git add .
git commit -m "Feat: nouvelle fonctionnalité"
git push origin main
```

Site disponible à: `https://yugos06.github.io/`

---

## 🔧 Comment Contribuer

### Signaler un Bug

1. Ouvrez une issue GitHub
2. Décrivez le problème en détail
3. Incluez des captures d'écran si possible

### Proposer une Fonctionnalité

1. Ouvrez une discussion GitHub
2. Expliquez l'idée et son intérêt
3. Attendez les retours

### Modifier le Code

1. Fork le repository
2. Créez une branche (`git checkout -b feature/amazing`)
3. Faites vos modifications
4. Commit (`git commit -m "Feat: amazing feature"`)
5. Push (`git push origin feature/amazing`)
6. Ouvrez une Pull Request

---

##  Améliorations Implémentées

### Phase 1️⃣ (Restructuration)
 HTML sémantique
 CSS responsive (3 breakpoints)
Navigation accessible au clavier

### Phase 2️⃣ (Modernisation)
 Mode sombre/clair avec localStorage
 Animations CSS et JS
Cartes interactives

### Phase 3️⃣ (Expansion)
 Système de recherche & filtres
 Galerie modale avec carrousel
 Graphiques statistiques
 Section blog/wiki
 PWA avec Service Worker
 Animations Intersection Observer

### Phase 4️ (Polish) -  ACTUELLE
 Documentation complète
 Tests d'accessibilité
 Optimisation performance
Guide utilisateur détaillé

---

##  Configuration PWA

### Manifest.json
```json
{
  "name": "World of Warships Fan Site",
  "short_name": "WoWS Fan",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#f39c12",
  "background_color": "#0b1a2b"
}
```

### Installation
-  **Mobile**: Menu navigateur → "Ajouter à l'écran d'accueil"
-  **Desktop**: Icône installation dans la barre d'adresse

---

##  Troubleshooting

### Images ne chargent pas
- Vérifier le chemin: `images/[shipname].webp` ou `images/[shipname].jpg/.png`
- Vérifier que l'extension correspond au vrai format du fichier
- Vérifier la connexion internet

### Mode sombre ne se sauvegarde pas
- Vérifier que JavaScript est activé
- Vérifier paramètres de confidentialité
- localStorage doit être autorisé

### Service Worker ne fonctionne pas
- Site doit être en HTTPS (exception: localhost)
- Attendre quelques secondes après le chargement
- Recharger la page après registration

---

##  Documentation

Pour plus de détails, consultez:

| Document | Contenu |
|----------|---------|
| [GUIDE_COMPLET.md](GUIDE_COMPLET.md) | Guide utilisateur détaillé avec screenshots |
| [IMPLEMENTATION.md](IMPLEMENTATION.md) | Détails techniques de chaque fonctionnalité |
| [GUIDE.md](GUIDE.md) | Guide développeur pour contribuer |

---

##  Statistiques du Projet

- **Fichiers**: 13 (HTML, CSS, JS, JSON, MD)
- **Lignes de code**: 1000+
- **Fonctionnalités**: 8 majeures
- **Navires**: 7
- **Breakpoints responsive**: 3
- **Animations**: 10+

---

##  Apprentissages

Ce projet démontre:
-  HTML5 sémantique
-  CSS3 moderne (Grid, Flexbox, variables)
- JavaScript ES6+ (Vanilla)
-  Web APIs modernes (Service Worker, localStorage, Intersection Observer)
-  Design responsive
-  Accessibilité WCAG
- Git & GitHub

---

##  Contact & Liens

-  **Site**: https://yugos06.github.io/
-  **Email**: (à configurer)
-  **GitHub**: https://github.com/Yugos06
-  **World of Warships**: https://www.worldofwarships.eu/

---

##  Licence
© 2024-2026 Yugos - Tous droits réservés

Ce site est un projet fan non-officiel de World of Warships.
World of Warships est une marque déposée de [Wargaming](https://wargaming.net/).

---

##  Crédits

- **Développeur**: Yugos (3e année)
- **Design**: CSS3 moderne
- **Images**: Assets libres de droits + vagues générées
- **Hébergement**: GitHub Pages

---

**Dernière mise à jour**: Janvier 2025
**Version**: 2.0 (Complet)
**Status**:  Production Ready

 **Site 100% fonctionnel avec toutes les features modernes!**

- Design en grille responsive
- Flexbox pour la navigation
- Focus states pour l'accessibilité
- Media queries optimisées (768px et 480px)
- Transitions fluides

 **JavaScript Amélioré**
- Support complet du clavier (Enter/Space)
- Smooth scroll vers les sections
- Code bien commenté et documenté
- Gestion d'événements clean

 **UX/UI**
- Boutons de contact fonctionnels
- Lien GitHub actif
- Animations au hover
- Meilleur feedback utilisateur

##  Utilisation

1. **Clonez le repo** (optionnel pour modifications)
2. **Ouvrez `index.html`** dans votre navigateur
3. **Interagissez** - Cliquez sur les cartes de navires
4. **Naviguez** - Utilisez les liens du menu ou le clavier

### Raccourcis Clavier

- **Tab** - Navigation entre les cartes
- **Enter/Space** - Afficher/masquer la description
- **Flèches** - Défilement automatique

## 📱Responsive

- **Desktop** - Grille 3 colonnes
- **Tablette** (768px) - Grille flexible
- **Mobile** (480px) - Colonne unique

##  Accessibilité

- Navigation au clavier complète
-  Contraste suffisant des couleurs
-  Labels ARIA descriptifs
-  Attributs alt pour les images
-  Focus visibles

##  Améliorations Futures

- [ ] Ajouter d'autres navires
- [ ] Galerie d'images
- [ ] Système de comparaison
- [ ] Animations supplémentaires
- [ ] Dark/Light mode

##  Licence

Voir le fichier [LICENSE](LICENSE)

##  Auteur

**Yugos** - Fan de World of Warships

---

*Développé avec ❤️ pour les fans de World of Warships*
