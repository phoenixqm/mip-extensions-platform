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
