# 📚 Flashcards — Les mouvements littéraires

Site de révision des 12 grands mouvements littéraires français, du XVI<sup>e</sup> au XX<sup>e</sup> siècle,
construit à partir de la fiche « Les principaux mouvements littéraires ».

Aucune installation, aucune dépendance : trois fichiers statiques (HTML, CSS, JS) qui fonctionnent
directement dans le navigateur, y compris hors connexion.

## Les deux modes

### 🧠 Mode apprentissage — toutes les informations

- **Flashcards** : le recto donne le nom du mouvement, le verso affiche la fiche complète
  (définition, dates, principes, thèmes, genres, formes et procédés, auteurs).
  Clic ou barre d'espace pour retourner, flèches ← → pour naviguer, bouton 🔀 pour mélanger.
- **Fiches complètes** : toutes les fiches déroulées les unes à la suite des autres.
- **Frise chronologique** : les mouvements replacés dans l'ordre des dates.
- **Tableau** : le tableau récapitulatif d'origine, comparable colonne par colonne.

Un filtre permet de ne réviser qu'un siècle à la fois.

### ✅ Mode contrôle — vérification des connaissances

Le site génère un contrôle aléatoire et corrige les réponses. Six types de questions :

| Type | Exemple |
|---|---|
| Reconnaître une définition | « Courant en réaction contre le romantisme… » → quel mouvement ? |
| Retrouver les dates | À quelle période situe-t-on le Naturalisme ? |
| Situer un auteur | À quel mouvement rattache-t-on Mallarmé ? |
| Reconnaître un principe / thème / procédé | « Le théâtre dans le théâtre » → quel mouvement ? |
| Ordre chronologique | Lequel de ces quatre mouvements est le plus ancien ? |
| Réponse libre | Citez de mémoire les thèmes du Symbolisme (auto-évaluation) |

Réglages disponibles : portée (tous les siècles ou un seul), nombre de questions (10 à 30),
types de questions activés.

À la fin : score sur 20, bilan par mouvement, liste des questions ratées avec la bonne réponse,
et un bouton **« Réviser les mouvements ratés »** qui bascule en mode apprentissage avec uniquement
les mouvements à retravailler. Les résultats sont conservés dans le navigateur (`localStorage`)
pour signaler les mouvements les plus fragiles d'une session à l'autre.

## Utilisation

Ouvrir `index.html` dans un navigateur, ou publier le dépôt sur GitHub Pages :
**Settings → Pages → Source : GitHub Actions**. Le workflow `.github/workflows/pages.yml`
publie automatiquement le site à chaque push sur `main`.

## Structure

```
index.html        structure des deux modes
css/style.css     thème clair / sombre, mise en page responsive
js/data.js        les 12 mouvements (données de la fiche)
js/app.js         flashcards, fiches, frise, tableau et moteur de quiz
```

Pour modifier ou compléter le contenu, il suffit d'éditer `js/data.js` : le reste du site
(cartes, frise, tableau, questions du contrôle) se régénère à partir de ces données.

## Note sur les données

Le contenu reprend fidèlement la fiche d'origine. Quelques dates d'auteurs, visiblement
erronées ou incomplètes sur la photocopie, ont été rétablies :
Bossuet (1627-**1704**), Rousseau (**1712**-1778), et les dates de décès des auteurs du
Nouveau Roman (Robbe-Grillet 1922-2008, Butor 1926-2016, Claude Simon 1913-2005).
