document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.basic-info-item');
    const infoDetail = document.querySelector('.info-detail');
    const basicInfoArea = document.querySelector('.basic-info');
    let lastActiveIndex = -1;
    let isDetailActive = false;

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

    // 让info-detail在鼠标悬停时保持显示
    infoDetail.addEventListener('mouseenter', () => {
        isDetailActive = true;
    });

    infoDetail.addEventListener('mouseleave', () => {
        isDetailActive = false;
        setTimeout(() => {
            // 确保鼠标没有回到basic-info区域
            if (!isDetailActive) {
                infoDetail.classList.remove('active');
                document.querySelectorAll('.info-detail div').forEach(d => {
                    d.classList.remove('active');
                });
                lastActiveIndex = -1;
            }
        }, 100);
    });

    // 当鼠标移出整个区域时才隐藏详细信息
    basicInfoArea.addEventListener('mouseleave', (e) => {
        // 检查鼠标是否移动到了info-detail上
        if (!infoDetail.contains(e.relatedTarget)) {
            setTimeout(() => {
                // 确保鼠标没有移动到info-detail上
                if (!isDetailActive) {
                    infoDetail.classList.remove('active');
                    document.querySelectorAll('.info-detail div').forEach(d => {
                        d.classList.remove('active');
                    });
                    lastActiveIndex = -1;
                }
            }, 100);
        }
    });
});