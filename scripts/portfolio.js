/**
 * YoyooAI - 作品集页面筛选功能
 * @author YoyooAI
 * @description 实现作品集页面的筛选、动画效果及交互功能
 */

document.addEventListener('DOMContentLoaded', function() {
    initPortfolioFilter();
    handleURLFilter();
});

/**
 * 初始化作品集筛选功能
 */
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // 为所有筛选按钮添加点击事件
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 获取筛选类别
            const filterValue = this.getAttribute('data-filter');
            
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // 为当前点击的按钮添加active类
            this.classList.add('active');
            
            // 筛选作品项
            filterPortfolioItems(filterValue);
        });
    });
    
    // 为作品项添加鼠标悬停效果
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.portfolio-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.portfolio-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
    
    // 为作品详情链接添加点击事件（模拟效果）
    const portfolioBtns = document.querySelectorAll('.portfolio-btn');
    portfolioBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // 仅处理href="#"的链接
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                // 这里可以添加打开详情页的逻辑
                alert('作品详情页开发中，敬请期待！');
            }
            // 对于其他链接，使用默认行为（正常导航）
        });
    });
}

/**
 * 根据选择的筛选类别过滤作品项目
 * @param {string} category - 筛选类别
 */
function filterPortfolioItems(category) {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        const itemCategories = item.getAttribute('data-category').split(' ');
        
        // 如果选择"全部"或项目包含所选类别，则显示项目
        if (category === 'all' || itemCategories.includes(category)) {
            item.style.display = 'block';
            item.classList.remove('hidden');
            item.classList.add('visible');
            
            // 添加淡入动画
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50);
        } else {
            // 添加淡出动画
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.classList.add('hidden');
            item.classList.remove('visible');
            
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

/**
 * 处理URL参数，自动筛选对应分类
 */
function handleURLFilter() {
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    
    if (filterParam) {
        // 找到对应的筛选按钮
        const targetButton = document.querySelector(`[data-filter="${filterParam}"]`);
        
        if (targetButton) {
            // 移除所有按钮的active类
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // 激活目标按钮
            targetButton.classList.add('active');
            
            // 执行筛选
            filterPortfolioItems(filterParam);
        }
    } else {
        // 如果没有URL参数，默认显示"全部"
        const allButton = document.querySelector('.filter-btn[data-filter="all"]');
        if (allButton) {
            allButton.classList.add('active');
            filterPortfolioItems('all');
        }
    }
}

/**
 * 检查元素是否在视口中
 * @param {Element} el - 要检查的元素
 * @returns {boolean} - 是否在视口中
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

/**
 * 当页面滚动时检测并触发作品项目的动画
 */
function onScroll() {
    const portfolioItems = document.querySelectorAll('.portfolio-item.visible');
    
    portfolioItems.forEach(item => {
        if (isElementInViewport(item) && !item.classList.contains('animated')) {
            item.classList.add('animated');
        }
    });
}

// 添加滚动监听
window.addEventListener('scroll', onScroll);

