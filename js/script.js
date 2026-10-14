function toFa(str) {
  return str.replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
}

document.querySelectorAll(".filmography-year").forEach(el => {
  el.textContent = toFa(el.textContent);
});

const audio = document.getElementById("wronglessAudio");

const playButton = document.getElementById("audioPlay");
const playPauseIcon = document.getElementById("playPauseIcon");

const backButton = document.getElementById("audioBack");
const nextButton = document.getElementById("audioNext");

const replayButton = document.getElementById("audioReplay");
const volumeButton = document.getElementById("audioVolume");

// pause , play (switch)
playButton.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();

    playPauseIcon.src = "../images/wrongless/pause.webp";
    playPauseIcon.alt = "مکث";
  } else {
    audio.pause();

    playPauseIcon.src = "../images/wrongless/play.webp";
    playPauseIcon.alt = "پخش";
  }
});

//10 ثانیه عقب
backButton.addEventListener("click", function () {
  audio.currentTime -= 10;
});

//10 ثانیه جلو
nextButton.addEventListener("click", function () {
  audio.currentTime += 10;
});

// ازاول
replayButton.addEventListener("click", function () {
  audio.currentTime = 0;
  audio.play();

  playPauseIcon.src = "../images/wrongless/pause.webp";
  playPauseIcon.alt = "مکث";
});

// تغییر میزان صدا //

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
audio.volume = volumeLevels[currentVolume].volume;

volumeButton.addEventListener("click", function () {
  // رفتن به سطح بعدی
  currentVolume++;

  // اگر به آخر رسید، دوباره از اول
  if (currentVolume >= volumeLevels.length) {
    currentVolume = 0;
  }

  // تغییر صدای فایل
  audio.volume = volumeLevels[currentVolume].volume;

  // تغییر آیکون
  volumeIcon.src = volumeLevels[currentVolume].icon;
  volumeIcon.alt = volumeLevels[currentVolume].alt;
});

// بعد از پایان به آیکون play برگرده
audio.addEventListener("ended", function () {
  playPauseIcon.src = "../images/wrongless/play.webp";
  playPauseIcon.alt = "پخش";
});

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
    preload.onload = resolve;
    preload.onerror = resolve;
    preload.src = newSrc;
  });

  Promise.all([wait, load]).then(function () {
    if (token !== img._changeToken) return;

    img.src = newSrc;
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

const videoSection = document.querySelector(".wrongless-videos");

let currentVideo = 0;
let videoSectionVisible = false;

// =========================
// ویدیوهای آپارات
// =========================

const aparatVideos = [
  `
    <div id="52122888730">
        <script
            type="text/JavaScript"
            src="https://www.aparat.com/embed/o31473t?data[rnddiv]=52122888730&data[responsive]=yes&muted=true&titleShow=true">
        </script>
    </div>
    `,

  `
    <div id="18209494579">
        <script
            type="text/JavaScript"
            src="https://www.aparat.com/embed/n93gau3?data[rnddiv]=18209494579&data[responsive]=yes&muted=true&titleShow=true">
        </script>
    </div>
    `,
];

// =========================
// ساخت ویدیو
// =========================

function loadAparatVideo(index) {
  const container = videoSlides[index].querySelector(".aparat-container");

  if (!container) return;

  // اگر قبلاً ساخته شده، دوباره نساز
  if (container.innerHTML.trim() !== "") {
    return;
  }

  container.innerHTML = aparatVideos[index];

  // اجرای دوباره script آپارات
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
// توقف کامل ویدیو
// =========================

function stopAparatVideo(index) {
  const container = videoSlides[index].querySelector(".aparat-container");

  if (!container) return;

  /*
       iframe آپارات را پیدا می‌کنیم
       و قبل از حذف، آن را از DOM خارج می‌کنیم.
    */

  const iframe = container.querySelector("iframe");

  if (iframe) {
    iframe.src = "about:blank";
  }

  // کمی بعد کل embed را حذف می‌کنیم
  setTimeout(() => {
    container.innerHTML = "";
  }, 50);
}

// =========================
// تغییر ویدیو
// =========================

function showVideo(index) {
  if (index < 0) {
    index = videoSlides.length - 1;
  }

  if (index >= videoSlides.length) {
    index = 0;
  }

  // ویدیوی قبلی را کاملاً متوقف کن
  stopAparatVideo(currentVideo);

  currentVideo = index;

  // تغییر اسلاید
  videoSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentVideo);
  });

  // تغییر نقطه
  updateVideoDots(currentVideo);

  // فقط اگر ویدیو در صفحه دیده می‌شود
  // آن را بساز
  if (videoSectionVisible) {
    loadAparatVideo(currentVideo);
  }
}

// =========================
// دکمه بعدی
// =========================

videoNext.addEventListener("click", function () {
  showVideo(currentVideo + 1);
});

