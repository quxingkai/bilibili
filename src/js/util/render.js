define(['Handlebars','jquery'],function(Handlebars,$){
    var fun = function(idTpl,data,domTpl){
       var source = $(idTpl).html();
       var template = Handlebars.compile(source);
       var html = template(data);
       $(domTpl).html(html);
    }
    return fun;
})