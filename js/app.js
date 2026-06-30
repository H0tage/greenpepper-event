/*
  Sélectionne tous les boutons d’onglet :
  - Donation goals
  - Planning
*/
const tabs = document.querySelectorAll(".tab");

/*
  Sélectionne toutes les sections de contenu :
  - section#donation-goals
  - section#planning
*/
const contents = document.querySelectorAll(".content");

/*
  Pour chaque onglet, on ajoute un écouteur de clic.
  Quand l’utilisateur clique sur un onglet :
  1. on récupère la section cible via data-target ;
  2. on désactive tous les onglets ;
  3. on masque tous les contenus ;
  4. on active l’onglet cliqué ;
  5. on affiche la section correspondante.
*/
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    /*
      Exemple :
      Si le bouton contient data-target="planning",
      alors target vaut "planning".
    */
    const target = tab.dataset.target;

    /*
      Retire la classe active de tous les boutons.
      Visuellement, plus aucun onglet n’est sélectionné.
    */
    tabs.forEach((item) => {
      item.classList.remove("active");
    });

    /*
      Retire la classe active de toutes les sections.
      Donc toutes les sections sont cachées.
    */
    contents.forEach((content) => {
      content.classList.remove("active");
    });

    /*
      Active visuellement l’onglet sur lequel on vient de cliquer.
    */
    tab.classList.add("active");

    /*
      Affiche la section correspondant à l’onglet cliqué.
      Exemple :
      target = "planning"
      document.getElementById("planning") récupère la section Planning.
    */
    document.getElementById(target).classList.add("active");
  });
});
