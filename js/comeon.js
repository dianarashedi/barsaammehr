function toFa(str) {
  return str.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
}

document.querySelectorAll(".filmography-year").forEach((el) => {
  el.textContent = toFa(el.textContent);
});

const comeonAudio = document.getElementById("comeonAudio");

const playButton = document.getElementById("audioPlay");
const playPauseIcon = document.getElementById("playPauseIcon");

const backButton = document.getElementById("audioBack");
const nextButton = document.getElementById("audioNext");

const replayButton = document.getElementById("audioReplay");
const volumeButton = document.getElementById("audioVolume");

// =========================
// پخش / توقف
// =========================

playButton.addEventListener("click", function () {
  if (comeonAudio.paused) {
    comeonAudio.play();

    playPauseIcon.src = "../images/wrongless/pause.webp";

    playPauseIcon.alt = "مکث";
  } else {
    comeonAudio.pause();

    playPauseIcon.src = "../images/wrongless/play.webp";

    playPauseIcon.alt = "پخش";
  }
});

// =========================
// 10 ثانیه عقب
// =========================

backButton.addEventListener("click", function () {
  comeonAudio.currentTime -= 10;
});

// =========================
// 10 ثانیه جلو
// =========================

nextButton.addEventListener("click", function () {
  comeonAudio.currentTime += 10;
});

// =========================
// پخش از اول
// =========================

replayButton.addEventListener("click", function () {
  comeonAudio.currentTime = 0;

  comeonAudio.play();

  playPauseIcon.src = "../images/wrongless/pause.webp";

  playPauseIcon.alt = "مکث";
});

// =========================
// تغییر میزان صدا
// =========================

const volumeIcon = volumeButton.querySelector("img");

const volumeLevels = [
  {
    volume: 1,
    icon: "../images/wrongless/volume.webp",
    alt: "صدای زیاد",
  },

  {
    volume: 0.5,
    icon: "../images/wrongless/volume-medium.webp",
    alt: "صدای متوسط",
  },

  {
    volume: 0.2,
    icon: "../images/wrongless/volume-low.webp",
    alt: "صدای کم",
  },
];

let currentVolume = 0;

// شروع با صدای زیاد
comeonAudio.volume = volumeLevels[currentVolume].volume;

volumeButton.addEventListener("click", function () {
  currentVolume++;

  if (currentVolume >= volumeLevels.length) {
    currentVolume = 0;
  }

  comeonAudio.volume = volumeLevels[currentVolume].volume;

  volumeIcon.src = volumeLevels[currentVolume].icon;

  volumeIcon.alt = volumeLevels[currentVolume].alt;
});

// =========================
// وقتی صدا تمام شد
// =========================

comeonAudio.addEventListener("ended", function () {
  playPauseIcon.src = "../images/wrongless/play.webp";

  playPauseIcon.alt = "پخش";
});

// =========================
// ویدیوهای آپارات «واقعا نه»
// =========================

// =========================
// تعویض نرم عکس (محو شدن و ظاهر شدن)
// =========================

function changePhoto(img, newSrc) {
  // اگر همین عکس الان نمایش داده می‌شود، کاری نکن
  if (img.getAttribute("src") === newSrc) return;

  // اگر پشت سر هم کلیک شد، فقط آخرین درخواست اجرا شود
  const token = (img._changeToken = (img._changeToken || 0) + 1);

  img.classList.add("fade-out");

  // صبر برای تمام شدن محو شدن (0.25 ثانیه)
  const wait = new Promise(function (resolve) {
    setTimeout(resolve, 250);
  });

  // عکس بعدی را از قبل بارگذاری کن تا ناگهانی نیاید
  const load = new Promise(function (resolve) {
    const preload = new Image();
    preload.onload = function () {
      resolve(true);
    };
    preload.onerror = function () {
      resolve(false);
    };
    preload.src = newSrc;
  });

  Promise.all([wait, load]).then(function (results) {
    if (token !== img._changeToken) return;

    if (results[1]) {
      img.src = newSrc;
    } else {
      // عکس پیدا نشد: عکس قبلی بماند و مسیر اشتباه را بنویس
      console.error("عکس پیدا نشد:", newSrc);
    }

    img.classList.remove("fade-out");
  });
}

