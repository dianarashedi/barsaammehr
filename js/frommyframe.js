function toFa(str) {
  return str.replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
}

document.querySelectorAll(".filmography-year").forEach(el => {
  el.textContent = toFa(el.textContent);
});

const fromMyFrameAudio = document.getElementById("FromMyFrameAudio");

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
  if (fromMyFrameAudio.paused) {
    fromMyFrameAudio.play();

    playPauseIcon.src = "../images/wrongless/pause.webp";
    playPauseIcon.alt = "مکث";
  } else {
    fromMyFrameAudio.pause();

    playPauseIcon.src = "../images/wrongless/play.webp";
    playPauseIcon.alt = "پخش";
  }
});

// =========================
// 10 ثانیه عقب
// =========================

backButton.addEventListener("click", function () {
  fromMyFrameAudio.currentTime -= 10;
});

// =========================
// 10 ثانیه جلو
// =========================

nextButton.addEventListener("click", function () {
  fromMyFrameAudio.currentTime += 10;
});

// =========================
// پخش از اول
// =========================

replayButton.addEventListener("click", function () {
  fromMyFrameAudio.currentTime = 0;

  fromMyFrameAudio.play();

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
fromMyFrameAudio.volume = volumeLevels[currentVolume].volume;

volumeButton.addEventListener("click", function () {
  currentVolume++;

  if (currentVolume >= volumeLevels.length) {
    currentVolume = 0;
  }

  fromMyFrameAudio.volume = volumeLevels[currentVolume].volume;

  volumeIcon.src = volumeLevels[currentVolume].icon;
  volumeIcon.alt = volumeLevels[currentVolume].alt;
});

// =========================
// وقتی صدا تمام شد
// =========================

fromMyFrameAudio.addEventListener("ended", function () {
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
// نقطه‌های لغزنده (مشترک)
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
    dot.setAttribute("aria-label", "عکس " + (i + 1));

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

// =========================
// ساخت یک اسلایدر عکس کامل
// =========================

function createPhotoSlider(options) {
  const photo = document.getElementById(options.photoId);
  const prev = document.getElementById(options.prevId);
  const next = document.getElementById(options.nextId);
  const dotsFrame = document.getElementById(options.dotsId);

  // لیست عکس‌ها: folder/name0.webp تا folder/name{lastPhoto}.webp
  const photos = [];

  for (let i = 0; i <= options.lastPhoto; i++) {
    photos.push(`${options.folder}/${options.name}${i}.webp`);
  }

  let index = 0;

  const updateDots = createDotWindow(dotsFrame, photos.length, function (i) {
    index = i;
    show();
  });

  function show() {
    changePhoto(photo, photos[index]);
    updateDots(index);
  }

  prev.addEventListener("click", function () {
    index--;

    if (index < 0) {
      index = photos.length - 1;
    }

    show();
  });

  next.addEventListener("click", function () {
    index++;

    if (index >= photos.length) {
      index = 0;
    }

    show();
  });

  show();
}

// =========================
// اسلایدر ۱: فرهنگسرای نیاوران
// عکس‌ها: shooting0.webp تا shooting30.webp (۳۱ عکس)
// =========================

createPhotoSlider({
  photoId: "fromMyFramePhoto",
  prevId: "fromMyFramePhotoPrev",
  nextId: "fromMyFramePhotoNext",
  dotsId: "fromMyFramePhotoDots",
  folder: "../images/frommyframe/Niavaran",
  name: "shooting",
  lastPhoto: 30,
});

// =========================
// اسلایدر ۲: خانه‌ی اردیبهشت عودلاجان
// عکس‌ها: shooting0.webp تا shooting20.webp (۲۱ عکس)
// =========================

createPhotoSlider({
  photoId: "odlajanPhoto",
  prevId: "odlajanPhotoPrev",
  nextId: "odlajanPhotoNext",
  dotsId: "odlajanPhotoDots",
  folder: "../images/frommyframe/Odlajan",
  name: "shooting",
  lastPhoto: 20,
});

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
