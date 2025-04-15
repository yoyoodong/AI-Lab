/**
 * 博客页面交互功能
 * @author YoyooAI
 * @description 实现博客页面的文章搜索、分类筛选和交互动画
 */

document.addEventListener('DOMContentLoaded', function() {
    // 为侧边栏分类添加点击事件
    const categoryLinks = document.querySelectorAll('.categories-list a');
    const articleCards = document.querySelectorAll('.article-card');
    const featuredArticle = document.querySelector('.featured-article');
    
    // 创建搜索栏
    createSearchBar();
    
    // 分类筛选功能
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取分类名称
            const category = this.textContent.split(' ')[0];
            
            // 高亮当前分类
            categoryLinks.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
            
            // 显示分类标题
            const filteredHeading = document.querySelector('.filtered-heading');
            if (filteredHeading) {
                filteredHeading.textContent = `分类: ${category}`;
                filteredHeading.style.display = 'block';
            } else {
                const heading = document.createElement('h2');
                heading.className = 'filtered-heading';
                heading.textContent = `分类: ${category}`;
                document.querySelector('.articles-list').prepend(heading);
            }
            
            // 筛选文章
            articleCards.forEach(card => {
                const articleCategory = card.querySelector('.category').textContent;
                
                if (articleCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // 处理精选文章
            const featuredCategory = featuredArticle.querySelector('.category').textContent;
            if (featuredCategory === category) {
                featuredArticle.style.display = 'flex';
                setTimeout(() => {
                    featuredArticle.style.opacity = '1';
                    featuredArticle.style.transform = 'translateY(0)';
                }, 50);
            } else {
                featuredArticle.style.opacity = '0';
                featuredArticle.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    featuredArticle.style.display = 'none';
                }, 300);
            }
        });
    });
    
    // 为热门文章添加点击事件
    const popularLinks = document.querySelectorAll('.popular-list a');
    popularLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('热门文章详情页面开发中，敬请期待！');
        });
    });
    
    // 为阅读全文按钮添加点击事件
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取文章标题
            const articleTitle = this.closest('.article-card') 
                ? this.closest('.article-card').querySelector('.article-title').textContent
                : this.closest('.featured-article').querySelector('.article-title').textContent;
            
            // 显示文章详情
            showArticleDetail(articleTitle);
        });
    });
    
    // 为分页按钮添加点击事件
    const paginationItems = document.querySelectorAll('.pagination .page-item, .pagination .page-next');
    paginationItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有按钮的active类
            paginationItems.forEach(btn => btn.classList.remove('active'));
            
            // 为当前点击的按钮添加active类
            if (!this.classList.contains('page-next')) {
                this.classList.add('active');
            }
            
            // 模拟页面切换效果
            const articlesContainer = document.querySelector('.articles-list');
            articlesContainer.style.opacity = '0';
            
            setTimeout(() => {
                alert('分页功能开发中，敬请期待！');
                articlesContainer.style.opacity = '1';
            }, 300);
        });
    });
    
    // 创建文章搜索栏
    function createSearchBar() {
        const searchBar = document.createElement('div');
        searchBar.className = 'blog-search-bar';
        searchBar.innerHTML = `
            <form class="search-form">
                <input type="text" placeholder="搜索文章..." class="search-input">
                <button type="submit" class="search-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </form>
        `;
        
        // 添加到页面
        const pageHeader = document.querySelector('.page-header .container');
        pageHeader.appendChild(searchBar);
        
        // 添加搜索功能
        const searchForm = searchBar.querySelector('.search-form');
        const searchInput = searchBar.querySelector('.search-input');
        
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm === '') return;
            
            // 显示搜索结果标题
            const filteredHeading = document.querySelector('.filtered-heading');
            if (filteredHeading) {
                filteredHeading.textContent = `搜索结果: "${searchTerm}"`;
                filteredHeading.style.display = 'block';
            } else {
                const heading = document.createElement('h2');
                heading.className = 'filtered-heading';
                heading.textContent = `搜索结果: "${searchTerm}"`;
                document.querySelector('.articles-list').prepend(heading);
            }
            
            // 简单的文章搜索功能
            let hasResults = false;
            
            // 搜索常规文章
            articleCards.forEach(card => {
                const title = card.querySelector('.article-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.article-excerpt').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    card.style.display = 'block';
                    hasResults = true;
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // 搜索精选文章
            const featuredTitle = featuredArticle.querySelector('.article-title').textContent.toLowerCase();
            const featuredExcerpt = featuredArticle.querySelector('.article-excerpt').textContent.toLowerCase();
            
            if (featuredTitle.includes(searchTerm) || featuredExcerpt.includes(searchTerm)) {
                featuredArticle.style.display = 'flex';
                hasResults = true;
                setTimeout(() => {
                    featuredArticle.style.opacity = '1';
                    featuredArticle.style.transform = 'translateY(0)';
                }, 50);
            } else {
                featuredArticle.style.opacity = '0';
                featuredArticle.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    featuredArticle.style.display = 'none';
                }, 300);
            }
            
            // 处理无搜索结果的情况
            if (!hasResults) {
                const noResults = document.querySelector('.no-results');
                if (noResults) {
                    noResults.style.display = 'block';
                } else {
                    const noResultsElem = document.createElement('div');
                    noResultsElem.className = 'no-results';
                    noResultsElem.innerHTML = `
                        <p>没有找到与 "${searchTerm}" 相关的文章。</p>
                        <button class="reset-search">重置搜索</button>
                    `;
                    document.querySelector('.articles-list').appendChild(noResultsElem);
                    
                    // 添加重置按钮功能
                    noResultsElem.querySelector('.reset-search').addEventListener('click', function() {
                        resetSearch();
                    });
                }
            } else {
                const noResults = document.querySelector('.no-results');
                if (noResults) {
                    noResults.style.display = 'none';
                }
            }
        });
        
        // 添加搜索重置功能
        searchInput.addEventListener('input', function() {
            if (this.value === '') {
                resetSearch();
            }
        });
    }
    
    // 重置搜索结果
    function resetSearch() {
        // 清空搜索输入
        document.querySelector('.search-input').value = '';
        
        // 移除筛选标题
        const filteredHeading = document.querySelector('.filtered-heading');
        if (filteredHeading) {
            filteredHeading.style.display = 'none';
        }
        
        // 重置分类高亮
        categoryLinks.forEach(cat => cat.classList.remove('active'));
        
        // 显示所有文章
        articleCards.forEach(card => {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        });
        
        // 显示精选文章
        featuredArticle.style.display = 'flex';
        setTimeout(() => {
            featuredArticle.style.opacity = '1';
            featuredArticle.style.transform = 'translateY(0)';
        }, 50);
        
        // 隐藏无结果提示
        const noResults = document.querySelector('.no-results');
        if (noResults) {
            noResults.style.display = 'none';
        }
    }
    
    // 文章详情对话框
    function showArticleDetail(articleTitle) {
        alert(`文章 "${articleTitle}" 详情页面开发中，敬请期待！`);
    }
}); 