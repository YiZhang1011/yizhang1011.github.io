// 移动端菜单切换
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// 点击导航链接后关闭移动菜单
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// 滚动时更新导航栏激活状态
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// 平滑滚动到目标区块
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 表单验证和提交
const appointmentForm = document.getElementById('appointmentForm');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 获取表单数据
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            symptoms: document.getElementById('symptoms').value
        };

        // 基本验证
        if (!formData.name || !formData.phone) {
            const message = currentLanguage === 'zh' ? '请填写姓名和联系电话' : 'Please fill in name and phone number';
            showMessage(message, 'error');
            return;
        }

        // 验证电话格式（简单验证）
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(formData.phone)) {
            const message = currentLanguage === 'zh' ? '请输入有效的电话号码' : 'Please enter a valid phone number';
            showMessage(message, 'error');
            return;
        }

        // 验证日期不能是过去的日期（如果提供了日期）
        if (formData.date) {
            const selectedDate = new Date(formData.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                const message = currentLanguage === 'zh' ? '请选择今天或未来的日期' : 'Please select today or a future date';
                showMessage(message, 'error');
                return;
            }
        }

        // 模拟提交成功
        const message = currentLanguage === 'zh' ? '预约提交成功！我们会尽快与您联系确认。' : 'Booking submitted successfully! We will contact you soon to confirm.';
        showMessage(message, 'success');
        appointmentForm.reset();

        // 在实际应用中，这里应该发送数据到服务器
        console.log('预约信息:', formData);
    });
}

// 显示消息提示
function showMessage(message, type) {
    // 创建消息元素
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // 添加样式
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%) translateY(-50px);
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#8ba888' : '#e74c3c'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 500;
        animation: slideDown 0.3s ease forwards;
    `;

    // 添加动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            to {
                transform: translateX(-50%) translateY(0);
            }
        }
        @keyframes slideUp {
            to {
                transform: translateX(-50%) translateY(-50px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // 添加到页面
    document.body.appendChild(messageDiv);

    // 3秒后移除
    setTimeout(() => {
        messageDiv.style.animation = 'slideUp 0.3s ease forwards';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// 设置最小预约日期为今天
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// 页面元素进入视口时添加动画效果
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .benefit-item, .contact-item, .credential-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 添加当前年份到页脚
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.innerHTML = footerText.innerHTML.replace('2024', currentYear);
}

// 防止未来日期超过1年
if (dateInput) {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
}

// 语言切换功能
let currentLanguage = 'zh'; // 默认中文

function toggleLanguage() {
    currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
    updateLanguage();
    
    // 更新切换按钮文字
    const toggleBtn = document.getElementById('languageToggle');
    if (toggleBtn) {
        toggleBtn.textContent = currentLanguage === 'zh' ? 'EN' : '中';
    }
    
    // 保存语言选择到本地存储
    localStorage.setItem('preferredLanguage', currentLanguage);
}

function updateLanguage() {
    const elements = document.querySelectorAll('[data-zh][data-en]');
    
    elements.forEach(element => {
        if (currentLanguage === 'zh') {
            element.textContent = element.getAttribute('data-zh');
        } else {
            element.textContent = element.getAttribute('data-en');
        }
    });
    
    // 处理表单placeholder
    const placeholders = document.querySelectorAll('[data-zh-placeholder][data-en-placeholder]');
    placeholders.forEach(element => {
        if (currentLanguage === 'zh') {
            element.placeholder = element.getAttribute('data-zh-placeholder');
        } else {
            element.placeholder = element.getAttribute('data-en-placeholder');
        }
    });
    
    // 处理select选项
    const selectOptions = document.querySelectorAll('option[data-zh][data-en]');
    selectOptions.forEach(option => {
        if (currentLanguage === 'zh') {
            option.textContent = option.getAttribute('data-zh');
        } else {
            option.textContent = option.getAttribute('data-en');
        }
    });
    
    // 更新页面语言属性
    document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en';
}

// 页面加载时检查保存的语言设置
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    }
    
    // 更新切换按钮文字
    const toggleBtn = document.getElementById('languageToggle');
    if (toggleBtn) {
        toggleBtn.textContent = currentLanguage === 'zh' ? 'EN' : '中';
        
        // 添加点击事件监听器
        toggleBtn.addEventListener('click', () => {
            toggleLanguage();
        });
    }
    
    // 应用语言设置
    updateLanguage();
});
