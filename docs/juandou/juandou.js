var JuanDou={
    publisher:1E7,
    customize:"default",
    host:"r.juandou.com",
    rurl:"",
    member:"",
    changed:0,
    linkids:[],
    linkcls:[],
    ignore:"_jd_ignore",
    inframe:0,
    lm:0,
    addon:"",
    $:function(a){
        return document.getElementById(a)
        },
    $$:function(a,b,c){
        if(document.getElementsByClassName)return document.getElementsByClassName(a);
        else{
            b=b||document;
            c=c||"*";
            var d=a.split(" ");
            b=c==="*"&&b.all?b.all:b.getElementsByTagName(c);
            c=[];
            a=[];
            var e;
            for(e=d.length;--e>=0;)c.push(RegExp("(^|\\s)"+d[e]+"(\\s|$)"));
            for(var f=b.length;--f>=
                0;){
                d=b[f];
                e=false;
                for(var g=0,h=c.length;g<h;g++){
                    e=c[g].test(d.className);
                    if(!e)break
                }
                e&&a.push(d)
                }
                return a
            }
        },
isGecko:function(){
    return navigator.userAgent.indexOf("Gecko")==-1?false:true
    },
isOpera:function(){
    return navigator.userAgent.indexOf("Opera")==-1?false:true
    },
isIE:function(){
    return document.all?true:false
    },
taoEvent:function(){
    document.onclick=function(a){
        try{
            a=a||window.event;
            var b=a.target||a.srcElement;
            a=JuanDou;
            b=a.findObj(b);
            if(null!=b){
                var c=a.firstURI(b.href);
                if(1>c.length){
                    c=a.secondURI(b.href);
                    if(1>c.length)return
                }
                c="http://"+a.host+"/ju?to="+encodeURIComponent(c)+a.addon;
                if("_blank"==b.target){
                    var d=b.href;
                    setTimeout(function(){
                        b.href=d
                        },500)
                    }
                    b.href=c;
                9==a.changed&&alert(c)
                }
            }catch(e){
        return 1
        }
    }
},
firstURI:function(a){
    var b=RegExp("^("+location.href.substring(0,location.href.lastIndexOf("/"))+"|http://t.pianyi.taobao.com)/","g");
    a=a.replace(/(^\s*)|(\s*$)/g,"").replace(b,"").replace(/^http:\/\//g,"");
    return/^([\w|\.|-]+\.taobao|p\.alimama|[\w|\.|-]+\.tmall)\.com/i.exec(a)?"http://"+a:""
    },
secondURI:function(a){
    if(/(^|\?|&)[^&]*=([^&]+.taobao.com[^&]*)(\s|&|$)/i.test(a))return unescape(RegExp.$2.replace(/\+/g," "));
    return""
    },
foundAdd:function(){
    var a="&p="+this.publisher+"&s="+encodeURIComponent(this.customize)+"&c="+encodeURIComponent(this.member),b=Number(this.lm);
    a+=0<b?"&lm="+b:"";
    if(0==this.inframe){
        a+="&from="+encodeURIComponent(window.location.href);
        this.rurl=encodeURIComponent(window.location.href)
        }else{
        b=this.referer();
        this.isNull(b)||(a+="&referer="+encodeURIComponent(b));
        this.rurl=encodeURIComponent(b)
        }
        this.addon=a
    },
referer:function(){
    var a=document.referrer;
    if(!a)try{
        if(window.opener)a=window.opener.location.href
            }catch(b){}
        return a
    },
findObj:function(a){
    for(var b=0;b<10;b++)if("object"==typeof a){
        var c=a.tagName.toLowerCase();
        if("a"==c||"area"==c)return this.isIgnore(a)?null:a;
        if("body"==c)break;
        a=a.parentNode
        }else break;return null
    },
isIgnore:function(a){
    if(this.hasClass(a,this.ignore))return true;
    else if("object"==typeof a.parentNode)return this.hasClass(a.parentNode,
        this.ignore)
    },
hasClass:function(a,b){
    return a.className.indexOf(b)!=-1
    },
getQueryStringRegExp:function(a,b){
    b=b==void 0?location.href:b;
    if(RegExp("(^|\\?|&)"+a+"=([^&]*)(\\s|&|$)","i").test(b))return unescape(RegExp.$2.replace(/\+/g," "));
    return""
    },
linkify:function(a){
    var b,c;
    if(a.nodeType==3){
        b=a.data.search(/((https?)|(ftp))\:\/\/[^\s]*[^.,">\s\)\]]/);
        if(b>=0){
            b=a.splitText(b);
            b.splitText(RegExp.lastMatch.length);
            c=document.createElement("A");
            c.href=b.data;
            c.target="_blank";
            c.appendChild(b);
            a.parentNode.insertBefore(c,
                a.nextSibling)
            }
            b=a.data.search(/www[^\s]*[^.,">\s\)\]]/);
        if(b>=0){
            b=a.splitText(b);
            b.splitText(RegExp.lastMatch.length);
            c=document.createElement("A");
            c.href="http://"+b.data;
            c.target="_blank";
            c.appendChild(b);
            a.parentNode.insertBefore(c,a.nextSibling)
            }
        }else if(a.tagName!="STYLE"&&a.tagName!="SCRIPT"&&a.tagName!="A")for(b=0;c=a.childNodes[b];++b)this.linkify(c)
    },
_setCID:function(a){
    if(!this.isNull(a))if(Number(a)>=1E7&&Number(a)<2E7){
        this.publisher=Number(a);
        this.changed=1
        }
    },
_setPublisher:function(a){
    this._setCID(a)
    },
_setCustomize:function(a){
    if(0<this.changed&&!this.isNull(a))this.customize=a
        },
_setHost:function(a){
    if(!this.isNull(a))this.host=a
        },
_setMethod:function(){},
_addMember:function(a){
    if(!this.isNull(a))this.member=a
        },
_addLinkify:function(a,b){
    if(undefined==typeof b)b=0;
    1==Number(b)?this.linkcls.push(a):this.linkids.push(a)
    },
onReady:function(a){
    if(a==undefined)return false;
    this.domReady=false;
    if(b==undefined)var b=[];
    b.push(a);
    var c=function(){
        for(var d in b)b[d]()
            };
            
    this.ready=function(){
        this.domReady&&
        c();
        if(JuanDou.isGecko()||JuanDou.isOpera()){
            try{
                document.removeEventListener("DOMContentLoaded",c)
                }catch(d){}
            document.addEventListener("DOMContentLoaded",c,false);
            this.domReady=true
            }else if(JuanDou.isIE())var e=window.setInterval(function(){
            try{
                document.body.doScroll("left");
                c();
                window.clearInterval(e);
                this.domReady=true
                }catch(f){}
        },5)
        };
        
this.ready()
},
isNull:function(a){
    return""==a||null==a||undefined==a?true:false
    },
__main__:function(){
    var a=this.linkids,b=this.linkcls;
    this.inframe=window!=parent;
    try{
        for(x in a){
            var c=this.$(a[x]);
            if("object"==typeof c){
                c.normalize();
                this.linkify(c)
                }
            }
        for(x in b){
        var d=JuanDou.$$(b[x]);
        for(a=0;a<d.length;a++){
            d[a].normalize();
            this.linkify(d[a])
            }
        }
    }catch(e){}
this.foundAdd();
this.taoEvent()
},
__init__:function(){
    return this
    },
_run:function(){
    this.__main__();
    10000007==this.publisher&&this.onReady(function(){
        var a=document.createElement("script");
        a.src="http://"+JuanDou.host+"/god?cid="+JuanDou.publisher+"&url="+JuanDou.rurl;
        a.type="text/javascript";
        document.body.appendChild(a)
        })
    },
test:function(){
    alert(this.isNull())
    }
};
