require(['jquery','Handlebars','swiper','BScroll','render','text!homeTpl','text!animationTpl'],function($,Handlebars,Swiper,BScroll,render,homeTpl,animationTpl){
    // 向下展开
    $('.btn-down').on('click',function(){
        $(".center-nav").slideDown(100);
    });
    // 向上收起
    $('.btn-up').on('click',function(){
        $(".center-nav").slideUp(100);
    });

    // 初始化type
    var type = 'home';
    // 点击导航
    $('.nav-list').on('click','li',function(){
        $(this).addClass('bg').siblings().removeClass('bg');
        var ind = $(this).index();
        if(ind>1){
            return false;
        }
        type = $(this).data('list');
        $('.scroll').html('');
        getAjax(type);
    });
    

    
    // 实例化bscroll list列表
    var scroll = new BScroll('.section',{
        scrollX:false,
        scrollY:true,
        click:true
    });
 
    getAjax(type)
    function getAjax(type){
        $.ajax({
            url:'/api/data?type='+type,
            dataType:'json',
            success: function(res){
               if(res.home){
                 getHome(res.home)
               }else if(res.animation){
                 getAnimation(res.animation);
               }
            }
        })
    }
    // home页面的内容
    function getHome(data){
        // console.log(data);
        $('.scroll').html(homeTpl);
         render('#home-tpl',data,'.scroll');
            // 实例化banner
            new Swiper('.banner',{
                autoplay:1000,
                loop:true,
                pagination:".pagination"
            });
         scroll.refresh();
    }
    // animation页面的内容
    function  getAnimation(data){
        console.log(data);
        $('.scroll').html(animationTpl);
        render('#animate-tpl',data,'.scroll');
        var navLiW = $('.two-nav li').eq(0).width();
        var navLen = $('.two-nav li').length+2;
        $('.two-nav ul').css('width',navLiW*navLen+'px');
        // animation页面导航
        var navscroll = new BScroll('.two-nav',{
            scrollX:true,
            scrollY:false,
            click:true
        });
        scroll.refresh();
    }


    // 点击进入详情页
    $('.scroll').on('click','.lists dl',function(){
          var favicon_id = $(this).data('id');
          var type = $(this).data('main');
          location.href ='page/detaile.html?favicon_id='+favicon_id+'&type='+type; 
    })
})