// =========================
// نقطه‌های لغزنده (مشترک برای همه‌ی اسلایدرها)
// =========================

const DOT_SIZE = 18; // باید با CSS یکی باشد
const VISIBLE_DOTS = 7; // حداکثر نقطه‌ی دیده‌شده

function createDotWindow(frame, count, onSelect) {
  const track = document.createElement("div");
  track.classList.add("dots-track");
  frame.appendChild(track);

  // اگر آیتم‌ها کمتر از ۷ تا بود، قاب به اندازه‌ی خودشان می‌شود
  const visible = Math.min(VISIBLE_DOTS, count);
  frame.style.width = visible * DOT_SIZE + "px";

  const dots = [];

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("button");

    dot.classList.add("dots-dot");
    dot.setAttribute("aria-label", "مورد " + (i + 1));

    dot.addEventListener("click", function () {
      onSelect(i);
    });

    track.appendChild(dot);
    dots.push(dot);
  }

  // این تابع با شماره‌ی آیتم فعال صدا زده می‌شود
  return function update(index) {
    dots.forEach(function (dot, i) {
      const distance = Math.abs(i - index);

      dot.classList.toggle("active", distance === 0);
      dot.classList.toggle("near", distance === 1);
    });

    // نقطه‌ی فعال را وسط قاب بیاور
    const center = Math.floor(visible / 2);
    let shift = index - center;

    // اول و آخر لیست: بیشتر از لبه نلغزد
    shift = Math.max(0, Math.min(shift, count - visible));

    track.style.transform = "translateX(" + -shift * DOT_SIZE + "px)";
  };
}

const videoSlides = document.querySelectorAll(".video-slide");

const updateVideoDots = createDotWindow(
  document.getElementById("videoDotsWindow"),
  videoSlides.length,
  function (i) {
    showVideo(i);
  },
);

const videoPrev = document.getElementById("videoPrev");
const videoNext = document.getElementById("videoNext");

let currentVideo = 0;

// ویدیوهای آپارات
const aparatVideos = [
  // ویدیوی 1
  `
<div id="13438865810"><script type="text/JavaScript" src="https://www.aparat.com/embed/s01310l?data[rnddiv]=13438865810&data[responsive]=yes&muted=true&titleShow=true&recom=self"></script></div>  `,

  // ویدیوی 2
  `
<div id="74884085622"><script type="text/JavaScript" src="https://www.aparat.com/embed/kw9aS?data[rnddiv]=74884085622&data[responsive]=yes&muted=true&titleShow=true&recom=self"></script></div>  `,

  // ویدیوی 3
  `
<div id="39247595852"><script type="text/JavaScript" src="https://www.aparat.com/embed/OZk2p?data[rnddiv]=39247595852&data[responsive]=yes&muted=true&titleShow=true&recom=self"></script></div>  `,

  // ویدیوی 4
  `
<div id="22418590237"><script type="text/JavaScript" src="https://www.aparat.com/embed/q08vduu?data[rnddiv]=22418590237&data[responsive]=yes&muted=true&titleShow=true&recom=self"></script></div>  `,

  // ویدیوی 5
  `
<div id="92952471858"><script type="text/JavaScript" src="https://www.aparat.com/embed/i40pr4y?data[rnddiv]=92952471858&data[responsive]=yes&muted=true&titleShow=true&recom=self"></script></div>  `,
  // ویدیوی 6
  `
<div id="58077822388"><script type="text/JavaScript" src="https://www.aparat.com/embed/o472p27?data[rnddiv]=58077822388&data[responsive]=yes&muted=true&titleShow=true&recom=self"></script></div>  `,
  // ویدیوی 7
  `
<div id="84328325796"><script type="text/JavaScript" src="https://www.aparat.com/embed/j55v93e?data[rnddiv]=84328325796&data[responsive]=yes&muted=true&titleShow=true&recom=self"></script></div>  `,
  // ویدیوی 8
  `
<div id="90410159884"><script type="text/JavaScript" src="https://www.aparat.com/embed/t28lhb1?data[rnddiv]=90410159884&data[responsive]=yes&muted=true&titleShow=true&recom=self"></script></div>  `,
  // ویدیوی 9
  `
<div id="94988044651"><script type="text/JavaScript" src="https://www.aparat.com/embed/5xLZb?data[rnddiv]=94988044651&data[responsive]=yes&muted=true&titleShow=true&recom=self"></script></div>  `,
  // ویدیوی 10
  `
<div id="70529156758"><script type="text/JavaScript" src="https://www.aparat.com/embed/o89s6pc?data[rnddiv]=70529156758&data[responsive]=yes&muted=true&titleShow=true&recom=self"></script></div>  `,
  // ویدیوی 11
  `
<div id="94667114946"><script type="text/JavaScript" src="https://www.aparat.com/embed/j0165f0?data[rnddiv]=94667114946&data[responsive]=yes&muted=true&titleShow=true&recom=self"></script></div>  `,
  // ویدیوی 12
  `
<div id="59053183284"><script type="text/JavaScript" src="https://www.aparat.com/embed/s2760z1?data[rnddiv]=59053183284&data[responsive]=yes&muted=true&titleShow=true&recom=self"></script></div>  `,
  // ویدیوی 13
  `
<div id="13032826922"><script type="text/JavaScript" src="https://www.aparat.com/embed/s93f823?data[rnddiv]=13032826922&data[responsive]=yes&muted=true&titleShow=true&recom=self"></script></div>  `,
  // ویدیوی 14
  `
<div id="48791675604"><script type="text/JavaScript" src="https://www.aparat.com/embed/5VdWB?data[rnddiv]=48791675604&data[responsive]=yes&muted=true&titleShow=true&recom=self"></script></div>  `,
];
// =========================
// ساخت و نمایش ویدیو
// =========================

