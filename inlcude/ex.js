window.ex = {
    isClick:false,
    putTemp: function (ele, data) {
        var html = $('#' + ele).html(),
            args = html.match(/\{\{[A-z]*}}/g),
            i = 0,
            param = '',
            ReplaceArray = [];
        if (args == null)return;
        html = html.replace(/<loadimg/g, '<img');
        for (i = 0; i < args.length; i++) {
            param = args[i].substr(2, args[i].length - 4);
            if (data[param]) {
                ReplaceArray.push({
                    Reg: '{{' + param + '}}',
                    value: data[param]
                })
            }
        }
        for (i = 0; i < ReplaceArray.length; i++) {
            html = html.replace(ReplaceArray[i].Reg, ReplaceArray[i].value);
        }
        $('#' + ele).html(html);
    },

    jsonp: function (obj) {
        if(ex.isClick)return;
        $.jsonp({
            url: obj.url,
            callbackParameter:"callback",
            data: obj.data ? obj.data : null,
            success: obj.success,
            error:function () {
                alert('您的网络连接不太顺畅哦!');
            },
            beforeSend:function () {
                ex.isClick = true;
                $('#loading').show();
            },
            complete:function () {
                $('#loading').hide();
                ex.isClick = false;
            }
        })
    }
};
