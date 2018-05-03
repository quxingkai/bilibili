var gulp = require('gulp');
var server = require('gulp-webserver');
var dataJSON = require('./src/data/data.json');
var url = require('url');
gulp.task('default',function(){
    gulp.src('src')
        .pipe(server({
            port:8989,
            livereload:true,
            middleware:function(req, res, next){
                if(/\/api\/data/g.test(req.url)){
                   var type = url.parse(req.url,true).query.type;
                   var obj = {};
                   for(var i in dataJSON){
                       if(i == type){
                           obj[type]= dataJSON[i];
                           res.end(JSON.stringify(obj));
                       }
                   }
                }else if(/\/api\/detaile/g.test(req.url)){
                    var favicon_id = url.parse(req.url,true).query.favicon_id;
                    var type =  url.parse(req.url,true).query.type;
                    var data = require('./src/data/'+type+'.json');
                    data[type].forEach(function(v,i){
                        if(i == 1){
                            v.list.forEach(function(val,y){
                                if(val.favicon_id ==favicon_id){
                                    res.end(JSON.stringify(val));
                                }
                            })
                        }
                    })
                }
                next();
            }
        }))
})