function loadAparatVideo(index) {
  const container = videoSlides[index].querySelector(".aparat-container");

  if (!container) return;

  // اگر قبلاً ساخته شده، دوباره نساز
  if (container.innerHTML.trim() !== "") {
    return;
  }

  container.innerHTML = aparatVideos[index];

  // اجرای دوباره Script آپارات
  const scripts = container.querySelectorAll("script");

  scripts.forEach((oldScript) => {
    const newScript = document.createElement("script");

    Array.from(oldScript.attributes).forEach((attribute) => {
      newScript.setAttribute(attribute.name, attribute.value);
    });

    newScript.textContent = oldScript.textContent;

    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
}

// =========================
// توقف ویدیوی قبلی
// =========================

function stopAparatVideo(index) {
  const container = videoSlides[index].querySelector(".aparat-container");

  if (!container) return;

  const iframe = container.querySelector("iframe");

  if (iframe) {
    iframe.src = "about:blank";
  }

  container.innerHTML = "";
}

// =========================
// تغییر ویدیو
// =========================

function showVideo(index) {
  // اگر از اول رد شد
  if (index < 0) {
    index = videoSlides.length - 1;
  }

  // اگر از آخر رد شد
  if (index >= videoSlides.length) {
    index = 0;
  }

  // توقف ویدیوی فعلی
  stopAparatVideo(currentVideo);

  // تغییر شماره ویدیو
  currentVideo = index;

  // فعال کردن اسلاید
  videoSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentVideo);
  });

  // فعال کردن نقطه
  updateVideoDots(currentVideo);

  // نمایش ویدیوی جدید
  loadAparatVideo(currentVideo);
}

// =========================
// فلش بعدی
// =========================

videoNext.addEventListener("click", function () {
  showVideo(currentVideo + 1);
});

// =========================
// فلش قبلی
// =========================

videoPrev.addEventListener("click", function () {
  showVideo(currentVideo - 1);
});

// =========================
// کلیک روی نقطه‌ها
// =========================

// (کلیک نقطه‌ها داخل createDotWindow انجام می‌شود)

// =========================
// شروع با ویدیوی اول
// =========================

videoSlides.forEach((slide, index) => {
  slide.classList.toggle("active", index === 0);
});

updateVideoDots(0);

// ویدیوی اول را لود کن
loadAparatVideo(0);
// ==================================================
// اسلایدر عکس‌های پیش‌تولید «واقعا نه»
// ==================================================

