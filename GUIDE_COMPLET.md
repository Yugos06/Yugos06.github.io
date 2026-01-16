# 🎮 Guide Complet - Site World of Warships

## 📚 Table des Matières
1. [Introduction](#introduction)
2. [Fonctionnalités](#fonctionnalités)
3. [Guide d'Utilisation](#guide-dutilisation)
4. [Installation PWA](#installation-pwa)
5. [Architecture Technique](#architecture-technique)

---

## Introduction

Bienvenue sur le site fan World of Warships ! Ce guide complet vous explique toutes les fonctionnalités et comment les utiliser.

### 🎯 Objectif du Site
Présenter les navires célèbres de World of Warships avec:
- 📊 Statistiques détaillées
- 🖼️ Galerie d'images
- 🔍 Système de recherche avancé
- 🌙 Mode sombre/clair
- 📱 Accès hors-ligne (PWA)

---

## Fonctionnalités

### 1️⃣ Mode Sombre / Clair (🌙 ☀️)

**Localisation**: Bouton en haut à droite du header

**Comment l'utiliser**:
```
1. Cliquez sur 🌙 pour passer en mode clair
2. Cliquez sur ☀️ pour revenir au mode sombre
3. Votre préférence est sauvegardée automatiquement
4. Au prochain chargement, le thème choisi apparaît
```

**Caractéristiques**:
- Économise de l'énergie sur écrans OLED
- Réduit la fatigue oculaire le soir
- Thème cohérent sur tout le site

### 2️⃣ Recherche en Temps Réel (🔍)

**Localisation**: Barre de recherche sous le header

**Comment l'utiliser**:
```
1. Tapez le nom d'un navire (ex: "Bismarck")
2. Les résultats s'affichent instantanément
3. La recherche n'est PAS sensible à la casse
4. Partielle: taper "ric" trouve "Richelieu"
```

**Exemple**:
```
Recherche "hood" → Affiche le Hood
Recherche "uss" → Affiche Iowa
Recherche "" (vide) → Affiche tous les navires
```

### 3️⃣ Filtres par Pays (🚩)

**Localisation**: Boutons sous la barre de recherche

**Pays disponibles**:
- 🇫🇷 France
- 🇩🇪 Allemagne
- 🇷🇺 URSS
- 🇺🇸 USA
- 🇯🇵 Japon
- 🇬🇧 UK (Royaume-Uni)
- 🌐 Tous (réinitialise les filtres)

**Comment l'utiliser**:
```
1. Cliquez sur le bouton d'un pays
2. Le bouton devient orange (actif)
3. Seuls les navires de ce pays s'affichent
4. La recherche fonctionne aussi avec le filtre
5. Cliquez "Tous" pour voir tous les navires
```

**Combinaison Search + Filter**:
```
Exemple:
- Filtrer "France"
- Chercher "Riche"
- Résultat: Richelieu (navire français)
```

### 4️⃣ Cartes de Navires (🛢️)

**Chaque carte affiche**:
- 🖼️ Image du navire
- ⭐ Notation (étoiles)
- 📝 Description
- 📊 Statistiques (au clic)
- 🎬 Bouton Galerie

**Comment développer une carte**:
```
Cliquez sur la carte pour l'agrandir et voir:
- Description complète
- Statistiques détaillées
- Bouton pour ouvrir la galerie
```

### 5️⃣ Galerie & Carrousel (🖼️)

**Comment l'utiliser**:
```
1. Cliquez sur "Galerie (3 images)" dans une carte
2. Une fenêtre modale s'ouvre
3. Naviguer avec les flèches ← →
4. Ou utiliser les touches clavier (Arrow Left/Right)
5. Appuyez sur Escape ou cliquez dehors pour fermer
```

**Navigation Clavier**:
- `←` Flèche gauche: Image précédente
- `→` Flèche droite: Image suivante
- `Escape`: Fermer la galerie
- `Tab`: Accéder aux boutons (accessibilité)

### 6️⃣ Statistiques & Comparaison (📊)

**Localisation**: Section "Comparateur de Navires"

**3 Graphiques affichent**:
1. **Puissance** (⚡) - Dégâts du navire
2. **Armure** (🛡️) - Défense/Santé
3. **Vitesse** (🚀) - Mobilité

**Comment lire les graphiques**:
```
- Chaque barre = un navire
- Plus la barre est longue = plus puissant
- Les barres sont en gradient orange
- Tous les navires sont comparés automatiquement
```

**Exemple**:
```
Puissance:
Bismarck  ████████████████ 16
Yamato    ███████████████████ 19
Iowa      ██████████████ 14
```

### 7️⃣ Blog & Wiki (📖)

**Localisation**: Section "Wiki World of Warships"

**4 Articles disponibles**:
1. 🛡️ **Guide des Types de Navires**
   - Types: Cuirassés, Croiseurs, Destroyers
   - Rôles dans les batailles

2. ⚔️ **Stratégies de Combat**
   - Positionnement tactique
   - Techniques de tir
   - Coordinations en équipe

3. 📚 **Histoire Navale**
   - Histoire réelle des navires
   - Batailles historiques
   - Anecdotes et légendes

4. 🎮 **Guide Débutant**
   - Comment bien commencer
   - Interface et commandes
   - Premières batailles

**Comment accéder**:
```
Cliquez sur une carte d'article
(Les articles sont actuellement des placeholders)
```

---

## Guide d'Utilisation

### Scénario 1: Chercher un Navire Spécifique

```
Objectif: Trouver le Yamato

Étapes:
1. Tapez "Yamato" dans la barre de recherche
2. La carte du Yamato apparaît
3. Cliquez pour voir les détails complets
4. Cliquez "Galerie" pour voir les images
```

### Scénario 2: Explorer les Navires Français

```
Objectif: Voir tous les navires français

Étapes:
1. Cliquez sur le bouton "France"
2. Seuls les navires français s'affichent
3. Vous voir: Richelieu
4. Cliquez pour voir ses stats complètes
```

### Scénario 3: Comparer les Puissances

```
Objectif: Voir quel navire est le plus puissant

Étapes:
1. Descendez jusqu'à "Comparateur de Navires"
2. Regardez le graphique "Puissance"
3. Identifiez la barre la plus longue
4. C'est le navire le plus puissant
```

### Scénario 4: Utiliser en Mode Sombre la Nuit

```
Objectif: Réduire la fatigue oculaire

Étapes:
1. Cliquez sur 🌙 en haut à droite
2. Le site passe au mode clair ☀️
3. Les couleurs s'inversent
4. Votre préférence est sauvegardée
5. À la prochaine visite, le mode sera mémorisé
```

### Scénario 5: Utiliser le Site Hors-Ligne

```
Objectif: Accéder au site sans internet

Étapes:
1. Visitez le site une première fois connecté
2. Le Service Worker met en cache les assets
3. Fermez la connexion internet
4. Rechargez la page
5. Le site fonctionne toujours ! (modo offline)
```

---

## Installation PWA

### 📱 Sur Téléphone Mobile

**Android (Chrome)**:
```
1. Ouvrez le site dans Chrome
2. Appuyez sur le menu (⋮)
3. Sélectionnez "Ajouter à l'écran d'accueil"
4. Un icône app apparaît sur l'écran d'accueil
5. L'app se lance en mode fullscreen
```

**iPhone (Safari)**:
```
1. Ouvrez le site dans Safari
2. Appuyez sur le bouton Partage (↗️)
3. Sélectionnez "Sur l'écran d'accueil"
4. Nommez l'app (déjà nommée "WoWS Fan")
5. Ajoutez l'icône
```

### 🖥️ Sur Ordinateur

**Windows (Chrome/Edge)**:
```
1. Ouvrez le site dans le navigateur
2. Cliquez l'icône d'installation (barre d'adresse)
3. Cliquez "Installer"
4. L'app s'ouvre en fenêtre séparée
```

**Mac (Chrome)**:
```
1. Ouvrez le site dans Chrome
2. Menu ☰ → "Plus d'outils" → "Créer des raccourcis"
3. Cochez "Ouvrir en tant qu'application"
4. Un app Mac est créée
```

**Linux**:
```
1. Menu ☰ → "Plus d'outils" → "Créer des raccourcis"
2. Cochez "Ouvrir en tant qu'application"
3. Lance le site en mode app
```

### 🔄 Avantages de l'Installation PWA

- ⚡ Accès plus rapide (raccourci sur écran d'accueil)
- 📴 Fonctionne hors-ligne (assets en cache)
- 🔔 Notifications possibles (futures)
- 💾 Moins d'espace qu'une vraie app
- ♻️ Updates automatiques
- 🌐 Pas d'appstore nécessaire

---

## Architecture Technique

### 📁 Structure des Fichiers

```
/workspaces/Yugos06.github.io/
├── index.html           (Structure & sémantique)
├── style.css            (Design & animations)
├── script.js            (Logique & interactivité)
├── manifest.json        (Configuration PWA)
├── service-worker.js    (Cache & offline)
├── service-worker-register.js
├── images/              (7 navires + wave)
│   ├── bismarck.png
│   ├── hood.png
│   ├── iowa.png
│   ├── prinz_eugen.png
│   ├── richelieu.png
│   ├── vladivostok.png
│   ├── yamato.png
│   └── wave.png
└── Documentation/
    ├── IMPLEMENTATION.md (Ce qui a été fait)
    ├── GUIDE.md          (Ce guide)
    ├── STATUS.md         (État du projet)
    └── ...
```

### 🔧 Technologies Utilisées

| Technologie | Utilisation |
|------------|-------------|
| **HTML5** | Structure sémantique |
| **CSS3** | Design, animations, responsive |
| **JavaScript (ES6+)** | Logique, interactivité |
| **Service Worker** | Offline & cache |
| **localStorage** | Sauvegarde préférences |
| **Intersection Observer** | Animations au scroll |
| **Fetch API** | Pour Service Worker |

### 🎨 Système de Couleurs

**Variables CSS**:
```css
--primary: #f39c12          /* Orange doré */
--bg-dark: #0b1a2b          /* Bleu marine */
--bg-light: #142b44         /* Bleu clair */
--accent-blue: #3498db      /* Bleu accent */
--text-light: #f0f0f0       /* Texte clair */
```

**Thème Mode Clair**:
```css
--bg-dark: #ffffff          /* Fond blanc */
--text-light: #333333       /* Texte sombre */
```

### 📱 Breakpoints Responsifs

```css
/* Desktop */
1200px+ : 3 colonnes, full size

/* Tablet */
768px - 1199px : 2 colonnes, réduit

/* Mobile */
320px - 767px : 1 colonne, optimisé mobile
```

### 🔗 Flow Utilisateur

```
Page Load
  ↓
Service Worker Register
  ↓
DOMContentLoaded Event
  ↓
Initialize All Features:
  - Dark Mode (localStorage)
  - Search & Filter
  - Ship Cards (click handlers)
  - Gallery Modal
  - Stats Visualization
  - Scroll Animations
  - Blog Interactions
  ↓
User Ready!
```

---

## 🐛 Troubleshooting

### Problème: Mode sombre ne se sauvegarde pas

**Solution**:
```
1. Vérifiez que JavaScript est activé
2. Vérifiez les paramètres de confidentialité
3. Localstorage doit être autorisé
4. Rechargez la page après le clic
```

### Problème: Images ne chargent pas

**Solution**:
```
1. Vérifiez le chemin: images/[shipname].png
2. Les noms de fichiers sont en minuscules
3. Format: PNG (pas JPG)
4. Vérifiez la connexion internet
```

### Problème: Galerie ne s'ouvre pas

**Solution**:
```
1. Cliquez d'abord sur la carte pour l'agrandir
2. Puis cliquez "Galerie (3 images)"
3. Vérifiez que JavaScript est activé
4. Nettoyez le cache du navigateur
```

### Problème: Service Worker ne fonctionne pas

**Solution**:
```
1. Service Worker nécessite HTTPS
2. Localhost (développement) fonctionne aussi
3. Vérifiez le console (F12) pour les erreurs
4. Attendez quelques secondes après le load
5. Rechargez après la registration
```

---

## 📞 Support & Contact

Pour des questions ou suggestions:
- 📧 Email: (à configurer)
- 🐙 GitHub: https://github.com/Yugos06
- 💬 Commentaires: Ouvrez une issue GitHub

---

## 📄 Licence

© 2026 Yugos - All rights reserved

Ce site est un fan project non-officiel de World of Warships.
World of Warships est une marque de Wargaming.

---

## 🎓 Pour les Développeurs

Si vous voulez contribuer ou modifier le site:

**Éditer un navire**:
1. Trouvez le `<li class="ship-card">` dans `index.html`
2. Modifiez les stats dans `.ship-stats`
3. Mettez à jour l'image `<img src="images/..."`
4. Commit sur GitHub

**Ajouter un nouveau navire**:
1. Copiez un `<li class="ship-card">` existant
2. Changez `id`, `data-country`, `data-type`
3. Mettez à jour nom, image, desc, stats
4. Ajoutez l'image PNG dans `/images/`
5. Commit & push

**Ajouter une fonctionnalité**:
1. Modifiez `script.js` pour la logique
2. Modifiez `style.css` pour le design
3. Testez sur desktop et mobile
4. Commit avec un message clair

---

**Dernière mise à jour**: 2024
**Version**: 2.0 (Complet + PWA + Animations)
**Status**: ✅ Production Ready
