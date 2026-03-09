/**
 * 汉明科技官网 - 交互脚本
 * 突出解决方案与服务支持
 */

// ===================================
// 导航栏滚动效果
// ===================================
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ===================================
// Hero 轮播图
// ===================================
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (dots[i]) dots[i].classList.remove('active');
  });
  
  if (index >= slides.length) currentSlideIndex = 0;
  else if (index < 0) currentSlideIndex = slides.length - 1;
  else currentSlideIndex = index;
  
  slides[currentSlideIndex].classList.add('active');
  if (dots[currentSlideIndex]) dots[currentSlideIndex].classList.add('active');
}

function moveSlide(direction) {
  showSlide(currentSlideIndex + direction);
}

// 自动轮播（5 秒）
if (slides.length > 0) {
  setInterval(() => {
    moveSlide(1);
  }, 5000);
}

// 轮播点点击事件
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const slideIndex = parseInt(dot.getAttribute('data-slide'));
    showSlide(slideIndex);
  });
});

// ===================================
// 滚动动画（Reveal）
// ===================================
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  reveals.forEach(el => revealObserver.observe(el));
}

// ===================================
// 数字滚动动画
// ===================================
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const text = counter.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const hasH = text.includes('h');
        
        let target = parseInt(text.replace(/[^0-9]/g, ''));
        if (isNaN(target)) return;
        
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
          current += step;
          if (current < target) {
            let display = Math.floor(current);
            if (hasPlus) display += '+';
            if (hasPercent) display += '%';
            if (hasH) display = current.toFixed(1) + 'h';
            counter.textContent = display;
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = text;
          }
        };
        
        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => counterObserver.observe(counter));
}

// ===================================
// 平滑滚动到锚点
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ===================================
// 返回顶部
// ===================================
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===================================
// 表单提交
// ===================================
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 简单验证
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = '#e94560';
      } else {
        field.style.borderColor = 'rgba(0,85,204,0.12)';
      }
    });
    
    if (isValid) {
      alert('提交成功！我们会尽快与您联系。');
      form.reset();
    } else {
      alert('请填写必填项。');
    }
  });
});

// ===================================
// 移动端菜单（简化版）
// ===================================
function initMobileMenu() {
  if (window.innerWidth <= 768) {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu && !document.querySelector('.mobile-toggle')) {
      const toggle = document.createElement('button');
      toggle.className = 'mobile-toggle';
      toggle.innerHTML = '☰';
      toggle.style.cssText = 'display:block; position:fixed; top:15px; right:20px; z-index:1001; background:var(--accent); color:white; border:none; border-radius:4px; padding:8px 12px; font-size:20px; cursor:pointer;';
      
      toggle.addEventListener('click', () => {
        if (navMenu.style.display === 'block') {
          navMenu.style.display = 'none';
        } else {
          navMenu.style.display = 'block';
          navMenu.style.position = 'fixed';
          navMenu.style.top = '70px';
          navMenu.style.left = '0';
          navMenu.style.right = '0';
          navMenu.style.background = 'white';
          navMenu.style.padding = '20px';
          navMenu.style.flexDirection = 'column';
          navMenu.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        }
      });
      
      document.body.appendChild(toggle);
      
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
          navMenu.style.display = 'flex';
          navMenu.style.position = 'static';
          navMenu.style.flexDirection = 'row';
          navMenu.style.padding = '0';
          navMenu.style.boxShadow = 'none';
          toggle.style.display = 'none';
        } else {
          navMenu.style.display = 'none';
          toggle.style.display = 'block';
        }
      });
    }
  }
}

// ===================================
// 新闻分类筛选
// ===================================
function initNewsCategoryFilter() {
  const categoryButtons = document.querySelectorAll('.news-category');
  const newsCards = document.querySelectorAll('.news-card');
  
  if (categoryButtons.length > 0) {
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        // 移除所有分类按钮的 active 类
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        // 为当前点击的按钮添加 active 类
        button.classList.add('active');
        
        const selectedCategory = button.textContent;
        
        newsCards.forEach(card => {
          const cardCategory = card.querySelector('.news-category-tag').textContent;
          
          if (selectedCategory === '全部' || cardCategory === selectedCategory) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
}

// ===================================
// 页面加载完成
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('汉明科技官网已加载完成 🚀');
  
  initScrollAnimations();
  initCounterAnimation();
  initMobileMenu();
  initNewsCategoryFilter();
  
  // 添加页面加载类
  document.body.classList.add('loaded');
});

// ===================================
// 防抖函数
// ===================================
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// 优化窗口大小调整
window.addEventListener('resize', debounce(() => {
  initMobileMenu();
}, 250));
