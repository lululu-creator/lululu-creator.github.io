document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.basic-info-item');
    const infoDetail = document.querySelector('.info-detail');
    const nameDetail= document.querySelector('.name-detail');
    let lastActiveIndex = 0; // 设为0，表示默认第一项激活
    let isDetailActive = true; // 默认为true，表示详情区域激活
     // 获取所有导航链接
     const navLinks = document.querySelectorAll('.menu-list a');
    
     // 获取所有section
     const sections = document.querySelectorAll('.my-info, .my-story, .my-techStack, .my-project');
     
     // 当点击导航链接时
     navLinks.forEach(link => {
         link.addEventListener('click', function(e) {
             link.classList.add('clicked');
             setTimeout(() => {
                 link.classList.remove('clicked');
             }, 300);
         });
     });
     

    // 默认显示nameDetail
    nameDetail.classList.add('active');
    infoDetail.classList.add('active'); // 确保容器也是激活状态
    
    items.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            const detailId = item.getAttribute('data-detail');
            const detail = document.querySelector(`.${detailId}`);
            
            // 如果当前激活的不是同一个才更新
            if (lastActiveIndex !== index) {
                // 移除所有active状态
                document.querySelectorAll('.info-detail div').forEach(d => {
                    d.classList.remove('active');
                });
                
                // 添加新的active状态
                if (detail) {
                    detail.classList.add('active');
                    infoDetail.classList.add('active');
                    lastActiveIndex = index;
                    isDetailActive = true;
                }
            }
        });
    });

    // 为aside-bar-item添加内容切换功能（移除波纹效果）
    const asideItems = document.querySelectorAll('.aside-bar-item');
    const storyContents = document.querySelectorAll('.story-content');
    
    // 先清除所有内容区的active状态，确保没有冲突
    storyContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // 默认显示第一个内容区
    if (storyContents[0]) {
        storyContents[0].classList.add('active');
    }
    
    // 默认设置第一个侧边栏项目为active
    asideItems.forEach(item => {
        item.classList.remove('active');
    });
    if (asideItems[0]) {
        asideItems[0].classList.add('active');
    }
    
    asideItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // 为当前元素添加active类，移除其他元素的active类
            asideItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            this.classList.add('active');

            storyContents.forEach(content => {
                content.classList.remove('active');
            });
            if (storyContents[index]) {
                storyContents[index].classList.add('active');
            }
        });
    });
    const techCards = document.querySelectorAll('.tech-card');
    
    techCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const cardRect = card.getBoundingClientRect();
            const centerX = cardRect.left + cardRect.width / 2;
            const centerY = cardRect.top + cardRect.height / 2;
            
            card.style.transition = 'transform 0.2s ease-out';
            
            document.addEventListener('mousemove', moveHandler);
            
            function moveHandler(e) {
                const deltaX = (e.clientX - centerX) / 25;
                const deltaY = (e.clientY - centerY) / 25;
                
                card.style.transform = `translateY(-15px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg)`;
            }
            
            card.addEventListener('mouseleave', () => {
                document.removeEventListener('mousemove', moveHandler);
                card.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            });
        });
    });
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close-modal');
    const previewBtns = document.querySelectorAll('.preview-btn');
    const modalProjects = document.querySelectorAll('.modal-project');
    
    // 点击预览按钮打开预览框
    previewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            
            // 隐藏所有项目详情
            modalProjects.forEach(project => {
                project.style.display = 'none';
            });
            
            document.getElementById(`${projectId}-details`).style.display = 'block';
            
            modal.style.display = 'block';

            document.body.style.overflow = 'hidden'; // 防止背景滚动
        });
    });
    
    // 点击关闭按钮关闭预览框
    closeBtn.addEventListener('click', closeModal);
    
    // 点击模态框外部关闭预览框
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            closeModal();
        }
    });
    
    // ESC键关闭预览框
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // 关闭预览框函数
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // 恢复背景滚动
    }
    
    // 为项目卡片添加鼠标悬停效果
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.project-overlay').style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-overlay').style.opacity = '0';
        });
    });
    const articles = [
        {
            id: 1,
            title: "JavaScript中的异步编程学习",
            category: "frontend",
            tags: ["JavaScript", "异步编程", "Promise"],
            date: { day: "1", month: "Mar", year: "2025" },
            excerpt: "探索Promise、async/await和回调函数在现代JavaScript中的应用，以及如何构建更高效的异步流程。",
            readTime: "8分钟阅读",
            filePath: "articles/frontend/javascript-async-programming.md"
        },
        {
            id: 2,
            title: "网页设计中的色彩",
            category: "design",
            tags: ["设计理念", "UI/UX"],
            date: { day: "xx", month: "xx", year: "xx" },
            excerpt: "色彩如何影响用户体验与情绪，以及如何运用低饱和度配色方案创造高级质感的网页设计。",
            readTime: "x分钟阅读",
            filePath: "articles/design/color-psychology.md"
        },
        {
            id: 3,
            title: "从零开始的前端学习路线图",
            category: "experience",
            tags: ["经验分享", "学习方法"],
            date: { day: "xx", month: "xx", year: "xx" },
            excerpt: "分享我的前端学习经验，从入门到进阶的资源推荐，以及如何避免常见的学习误区和陷阱。",
            readTime: "xx分钟阅读",
            filePath: "articles/experience/frontend-learning-path.md"
        },
        {
            id: 4,
            title: "JavaScript中的闭包学习",
            category: "frontend",
            tags: ["前端开发", "JavaScript", "闭包"],
            date: { day: "3", month: "Mar", year: "2025" },
            excerpt: "学习理解闭包的概念、工作原理和实际应用，以及如何在JavaScript中使用闭包。",
            readTime: "5分钟阅读",
            filePath: "articles/frontend/JavaScriptClosures.md"
        },
        {
            id: 5,
            title: "通过对cozeAPI的调用实践来理解和学习网络请求",
            category: "frontend",
            tags: ["前端开发", "网络请求", "API"],
            date: { day: "5", month: "Mar", year: "2025" },
            excerpt: "通过实际项目中对cozeAPI的调用实践，学习如何发起网络请求、处理响应和处理错误。",
            readTime: "20分钟阅读",
            filePath: "articles/frontend/callTheCozeApi.md"
        },
    ];
    
    // 当前默认筛选方式和页码
    let currentCategory = 'all';
    let currentPage = 1;
    const articlesPerPage = 3; // 每页显示3篇文章
    
    const articlesContainer = document.querySelector('.articles-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const paginationNumbersContainer = document.querySelector('.pagination-numbers');
    const prevBtn = document.querySelector('.pagination-btn.prev');
    const nextBtn = document.querySelector('.pagination-btn.next');
    const articleModal = document.getElementById('articleModal');
    const closeArticleModalBtn = document.querySelector('.close-article-modal');
    const articleModalBody = document.querySelector('.article-modal-body');
    const articleCategory = document.querySelector('.article-category');
    
    // 初始化文章
    function initArticles() {
        if (!articlesContainer) return;

        updatePagination();

        displayArticles();
        
        // 添加筛选逻辑
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {

                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                currentCategory = this.getAttribute('data-category');
                currentPage = 1;
  
                updatePagination();
                displayArticles();
            });
        });
        
        // 分页逻辑
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                if (currentPage > 1) {
                    currentPage--;
                    updatePagination();
                    displayArticles();
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                const totalPages = Math.ceil(getFilteredArticles().length / articlesPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    updatePagination();
                    displayArticles();
                }
            });
        }
        
        // 关闭文章框事件
        if (closeArticleModalBtn) {
            closeArticleModalBtn.addEventListener('click', function() {
                articleModal.style.display = 'none';
                document.body.style.overflow = '';
            });
        }
        
        // 点击模态框外部关闭
        window.addEventListener('click', function(event) {
            if (event.target == articleModal) {
                articleModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
        
        // ESC键关闭模态框
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && articleModal.style.display === 'block') {
                articleModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
    
    // 获取当前筛选的文章
    function getFilteredArticles() {
        if (currentCategory === 'all') {
            return articles;
        } else {
            return articles.filter(article => article.category === currentCategory);
        }
    }
    
    // 更新分页
    function updatePagination() {
        if (!paginationNumbersContainer) return;
        
        const filteredArticles = getFilteredArticles();
        const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
        
        // 清空分页数字
        paginationNumbersContainer.innerHTML = '';
        
        // 创建分页数字
        for (let i = 1; i <= totalPages; i++) {
            const pageNumber = document.createElement('span');
            pageNumber.classList.add('page-number');
            
            if (i === currentPage) {
                pageNumber.classList.add('active');
            }
            pageNumber.textContent = i;
            pageNumber.addEventListener('click', function() {
                currentPage = i;
                updatePagination();
                displayArticles();
            });
            paginationNumbersContainer.appendChild(pageNumber);
        }
        
        // 更新上一页/下一页按钮状态
        if (prevBtn) prevBtn.disabled = (currentPage === 1);
        if (nextBtn) nextBtn.disabled = (currentPage === totalPages || totalPages === 0);
    }
    
    // 显示文章
    function displayArticles() {
        if (!articlesContainer) return;
        
        // 清空文章容器
        articlesContainer.innerHTML = '';
        
        // 获取当前页的文章
        const filteredArticles = getFilteredArticles();
        const startIndex = (currentPage - 1) * articlesPerPage;
        const endIndex = Math.min(startIndex + articlesPerPage, filteredArticles.length);
        const currentPageArticles = filteredArticles.slice(startIndex, endIndex);
        
        // 如果没有文章，显示提示
        if (currentPageArticles.length === 0) {
            const noArticles = document.createElement('div');
            noArticles.classList.add('no-articles');
            noArticles.textContent = '暂无相关文章';
            noArticles.style.textAlign = 'center';
            noArticles.style.padding = '50px 0';
            noArticles.style.color = '#64748b';
            noArticles.style.fontSize = '18px';
            noArticles.style.width = '100%';
            articlesContainer.appendChild(noArticles);
            return;
        }
        
        // 创建文章卡片
        currentPageArticles.forEach((article, index) => {
            const articleCard = document.createElement('div');
            articleCard.classList.add('article-card');
            
            articleCard.innerHTML = `
                <div class="article-content">
                    <div class="article-tags">
                        ${article.tags.map(tag => `<span class="article-tag">${tag}</span>`).join('')}
                    </div>
                    <h3 class="article-title">${article.title}</h3>
                    <div class="article-date">
                        <span class="day">${article.date.day}</span>
                        <span class="month">${article.date.month}</span>
                        <span class="year">${article.date.year}</span>
                    </div>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-footer">
                        <span class="read-time"><i class="read-icon">⏱</i> ${article.readTime}</span>
                        <a href="#" class="read-more" data-article-id="${article.id}">阅读全文 →</a>
                    </div>
                </div>
            `;
            
            // 添加淡入动画
            setTimeout(() => {
                articleCard.classList.add('visible');
            }, index * 100);
            
            // 阅读全文点击事件
            const readMoreBtn = articleCard.querySelector('.read-more');
            readMoreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const articleId = parseInt(this.getAttribute('data-article-id'));
                openArticle(articleId);
            });
            
            articlesContainer.appendChild(articleCard);
        });
    }

    async function openArticle(articleId) {
        if (!articleModal || !articleModalBody) {
            console.error('Modal elements not found');
            return;
        }
        
        const article = articles.find(a => a.id === articleId);
        if (!article) {
            console.error('Article not found:', articleId);
            return;
        }
        
        try {
            // 显示加载状态
            articleModalBody.innerHTML = '<div class="loading" style="text-align: center; padding: 50px 0; color: #64748b;">正在加载文章内容...</div>';
            
            // 显示模态框
            articleModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // 获取文章内容
            const response = await fetch(article.filePath);
            if (!response.ok) {
                throw new Error(`无法加载文章 (状态: ${response.status})`);
            }
            
            let markdown = await response.text();
            
            if (typeof marked === 'undefined') {
                console.error('Marked库未加载，使用简易Markdown解析');
                // 使用简易解析作为备选
                const parsedContent = simpleParseMarkdown(markdown);
                articleModalBody.innerHTML = parsedContent;
            } else {
                try {
                    // 使用marked解析Markdown
                    const htmlContent = marked.parse(markdown);
                    articleModalBody.innerHTML = htmlContent;
                } catch (markdownError) {
                    console.error('Marked解析错误:', markdownError);
                    // 回退到简易解析
                    const parsedContent = simpleParseMarkdown(markdown);
                    articleModalBody.innerHTML = parsedContent;
                }
            }
            
            // 更新文章分类
            const categorySpan = document.querySelector('.article-category');
            if (categorySpan) {
                categorySpan.textContent = getCategoryName(article.category);
            }
            
            // 应用代码高亮
            if (typeof hljs !== 'undefined') {
                document.querySelectorAll('.article-modal-body pre code').forEach((block) => {
                    hljs.highlightElement(block);
                });
            }
            
        } catch (error) {
            console.error('Article loading error:', error);
            articleModalBody.innerHTML = `<div class="error" style="text-align: center; padding: 50px 20px; color: #ef4444;">
                <p style="font-size: 20px; margin-bottom: 10px;">加载文章失败</p>
                <p style="font-size: 14px; color: #64748b;">${error.message}</p>
            </div>`;
        }
    }
    
    // 添加一个简易的Markdown解析函数作为备选
    function simpleParseMarkdown(markdown) {
        // 移除文件路径注释
        markdown = markdown.replace(/\/\/ filepath:.*\n/, '');
        
        // 标题
        markdown = markdown.replace(/^# (.*$)/gm, '<h1>$1</h1>');
        markdown = markdown.replace(/^## (.*$)/gm, '<h2>$1</h2>');
        markdown = markdown.replace(/^### (.*$)/gm, '<h3>$1</h3>');
        markdown = markdown.replace(/^#### (.*$)/gm, '<h4>$1</h4>');
        
        // 代码块
        markdown = markdown.replace(/```([\s\S]*?)```/gm, function(match, code) {
            return `<pre><code>${escapeHTML(code.trim())}</code></pre>`;
        });
        
        // 列表项
        markdown = markdown.replace(/^\s*[-*]\s+(.*$)/gm, '<li>$1</li>');
        markdown = markdown.replace(/(<li>.*<\/li>\s*)+/gs, '<ul>$&</ul>');
        
        // 加粗和斜体
        markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        markdown = markdown.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // 链接
        markdown = markdown.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
        
        // 段落
        markdown = markdown.replace(/^(?!<[houlprea])[^\n]+$/gm, function(match) {
            return match.trim() ? `<p>${match}</p>` : '';
        });
        
        return markdown;
    }
    
    // 添加HTML转义函数
    function escapeHTML(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
    
    // 获取分类名称
    function getCategoryName(category) {
        const categoryMap = {
            'frontend': '前端开发',
            'design': '设计理念',
            'experience': '经验分享'
        };
        return categoryMap[category] || category;
    }
    
    // 初始化文章功能
    initArticles();
});