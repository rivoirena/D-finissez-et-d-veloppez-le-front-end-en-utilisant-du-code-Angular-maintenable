
# Architecture

src
├───app
│   ├───components
│   │   ├───line-chart
│   │   ├───metrics
│   │   ├───pie-chart
│   │   └───title
│   ├───core
│   │   ├───models
│   │   └───services
│   └───pages
│       ├───country
│       ├───home
│       └───not-found
└────assets
    ├───images
    └───mock

L'application est organisée en plusieurs parties afin de séparer les pages, les composants réutilisables, les modèles de données et la gestion des données.

# Pages

## Home
Page d'accueil de l'application. 

Elle affiche :
    - Le nombre de Jeux Olympiques
    - Le nombre de pays participants
    - Un graphique du nombre de médailles par pays
    
## Country
Page de détail d'un pays sélectionné

Elle affiche :
    - Le nombre de participation aux Jeux Olympiques
    - Le nombre total de médaille
    - Le nombre d'athlète
    - Un graphique du nombre de médailles obtenues par le pays au cours de chaque édition des Jeux Olympiques.

## Not found
Page affichée lorsqu'une route demandée n'existe pas.

# Composants

## Title
Affiche le titre de la page ainsi que les statistiques relative à chaque page

Les statistiques sont affichées via le composant MetricsComponent

## Metric
Affiche les statistiques relatives à chaques pages. Utilisé par TitleComponent et permet de représenter les metriques de manières réutilisable.

## LineChart
Affiche le graphique de la page Country

Il représente l'évolution du nombre de médailles obtenues par un pays au cours des différentes éditions des Jeux Olympiques.

## PieChart
Affiche le graphique de la page Home

Il représente la répartition du nombre de médailles obtenues par les différents pays.


# Services

## OlympicService
Le service centralise la récupération et la préparation des données utilisées par l'application.

Il récupère actuellement les données depuis le fichier :

src/assets/mock/olympic.json

Le service formate et fournit les données nécessaires aux différents composants sous forme d'Observable.

Cette centralisation permet aux composants de se concentrer sur l'affichage des données sans gérer directement leur récupération.

# Models

## Olympics
Le modèle Olympic définit la structure des données utilisées par l'application et permet de bénéficier du typage TypeScript lors de leur manipulation.

# Futur intégration API
L'architecture actuelle permet de remplacer facilement les données mockées par des données provenant d'une API.

Lors de l'intégration du back-end, la méthode getOlympics() du OlympicService pourra être adaptée afin d'effectuer une requête HTTP vers l'API au lieu de récupérer les données depuis le fichier JSON.

Les composants n'auront pas besoin de gérer directement cette modification : ils continueront à récupérer les données via OlympicService.

L'architecture suivra alors le principe suivant :

API / Back-end
      │
      ▼
OlympicService
      │
      ▼
Pages et composants

Cette séparation permet donc de faire évoluer la source des données sans modifier la logique d'affichage des différentes pages.
