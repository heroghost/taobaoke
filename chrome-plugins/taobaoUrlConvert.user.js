// ==UserScript==
// @name 淘宝客链接转换工具
// @namespace http://vstimes.my.phpcloud.com/taoke
// @require http://code.jquery.com/jquery-1.8.2.min.js
// @include http://item.taobao.com/item.htm?*id=*
// @include http://detail.tmall.com/item.htm?*id=*
// @description 将当前的淘宝链接转换为淘宝客链接，结果请在http://vstimes.my.phpcloud.com/taoke中查询
// @grant require
// @grant include
// @grant run-at
// @run-at document-end
// @version 0.2 
// ==/UserScript==

//log
//加入tmall支持
//更好的输入信息方式
//@todo
//搜索结果页也能够使用
//
;
(function(cwindows,$){
    var Config = {
//        host:'http://vstimes.my.phpcloud.com/taoke/'
        host:'http://www.taobaoke.com/'
    }
    
    var Util = {
        _data:{},
        _store:cwindows.localStorage,
        set:function(key, val){
            this._data[key] = val;
        },
        get:function(key){
            return this._data[key] || false;
        },
        fetch:function(template, assignJson){
            assignJson = assignJson || {};
            if(!template){
                return '';
            }
        
            for(var key in assignJson){
                assignJson[key] = assignJson[key] || '';
                var reg = new RegExp('%'+key+'%', 'img');
                template = template.replace(reg, assignJson[key]);
            }
            template = template.replace( new RegExp('%.*?%', 'img'), '');
            return template;
        },
        setItem:function(key,val){
            this._store.setItem('gmail.liuleivstimes.' + key, val);
        },
        getItem:function(key){
            return  this._store.getItem('gmail.liuleivstimes.' +  key);
        },
        log:function(){
            if(!this.console){
                return ;
            }

            return this.console.log.apply(this.console,arguments);
        }
    }
    
    
    var BaseInfoWidget = {
        _box:$('<div/>').hide(),
        isOk:true,
        email:'',
        appkey:'',
        secret:'',
        init:function(){
            this._box.css({
                padding:'16px 10px',
                lineHeight:'12px',
                width:400,
                position:'fixed',
                top:100,
                left:$('body').width()/2 - 240,
                zIndex:1000000,
                border:'5px solid #ccc',
                background:'#fff'
            });
            
            var template = '<input type="%type%" name="%name%" placeholder="%placeholder%" value="%value%" style="height:25px; width:360px;%style%"/> <br/>';
            var inputTemplate = '<input type="%type%" name="%name%"  value="%value%" style="height:40px; width:80px;margin-right:10px;"/>';
            this._box.append(
                '<div style="color:red;"></div>'
                +Util.fetch(template, {
                    type:'text',
                    name:'email', 
                    placeholder:'您的email'
                })
                +Util.fetch(template, {
                    type:'text',
                    name:'appkey', 
                    placeholder:'对应的appkey'
                })
                +Util.fetch(template, {
                    type:'text',
                    name:'secret', 
                    placeholder:'对应的secret'
                })
                +Util.fetch(inputTemplate, {
                    type:'submit',
                    name:'submit', 
                    value:'开始使用',
                    style:'width:80px;height:40px;'
                })
                +Util.fetch(inputTemplate, {
                    type:'button',
                    name:'cancel', 
                    value:'关闭',
                    style:'width:80px;height:40px;'
                })
                );
                
            $('body').append(this._box);    
             
            var that = this;
            setTimeout(function(){
                that._bindEvents();
            },100);
        },
        _bindEvents:function(){
            var that = this;
            this._box.find(':submit').click(function(){
                that.email = that._box.find('input[name="email"]').val();
                that.appkey = that._box.find('input[name="appkey"]').val();
                that.secret = that._box.find('input[name="secret"]').val();
                
                if(!that.email){
                    that.setError('email is null');
                    that.isOk = false;
                }else{
                    Util.setItem('email', that.email);
                }
                
                if(!that.appkey){
                    that.setError('appkey is null');
                    that.isOk = false;
                }else{
                    Util.setItem('appkey', that.appkey);
                }
                
                if(!that.secret){
                    that.setError('secret is null');
                    that.isOk = false;
                }
                else{
                    Util.setItem('secret', that.secret);
                }
                
                if(that.isOk){
                    that.setError('');
                    that.close();
                }
            });
            
            this._box.find('input[name="cancel"]').click(function(){
                that.close();
            });
        },
        open:function(){
            this._box.find('input[name="email"]').val(Util.getItem('email'));
            this._box.find('input[name="appkey"]').val(Util.getItem('appkey'));
            this._box.find('input[name="secret"]').val(Util.getItem('secret'));
            this._box.show();
        },
        close:function(){
            this._box.hide();
        },
        setError:function(error){
            this._box.children('div').html(error);
        },
        getError:function(){
            return this._box.children('div').html();
        }
    }
    
    var Taoke = function(options){
        this._appkey = options.appkey || '';
        this._secret = options.secret || '';
        this._email = options.email || '';
    }
    
    Taoke.prototype = {
        _error:'',
        itemsConvert:function(url){
            if(!this._check('_email', '_appkey', '_secret')){
                this.setError('参数不全');
                return false;
            }
            var num_iids = this._getNumIIds(url);
            var iframe = $('<iframe />');
            $('body').append(iframe); 
            var paras = {
                num_iids:num_iids,
                appkey:this._appkey,
                secret:this._secret,
                email:this._email
            }
            
            iframe.attr('src', Config.host + 'geturl.php?' + $.param(paras));
            return true;
        },
        _getNumIIds:function(url){
            return $.trim(/id\=([0-9]+)/.exec(url)[1]);
        },
        _check:function(){
            for(var i in arguments){
                if(!this[arguments[i]]){
                    Util.log(arguments[i] + ' is null');
                    return false;
                }
            }
            
            return true;
        },
        setError:function(error){
            this._error = error;
        },
        getError:function(){
            return this._error;
        }
    }
    
    //exec
    var Body = {
        name:'淘宝客链接转换工具',
        _taoke:null,
        _detailBtn:$('<a/>'),
        _detailSetBtn:$('<button/>'),
        _searchBtns:$('<a/>'),
        _searchSetBtn:$('<button/>'),
        init:function(){
            BaseInfoWidget.init();
            
            if('detail' === this._getPageType()){
                this._initDetailPage();
            }
            //            else if('search' === this._getPageType()){
            //                //大多数是推广链接，不具有意义
            //                this._initSearchPage();
            //            }
        },
        _initDetailPage:function(){
            this._detailSetBtn.attr({
                title:'设置属性'
            }).html('设置');
            
            this._detailBtn.attr({
                href:'javascript:;',
                title:'请登陆'+Config.host+'获取生成的链接'
            }).css({
                color:'red'
            }).html('转换为淘宝客链接');
            
            if('taobao' === this._getChanne()){
                $('#J_StrPrice').parent().append(this._detailBtn).append(this._detailSetBtn);
            }else{
                $('#J_StrPrice').parent().append(this._detailBtn).append(this._detailSetBtn);
            }
            this._bindDetailPageEvents();
        },
        _initSearchPage:function(){
            this._searchSetBtn.attr({
                title:'设置属性'
            }).html('设置');
            
            this._searchBtn.attr({
                href:'javascript:;',
                title:'请登陆'+Config.host+'获取生成的链接'
            }).css({
                color:'red'
            }).html('转换为淘宝客链接');
            
            if('taobao' === this._getChanne()){
                $('#bid-form ul li em').each(function(index, item){
                    $(item).after('<span><a href="javascript:;" style="color:red;" class="__TaokeSearchConvertBtn__">转换</a> <button class="__TaokeSearchSetButton__">设置</button></span>');
                });
            }else{
                $('#J_ItemList .productPrice em').each(function(index, item){
                    $(item).after('<span>　<a href="javascript:;" class="__TaokeSearchConvertBtn__">转换</a> <button class="__TaokeSearchSetButton__" style="color:#000;">设置</button></span>');
                });
            }
            this._bindSearchPageEvents();
        },
        _bindDetailPageEvents:function(){
            var that = this;
            this._detailBtn.click(function(e){
                var url = location.href;
                if(!BaseInfoWidget.isOk){
                    BaseInfoWidget.open();
                    return ;
                }
                
                if(null === that._taoke){
                    that._taoke =  new Taoke({
                        email:Util.getItem('email'),
                        appkey:Util.getItem('appkey'),
                        secret:Util.getItem('secret')
                    });
                }
                
                var ret = that._taoke.itemsConvert(url);
                if(!ret){
                    alert(that._taoke.getError());
                    that._detailSetBtn.click();
                }
            });
            
            this._detailSetBtn.click(function(e){
                BaseInfoWidget.open();
            });
        },
        _bindSearchPageEvents:function(){
            var that = this;
            $('#bid-form ul li .__TaokeSearchConvertBtn__').live({
                click:function(){
                    var id = location.href;
                    if(!BaseInfoWidget.isOk){
                        BaseInfoWidget.open();
                        return ;
                    }
                    if(null === that._taoke){
                        that._taoke =  new Taoke({
                            email:Util.getItem('email'),
                            appkey:Util.getItem('appkey'),
                            secret:Util.getItem('secret')
                        });
                    }
                
                    var ret = that._taoke.itemsConvert(url);
                    if(!ret){
                        alert(that._taoke.getError());
                        that._detailSetBtn.click();
                    }
                    
                }
            });
            //, #J_ItemList .__TaokeSearchSetButton__
            $('#bid-form ul li .__TaokeSearchSetButton__, #J_ItemList .__TaokeSearchSetButton__').live({
                click:function(){
                    BaseInfoWidget.open();
                }
            });
        },
        _getChanne:function(){
            if(-1 !== location.hostname.indexOf('tmall')){
                return  'tmall';
            }
            
            return 'taobao';
        },
        _getPageType:function(){
            if(-1 !== location.href.indexOf('/search\?')){
                return 'search';
            }
            
            return 'detail';
        },
        _removeBtn:function(){
            this._detailSetBtn.remove();
            this._detailBtn.remove();
        }
    }
    
    Body.init();
})(unsafeWindow, jQuery);