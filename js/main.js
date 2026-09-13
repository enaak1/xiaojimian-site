/* ============================================================
   林一舟的个人网站 · 交互脚本
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 深浅色主题 ---------- */
  var themeBtn = document.querySelector('.theme-toggle');
  function syncThemeIcon() {
    if (!themeBtn) return;
    themeBtn.textContent = document.documentElement.dataset.theme === 'dark' ? '☀️' : '🌙';
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) { /* 隐私模式下忽略 */ }
      syncThemeIcon();
    });
  }
  syncThemeIcon();

  /* ---------- 顶部导航：滚动后加描边 ---------- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 移动端菜单（当前导航始终横排，此逻辑保留备用） ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      document.body.classList.remove('menu-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  }

  /* ---------- 滚动入场动画 ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });

    // 兜底：个别环境里 IO 的评估不可靠，用视口检查补一条路，逻辑与 IO 等价
    function checkRevealInViewport() {
      revealEls.forEach(function (el) {
        if (el.classList.contains('is-visible')) return;
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.94 && r.bottom > 0) {
          el.classList.add('is-visible');
          io.unobserve(el);
        }
      });
    }
    setTimeout(checkRevealInViewport, 300);
    window.addEventListener('scroll', checkRevealInViewport, { passive: true });
    window.addEventListener('resize', checkRevealInViewport, { passive: true });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 作品筛选 ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var workCards = document.querySelectorAll('.work-card');
  if (filterBtns.length && workCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var f = btn.dataset.filter;
        workCards.forEach(function (card) {
          var cats = (card.dataset.category || '').split(' ');
          var show = f === 'all' || cats.indexOf(f) !== -1;
          card.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  /* ---------- 页脚年份 ---------- */
  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
