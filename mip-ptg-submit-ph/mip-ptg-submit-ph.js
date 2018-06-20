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




    var API = {};


    API.wrapRet_ = function(api, opts, cb) {
        util.post(api, opts)
        .then(function(ret) {
            if(ret.success) cb(true, ret.data);
            else cb(false, ret.error);
        })
        .catch(function(err) {
            cb(false, err);
        });
    }

    API.sendPhoneNumberVerifySms = function(phoneNumber, cb) {
        if(!/^1\d{10}$/.test(phoneNumber)) {
            cb(false, '错误的手机号');
            return;
        }

        API.wrapRet_(
            '/api/send_sms', {
                'phone_number': phoneNumber
            }, 
            cb);
    }


    API.sendPhoneNumberVerifySmsWithGt = function(phoneNumber, cb) {
        if(!/^1\d{10}$/.test(phoneNumber)) {
            cb(false, '错误的手机号');
            return;
        }

        // if (window.gt_loading) {
        //  setTimeout(function(){
        //      window.gt_loading = false;
        //  }, 100);
        //  return;
        // }




        var handler = function (captchaObj) {
            // captchaObj.appendTo('#captcha');
            captchaObj.onReady(function () {
                $("#wait").hide();
                captchaObj.verify();
            }).onSuccess(function () {
                var result = captchaObj.getValidate();
                if (!result) {
                    return alert('请完成验证');
                }
                // window.gt_loading = false;
                API.wrapRet_(
                    '/api/send_sms_validate', {
                        'phone_number': phoneNumber,
                        'geetest_challenge': result.geetest_challenge,
                        'geetest_validate': result.geetest_validate,
                        'geetest_seccode': result.geetest_seccode
                    }, 
                    cb);

            });

            window.captchaObj = captchaObj;

        };


        $.ajax({
            url: "/api/gt_register?t=" + (new Date()).getTime(), 
            type: "get",
            dataType: "json",
            success: function (ret) {
                console.log(ret);
                var data = ret.data;

                initGeetest({
                    gt: data.gt,
                    challenge: data.challenge,
                    offline: !data.success, 
                    new_captcha: data.new_captcha, 

                    product: "bind", 
                    width: "300px"
                }, handler);

            }
        });


    }

    API.verifyPhoneNumber = function(phoneNumber, sms, cb) {
        if(!/^1\d{10}$/.test(phoneNumber)) {
            cb(false, '错误的手机号');
            return;
        }

        if(!/^\d{4,6}$/.test(sms)) {
            cb(false, '错误的验证码');
            return;
        }

        API.wrapRet_(
            '/api/verify_sms', 
            {
                'phone_number': phoneNumber,
                'sms': sms
            }, cb);
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



    SubmitPH.prototype.sendCode_ = function(ph) {
        //this.setState({'error': null });

        if(!/^1\d{10}$/.test(ph)) {
            alert('错误的手机号,仅支持中国大陆手机号');
            return;
        }


        // API.sendPhoneNumberVerifySmsWithGt(p, function(isOk, err) {
        //     if(!isOk) {
        //         this.setState({
        //             'error': err
        //         });
        //         return;
        //     }
        //     this.setState({
        //         'count_down': 60
        //     })
        // }.bind(this));

        API.sendPhoneNumberVerifySms(ph, function(isOk, err) {
         if(!isOk) {
             alert(err);
             return;
         }
         // this.setState({
         //     'count_down': 60
         // });
        }.bind(this));
    },


    /**
     * 第一次进入可视区回调，只会执行一次
     */
    SubmitPH.prototype.firstInviewCallback = function () {
			  var that = this;
        this.render();
        var ele = this.element;
        // $('body').css({
        //     height: '100% !important'
        // });

        var smsSend = ele.querySelector('#smsSend');
        smsSend.addEventListener('click', function () {
            console.log(this);

            that.sendCode_($('#ph').val());
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
