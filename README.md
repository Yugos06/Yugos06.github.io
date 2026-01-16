# ⚓ World of Warships Fan Site

Site fan moderne, accessible et complet dédié à **World of Warships**, hébergé sur **GitHub Pages**.

**🌐 [Visiter le Site](https://yugos06.github.io/)**

---

## ✨ Fonctionnalités

✅ **Mode Sombre/Clair** - Toggle automatique avec sauvegarde  
✅ **Recherche & Filtres** - Temps réel par nation (FR, DE, RU, USA, JP, UK)  
✅ **Galerie Interactive** - Carrousel modal avec navigation  
✅ **Statistiques** - Graphiques comparatifs (Puissance, Armure, Vitesse)  
✅ **Blog** - Guides World of Warships intégrés  
✅ **PWA** - Fonctionne hors-ligne, installable  
✅ **Accessible** - WCAG AA, navigation clavier, lecteur d'écran  
✅ **Responsive** - Mobile, tablette, desktop  

---

## 📁 Structure du Projet

```
.
├── index.html                 # HTML5 avec structure sémantique
├── style.css                  # CSS moderne (variables, grid, flex)
├── script.js                  # Vanilla JS ES6+ (0 dépendances)
├── manifest.json              # Configuration PWA
├── service-worker.js          # Cache offline
├── service-worker-register.js # Enregistrement PWA
├── images/                    # Assets (7 navires + wave)
├── GUIDE_COMPLET.md          # Guide utilisateur détaillé
├── IMPLEMENTATION.md         # Architecture technique
├── CHANGELOG.md              # Historique des versions
└── LICENSE                   # MIT License
```

---

## 🚀 Installation & Développement
- Mobile-first (320px+)
- Tablette optimisée (768px)
- Desktop premium (1200px+)
- Smooth animations

---

## 📁 Structure du Projet

```
/workspaces/Yugos06.github.io/
├── index.html                    # Structure HTML (251 lignes)
├── style.css                     # Design & animations (500+ lignes)
├── script.js                     # Logique & interactivité (350+ lignes)
├── manifest.json                 # Configuration PWA
├── service-worker.js             # Cache offline
├── service-worker-register.js    # Registration script
│
├── images/                       # Assets visuels
│   ├── bismarck.png
│   ├── hood.png
│   ├── iowa.png
│   ├── prinz_eugen.png
│   ├── richelieu.png
│   ├── vladivostok.png
│   ├── yamato.png
│   └── wave.png
│
└── Documentation/
    ├── README.md                 # Ce fichier
    ├── GUIDE_COMPLET.md          # Guide utilisateur détaillé
    ├── IMPLEMENTATION.md         # Détails techniques
    ├── CHANGES.md                # Historique des changements
    ├── COMPLETION.md             # Checklists de fonctionnalités
    ├── STATUS.md                 # État du projet
    └── GUIDE.md                  # Guide développeur
```

---

## 🎨 Technologies Utilisées

| Technologie | Utilisation | Version |
|---|---|---|
| **HTML5** | Structure sémantique | Standard |
| **CSS3** | Design responsive, animations | Modern |
| **JavaScript (ES6+)** | Interactivité, logique | Vanilla (no deps) |
| **Service Worker** | Cache, offline support | API moderne |
| **localStorage API** | Persistance préférences | Browser API |
| **Intersection Observer** | Animations au scroll | Browser API |
| **GitHub Pages** | Hébergement | Static hosting |

---

## 📊 Contenu du Site

### Navires Présentés (7)
1. **Bismarck** 🇩🇪 (Allemagne)
2. **Hood** 🇬🇧 (UK)
3. **Iowa** 🇺🇸 (USA)
4. **Prinz Eugen** 🇩🇪 (Allemagne)
5. **Richelieu** 🇫🇷 (France)
6. **Vladivostok** 🇷🇺 (URSS)
7. **Yamato** 🇯🇵 (Japon)

### Sections Principales
- ⚓ **Accueil** - Hero section avec présentation
- 🛢️ **Navires** - Cartes interactives avec stats
- 🔍 **Recherche** - Filtrage avancé
- 📊 **Stats** - Comparaison graphique
- 📖 **Wiki** - Articles et guides
- 📧 **Contact** - Liens externes

---

## 🚀 Démarrage Rapide

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

## 📈 Améliorations Implémentées

### Phase 1️⃣ (Restructuration)
✅ HTML sémantique
✅ CSS responsive (3 breakpoints)
✅ Navigation accessible au clavier

### Phase 2️⃣ (Modernisation)
✅ Mode sombre/clair avec localStorage
✅ Animations CSS et JS
✅ Cartes interactives

### Phase 3️⃣ (Expansion)
✅ Système de recherche & filtres
✅ Galerie modale avec carrousel
✅ Graphiques statistiques
✅ Section blog/wiki
✅ PWA avec Service Worker
✅ Animations Intersection Observer

### Phase 4️⃣ (Polish) - ✨ ACTUELLE
✅ Documentation complète
✅ Tests d'accessibilité
✅ Optimisation performance
✅ Guide utilisateur détaillé

---

## 📝 Configuration PWA

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
- 📱 **Mobile**: Menu navigateur → "Ajouter à l'écran d'accueil"
- 🖥️ **Desktop**: Icône installation dans la barre d'adresse

---

## 🐛 Troubleshooting

### Images ne chargent pas
- Vérifier le chemin: `images/[shipname].png`
- Format PNG (pas JPG)
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

## 📚 Documentation

Pour plus de détails, consultez:

| Document | Contenu |
|----------|---------|
| [GUIDE_COMPLET.md](GUIDE_COMPLET.md) | Guide utilisateur détaillé avec screenshots |
| [IMPLEMENTATION.md](IMPLEMENTATION.md) | Détails techniques de chaque fonctionnalité |
| [GUIDE.md](GUIDE.md) | Guide développeur pour contribuer |

---

## 📊 Statistiques du Projet

- **Fichiers**: 13 (HTML, CSS, JS, JSON, MD)
- **Lignes de code**: 1000+
- **Fonctionnalités**: 8 majeures
- **Navires**: 7
- **Breakpoints responsive**: 3
- **Animations**: 10+

---

## 🎓 Apprentissages

Ce projet démontre:
- ✅ HTML5 sémantique
- ✅ CSS3 moderne (Grid, Flexbox, variables)
- ✅ JavaScript ES6+ (Vanilla)
- ✅ Web APIs modernes (Service Worker, localStorage, Intersection Observer)
- ✅ Design responsive
- ✅ Accessibilité WCAG
- ✅ Git & GitHub

---

## 📞 Contact & Liens

- 🌐 **Site**: https://yugos06.github.io/
- 📧 **Email**: (à configurer)
- 🐙 **GitHub**: https://github.com/Yugos06
- 🎮 **World of Warships**: https://www.worldofwarships.eu/

---

## 📄 Licence

© 2024-2026 Yugos - Tous droits réservés

Ce site est un projet fan non-officiel de World of Warships.
World of Warships est une marque déposée de [Wargaming](https://wargaming.net/).

---

## 🏆 Crédits

- **Développeur**: Yugos (3e année)
- **Design**: CSS3 moderne
- **Images**: Assets libres de droits + vagues générées
- **Hébergement**: GitHub Pages

---

**Dernière mise à jour**: Janvier 2024
**Version**: 2.0 (Complet)
**Status**: ✅ Production Ready

🚀 **Site 100% fonctionnel avec toutes les features modernes!**

- Design en grille responsive
- Flexbox pour la navigation
- Focus states pour l'accessibilité
- Media queries optimisées (768px et 480px)
- Transitions fluides

✅ **JavaScript Amélioré**
- Support complet du clavier (Enter/Space)
- Smooth scroll vers les sections
- Code bien commenté et documenté
- Gestion d'événements clean

✅ **UX/UI**
- Boutons de contact fonctionnels
- Lien GitHub actif
- Animations au hover
- Meilleur feedback utilisateur

## 🎯 Utilisation

1. **Clonez le repo** (optionnel pour modifications)
2. **Ouvrez `index.html`** dans votre navigateur
3. **Interagissez** - Cliquez sur les cartes de navires
4. **Naviguez** - Utilisez les liens du menu ou le clavier

### Raccourcis Clavier

- **Tab** - Navigation entre les cartes
- **Enter/Space** - Afficher/masquer la description
- **Flèches** - Défilement automatique

## 📱 Responsive

- **Desktop** - Grille 3 colonnes
- **Tablette** (768px) - Grille flexible
- **Mobile** (480px) - Colonne unique

## 🌐 Accessibilité

- ✅ Navigation au clavier complète
- ✅ Contraste suffisant des couleurs
- ✅ Labels ARIA descriptifs
- ✅ Attributs alt pour les images
- ✅ Focus visibles

## 💡 Améliorations Futures

- [ ] Ajouter d'autres navires
- [ ] Galerie d'images
- [ ] Système de comparaison
- [ ] Animations supplémentaires
- [ ] Dark/Light mode

## 📄 Licence

Voir le fichier [LICENSE](LICENSE)

## 👤 Auteur

**Yugos** - Fan de World of Warships

---

*Développé avec ❤️ pour les fans de World of Warships*
