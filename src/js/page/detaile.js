require(['jquery','Handlebars','render'],function($,Handlebars,render){
    var query = location.search.split('?')[1];
    var obj = {};
    var arr = query.split('&');
    arr.forEach(function(v,i){
           obj[v.split('=')[0]] = v.split('=')[1];
    });
    $.ajax({
        url:"/api/detaile?favicon_id="+obj.favicon_id+"&type="+obj.type,
        dataType:'json',
        success:function(res){
            console.log(res);
            render('#detaile-tpl',res,'.wrap');
        }
    })
})