// =========================
// دکمه قبلی
// =========================

videoPrev.addEventListener("click", function () {
  showVideo(currentVideo - 1);
});

// =========================
// نقطه‌ها
// =========================

// (کلیک نقطه‌ها داخل createDotWindow انجام می‌شود)

// =========================
// تشخیص حضور ویدیو در صفحه
// =========================

const videoObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // ویدیو وارد صفحه شد
        videoSectionVisible = true;

        // ویدیو را بساز
        loadAparatVideo(currentVideo);
      } else {
        // ویدیو از صفحه خارج شد
        videoSectionVisible = false;

        // ویدیو را متوقف و حذف کن
        stopAparatVideo(currentVideo);
      }
    });
  },

  {
    threshold: 0.5,
  },
);

// شروع Observer
videoObserver.observe(videoSection);

// =========================
// اسلاید اول
// =========================

videoSlides.forEach((slide, index) => {
  slide.classList.toggle("active", index === 0);
});

updateVideoDots(0);

// =========================
// اسلایدر عکس‌های بی‌غلط
// =========================

const wronglessPhoto = document.getElementById("wronglessPhoto");

const photoPrev = document.getElementById("photoPrev");
const photoNext = document.getElementById("photoNext");

// عکس‌ها

const wronglessPhotos = [
  "../images/wrongless/PreProduct1.webp",
  "../images/wrongless/PreProduct2.webp",
  "../images/wrongless/PreProduct3.webp",
  "../images/wrongless/PreProduct4.webp",
  "../images/wrongless/PreProduct5.webp",
  "../images/wrongless/PreProduct6.webp",
  "../images/wrongless/PreProduct7.webp",
  "../images/wrongless/PreProduct8.webp",
  "../images/wrongless/PreProduct9.webp",
  "../images/wrongless/PreProduct10.webp",
  "../images/wrongless/PreProduct11.webp",
  "../images/wrongless/PreProduct12.webp",
  "../images/wrongless/PreProduct13.webp",
  "../images/wrongless/PreProduct14.webp",
  "../images/wrongless/PreProduct15.webp",
  "../images/wrongless/PreProduct16.webp",
  "../images/wrongless/PreProduct17.webp",
  "../images/wrongless/PreProduct18.webp",
  "../images/wrongless/PreProduct19.webp",
  "../images/wrongless/PreProduct20.webp",
];

const updatePhotoDots = createDotWindow(
  document.getElementById("photoDotsWindow"),
  wronglessPhotos.length,
  function (i) {
    showPhoto(i);
  },
);

let currentPhoto = 0;

// =========================
// نمایش عکس
// =========================

function showPhoto(index) {
  if (index < 0) {
    index = wronglessPhotos.length - 1;
  }

  if (index >= wronglessPhotos.length) {
    index = 0;
  }

  currentPhoto = index;

  changePhoto(wronglessPhoto, wronglessPhotos[currentPhoto]);

  // مشخص کردن نقطه فعال (هر عکس = یک نقطه)
  updatePhotoDots(currentPhoto);
}

// =========================
// بعدی
// =========================

photoNext.addEventListener("click", function () {
  showPhoto(currentPhoto + 1);
});

// =========================
// قبلی
// =========================

photoPrev.addEventListener("click", function () {
  showPhoto(currentPhoto - 1);
});

// =========================
// نقطه‌ها
// =========================

// (کلیک نقطه‌ها داخل createDotWindow انجام می‌شود)
updatePhotoDots(0);

const productionPhotos = [];

for (let i = 1; i <= 30; i++) {
  productionPhotos.push(`../images/wrongless/Production${i}.webp`);
}

let productionPhotoIndex = 0;

const productionPhoto = document.getElementById("wronglessProductionPhoto");
const productionPrev = document.getElementById("productionPhotoPrev");
const productionNext = document.getElementById("productionPhotoNext");

const updateProductionDots = createDotWindow(
  document.getElementById("productionDotsWindow"),
  productionPhotos.length,
  function (i) {
    showProductionPhoto(i);
  },
);

function showProductionPhoto(index) {
  productionPhotoIndex = index;

  changePhoto(productionPhoto, productionPhotos[productionPhotoIndex]);

  updateProductionDots(productionPhotoIndex);
}

productionNext.addEventListener("click", () => {
  productionPhotoIndex++;

  if (productionPhotoIndex >= productionPhotos.length) {
    productionPhotoIndex = 0;
  }

  showProductionPhoto(productionPhotoIndex);
});

productionPrev.addEventListener("click", () => {
  productionPhotoIndex--;

  if (productionPhotoIndex < 0) {
    productionPhotoIndex = productionPhotos.length - 1;
  }

  showProductionPhoto(productionPhotoIndex);
});

// (کلیک نقطه‌ها داخل createDotWindow انجام می‌شود)
updateProductionDots(0);

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
