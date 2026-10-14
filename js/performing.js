/* ---------- لیست ویدیوها ---------- */
const VIDEOS = [
  {
    src: "https://www.aparat.com/video/video/embed/videohash/inn59g5/vt/frame",
    title: "دعوت گل سرخ به دیدن تاتر راز شازده کوچولو",
    caption: `گل سرخ: این حبابم بذار کنار… دیگه نمی خوامش…
شازده کوچولو: اما باد…
گل سرخ: اونقدام سرمایی نیستم… هوای تازه شب سرحالم می کنه… خدا نکرده گُلم آخه…
شازده کوچولو: اما جونورا…
گل سرخ: باید دو سه تا کرم ابریشمو تحمل کنم اگه بخوام با پروانه ها دوست بشم… پروانه باید خیلی قشنگ باشه… جز اون کی به دیدنم میاد؟ وقتی تو اونقدر دوری… از ببرا و حیوونای بزرگم نمی ترسم… منم برای خودم، چنگ و پنجه ای دارم…

نورا حنیفه زاده، نقش گل سرخ رو در تاتر “راز شازده کوچولو” بازی می کنه. گل سرخ که با غرور، شازده کوچولو رو رنجوند و از خودش دور کرد، حالا تنها و در انتظار پروانه هاست تا شاید بتونه باهاشون دوست بشه…`,
  },
  {
    src: "https://www.aparat.com/video/video/embed/videohash/sxo05m2/vt/frame",
    title: "پادشاه دعوت می‌کند به دیدن تاتر راز شازده کوچولو",
    caption: `شازده کوچولو: آخه اینجا کسی نیست که محاکمه بشه…
پادشاه: از کجا معلوم؟!… ما هنوز گشتی دور قلمرومون نزدیم…خیلی پیر شدیم و برای کالسکه جا نداریم و پیاده روی هم خسته مون می کنه…
شازده کوچولو: من خوب نگاه کردم… اون طرفم کسی نیست…
پادشاه: خب… پس خودتو محاکمه کن… این سخت ترین کاره… محاکمه کردن خود، از محاکمه کردن دیگران خیلی سخت تره…
اگه تونستی در مورد خودت قضاوت درستی بکنی معلوم میشه یه فرزانه تمام و کمالی…`,
  },
  {
    src: "https://www.aparat.com/video/video/embed/videohash/vrculhl/vt/frame",
    title: "دعوت خودپسند به دیدن تاتر راز شازده کوچولو",
    caption: `خودپسند: دست بزن… دستاتو بزن بهم… تو راستی راستی منو ستایش و تحسین می کنی؟
شازده کوچولو: ستایش و تحسین یعنی چی؟
خودپسند: یعنی قبول این که من زیباترین… شیک پوش ترین… پولدارترین و باهوش ترین مرد این اخترکم!
شازده کوچولو: آخه شما که رو این اخترک تنهایید!
خودپسند: باشه به هرحال تو دلخوشم کن و ازم تعریف کن…`,
  },
  {
    src: "https://www.aparat.com/video/video/embed/videohash/bbhf57c/vt/frame",
    title: "دعوت تجارت پیشه به دیدن تاتر راز شازده کوچولو",
    caption: `شازده کوچولو: چطوری میشه مالک یه ستاره شد؟
تجارت پیشه: این ستاره ها مال کی ان؟
شازده کوچولو: چه می دونم!… مال هیچکس…
تجارت پیشه: پس مال منن. چون که من اول به این فکر افتادم که مالکشون بشم…
شازده کوچولو: همین کافیه؟
تجارت پیشه: البته که کافیه… اگه تو یه الماس پیدا کنی که مال هیچکس نباشه، میشه مال تو
اگه جزیرهای کشف کنی که مال هیچکس نباشه، میشه مال تو
اگه ایده ای داشته باشی که تا اون موقع به ذهن هیچ کس نرسیده، به اسم خودت ثبتش میکنی و میشه مال تو
منم مالک ستاره هام چون پیش از من هیچ کس به این فکر نیفتاده بود که مالکشون بشه`,
  },
  {
    src: "https://www.aparat.com/video/video/embed/videohash/hutaf3r/vt/frame",
    title: "دعوت جغرافی دان به دیدن تاتر راز شازده کوچولو",
    caption: `جغرافی دان: جغرافی دان دانشمندیه که جای دریاها و رودخانه ها و شهرها و کوه ها و بیابان ها را می دونه…
شازده کوچولو: جالبه… این یه کار درست و حسابیه… اخترکتون خیلی قشنگه… اقیانوس هم داره؟
جغرافی دان: از کجا بدونم؟
شازده کوچولو: شهر… رودخونه… بیابون…
جغرافی دان: از اینام خبر ندارم.
شازده کوچولو: مگه شما جغرافی دان نیستین؟
جغرافی دان: درسته… ولی کاشف که نیستم… من حتی یه کاشفَم ندارم… جستن و شمردن شهرا و رودخونه ها و کوه ها و دریا ها و اقیانوسا و بیابونا کار جغرافی دان نیست …کار جغرافی دان مهم تر از این گشت و گذاراست… اصلا پاشو از اتاق کارش بیرون نمی ذاره… کاشفا رو اونجا می پذیره…`,
  },
  {
    src: "https://www.aparat.com/video/video/embed/videohash/cac4ul7/vt/frame",
    title: "دعوت مار به دیدن تاتر راز شازده کوچولو",
    caption: `شازده کوچولو: تو چه موجود عجیبی هستی… مث یه انگشت باریکی
مار: عوضش از انگشت هر پادشاهی قدرتمندترم…
شازده کوچولو: به نظر نمیاد…
مار: می تونم به چنان جای دوری ببرمت که هیچ کشتیای نتونه ببردت…
هرکسی رو لمس کنم، به خاکی که ازش اومده برش میگردونم… اما… تو پاکی و از یه ستارهی دیگه اومدی… تو رو این زمین اینقدر ضعیفی که دلم برات میسوزه… اگر روزی دلتنگ اخترکت شدی… من کمکت میکنم… من میتونم…`,
  },
  {
    src: "https://www.aparat.com/video/video/embed/videohash/ehd92jl/vt/frame",
    title: "دعوت گل کوچک به دیدن تاتر راز شازده کوچولو",
    caption: `شازده کوچولو: آدما کجان؟
گل کوچک: آدما؟ گمون کنم شیش هفتایی ازشون باشه…
خیلی وقت پیش دیدمشون… فکر نکنم بشه پیداشون کرد… باد اینور و اونور میبردشون…
شازده کوچولو: باد؟!
گل کوچک: آره… نه که ریشه ندارن… همین حسابی باعث دردسرشون شده…`,
  },
  {
    src: "https://www.aparat.com/video/video/embed/videohash/xhi3jrd/vt/frame",
    title: "دعوت روباه به دیدن تاتر راز شازده کوچولو",
    caption: `شازده کوچولو: اهلی کردن یعنی چی؟

روباه: یه چیزیه که کاملا فراموش شده… یعنی ایجاد علاقه کردن…

شازده کوچولو: ایجاد علاقه کردن؟

روباه: آره… تو الان واسه من یه آدمی، مث صدهزار آدم دیگه… نه من هیچ احتیاجی به تو دارم و نه تو هیچ احتیاجی به من.

منم واسه تو یه روباهم مث صدهزارتا روباه دیگه… اما اگه منو اهلی کنی… اونوقت هردوتامون محتاج هم می شیم… میون همه ی عالم، تو برای من بی همتا میشی و من برای تو…`,
  },
  {
    src: "https://www.aparat.com/video/video/embed/videohash/gobd77s/vt/frame",
    title: "دعوت سوزنبان به دیدن تاتر راز شازده کوچولو",
    caption: `شازده کوچولو: تو اینجا چی کار می کنی؟
سوزنبان: مسافرا رو به دسته های هزارتایی تقسیم می کنم و قطارایی که می بردشون رو گاهی به راس می فرستم و گاهی به چپ
شازده کوچولو: عجب عجله ای دارن… پی چی می رن؟
سوزنبان: از خود آتیشکار لوکومتیوم بپرسی نمی دونه…
شازده کوچولو: نرفته برگشتن که…
سوزنبان: اینا اولیا نیستن… اونا رفتن، اینا برمی گردن…
شازده کوچولو: جایی که بودنو خوش نداشتن؟
سوزنبان: آدمیزاد هیچوقت جایی که هستو خوش نداره…`,
  },
];

