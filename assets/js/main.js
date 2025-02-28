document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.basic-info-item');
    const infoDetail = document.querySelector('.info-detail');
    const basicInfoArea = document.querySelector('.basic-info');
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
             // 获取目标部分的ID
             const targetId = this.getAttribute('href');
             
             // 可选：添加点击动画效果
             link.classList.add('clicked');
             setTimeout(() => {
                 link.classList.remove('clicked');
             }, 300);
         });
     });
     
     // 滚动时确定当前位置
     window.addEventListener('scroll', function() {
         let current = '';
         
         // 确定当前滚动位置
         sections.forEach(section => {
             const sectionTop = section.offsetTop;
             const sectionHeight = section.clientHeight;
             if(pageYOffset >= (sectionTop - 100)) {
                 current = '#' + section.getAttribute('id');
             }
         });
         
         // 更新活动链接
         navLinks.forEach(link => {
             link.classList.remove('active');
             if(link.getAttribute('href') === current) {
                 link.classList.add('active');
             }
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
    
    // 默认设置第一个侧边栏项目为活跃状态
    asideItems.forEach(item => {
        item.classList.remove('active');
    });
    if (asideItems[0]) {
        asideItems[0].classList.add('active');
    }
    
    // 为aside-bar-item添加内容切换功能（移除波纹效果）
    asideItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // 为当前元素添加active类，移除其他元素的active类
            asideItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            this.classList.add('active');
            
            // 显示对应的内容区
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
    
    // 点击预览按钮打开模态框
    previewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            
            // 隐藏所有项目详情
            modalProjects.forEach(project => {
                project.style.display = 'none';
            });
            
            // 显示当前项目详情
            document.getElementById(`${projectId}-details`).style.display = 'block';
            
            // 显示模态框
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        });
    });
    
    // 点击关闭按钮关闭模态框
    closeBtn.addEventListener('click', closeModal);
    
    // 点击模态框外部关闭模态框
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            closeModal();
        }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // 关闭模态框函数
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
});