const comeonPhoto = document.getElementById("comeonPhoto");

const photoPrev = document.getElementById("photoPrev");

const photoNext = document.getElementById("photoNext");

// =========================
// عکس‌های پیش تولید
// =========================

const comeonPhotos = [
  "../images/comeon/PreProduct1.webp",
  "../images/comeon/PreProduct2.webp",
  "../images/comeon/PreProduct3.webp",
  "../images/comeon/PreProduct4.webp",
  "../images/comeon/PreProduct5.webp",
  "../images/comeon/PreProduct6.webp",
  "../images/comeon/PreProduct7.webp",
  "../images/comeon/PreProduct8.webp",
  "../images/comeon/PreProduct9.webp",
  "../images/comeon/PreProduct10.webp",
  "../images/comeon/PreProduct11.webp",
  "../images/comeon/PreProduct12.webp",
];

const updatePhotoDots = createDotWindow(
  document.getElementById("photoDotsWindow"),
  comeonPhotos.length,
  function (i) {
    showPhoto(i);
  },
);

let currentPhoto = 0;

// =========================
// نمایش عکس
// =========================

function showPhoto(index) {
  // اگر از اول رد شد
  if (index < 0) {
    index = comeonPhotos.length - 1;
  }

  // اگر از آخر رد شد
  if (index >= comeonPhotos.length) {
    index = 0;
  }

  currentPhoto = index;

  changePhoto(comeonPhoto, comeonPhotos[currentPhoto]);

  // هر عکس = یک نقطه
  updatePhotoDots(currentPhoto);
}

// =========================
// عکس بعدی
// =========================

photoNext.addEventListener("click", function () {
  showPhoto(currentPhoto + 1);
});

// =========================
// عکس قبلی
// =========================

photoPrev.addEventListener("click", function () {
  showPhoto(currentPhoto - 1);
});

// =========================
// کلیک روی نقطه‌ها
// =========================

// (کلیک نقطه‌ها داخل createDotWindow انجام می‌شود)

// =========================
// شروع عکس‌ها
// =========================

showPhoto(0);

// ==================================================
// اسلایدر عکس‌های در حال تولید «واقعا نه»
// ==================================================

const PRODUCTION_PHOTO_COUNT = 30; // ← تعداد عکس‌هایت را اینجا بگذار

const productionPhoto = document.getElementById("ComeonProductionPhoto");
const productionPrev = document.getElementById("productionPhotoPrev");
const productionNext = document.getElementById("productionPhotoNext");
const productionDotsBox = document.getElementById("productionPhotoDots");

// ساخت لیست عکس‌ها
const productionPhotos = [];

for (let i = 1; i <= PRODUCTION_PHOTO_COUNT; i++) {
  productionPhotos.push(`../images/comeon/Production${i}.webp`);
}

let productionPhotoIndex = 0;

// ساخت نقطه‌ها (به تعداد عکس‌ها)
const updateProductionDots = createDotWindow(
  productionDotsBox,
  productionPhotos.length,
  function (i) {
    showProductionPhoto(i);
  },
);

// عکس بعدی را از قبل لود کن تا کلیک بعدی سریع باشد
function preloadProductionPhoto(index) {
  const next = (index + 1) % productionPhotos.length;
  const img = new Image();
  img.src = productionPhotos[next];
}

// نمایش عکس
function showProductionPhoto(index) {
  if (index < 0) {
    index = productionPhotos.length - 1;
  }

  if (index >= productionPhotos.length) {
    index = 0;
  }

  productionPhotoIndex = index;

  // محو شدن، تعویض عکس، ظاهر شدن
  changePhoto(productionPhoto, productionPhotos[productionPhotoIndex]);

  updateProductionDots(productionPhotoIndex);

  preloadProductionPhoto(productionPhotoIndex);
}

// دکمه‌ها
productionNext.addEventListener("click", function () {
  showProductionPhoto(productionPhotoIndex + 1);
});

productionPrev.addEventListener("click", function () {
  showProductionPhoto(productionPhotoIndex - 1);
});

// شروع
showProductionPhoto(0);

// =========================
// برگشت نرم به بالای صفحه
// =========================

const backToTop = document.getElementById("backToTop");

backToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
