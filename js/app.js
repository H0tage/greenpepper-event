const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");
const scheduleItems = document.querySelectorAll(".schedule-item[data-start][data-end]");

function activateTab(target) {
  const selectedTab = document.querySelector('.tab[data-target="' + target + '"]');
  const selectedContent = document.getElementById(target);

  if (!selectedTab || !selectedContent) {
    return;
  }

  tabs.forEach((tab) => tab.classList.toggle("active", tab === selectedTab));
  contents.forEach((content) => {
    content.classList.toggle("active", content === selectedContent);
  });
}

function openTabFromUrl() {
  const requestedTab = new URLSearchParams(window.location.search).get("tab");

  if (requestedTab) {
    activateTab(requestedTab);
  }
}

function updateScheduleStatus() {
  const now = new Date();

  scheduleItems.forEach((item) => {
    const start = new Date(item.dataset.start);
    const end = new Date(item.dataset.end);
    const status = now < start ? "is-future" : now <= end ? "is-live" : "is-past";

    item.classList.remove("is-past", "is-live", "is-future");
    item.classList.add(status);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateTab(tab.dataset.target));
});

openTabFromUrl();
updateScheduleStatus();
setInterval(updateScheduleStatus, 60000);
