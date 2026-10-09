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
function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 10);
    if (mobileBook) {
        mobileBook.classList.toggle('show', y > hero.offsetHeight * 0.6);
    }
}

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

// 中英文切换
const pageMeta = {
    zh: {
        title: 'YiClinic 益诊所 - 渥太华中医针灸 | Acupuncture & TCM in Ottawa',
        toggle: 'EN'
    },
    en: {
        title: 'YiClinic - Acupuncture & Traditional Chinese Medicine in Ottawa',
        toggle: '中文'
    }
};

function detectLanguage() {
    const saved = localStorage.getItem('preferredLanguage');
    if (saved === 'zh' || saved === 'en') return saved;
    const browserLangs = navigator.languages || [navigator.language || ''];
    return browserLangs.some(l => l.toLowerCase().startsWith('zh')) ? 'zh' : 'en';
}

let currentLanguage = detectLanguage();

function applyLanguage(lang) {
    document.querySelectorAll('[data-zh][data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = pageMeta[lang].title;
    document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
        btn.textContent = pageMeta[lang].toggle;
    });
}

document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
        currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
        localStorage.setItem('preferredLanguage', currentLanguage);
        applyLanguage(currentLanguage);
    });
});

applyLanguage(currentLanguage);
