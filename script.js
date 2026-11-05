// غيّر الرقم إلى رقم واتسابك بصيغة دولية بدون + أو أصفار البداية.
const WHATSAPP_NUMBER = "201142749045";
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton?.addEventListener("click", () => nav.classList.toggle("open"));
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active")?.classList.remove("active");
    button.classList.add("active");
    const selected = button.dataset.filter;
    document.querySelectorAll(".property").forEach(card => {
      card.hidden = selected !== "all" && card.dataset.category !== selected;
    });
  });
});

document.querySelector(".lead-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = `طلب استفسار عقاري%0Aالاسم: ${encodeURIComponent(data.get("name"))}%0Aالهاتف: ${encodeURIComponent(data.get("phone"))}%0Aنوع الوحدة: ${encodeURIComponent(data.get("interest"))}`;
  if (WHATSAPP_NUMBER === "201000000000") {
    event.currentTarget.querySelector(".form-note").textContent = "غيّر رقم واتساب التجريبي داخل script.js قبل استقبال الطلبات.";
    return;
  }
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
});
