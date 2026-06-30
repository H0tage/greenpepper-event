const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.target;

    tabs.forEach((item) => {
      item.classList.remove("active");
    });

    contents.forEach((content) => {
      content.classList.remove("active");
    });

    tab.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});
