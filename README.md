# JeMultiplie

JeMultiplie est un petit site web d'entraînement aux multiplications.
Il permet de pratiquer, de suivre son temps moyen de réponse et sa précision, avec des statistiques détaillées

## Accéder au site 
https://mael-sil.github.io/JeMultiplie/

## Stack technique

 - Vue
 - TypeScript
 - Vite
 - GitHub Pages pour le déploiement

## Fonctionnalités principales

### Jeux

- Génération aléatoire d'opérations de multiplication
- Révision des erreurs, faite
- Suivi du temps moyen de réponse
- Calcul de la précision (% des bonnes réponses)
- Support du clavier et du pavé numérique à l'écran

### Statistique

- Historique sauvegardé temporairement (localStorage)
- Page de visualisations des statistiques
  - Tableau des résultats des sessions effectuées
  - Précision et temps moyen par opération pour la session sélectionnée
 
### Interface

- Interface responsive et légère
- Mode clair et sombre
 
## Screenshot
### Home
<p align="center">
  <img src="https://github.com/user-attachments/assets/2f3a59b7-c8db-4021-bd46-6ebc27f301c3" width="45%" />
  <img src="https://github.com/user-attachments/assets/1d3cfcdb-b854-4a02-b6cf-eddf91b35e8b"  width="45%" />
</p>

### Game
<p align="center">
  <img src="https://github.com/user-attachments/assets/cb293c4f-6e3e-4348-838f-34ef46fc3481"  width="45%" />
  <img src="https://github.com/user-attachments/assets/f9cd5ce8-7a00-46fd-8df9-8adb961fe4be" width="45%" />
</p>

### Stat
<p align="center">
  <img src="https://github.com/user-attachments/assets/dd7a90cd-deb5-4574-9fee-18e2a51c442e" width="45%" />
  <img src="https://github.com/user-attachments/assets/0b1648b6-3839-4304-9ff5-718a8f5aa759" width="45%" />
</p>

## Prochaine étape 
- Amélioration du front avec un meilleure page d'acceuil et une page de dashboard avec les statistique des session d'entrainement.
- Ajout d'un backend pour stocker les résultats des utilisateurs dans une base de données avec un systéme d'utilisateur et d'authentification.
- Ajout de fonctionnalité: Mode "temps" avec timer limité et Mode "course" avec nombre de question limité à résoudre le plus rapidement possible
