/**
 * @file MIP 支付组件常用方法
 * @author xuexb <fe.xiaowu@gmail.com>
 */

define(function (require) {
    'use strict';

    var extend = require('util').fn.extend;
    var viewer = require('viewer');

    var util = {};

    /**
     * 处理字符串query
     *
     * @type {Object}
     */
    util.querystring = {

        /**
         * 解析对象为 string
         *
         * @param  {Object} data 一级对象数据
         * @return {string}
         */
        stringify: function (data) {
            return Object.keys(data).map(function (key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(data[key] || '');
            }).join('&');
        }
    };

    /**
     * 容错解析 JSON
     *
     * @param  {string} content 内容
     * @return {Object}
     */
    util.parseJSON = function (content) {
        try {
            return JSON.parse(content);
        }
        catch (e) {
            return {};
        }
    };



    /**
     * 小小的封装下 ls
     *
     * @type {Object}
     */
    util.store = {

        /**
         * 存储 key 前缀
         *
         * @type {string}
         */
        prefix: 'mip-login-xzh:sessionId:',

        /**
         * 获取 key
         *
         * @param  {string} key 键值
         *
         * @return {string}
         */
        getKey: function (key) {
            return util.store.prefix + key;
        },

        /**
         * 检查是否支持 ls
         *
         * @type {boolean}
         */
        support: function () {
            var support = true;
            try {
                window.localStorage.setItem('lsExisted', '1');
                window.localStorage.removeItem('lsExisted');
            } catch (e) {
                support = false;
            }
            return support;
        }(),

        /**
         * 获取缓存数据
         *
         * @param  {string} key 数据名称
         * @return {string}
         */
        get: function (key) {
            if (util.store.support) {
                return localStorage.getItem(util.store.getKey(key));
            }
        },

        /**
         * 设置缓存数据
         *
         * @param {string} key   数据名称
         * @param {string} value 数据值
         * @param {UTC} expires 过期时间
         * @return {string}
         */
        set: function (key, value, expires) {
            if (util.store.support) {
                localStorage.setItem(util.store.getKey(key), value);
            }
        },

        /**
         * 删除缓存数据
         *
         * @param  {string} key 数据名称
         * @return {string}
         */
        remove: function (key) {
            if (util.store.support) {
                return localStorage.removeItem(util.store.getKey(key));
            }
        }
    };

    /**
     * 发送 POST 请求
     *
     * @param  {string} url  接口链接
     * @param  {Object} data  发送数据
     *
     * @return {Promise}
     */
    util.post = function (url, data) {
        return fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: util.querystring.stringify(data || {}),
            credentials: 'include'
        }).then(function (res) {
            return res.json();
        });
    };

    /**
     * 判断是否为 iframe 框架内打开
     *
     * @return {boolean}
     */
    util.isIframe = function () {
        return viewer.isIframed;
    };

    return util;
});
