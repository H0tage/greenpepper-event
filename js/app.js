const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");

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
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.target;
    activateTab(target);
  });
});

function openTabFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const requestedTab = params.get("tab");

  if (requestedTab) {
    activateTab(requestedTab);
  }
}

function updateScheduleStatus() {
  const now = new Date();
  const scheduleItems = document.querySelectorAll(".schedule-item[data-start][data-end]");

  scheduleItems.forEach((item) => {
    const start = new Date(item.dataset.start);
    const end = new Date(item.dataset.end);

    item.classList.remove("is-past", "is-live", "is-future");

    if (now < start) {
      item.classList.add("is-future");
    } else if (now >= start && now <= end) {
      item.classList.add("is-live");
    } else {
      item.classList.add("is-past");
    }
  });
}

openTabFromUrl();
updateScheduleStatus();

setInterval(updateScheduleStatus, 60000);
