$(document).ready(function() {
    // 初始化 pjax
    $.pjax.defaults.timeout = 5000;
    $.pjax.defaults.maxCacheLength = 0;
    
    $(document).pjax('a:not([target="_blank"]):not([no-pjax])', {
        container: '#content-inner',
        fragment: '#content-inner',
        timeout: 8000
    });

    let isInitialLoad = true;

    // pjax 开始时的动画
    $(document).on('pjax:send', function() {
        // 第一次加载不显示动画
        if (isInitialLoad) {
            isInitialLoad = false;
            return;
        }
        
        // 添加水墨退场动画
        $('#content-inner').addClass('ink-fade-out');
        
        // 添加加载指示器
        if (!$('#pjax-loading-bar').length) {
            $('body').append('<div id="pjax-loading-bar"><div class="loading-progress"></div></div>');
        }
        $('#pjax-loading-bar').addClass('active');
    });

    // pjax 完成时的动画
    $(document).on('pjax:complete', function() {
        // 移除退场动画类
        $('#content-inner').removeClass('ink-fade-out');
        
        // 添加水墨进场动画
        $('#content-inner').addClass('ink-fade-in');
        
        // 移除加载指示器
        setTimeout(() => {
            $('#pjax-loading-bar').removeClass('active');
        }, 300);

        // 移除进场动画类
        setTimeout(() => {
            $('#content-inner').removeClass('ink-fade-in');
        }, 800);
        
        // 平滑滚动到顶部
        $('html, body').animate({ scrollTop: 0 }, {
            duration: 800,
            easing: 'easeInOutCubic'
        });
    });

    // pjax 成功时的处理
    $(document).on('pjax:success', function() {
        // 重新初始化页面功能
        if (window.loadBanner) {
            window.loadBanner();
        }
    });

    // pjax 错误处理
    $(document).on('pjax:error', function(event, xhr, textStatus, errorThrown) {
        if (xhr.status === 404 || xhr.status === 500) {
            // 在错误时正常跳转
            window.location.href = event.triggerElement.href;
        }
        $('#pjax-loading-bar').removeClass('active');
    });

    // 添加 jQuery easing 函数
    $.easing.easeInOutCubic = function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    };
});
