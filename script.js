document.documentElement.classList.add('js');

const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const menuToggle = document.getElementById('mobileMenuToggle');
const mobileBook = document.querySelector('.mobile-book');
const hero = document.getElementById('home');

// 移动端菜单
function setMenu(open) {
    navMenu.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
}

menuToggle.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') setMenu(false);
});

// 导航栏阴影 & 移动端预约按钮
const bookingAreas = new Set();

function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 10);
    if (mobileBook) {
        mobileBook.classList.toggle('show', y > hero.offsetHeight * 0.6 && bookingAreas.size === 0);
    }
}

const bookingAreaObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) bookingAreas.add(entry.target);
        else bookingAreas.delete(entry.target);
    });
    onScroll();
});

document.querySelectorAll('#locations, .footer').forEach(el => bookingAreaObserver.observe(el));

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// 当前区块高亮
const navLinks = [...document.querySelectorAll('.nav-link')];
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
    });
}, { rootMargin: '-45% 0px -50% 0px' });

document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));

// 进入视口动画
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
    const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
    const index = siblings.indexOf(el);
    el.style.transitionDelay = `${Math.min(index, 5) * 80}ms`;
    revealObserver.observe(el);
});

// 页脚年份
document.getElementById('year').textContent = new Date().getFullYear();

// 中英文：英文在 /，中文在 /zh/。
// 首次访问时按浏览器语言跳到对应页面；用户点过切换按钮后，记住其选择，不再自动跳转。
// 搜索引擎爬虫不跳转，保证两种语言的页面都能被收录。
(function () {
    const KEY = 'preferredLanguage';
    const pageLang = document.documentElement.lang.startsWith('zh') ? 'zh' : 'en';
    const switchLink = document.querySelector('[data-lang-switch]');
    if (!switchLink) return;

    switchLink.addEventListener('click', () => {
        try { localStorage.setItem(KEY, switchLink.dataset.langSwitch); } catch (e) {}
    });

    const isBot = /bot|crawl|spider|slurp|bing|google|baidu|yandex|duckduck|facebookexternalhit|preview/i.test(navigator.userAgent);
    if (isBot) return;

    let wanted = null;
    try { wanted = localStorage.getItem(KEY); } catch (e) {}
    if (wanted !== 'zh' && wanted !== 'en') {
        const langs = navigator.languages || [navigator.language || ''];
        wanted = langs.some(l => l.toLowerCase().startsWith('zh')) ? 'zh' : 'en';
    }
    if (wanted !== pageLang) {
        location.replace(switchLink.href + location.hash);
    }
})();
