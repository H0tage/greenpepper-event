const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");

const storageKey = "greenpepper-last-tab";

function activateTab(target) {
  const selectedTab = document.querySelector(`.tab[data-target="${target}"]`);
  const selectedContent = document.getElementById(target);

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

  localStorage.setItem(storageKey, target);
}

const savedTab = localStorage.getItem(storageKey);

if (savedTab) {
  activateTab(savedTab);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.target;
    activateTab(target);
  });
});
