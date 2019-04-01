$(function () {
    // 初始化tip提示工具
    $('[data-toggle="tooltip"]').tooltip()
    // 假设法：假设是移动端屏幕 <768px
    var isMobile = true;
    // 发起请求，读取数据
    $.ajax({
        type: 'get',
        url: './data/imgData.json',
        success: function (data) {
            // console.log(data);
            // 判断屏幕是否大于768px
            if ($(window).width() >= 768) {
                // 推翻假设，重置isMobile为false
                isMobile = false;
            }
            // else {
            //     isMobile = true;
            // }
            // 生成轮播图图片的模板字符串  并渲染到页面
            var bannerHtml = template('bannerTemp', { 'list': data, isMobile });
            $('.carousel-inner').html(bannerHtml);
            // 生成小圆点标记的模板字符串，并渲染到页面
            var indicatorsHtml = template('indicators', { 'list': data });
            $('.carousel-indicators').html(indicatorsHtml);
        }
    })

    // 实现移动端手动轮播
    // 创建临时变量存放开始位置和滑动距离
    var startX, distanceX;
    var carousel_inner = $('.carousel-inner')[0];
    carousel_inner.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].clientX;
    })
    carousel_inner.addEventListener('touchend', function (e) {
        // 计算滑动距离
        distanceX = e.changedTouches[0].clientX - startX
        // 判断是否翻页
        if (Math.abs(distanceX) > 100) {
            // 正数为上一页
            if (distanceX > 0) {
                $('.carousel').carousel('prev');
                // 负数为下一页
            } else {
                $('.carousel').carousel('next');
            }
        }
    })


    // 实现产品模块菜单栏的滚动效果
    /**
     * 原生js中：
     *     width：      行内样式的宽度
     *     offsetWidth：width + padding + border
     *     clientWidth：width + padding
     * 
     * jQuery中：
     *      width():         只是获取内容的宽度
     *      innerWidth():    width + padding
     *      outerWidth():    width + padding + border
     *      outerWidth(true):width + padding + border + margin
     * 
     */
    // 1.获取li的宽度
    var totalW = 0;             //创建变量存放li的总宽度
    var lis = document.querySelectorAll('.wjs_pro .nav-tabs li');
    var ulBox = document.querySelector('.scroll_parent ul');
    for(var i = 0;i<lis.length;i++){
        // console.log(lis[i].clientWidth);
        // console.log(lis[i].offsetWidth);
        // console.log(getStyle(lis[i],'marginRight'));
        totalW += lis[i].clientWidth;
    }
   
    // console.log(totalW);
    // 2.把给所有li宽度之和赋值给ul的宽度
    ulBox.style.width = totalW +'px';
    // 3.使用iscroll
    var myScroll =  new  IScroll('.scroll_parent',{
        scrollX: true, //设置支持水平滑动
        scrollY: false //设置不支持垂直滑动
    })


    // 获取元素属性值封装
    // function getStyle(obj,attr){
    //     if(obj.currentStyle){
    //         return obj.currentStyle[attr];
    //     }
    //     else{
    //         return document.defaultView.getComputedStyle(obj,null)[attr];
    //     }
    // }
})