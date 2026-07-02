const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");
const scheduleItems = document.querySelectorAll(".schedule-item[data-start][data-end]");

const nowLiveCard = document.getElementById("now-live");
const nowLiveTitle = document.getElementById("now-live-title");
const nowLiveTime = document.getElementById("now-live-time");

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

function updateNowLiveCard(liveItem) {
  if (!nowLiveCard || !nowLiveTitle || !nowLiveTime) {
    return;
  }

  if (!liveItem) {
    nowLiveCard.classList.remove("is-live");
    nowLiveCard.classList.add("is-rest");

    nowLiveTitle.textContent = "Actuellement hors ligne / au repos";
    nowLiveTime.textContent = "Aucune activité en cours";
    return;
  }

  const title = liveItem.querySelector(".schedule-content h3")?.textContent.trim() || "Activité en cours";
  const time = liveItem.querySelector(".schedule-time")?.textContent.trim() || "";

  nowLiveCard.classList.remove("is-rest");
  nowLiveCard.classList.add("is-live");

  nowLiveTitle.textContent = title;
  nowLiveTime.textContent = time;
}

function updateScheduleStatus() {
  const now = new Date();
  let liveItem = null;

  scheduleItems.forEach((item) => {
    const start = new Date(item.dataset.start);
    const end = new Date(item.dataset.end);
    const status = now < start ? "is-future" : now <= end ? "is-live" : "is-past";

    item.classList.remove("is-past", "is-live", "is-future");
    item.classList.add(status);

    if (status === "is-live") {
      liveItem = item;
    }
  });

  updateNowLiveCard(liveItem);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateTab(tab.dataset.target));
});

openTabFromUrl();
updateScheduleStatus();
setInterval(updateScheduleStatus, 60000);
