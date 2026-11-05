
// // رقم واتساب بصيغة دولية بدون +
// const WHATSAPP_NUMBER = "201142749045";

// const menuButton = document.querySelector(".menu-toggle");
// const nav = document.querySelector(".nav");

// menuButton?.addEventListener("click", () => {
//   nav.classList.toggle("open");
// });

// nav?.querySelectorAll("a").forEach(link => {
//   link.addEventListener("click", () => nav.classList.remove("open"));
// });

// document.querySelectorAll(".filter").forEach(button => {
//   button.addEventListener("click", () => {
//     document.querySelector(".filter.active")?.classList.remove("active");
//     button.classList.add("active");

//     const selected = button.dataset.filter;

//     document.querySelectorAll(".property").forEach(card => {
//       card.hidden = selected !== "all" &&
//         card.dataset.category !== selected;
//     });
//   });
// });

// document.querySelector(".lead-form")?.addEventListener("submit", event => {
//   event.preventDefault();

//   const data = new FormData(event.currentTarget);

//   const message = `طلب استفسار عقاري
// الاسم: ${data.get("name")}
// الهاتف: ${data.get("phone")}
// نوع الوحدة: ${data.get("interest")}`;

//   window.open(
//     `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
//     "_blank"
//   );
// });
// 1. قاعدة البيانات الديناميكية للموقع
const propertiesData = [
  {
    id: 1,
    title: "شقة بنتهاوس بإطلالة كاملة على البحيرة",
    type: "شقة",
    location: "التجمع الخامس",
    price: 5500000,
    priceText: "5,500,000 ج.م",
    area: "210 م٢",
    payment: "10% مقدم - تسهيلات على 8 سنوات",
    desc: "بنتهاوس فاخر في قلب التجمع الخامس بتشطيب ألترامودرن، يتكون من 3 غرف نوم، 3 حمامات، وروف خاص بحمام سباحة صغير إضافي. يقع بالقرب من التسعين والجامعة الأمريكية.",
    images: [
      "https://unsplash.com",
      "https://unsplash.com"
    ]
  },
  {
    id: 2,
    title: "فيلا مستقلة صف أول بجوار الجولف الرئيسي",
    type: "فيلا",
    location: "الشيخ زايد",
    price: 12000000,
    priceText: "12,000,000 ج.م",
    area: "450 م٢",
    payment: "5% مقدم - قسط يصل إلى 7 سنوات",
    desc: "فيلا ممتازة بتصميم معماري فريد، حديقة خاصة واسعة تتسع لـ 3 سيارات، مسبح أوليمبي خاص بها، غرف خدم مجهزة بالكامل، أمن وحراسة ونظام كاميرات مراقبة 24 ساعة.",
    images: [
      "https://unsplash.com",
      "https://unsplash.com"
    ]
  },
  {
    id: 3,
    title: "تاون هاوس في كمبوند ذكي متكامل الخدمات",
    type: "تاون هاوس",
    location: "العاصمة الإدارية",
    price: 7800000,
    priceText: "7,800,000 ج.م",
    area: "280 م٢",
    payment: "بدون مقدم - أقساط متساوية على 10 سنوات",
    desc: "تاون هاوس كورنر مميز يقع في أرقى أحياء العاصمة الإدارية الجديدة، يعمل بالكامل بالطاقة الشمسية والأنظمة الذكية للتحكم في الإضاءة والتكييف، قريب من النهر الأخضر.",
    images: [
      "https://unsplash.com",
      "https://unsplash.com"
    ]
  }
];

// رقم واتساب الخاص بك بعد إضافة مفتاح الدولة الصحيح
const WHATSAPP_NUMBER = "201142749045";
let activeProperty = null;

// 2. بناء وعرض الكروت عند فتح الصفحة مباشرة
document.addEventListener("DOMContentLoaded", () => {
  renderCards(propertiesData);
});

