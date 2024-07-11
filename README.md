# Products Application

## Description
Une application permettant de gérer des produits, incluant l'ajout, la modification, la suppression et la notation des produits.

## Prérequis
- Node.js
- npm
- MongoDB

## Installation

### Backend
1. Clonez le dépôt:
    ```sh
    git clone <url-du-dépôt>
    cd <nom-du-dépôt>
    ```

2. Naviguez dans le répertoire backend:
    ```sh
    cd products-api
    ```

3. Installez les dépendances:
    ```sh
    npm install
    ```

4. Créez un fichier `.env` à la racine du répertoire `products-api` et ajoutez-y vos variables d'environnement:
    ```env
    PORT=3000
    MONGO_URI=<votre-URI-MongoDB>
    ```

5. Démarrez le serveur:
    ```sh
    npm start
    ```

### Frontend
1. Naviguez dans le répertoire frontend:
    ```sh
    cd products-client
    ```

2. Installez les dépendances:
    ```sh
    npm install
    ```

3. Démarrez l'application frontend:
    ```sh
    npm start
    ```

## Scripts

### Backend (dans le répertoire `products-api`)
- `npm start`: Démarre le serveur.
- `npm test`: Exécute les tests unitaires et d'intégration.
- `npm run lint`: Exécute ESLint pour vérifier la qualité du code.

### Frontend (dans le répertoire `products-client`)
- `npm start`: Démarre l'application React en mode développement.
- `npm test`: Exécute les tests unitaires.
- `npm run lint`: Exécute ESLint pour vérifier la qualité du code.

## Utilisation
1. Accédez à l'application frontend via `http://localhost:3001`.
2. Utilisez l'application pour ajouter, modifier, supprimer et noter des produits.

## Tests
### Backend
Les tests pour le backend sont situés dans le répertoire `products-api/test`.
Pour exécuter les tests, utilisez la commande:
```sh
npm test
