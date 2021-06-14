Pour pourvoir faire tourner le site dans votre machine, merci de :
	* Faire npm install dans le projet backend et le projet frontend
	* Utiliser la branche Master pour le backend
	* Utiliser la branche developmety pour le frontend
	* Ouvrir l'invite de commande dans le dossier du projet backend et faire node server.js
	* Ouvrir l'invite de commande dans le dossier du projet frontend et faire ng serve
	* Se connecter sous le login suivant : jessi/jessi ou s'inscrire
	
Nos contributions :
	* Gestion de login :
		- Connection avec authentification à l'aide de Json Web Tokens (JWT)
		- Possibilité de s'inscrire
	* Gestion des assignements :
		- Nous avons directement la liste des assignements rendus et non rendus en 2 onglets différents
		- A l'aide d'un drag and drop on peut changer l'état de l'assignement pour qu'il devienne rendu ou non rendu
		- Création d'un assignement avec un formulaire stepper (que nous avons pris dans le site suivant : https://material.angular.io/components/stepper/examples) : http://localhost:4200/add
		- Détails d'un assignement avec les attributs rajoutés : http://localhost:4200/assignment/60774b22ee1c20c2a3b91386
		- Modification d'un assignement avec un formulaire stepper
	* Gestion des matières :
		- Création : http://localhost:4200/add-matiere
		- Liste : http://localhost:4200/list-matiere
		- Détails : http://localhost:4200/matiere/60774351566fdf1dd6d6dec3
		- Suppression
	* Gestion des profs :
		- Création : http://localhost:4200/add-prof
		- Liste : http://localhost:4200/list-prof
		- Détails : http://localhost:4200/prof/6077352e566fdf1dd6d6dec1
		- Suppression 
