/**
 * @file 新闻详情改变字体大小
 * @author 233 程序部
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var element = this.element;
        var domain = $(element).attr('data-domain');
        var pageIndex = $(element).attr('data-pageIndex');
        var pageSize = $(element).attr('data-pageSize');
        function getList() {
            $.ajax({
                url: 'https://mip.233.com/search/ajaxdata/wxCouser.asp',
                dataType: 'jsonp',
                type: 'get',
                data: {
                    domain: domain,
                    pageIndex: pageIndex,
                    'page-size': pageSize
                },
                success: function (res) {
                    if (res && res.S === '1') {
                        var data = res.data.items;
                        var html = '';
                        for (var i = 0; i < data.length; i++) {
                            if ((i + 1) % 2 > 0) {
                                html += ' <li class="list_kc2">';
                            } else {
                                html += ' <li class="list_kc2 right">';
                            }
                            html += ' <a href="' + data[i].link + '">';
                            html += ' <div class="list_kc2_img">';
                            html += '<mip-img src="' + data[i].src + '" alt="' + data[i].Title + '">';
                            html += '</mip-img>';
                            html += '<span class="video-icon2"></span>';
                            html += '</div>';
                            html += '<div class="con-side2">';
                            html += '<p class="h2-title">' + data[i].Subtitle + '</p>';
                            html += '<p class="st-num2"><i>' + data[i].study + '</i> 人报名</p>';
                            html += '</div>';
                            html += '</a>';
                            html += '</li>';
                        }
                        if (html) {
                            $(element).find('.c-lanmu-list').html(html);
                        }
                    }
                }
            });
        }
        $(element).find('.refresh-button').click(function () {
            getList();
            pageIndex++;
        });
    };
    return customElem;
});
