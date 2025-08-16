/**
 * YoyooAI - 作品集页面筛选功能
 */

document.addEventListener('DOMContentLoaded', () => {
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

/**
 * 作品集页面的筛选功能实现
 * @author YoyooAI
 * @description 实现作品集页面的筛选、动画效果及交互功能
 */

document.addEventListener('DOMContentLoaded', function() {
    // 获取筛选按钮和作品项
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
            portfolioItems.forEach(item => {
                // 获取作品项的类别
                const categories = item.getAttribute('data-category').split(' ');
                
                // 如果筛选值为"all"或作品项包含筛选值，则显示，否则隐藏
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    item.style.display = 'block';
                    // 添加淡入动画
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    // 添加淡出动画
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // 初始状态下触发"全部"筛选
    document.querySelector('.filter-btn[data-filter="all"]').click();
    
    // 为作品项添加鼠标悬停效果
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.portfolio-overlay');
            overlay.style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.portfolio-overlay');
            overlay.style.opacity = '0';
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
});

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
    }
    
    /**
     * 根据选择的筛选类别过滤作品项目（复用函数）
     * @param {string} category - 筛选类别
     */
    function filterPortfolioItems(category) {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
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
                item.classList.remove('visible');
                item.classList.add('hidden');
            }
        });
    }
}