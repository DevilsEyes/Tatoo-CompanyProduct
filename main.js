//var g$url = 'http://api.meizhanggui.cc/V2.0.0/';
var g$url = 'http://123.57.42.13/V2.0.0/';

var g$id = location.search.substr(1).match(/_id=([^\b&]*)/)[1];//获取店铺id

window.addEventListener('load', function () {
    FastClick.attach(document.body);
}, false);

DATA = {};

(function(){
    ex.jsonp({
        url:g$url + "CompanyProduct/info/?_method=GET",
        data:{
            _id:g$id
        },
        success:function(obj){
            obj = $.parseJSON(obj);

            var info = obj.data.productInfo;
            var i;
                if(obj.code==0){
                DATA.firstImg = info.images[0];
                DATA.imgs = info.images;

                info.title?DATA.title = info.title:$('h2').hide();
                info.description?DATA.desc = info.description:$('p').hide();

                if(info.tag){
                    DATA.tags = info.tag.split('#');
                    for(i=0;i<DATA.tags.length;i++){
                        $('#tagAr>div').append('<span class="f24">'+DATA.tags[i]+'</span>');
                    }
                    setTimeout(function () {

                        new IScroll('#tagAr',{
                            scrollX:true,
                            scrollY:false
                        });

                    }, 1000);
                }else{
                    $('#tag').hide();
                }

                if(info.images.length>1){
                    for(i=1;i<info.images.length;i++){
                        $('.other').append('<img class="wimg" src="'+info.images[i]+'?imageView2/0/w/640"/>');
                    }
                }

                ex.putTemp('page',DATA);
            }
        }
    })
})();