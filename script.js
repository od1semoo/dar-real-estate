
// رقم واتساب بصيغة دولية بدون +
const WHATSAPP_NUMBER = "201142749045";

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuButton?.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active")?.classList.remove("active");
    button.classList.add("active");

    const selected = button.dataset.filter;

    document.querySelectorAll(".property").forEach(card => {
      card.hidden = selected !== "all" &&
        card.dataset.category !== selected;
    });
  });
});

document.querySelector(".lead-form")?.addEventListener("submit", event => {
  event.preventDefault();

  const data = new FormData(event.currentTarget);

  const message = `طلب استفسار عقاري
الاسم: ${data.get("name")}
الهاتف: ${data.get("phone")}
نوع الوحدة: ${data.get("interest")}`;

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
});
