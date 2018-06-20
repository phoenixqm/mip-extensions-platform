/**
 * @file mip-ptg-submit-ph 提交手机号码及短信验证组件
 * @Qi Ming <qiming@putibaby.com>
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var fn = require('util').fn;
    var util = require('./util');
    var mustache = require('mip-mustache/mustache');
    var SubmitPH = require('customElement').create();
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
     * 初始化
     */
    SubmitPH.prototype.init = function () {
        var self = this;

        /**
         * 会话标识
         *
         * @type {string}
         */
        self.sessionId = null;


        self.data = {
            error: '',
            errorTime: 2000
        };

        /**
         * 用户配置数据
         *
         * @type {Object}
         */
        // self.config = self.element.dataset;


        // 初始化组件内 <script type="application/json"> 配置合并到 this.data 中
        self.initJSON();


        // 注入设置会话标识接口
        self.addEventAction('setSessionId', function (event) {
            self.sessionId = event.sessionId;
        });

        // 注入追加数据接口
        self.addEventAction('addPostData', function (event) {
            self.addPostData(event.data);
        }); 
    };
    /**
     * 第一次进入可视区回调，只会执行一次
     */
    SubmitPH.prototype.firstInviewCallback = function () {
        this.render();
        var ele = this.element;
        // $('body').css({
        //     height: '100% !important'
        // });

        var smsSend = ele.querySelector('#smsSend');
        smsSend.addEventListener('click', function () {
            console.log(this);
        });
        var submitBtn = ele.querySelector('#submitBtn');
        submitBtn.addEventListener('click', function () {
            console.log(this);
        });        
    }

    /**
     * 输出错误信息到控制台
     *
     * @param {string} text 输出文本
     */
    SubmitPH.prototype.error = function (text) {
        console.error('[mip-ptg-order-list] ', text, this.element);
    };

    /**
     * 注入组件中的 JSON 配置到数据
     */
    SubmitPH.prototype.initJSON = function () {
        var self = this;
        var scripts = self.element.querySelectorAll('script[type="application/json"]');

        [].slice.call(scripts).forEach(function (script) {
            fn.extend(true, self.data, util.parseJSON(script.innerText));
        });
    };

    /**
     * 渲染组件内的模板内容
     */
    SubmitPH.prototype.render = function () {
        var self = this;
        var data = this.data;
                console.log(data)
        var elements = self.element.querySelectorAll('template[type="mip-mustache"]');

        [].slice.call(elements).forEach(function (el) {
            var html = mustache.render(el.innerHTML, data).trim();
            self.getElementByTemplate(el).innerHTML = html;
        });
    };

    /**
     * 使用 template 元素获取对应缓存元素
     *
     * @param  {HTMLElement} el 模板元素
     * @return {HTMLElement}
     */
    SubmitPH.prototype.getElementByTemplate = function (el) {
        if (el.dataset.id && el.nextElementSibling && el.nextElementSibling.id === el.dataset.id) {
            return el.nextElementSibling;
        }

        var id = 'mustache-id-' + Date.now();
        var node = document.createElement('div');
        var parent = el.parentNode;

        // 设置变量
        node.id = id;
        el.setAttribute('data-id', id);

        if (parent.lastChild === el) {
            parent.appendChild(node);
        } else {
            parent.insertBefore(node, el.nextSibling);
        }

        return node;
    };


    return SubmitPH;
});
