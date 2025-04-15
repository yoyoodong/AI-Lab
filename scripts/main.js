/**
 * YoyooAI - 设计×AI跨界实验室
 * 主脚本文件
 */

document.addEventListener('DOMContentLoaded', () => {
    // 初始化网站功能
    initSite();
});

/**
 * 网站初始化函数
 */
function initSite() {
    // 添加滚动监听，用于导航栏状态变化
    initScrollEffects();
    
    // 监听视窗变化
    initResizeListeners();
    
    // 初始化平滑滚动
    initSmoothScroll();
    
    console.log('YoyooAI站点已初始化');
}

/**
 * 初始化滚动效果
 */
function initScrollEffects() {
    const header = document.querySelector('.site-header');
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', () => {
        // 根据滚动位置调整导航栏样式
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // 检测元素进入视口并添加动画
        animateOnScroll();
    });
}

/**
 * 初始化视窗大小变化监听
 */
function initResizeListeners() {
    window.addEventListener('resize', () => {
        // 在这里处理视窗大小改变时的调整
    });
}

/**
 * 初始化平滑滚动
 */
function initSmoothScroll() {
    // 获取所有带hash的链接
    const links = document.querySelectorAll('a[href^="#"]');
    
    for (const link of links) {
        link.addEventListener('click', (e) => {
            // 如果链接指向页内锚点
            if (link.hash) {
                const target = document.querySelector(link.hash);
                
                if (target) {
                    e.preventDefault();
                    
                    // 平滑滚动到目标位置
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // 更新URL，但不触发页面跳转
                    history.pushState(null, null, link.hash);
                }
            }
        });
    }
}

/**
 * 滚动时触发动画
 */
function animateOnScroll() {
    // 获取所有带动画类的元素
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    for (const element of elements) {
        // 检查元素是否在视口中
        if (isElementInViewport(element)) {
            element.classList.add('animated');
        }
    }
}

/**
 * 检查元素是否在视口中
 * @param {Element} el - 要检查的元素
 * @returns {boolean} - 元素是否在视口中
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
} 