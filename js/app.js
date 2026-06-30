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
  Nom de la clé utilisée dans le localStorage.
  C’est sous ce nom que le navigateur mémorise le dernier onglet ouvert.
*/
const storageKey = "greenpepper-last-tab";

/*
  Active un onglet donné.
  Exemple :
  activateTab("planning")
  affiche l’onglet Planning.
*/
function activateTab(target) {
  const selectedTab = document.querySelector(`.tab[data-target="${target}"]`);
  const selectedContent = document.getElementById(target);

  /*
    Sécurité :
    si l’onglet ou la section n’existe pas, on ne fait rien.
  */
  if (!selectedTab || !selectedContent) {
    return;
  }

  tabs.forEach((item) => {
    item.classList.remove("active");
  });

  contents.forEach((content) => {
    content.classList.remove("active");
  });

  selectedTab.classList.add("active");
  selectedContent.classList.add("active");

  /*
    Mémorise le dernier onglet ouvert dans le navigateur.
  */
  localStorage.setItem(storageKey, target);
}

/*
  Au chargement de la page, on récupère le dernier onglet ouvert.
  Si rien n’est mémorisé, on garde Donation goals par défaut.
*/
const savedTab = localStorage.getItem(storageKey);

if (savedTab) {
  activateTab(savedTab);
}

/*
  Gestion des clics sur les onglets.
*/
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.target;
    activateTab(target);
  });
});