/* ---------- پنجره‌ی نقطه‌های لغزنده ---------- */
function createDotWindow(frame, count, onSelect) {
  const DOT = 18; /* مثل .dots-dot در CSS */
  const VISIBLE = 7;
  const size = Math.min(VISIBLE, count);

  frame.style.width = size * DOT + "px";

  const track = document.createElement("div");
  track.className = "dots-track";

  const dots = [];
  for (let i = 0; i < count; i++) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dots-dot";
    dot.setAttribute("aria-label", "ویدیو " + (i + 1));
    dot.addEventListener("click", () => onSelect(i));
    track.appendChild(dot);
    dots.push(dot);
  }
  frame.appendChild(track);

  return function update(index) {
    const shift = Math.max(
      0,
      Math.min(index - Math.floor(size / 2), count - size),
    );
    track.style.transform = "translateX(" + -shift * DOT + "px)";

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
      dot.classList.toggle("near", Math.abs(i - index) === 1);
    });
  };
}

/* ---------- اسلایدر ویدیو ---------- */
const frameEl = document.getElementById("performingVideoFrame");
const infoEl = document.getElementById("performingVideoInfo");
const titleEl = document.getElementById("performingVideoTitle");
const captionEl = document.getElementById("performingVideoCaption");
const prevBtn = document.getElementById("performingVideoPrev");
const nextBtn = document.getElementById("performingVideoNext");

let current = 0;
let token = 0;

const updateDots = createDotWindow(
  document.getElementById("performingVideoDots"),
  VIDEOS.length,
  (index) => showVideo(index),
);

function showVideo(index) {
  current = (index + VIDEOS.length) % VIDEOS.length;
  const video = VIDEOS[current];
  const myToken = ++token;

  updateDots(current);
  frameEl.src = video.src;

  /* عنوان و کپشن: اول محو می‌شه، بعد متن عوض می‌شه، بعد ظاهر می‌شه */
  infoEl.classList.add("fade-out");
  setTimeout(() => {
    if (myToken !== token) return; /* فقط آخرین کلیک */
    titleEl.textContent = video.title;
    captionEl.textContent = video.caption;
    infoEl.classList.remove("fade-out");
  }, 250);
}

prevBtn.addEventListener("click", () => showVideo(current - 1));
nextBtn.addEventListener("click", () => showVideo(current + 1));

/* ویدیوی اول، بدون محو شدن */
frameEl.src = VIDEOS[0].src;
titleEl.textContent = VIDEOS[0].title;
captionEl.textContent = VIDEOS[0].caption;
updateDots(0);