function renderCards(data) {
  const grid = document.getElementById("propertiesGrid");
  grid.innerHTML = "";

  if (data.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 40px; font-weight: bold;">عذراً، لا توجد عقارات تطابق خيارات البحث الحالية.</p>`;
    return;
  }

  data.forEach(item => {
    grid.innerHTML += `
            <div class="card" onclick="openModal(${item.id})">
                <div class="card-img" style="background-image: url('${item.images[0]}')">
                    <span class="badge">${item.type}</span>
                </div>
                <div class="card-body">
                    <div class="card-price">${item.priceText}</div>
                    <div class="card-title">${item.title}</div>
                    <div class="card-location">📍 ${item.location} - ${item.area}</div>
                    <div class="card-features">
                        <span>🛏️ غرف نوم متعددة</span>
                        <span>🔑 جاهز للمعاينة</span>
                    </div>
                </div>
            </div>
        `;
  });
}

// 3. نظام البحث والفلترة المباشر المتطور
function filterProperties() {
  const locValue = document.getElementById("searchLocation").value;
  const typeValue = document.getElementById("searchType").value;
  const priceValue = parseFloat(document.getElementById("searchPrice").value) || Infinity;

  const filtered = propertiesData.filter(item => {
    const matchLocation = (locValue === "all" || item.location === locValue);
    const matchType = (typeValue === "all" || item.type === typeValue);
    const matchPrice = (item.price <= priceValue);

    return matchLocation && matchType && matchPrice;
  });

  renderCards(filtered);
}

// 4. فتح وإغلاق النافذة المنبثقة للتفاصيل (Modal)
function openModal(id) {
  const item = propertiesData.find(p => p.id === id);
  if (!item) return;

  activeProperty = item;

  document.getElementById("modalTitle").innerText = item.title;
  document.getElementById("modalPrice").innerText = item.priceText;
  document.getElementById("modalDescription").innerText = item.desc;
  document.getElementById("modalArea").innerText = item.area;
  document.getElementById("modalLocation").innerText = item.location;
  document.getElementById("modalPayment").innerText = item.payment;
  document.getElementById("modalType").innerText = item.type;

  // تعبئة صور المعرض الخاص بالعقار
  const slider = document.getElementById("modalSlider");
  slider.innerHTML = "";
  item.images.forEach(imgUrl => {
    slider.innerHTML += `<img src="${imgUrl}" alt="صورة المعاينة الفنية">`;
  });

  document.getElementById("propertyModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("propertyModal").style.display = "none";
  activeProperty = null;
}

// إغلاق المودال عند الضغط في المساحة الخارجية الفارغة
window.onclick = function (event) {
  const modal = document.getElementById("propertyModal");
  if (event.target === modal) {
    closeModal();
  }
}

// 5. التحقق من صحة البيانات والتحويل الفوري لواتساب
function sendToWhatsapp() {
  const name = document.getElementById("clientName").value.trim();
  const phone = document.getElementById("clientPhone").value.trim();

  // التحقق من الحقول الفارغة لضمان الجدية ومنع الأخطاء البرمجية
  if (!name || !phone) {
    alert("من فضلك، اكتب اسمك ورقم هاتفك لنتمكن من جدولة طلبك.");
    return;
  }

  if (!activeProperty) {
    alert("عذراً، حدث خطأ غير متوقع. يرجى إعادة اختيار الوحدة.");
    return;
  }

  // بناء رسالة منظمة وواضحة جداً تصل لهاتفك مباشرة
  const message = `السلام عليكم ورحمة الله وبركاته،

أريد الاستفسار عن تفاصيل العقار التالي وحجز موعد للمعاينة:

📌 *تفاصيل العقار المطلوبة:*
• *العقار:* ${activeProperty.title}
• *النوع:* ${activeProperty.type}
• *الموقع:* ${activeProperty.location}
• *المساحة:* ${activeProperty.area}
• *السعر:* ${activeProperty.priceText}
• *نظام السداد المعروض:* ${activeProperty.payment}

---
👤 *بيانات العميل المهتم:*
• *الاسم:* ${name}
• *رقم الهاتف:* ${phone}

يرجى التواصل معي لتأكيد الموعد المتاح للمعاينة.`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me{WHATSAPP_NUMBER}?text=${encodedMessage}`;

  // فتح المحادثة المباشرة في صفحة جديدة
  window.open(whatsappUrl, "_blank");
}
