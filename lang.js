(function () {
  var translations = {
    live: { en: 'LIVE', km: 'ផ្សាយផ្ទាល់' },
    videos: { en: 'VIDEOS', km: 'វីដេអូ' },
    videosTitle: { en: 'Videos', km: 'វីដេអូ' },
    fight: { en: 'LIST FIGHT', km: 'បញ្ជីប្រគួត' },
    fightTitle: { en: 'List Fight', km: 'បញ្ជីប្រគួត' },
    views: { en: 'views', km: 'ចំនួនមើល' },
    loading: { en: 'Loading…', km: 'កំពុងផ្ទុក…' },
    loadingMore: { en: 'Loading more…', km: 'កំពុងផ្ទុកបន្ថែម…' },
    loadingChannels: { en: 'Loading channels…', km: 'កំពុងផ្ទុកបណ្តាញ…' },
    loadingVideo: { en: 'Loading video…', km: 'កំពុងផ្ទុកវីដេអូ…' },
    totalVotes: { en: 'TOTAL VOTES', km: 'សរុបការបោះឆ្នោត' },
    meron: { en: 'MERON', km: 'ក្រហម' },
    wala: { en: 'WALA', km: 'ខៀវ' },
    today: { en: 'Today', km: 'ថ្ងៃនេះ' },
    noMoreFights: { en: 'No more fights', km: 'គ្មានការប្រកួតទៀតទេ' },
    noFightsToday: { en: 'No fights today', km: 'មិនមានការប្រកួតថ្ងៃនេះទេ' },
    noMoreVideos: { en: 'No more videos', km: 'គ្មានវីដេអូទៀតទេ' },
    noVideosToday: { en: 'No videos today', km: 'មិនមានវីដេអូថ្ងៃនេះទេ' },
    loadFailed: { en: 'Failed to load — retrying on scroll', km: 'ផ្ទុកមិនបានសម្រេច — សូមទាញអេក្រង់ម្ដងទៀត' },
    streamUnavailable: { en: 'Stream unavailable.', km: 'ការផ្សាយផ្ទាល់មិនអាចប្រើបានទេ។' }
  };

  var order = ['km', 'en'];
  var flags = { km: '🇰🇭', en: '🇬🇧' };

  function getLang() {
    var stored = localStorage.getItem('v168_lang');
    return stored === 'en' ? 'en' : 'km';
  }

  function t(key) {
    var lang = getLang();
    var entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry.en || key;
  }

  function applyLang(lang) {
    document.documentElement.setAttribute('lang', lang === 'km' ? 'km' : 'en');
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (translations[key] && translations[key][lang]) {
        el.textContent = translations[key][lang];
      }
    });
    var btn = document.getElementById('langBtn');
    var flagEl = document.getElementById('langFlag');
    if (flagEl) flagEl.textContent = flags[lang];
    if (btn) btn.setAttribute('data-active-lang', lang);
  }

  function setLang(lang) {
    localStorage.setItem('v168_lang', lang);
    applyLang(lang);
  }

  function cycleLang() {
    var current = getLang();
    var idx = order.indexOf(current);
    var next = order[(idx + 1) % order.length];
    setLang(next);
  }

  window.V168Lang = { get: getLang, t: t, set: setLang, apply: applyLang };

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(getLang());

    var btn = document.getElementById('langBtn');
    if (!btn) return;

    btn.addEventListener('click', function () {
      btn.classList.remove('cycling');
      // force reflow so the animation can restart on rapid clicks
      void btn.offsetWidth;
      btn.classList.add('cycling');
      cycleLang();
    });

    btn.addEventListener('animationend', function () {
      btn.classList.remove('cycling');
    });
  });
})();
