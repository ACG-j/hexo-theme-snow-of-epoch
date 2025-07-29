document.addEventListener('DOMContentLoaded', function() {
    const menuOuter = document.getElementById('menu-outer');
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollTimeout;
    let isScrollingUp = false;

    function handleScroll() {
        if (scrollTimeout) {
            return;
        }

        scrollTimeout = setTimeout(() => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDelta = Math.abs(currentScrollTop - lastScrollTop);
            
            // 如果在顶部附近，移除fixed定位
            if (currentScrollTop < 50) {
                menuOuter.classList.remove('hidden');
                menuOuter.style.position = 'relative';
            } else {
                // 只有明显的滚动才触发动作
                if (scrollDelta >= 10) {  // 至少滚动10px才触发
                    if (currentScrollTop > lastScrollTop) {
                        // 向下滚动，隐藏菜单
                        menuOuter.classList.add('hidden');
                        menuOuter.style.position = 'relative';
                        isScrollingUp = false;
                    } else {
                        // 向上滚动，显示菜单并固定
                        menuOuter.classList.remove('hidden');
                        menuOuter.style.position = 'fixed';
                        menuOuter.style.top = '0';
                        isScrollingUp = true;
                    }
                }
            }

            lastScrollTop = currentScrollTop;
            scrollTimeout = null;
        }, 50);  // 使用50ms的节流时间提高响应性
    }

    // 使用passive: true提高滚动性能
    window.addEventListener('scroll', handleScroll, { passive: true });
});