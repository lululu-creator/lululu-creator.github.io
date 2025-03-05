
// 加载进度控制
function simulateLoading() {
    const progress = document.getElementById('progress');
    const percentage = document.getElementById('percentage');
    let width = 0;
    
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            
            // 加载完成后跳转
            setTimeout(() => {
                window.location.href = "main.html";
            }, 300);
        } else {
            // 平滑增加进度
            width += (100 - width) / 20 + 0.2;
            width = Math.min(Math.round(width * 10) / 10, 100);
            
            progress.style.width = `${width}%`;
            percentage.textContent = `${Math.floor(width)}%`;
        }
    }, 30);
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    simulateLoading();
});