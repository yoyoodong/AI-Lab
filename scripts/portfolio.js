/**
 * YoyooAI - 作品集页面筛选功能
 */

document.addEventListener('DOMContentLoaded', () => {
    initPortfolioFilter();
});

/**
 * 初始化作品集筛选功能
 */
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // 为所有筛选按钮添加点击事件
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 获取筛选类别
            const filterValue = button.getAttribute('data-filter');
            
            // 移除所有按钮的active类
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // 给当前点击的按钮添加active类
            button.classList.add('active');
            
            // 筛选作品项目
            filterPortfolioItems(filterValue);
        });
    });
    
    /**
     * 根据选择的筛选类别过滤作品项目
     * @param {string} category - 筛选类别
     */
    function filterPortfolioItems(category) {
        portfolioItems.forEach(item => {
            const itemCategories = item.getAttribute('data-category').split(' ');
            
            // 如果选择"全部"或项目包含所选类别，则显示项目
            if (category === 'all' || itemCategories.includes(category)) {
                item.classList.remove('hidden');
                item.classList.add('visible');
                
                // 添加动画延迟以创建交错效果
                const itemIndex = Array.from(portfolioItems).indexOf(item);
                item.style.animationDelay = `${0.1 * itemIndex}s`;
            } else {
                item.classList.add('hidden');
                item.classList.remove('visible');
            }
        });
    }
    
    // 默认显示全部项目，确保它们都有visible类
    portfolioItems.forEach((item, index) => {
        item.classList.add('visible');
        item.style.animationDelay = `${0.1 * index}s`;
    });
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