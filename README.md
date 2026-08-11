# Olympic Games

Application Angular permettant de visualiser des statistiques sur les Jeux Olympiques.

L'application propose une page d'accueil présentant une vue globale des données et une page de détail permettant de consulter les statistiques d'un pays.

## Installation

### Prérequis

* Node.js
* npm

### Installation des dépendances

Après avoir cloné le projet, installer les dépendances :

```bash
npm install
```

## Lancer l'application

Démarrer le serveur de développement :

```bash
ng serve
```

Puis accéder à l'application à l'adresse :

```text
http://localhost:4200/
```

## Fonctionnalités

* Visualisation des statistiques globales des Jeux Olympiques.
* Visualisation du nombre de pays participants.
* Visualisation du nombre de médailles par pays.
* Consultation des statistiques détaillées d'un pays.
* Visualisation de l'évolution des médailles d'un pays au fil des éditions.

## Documentation

La structure du projet, le rôle des différents composants et la gestion des données sont détaillés dans :

[ARCHITECTURE.md](ARCHITECTURE.md)

## Build

Pour générer une version de production :

```bash
ng build
```

Les fichiers générés sont disponibles dans le dossier `dist/`.
