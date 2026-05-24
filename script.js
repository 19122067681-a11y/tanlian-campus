const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");
const buyButton = document.querySelector("[data-buy]");
const carbonReadout = document.querySelector("[data-carbon]");
const progress = document.querySelector("[data-progress]");
const certificate = document.querySelector("[data-certificate]");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

let carbon = 1280;

buyButton.addEventListener("click", () => {
  carbon += 10;
  carbonReadout.textContent = carbon;
  progress.style.width = `${Math.min(100, Math.round((carbon / 2000) * 100))}%`;
  certificate.classList.add("is-active");
  buyButton.textContent = "已新增 10 碳积分";

  window.setTimeout(() => {
    buyButton.textContent = "上传光盘照片 +10积分";
  }, 1200);
});
