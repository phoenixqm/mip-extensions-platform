/**
 * @file mip-ptg-order-item 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();
    setHtmlRem();

    function setHtmlRem() {
        var b = document;
        var a = {};
        a.Html = b.getElementsByTagName('html')[0];

        a.widthProportion = function () {
            var c = (b.body && b.body.clientWidth || a.Html.offsetWidth) / 750;
            return c > 1 ? 1 : c < 0.4 ? 0.4 : c;
        };
        a.changePage = function () {
            var str = 'px!important; height: 100% !important;';
            a.Html.setAttribute('style', 'font-size:' + a.widthProportion() * 100 + str);

        };

        a.changePage();

        setInterval(a.changePage, 1000);
    }
    // 全局时间格式化输出     new Date().format('yyyy-MM-dd hh:mm:ss')

    // 时间格式化

    function formate(date, format) {
        var args = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
            'S': date.getMilliseconds()
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }

        for (var i in args) {
            if (args.hasOwnProperty(i)) {
                var n = args[i];
                if (new RegExp('(' + i + ')').test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? n : ('00' + n).substr(('' + n).length));
                }
            }

        }
        return format;
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var ele = this.element;
        var callBtn = ele.querySelector('.callBtn');
        callBtn.addEventListener('click', function () {
            console.log(this);
				});


    };
    return customElement;
});
