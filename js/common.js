

// Webapp 主要封装了接口请求方法
var Webapp = {};

// Ajax - POST
Webapp.postLoadData = function(url, data, success, error) {
	var timeOut = true;
	if (data && (typeof(data) == "object")) {
		data.subtime = new Date().getTime();
	} else {
		data = {
			subtime: (new Date().getTime())
		};
	}
	setTimeout(function() {
		if (timeOut && error) error();
	}, 10000);
	$.ajax({
		"url": url,
		"data": data,
		"type": "post",
		"success": function(rtnData) {
			timeOut = false;
			if (rtnData.status == 302) {
				if(rtnData.desc){
					baseTool.popup(rtnData.desc);
				}
				
			} else if (rtnData.status == 200) {
				if (success) {
					success(rtnData);
				}
			} else {
				if (error) {
					error(rtnData);
				} else if(rtnData.desc){
					baseTool.popup(rtnData.desc);
				}
					
			}
		},
		"error": function(rtnData, t, tt) {
			timeOut = false;
			if (error) {
				error(rtnData)
			} else {
				baseTool.popup('服务繁忙');
			}
		},
		dataType: "json"
	});
}

// Ajax - GET
Webapp.loadJsonData = function(url_src, success, err_handle) {  //调用JSON数据
	var timeOut = false; var ok = false;	
	$.getJSON(url_src, function(data) {				
		if(!timeOut){								
			ok = true;
			success(data);		
		}
	});

	setTimeout(function(){				
		if(!ok) {			
			timeOut = true;			
			if(err_handle) err_handle(0);			 
		}
	},10000);
}

/**
 * [setCookie]
 * @param {[type]} name  [cookie name]
 * @param {[type]} value [cookie value]
 * @param {[type]} p     [格式如下（没有则默认为null）
 * 	                     {"expires": [cookie存在的时间，可以是"session" "hour" "day" "week" "year" "forever" 或 毫秒数或 Date对象],
 * 		                  "path":null,
 * 		                   "domain":null,
 * 		                  "secure":null }]
 */
Webapp.setCookie = function(name,value,p) {
	  var sCookie = name + '=' + encodeURIComponent(value);
	  if(p) {
	  	if(p.expires) {
		  	if(p.expires!="session") {
				var etime = new Date();
				if(p.expires instanceof Date){ etime = p.expires}
				else if(!isNaN(p.expires)) { etime.setTime(etime.getTime() + p.expires)}
				else if(p.expires=="hour") { etime.setHours(etime.getHours() + 1);}
				else if(p.expires=="day") { etime.setDate(etime.getDate() + 1)}
				else if(p.expires=="week") { etime.setDate(etime.getDate() + 7);}
				else if(p.expires=="year") { etime.setFullYear(etime.getFullYear() + 1);}
				else if(p.expires=="forever") { etime.setFullYear(etime.getFullYear() + 120);}
				else { etime = p.expires}
				sCookie += "; expires=" + etime.toGMTString();
			}
		}

		if(p.path) {
		  	sCookie += "; path=" + p.path;
		} else {
			sCookie += "; path=/";  
		}

		if(p.domain) {
		  	sCookie += "; domain=" + p.domain;
		} else {
		  	sCookie += "; domain=" + window.location.host;
		}

		if(p.secure) {
		  	sCookie += "; secure=" + p.secure;
		}
	}

	document.cookie = sCookie;
}

/**	
 * [getCookie]
 * @param  {[type]} objname [cookie name]
 * @return {[type]} value   [cookie value]
 */
Webapp.getCookie = function(objname) {
	var arrstr = document.cookie.split("; ");
	for(var i = 0;i < arrstr.length;i ++) {
		var temp = arrstr[i].split("=");
		if(temp[0] == objname) return decodeURIComponent(temp[1]);
	}

	return null;
}

// 封装一些可复用的方法
var Common = function() {};

Common.prototype = {
	_dectectBroswer: function() {
		var userAgent = navigator.userAgent,
            result = '';

        if(userAgent.match(/Chrome/i)) {
            result = 'Chrome';
        } else if(userAgent.match(/Firefox/i)) {
            result = 'Firefox';
        } else if(userAgent.match(/Mobile\/[0-9A-z]{6,10} Safari/i)) {
            result = 'Mobile Safari';
        } else if(userAgent.match(/Android/i)) {
            result = 'Android';
        } else if(userAgent.match(/ucweb/i)) {
            result = 'UCWeb';
        } else if(userAgent.match(/MQQBrowser/i)) {
            result = 'QQBrowser';
        } else if(userAgent.match(/Windows Phone/i)) {
            result = 'Windows Phone';
        } else {
            result = 'Other';
        }

        return result;
	},
	_dectectAppLink: function() {
		var userAgent = navigator.userAgent,
            appLink = '';
		var whichChannel = getUrlParams(window.location.href, 'channelid') || Webapp.getCookie('channelid');
		if(userAgent.match(/iPhone|iPad/i)) {
			if(userAgent.indexOf("MicroMessenger")>-1){
                appLink = "../um0.cn/8ArgH/default.htm";
                //appLink = "../a.app.qq.com/o/simple.jsp@pkgname=cn.touna.touna";
            } else if(whichChannel == 'A00001' || whichChannel == 'A00002') {
            	appLink = '../um0.cn/4tGsa9/default.htm';		
            } else if(whichChannel == 'A00003' || whichChannel == 'A00004') {
            	appLink = '../um0.cn/WRCIr/default.htm';
            } else if(whichChannel == 'A00005' || whichChannel == 'A00006') {
            	appLink = '../um0.cn/4dZc0r/default.htm';
            } else if(whichChannel == 'C00002') {
            	appLink = '../um0.cn/1FL9sp';
            } else if(whichChannel == 'C00003') {
            	appLink = '../um0.cn/3NkLtw';
            } else if(whichChannel == 'C00004') {
            	appLink = '../um0.cn/1Gl6Bv';
            } else if(whichChannel == 'A00009') {
            	appLink = '../um0.cn/3Iajfn/default.htm';
            } else if(whichChannel == 'C00005') {
            	appLink = '../um0.cn/3MzSUG/default.htm';
            } else if(whichChannel == 'C00006') {
            	appLink = 'hhttp://um0.cn/2xU6xH/';
            } else if(whichChannel == 'A00010') {
            	appLink = '../um0.cn/3lJiQG/default.htm';
            } else if(whichChannel == 'C00007') {
            	appLink = '../um0.cn/409d78/default.htm';
            } else if(whichChannel == 'C00010') {
            	appLink = '../um0.cn/1LVo60/default.htm';
            } else if(whichChannel == 'A00027') {
            	appLink = '../um0.cn/2LrK0k';
            } else if(whichChannel == 'A00022') {
            	appLink = '../um0.cn/1oaqVY';
            } else if(whichChannel == 'A00021') {
            	appLink = '../um0.cn/1UsPnq';
            } else if(whichChannel == 'A00026') {
            	appLink = '../um0.cn/4ivDxy';
            } else if(whichChannel == 'A00024') {
            	appLink = '../um0.cn/3GUiYm';
            } else if(whichChannel == 'A00023') {
            	appLink = '../um0.cn/42jhMb';
            } else if(whichChannel == 'A00025') {
            	appLink = '../um0.cn/1FQVrN';
            } else if(whichChannel == 'A00028') {
            	appLink = '../um0.cn/1JDUq';
            } else if(whichChannel == 'A00008') {
            	appLink = '../um0.cn/1ipmLI';
            } else if(whichChannel == 'A00031') {
            	appLink = '../um0.cn/374aRt';
            } else if(whichChannel == 'A00029') {
            	appLink = '../um0.cn/1gFqAH';
            } else if(whichChannel == 'C00012') {
            	appLink = '../um0.cn/3Jybkw';
            } else if(whichChannel == 'C00013') {
            	appLink = '../um0.cn/15vAQx';
            } else if(whichChannel == 'C00015') {
            	appLink = '../um0.cn/1qbUuH';
            } else if(whichChannel == 'C00016') {
            	appLink = '../um0.cn/1CrgIB';
            } else if(whichChannel == 'C00017') {
            	appLink = '../um0.cn/2QmEr7';
            } else if(whichChannel == 'C00018') {
            	appLink = '../um0.cn/2PaDPq';
            } else if(whichChannel == 'C00019') {
            	appLink = '../um0.cn/1XDWq7';
            } else if(whichChannel == 'C00032') {
            	appLink = '../um0.cn/75W5D';
            } else if(whichChannel == 'C00020') {
            	appLink = '../um0.cn/qFVc';
            } else if(whichChannel == 'C00021') {
            	appLink = '../um0.cn/3jVWg0';
            } else if(whichChannel == 'C00022') {
            	appLink = '../um0.cn/uhZKx';
            } else if(whichChannel == 'C00023') {
            	appLink = '../um0.cn/1AGBw4';
            } else if(whichChannel == 'C00024') {
            	appLink = '../um0.cn/4zxOfa';
            } else if(whichChannel == 'C00025') {
            	appLink = '../um0.cn/1ZvLZl';
            } else if(whichChannel == 'C00026') {
            	appLink = '../um0.cn/1Vjh1V';
            } else if(whichChannel == 'C00027') {
            	appLink = '../um0.cn/dPdNn';
            } else if(whichChannel == 'A00033') {
            	appLink = '../um0.cn/UgqpT';
            } else if(whichChannel == 'A00034') {
            	appLink = '../um0.cn/1dbD2N';
            } else if(whichChannel == 'A00035') {
            	appLink = '../um0.cn/4tQHg4';
            } else if(whichChannel == 'A00036') {
            	appLink = '../um0.cn/3htYmy';
            } else {
            	appLink = '../um0.cn/8ArgH';
            }
        } else if(userAgent.match(/Android/i)) {
			if(whichChannel == 'A00001' || whichChannel == 'A00002') {
            	appLink = '../file.touna.cn/app/touna_licai_bdss.apk';		
            } else if(whichChannel == 'A00003' || whichChannel == 'A00004') {
            	appLink = '../file.touna.cn/app/touna_licai_360ss.apk';
            } else if(whichChannel == 'A00005' || whichChannel == 'A00006') {
            	appLink = '../file.touna.cn/app/touna_licai_sgss.apk';
            } else if(whichChannel == 'C00002') {
            	appLink = '../file.touna.cn/app/touna_licai_zaker.apk';
            } else if(whichChannel == 'C00003') {
            	appLink = '../file.touna.cn/app/touna_licai_ckxx.apk';
            } else if(whichChannel == 'C00004') {
            	appLink = '../file.touna.cn/app/touna_licai_hsp.apk';
            } else if(whichChannel == 'A00009') {
            	appLink = '../file.touna.cn/app/touna_licai_ttkd.apk';
            } else if(whichChannel == 'C00005') {
            	appLink = '../file.touna.cn/app/touna_licai_bmsh.apk';
            } else if(whichChannel == 'C00006') {
            	appLink = '../file.touna.cn/app/touna_licai_wxdh.apk';
            } else if(whichChannel == 'A00010') {
            	appLink = '../file.touna.cn/app/touna_licai_by1.apk';
            } else if(whichChannel == 'C00007') {
            	appLink = '../file.touna.cn/app/touna_licai_wy.apk';
            } else if(whichChannel == 'C00010') {
            	appLink = '../file.touna.cn/app/touna_licai_by2.apk';
            }  else if(whichChannel == 'A00027') {
            	appLink = '../file.touna.cn/app/touna_licai_pcxm.apk';
            } else if(whichChannel == 'A00022') {
            	appLink = '../file.touna.cn/app/touna_licai_sm.apk';
            } else if(whichChannel == 'A00021') {
            	appLink = '../file.touna.cn/app/touna_licai_gdt.apk';
            } else if(whichChannel == 'A00026') {
            	appLink = '../file.touna.cn/app/touna_licai_google.apk';
            } else if(whichChannel == 'A00024') {
            	appLink = '../file.touna.cn/app/touna_licai_bdwm.apk';
            } else if(whichChannel == 'A00023') {
            	appLink = '../file.touna.cn/app/touna_licai_360wm.apk';
            } else if(whichChannel == 'A00025') {
            	appLink = '../file.touna.cn/app/touna_licai_sgwm.apk';
            } else if(whichChannel == 'A00028') {
            	appLink = '../file.touna.cn/app/touna_licai_pcsh.apk';
            } else if(whichChannel == 'A00008') {
            	appLink = '../file.touna.cn/app/touna_licai_bdcf.apk';
            } else if(whichChannel == 'A00031') {
            	appLink = '../file.touna.cn/app/touna_licai_by5.apk';
            } else if(whichChannel == 'A00029') {
            	appLink = '../file.touna.cn/app/touna_licai_by3.apk';
            } else if(whichChannel == 'C00012') {
            	appLink = '../file.touna.cn/app/touna_licai_by4.apk';
            } else if(whichChannel == 'C00013') {
            	appLink = '../file.touna.cn/app/touna_licai_by6.apk';
            } else if(whichChannel == 'C00015') {
            	appLink = '../file.touna.cn/app/touna_licai_by9.apk';
            } else if(whichChannel == 'C00016') {
            	appLink = '../file.touna.cn/app/touna_licai_by8.apk';
            } else if(whichChannel == 'C00017') {
            	appLink = '../file.touna.cn/app/touna_licai_yowifi.apk';
            } else if(whichChannel == 'C00018') {
            	appLink = '../file.touna.cn/app/touna_licai_by13.apk';
            } else if(whichChannel == 'C00019') {
            	appLink = '../file.touna.cn/app/touna_licai_by14.apk';
            } else if(whichChannel == 'C00032') {
            	appLink = '../file.touna.cn/app/touna_licai_by15.apk';
            } else if(whichChannel == 'C00020') {
            	appLink = '../file.touna.cn/app/touna_licai_by16.apk';
            } else if(whichChannel == 'C00021') {
            	appLink = '../file.touna.cn/app/touna_licai_mmy.apk';
            } else if(whichChannel == 'C00022') {
            	appLink = '../file.touna.cn/app/touna_licai_xm.apk';
            } else if(whichChannel == 'C00023') {
            	appLink = '../file.touna.cn/app/touna_licai_jf.apk';
            } else if(whichChannel == 'C00024') {
            	appLink = '../file.touna.cn/app/touna_licai_lx.apk';
            } else if(whichChannel == 'C00025') {
            	appLink = '../file.touna.cn/app/touna_licai_mm.apk';
            } else if(whichChannel == 'C00026') {
            	appLink = '../file.touna.cn/app/touna_licai_gdt.apk';
            } else if(whichChannel == 'C00027') {
            	appLink = '../file.touna.cn/app/touna_licai_by24.apk';	
            } else if(whichChannel == 'A00033') {
            	appLink = '../file.touna.cn/app/touna_licai_by17.apk';
            } else if(whichChannel == 'A00034') {
            	appLink = '../file.touna.cn/app/touna_licai_by18.apk';
            } else if(whichChannel == 'A00035') {
            	appLink = 'hhttp_3A//file.touna.cn/app/touna_licai_by19.apk';
            } else if(whichChannel == 'A00036') {
            	appLink = '../file.touna.cn/app/touna_licai_sgpz.apk';
            } else {
            	appLink = '../file.touna.cn/app/touna_licai_gwwap.apk';
            }
        } 
		else {
            appLink = '../file.touna.cn/app/touna_licai_gwwap.apk';
        }

        return appLink;
	},
	_getTime: function() {
		var date = new Date();
		var month = '';
		var day = '';

		if((date.getMonth()+1)<10) {
			month = '0'+(date.getMonth()+1).toString();
		} else {
			month = (date.getMonth()+1).toString();
		}

		if(date.getDate() < 10) {
			day = '0' + date.getDate().toString();
		} else {
			day = date.getDate().toString();
		}

		date = date.getFullYear() + '-' + month + '-' + day;

		return date;
	},
	_checkNull: function(value) {
		if(value == '' || value == null) {
			return false;
		} else {
			return true;
		}
	},
	_checkZhName: function(value) {
		var reg = /^[\u4e00-\u9fa5a]{2,6}$/;
		if(reg.exec(value) == null) {
			return false;
		} else {
			return true
		}
	},
	_checkRegisName: function(value) {
		var reg = /^([a-zA-Z])([a-zA-Z0-9_-]){3,19}$/;
		if(reg.exec(value) == null) {
			return false;
		} else {
			return true;
		}
	},
	_checkLoginName: function(value) {
		var reg = /^(13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}|18[0-9]{9})|([a-zA-Z0-9_-]|[\u4e00-\u9fa5a]){2,16}$/;
		if(reg.exec(value) == null) {
			return false;
		} else {
			return true;
		}
	},
	_checkPw: function(value) {
		var reg = /^(?![^a-zA-Z]+$)(?!\D+$).{6,20}$/;
		if(reg.exec(value) == null) {
			return false;
		} else {
			return true;
		}
	},
	_checkPhone: function(value) {
		var reg = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}|18[0-9]{9}$/;
		if(reg.exec(value) == null) {
			return false;
		} else {
			return true
		}
	},
	_checkCode: function(value) {
		var reg = /^[0-9a-zA-Z]{4}|[0-9]{6}$/;
		if(reg.exec(value) == null) {
			return false;
		} else {
			return true
		}
	},
	_checkCardId:function(value){
		var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;	
		if(reg.exec(value) == null){
			return false;	
		}
		else{
			return true;	
		}
	},
	_checkEmail:function(value){
		var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
		if(reg.exec(value) == null){
			return false;	
		}
		else{
			return true;	
		}
	},
	//空格判断
	_checkSpace:function(value){
		var reg = /\s/;
		if(reg.exec(value) == null){
			return false;		
		}
		else{
			return true;	
		}	
	},
	//QQpanduan  
	_checkqq:function(value){
		var reg = /^[1-9]\d{4,14}$/;
		if(reg.exec(value) == null){
			return false;		
		}
		else{
			return true;	
		}	
	},
	/**
	 * [_wxShare 这是一个weixin分享的调用，需在页面引入weixin对应的js-sdk的js文件]
	 * @param  {[String]} title [自定义分享title]
	 * @param  {[String]} desc  [自定义分享描述]
	 * @return {[]}       [null]
	 */
	_wxShare: function(title, desc) {
		var time = '',  nostring = '', signa = '';
		var args = {
            'method': 'weChatGetJsapiTicket',
            'url': window.location.href
        };

        Webapp.postLoadData('auth.do', args,
            function(data) {
            	//console.log(data);
            	time = data.result.wxData.timestamp;
            	nostring = data.result.wxData.nonceStr;
            	signa = data.result.wxData.signature;
            	wx.config({
				    debug: false,
				    appId: 'wxec497f0ad75e6026',
				    timestamp: time,
				    nonceStr: nostring,
				    signature: signa,
				    jsApiList: [
				        'checkJsApi',
				        'onMenuShareTimeline',
				        'onMenuShareAppMessage'
				    ]
			  	});

		        //console.log("time: " + time + " nonceStr: " + nostring + " signature: " + signa);
			  	wx.ready(function() {
			  		wx.onMenuShareAppMessage({
				        title: title,
				        desc: desc,
				        link: window.location.href,
				        imgUrl: '../m.touna.cn/img/touna-app-icon.png',
				        fail: function (res) {
				           //alert(JSON.stringify(res));
				        }
				    });

				    wx.onMenuShareTimeline({
			    	    title: title,
				        desc: desc,
				        link: window.location.href,
				        imgUrl: '../m.touna.cn/img/touna-app-icon.png',
				        fail: function (res) {
				            //alert(JSON.stringify(res));
				        }
				    });
			  	});
            }, 
            function(e) { /*console.log(e);*/}
        );
	}
}

var common = new Common();

// 更多理财产品滚动 
function ivtProdListSlide(){
	var	liMr = parseInt($(".ivtProdList li").css("marginRight")),
		liWidth = parseInt($(".ivtProdList li").outerWidth()) + liMr,
		totalWidth = liWidth * $(".ivtProdList li").size(),
		boxWidth = $(".investmentProduct").width();
	
	
	
	$(".ivtProd-next-btn").click(function(){
		if( parseInt($(".ivtProdList").css("left")) <= (-totalWidth) + boxWidth + liMr ){
			$(".ivtProdList").css({
				left : 0
			});
		}else{
			$(".ivtProdList").animate({
				left : '-='+liWidth*3
			});
		}
	});
	
	$(".ivtProd-prev-btn").click(function(){
		if( $(".ivtProdList").css("left") >= '0px' ){
			$(".ivtProdList").animate({
				left : boxWidth - totalWidth + liMr
			});
		}else{
			$(".ivtProdList").animate({
				left : '+='+liWidth*3
			});
		}
	});
	
	$('.investmentProduct').on("swiperight",function(){
		if( parseInt($(".ivtProdList").css("left")) <= (-totalWidth) + boxWidth + liMr ){
			$(".ivtProdList").animate({
				left : 0
			});
		}else{
			$(".ivtProdList").animate({
				left : '-='+liWidth*3
			});
		}
		
	});
	
	
	// 更多理财产品Tab 
	$(".ivtProdCon").eq(0).show()
	$(".ivtProdList li").each(function(idx){
		$(this).click(function(){
			$(".ivtProdList li").removeClass("cur");
			$(this).addClass("cur");
			$(".ivtProdCon").hide();
			$(".ivtProdCon").eq(idx).show()
		});
	});
};

// 广告跟踪 - BEGIN NOTE->通过在页面or域名下写入cookie实现跟踪
var adsFollow = function(utm_source, utm_medium, utm_term, utm_content, utm_campaign, utm_cookie) {
    var args = {
    	"method" : "adsFollowRegester",
		"utmSource" : utm_source,
		"utmMedium" : utm_medium,
		"utmTerm" : utm_term,
		"utmContent" : utm_content,
		"utmCampaign" : utm_campaign,
		"utmCookie" : utm_cookie
    };

    Webapp.postLoadData('auth.do', args,
        function(data) {}, 
        function(e) {}
    );

}

// 渠道跟踪
var adsChannelView = function(channelid, regviewpv, allpv, regcount, downloadapp, appdate, regpage) {
	var args = {
        "method": "addChannelView",
        "channelid": channelid,
        "regviewpv": regviewpv,
        "allpv": allpv,
        "regcount": regcount,
        "downloadapp": downloadapp,
        "appdate": common._getTime(),
        "regpage": regpage
    }

    Webapp.postLoadData('appMobile.do', args,
        function(data) {}, 
        function(e) {}
    );

    Webapp.setCookie('channelid', channelid, {"expires":"day", "domain":window.location.host});
}

// 获取url参数 - REFFER->rapidborrowing-stock.js
function getUrlParams(url, n) {
	var hrefstr, pos, parastr, para, tempstr;
    hrefstr = url;
    pos = hrefstr.indexOf("?");
    parastr = hrefstr.substring(pos + 1);
    para = parastr.split("&");
    tempstr = "";
    for (var i = 0; i < para.length; i++) {
        tempstr = para[i];
        pos = tempstr.indexOf("=");
        if (tempstr.substring(0, pos).toLowerCase() == n.toLowerCase()) {
            return decodeURIComponent(tempstr.substring(pos + 1));
        }
    }
    return null;
}

// 登出
function logout() {
    Webapp.postLoadData('auth.do', {'method': 'logout'},
        function(data) {
            window.location.href = 'sign-in.html';
        }, 
        function(e) { }
    );
}
//暂时用不上
function stopAnimate() {
	$('.loading').css('display', 'none'); 
	$('.mask').css('display', 'none');
}

// app下载跟踪 - NOTE->暂时无效果 待del
function downloadColl() {
	var url = window.location.href;
	if(getUrlParams(url, "utm_source")){
		adsFollow(getUrlParams(url, "utm_source"), getUrlParams(url, "utm_medium"), getUrlParams(url, "utm_term"), getUrlParams(url, "utm_content"), getUrlParams(url, "utm_campaign"), getUrlParams(url, "utm_cookie")); 
	}
	if(getUrlParams(url, "channelid")){
		adsChannelView(getUrlParams(url, "channelid"), 0, 0, 0, 1, common._getTime(), 0);
	}else if(Webapp.getCookie("channelid")){
		adsChannelView(Webapp.getCookie("channelid"), 0, 0, 0, 1, common._getTime(), 0);
	}
}

$(function() {	
	// if login
    Webapp.postLoadData('auth.do', {'method': 'isLogin'},
        function(data) {

            if(!data.result) {
                $("header .menu").click(function() {
                    $(".subCont_nol").toggle();
                    var menuSty = $('.menu .all').css('display');
                    if(menuSty == 'none'){
                    	$('.menu .all').css('display','block');
                    	$('.menu .all_check').css('display','none');
                    	$('.whitemask').css('display','none');
                    }
                    else{
                    	$('.menu .all').css('display','none');
                    	$('.menu .all_check').css('display','block');
                    	$('.whitemask').css('display','block');
                    }
                });

                $('.topLogin').show();               
            } else {
                $("header .menu").click(function() {
                    $(".subCont_nol").toggle();
                    $('.subCont_nol .a1').css('display','none');
                     $('.subCont_nol .a2').css('display','block');
                    var menuSty = $('.menu .all').css('display');
                    if(menuSty == 'none'){
                    	$('.menu .all').css('display','block');
                    	$('.menu .all_check').css('display','none');
                    	$('.whitemask').css('display','none');
                    }
                    else{
                    	$('.menu .all').css('display','none');
                    	$('.menu .all_check').css('display','block');
                    	$('.whitemask').css('display','block');
                    }
                });

                $('.topLogin').html('账户').attr('href', 'user-account.html');               
            }
        }, 
        function(e) {
        	$("header .menu").click(function() {
                $(".subCont_nol").show();
            });

            $('.topLogin').show();      
        }
    );

/*    $('header .menu').click(function(evt) {
		$('body').not($(this)).one('click', function() {
			$(".subCont_nol").fadeOut(100);
			        var menuSty = $('.menu .all').css('display');
                    if(menuSty == 'none'){
                    	$('.menu .all').css('display','block');
                    	$('.menu .all_check').css('display','none');
                    }
                    else{
                    	$('.menu .all').css('display','none');
                    	$('.menu .all_check').css('display','block');
                    }
		});
		evt.stopPropagation();
	});*/
	
	$('.whitemask').click(function(){
		$(this).css("display","none");
		 $(".subCont_nol").toggle();
        $('.menu .all').css('display','block');
    	$('.menu .all_check').css('display','none');
		
	});

	//查询红点消失的功能
	Webapp.postLoadData('appMobile.do',{'method':'redLoad'},function(data){
		if(data.result.list){
			var rchec = data.result.list;
			redchuli(rchec);
		}
	},function(e){
		//baseTool.popup(e.desc);
	});
	//对JSON数据做处理 并绑定响应的点击事件
	function redchuli(r){
							//0红点是否显示
		
		if(r != ''){
				var redcheck = 	r[0].redcheck; 
				var redN = redcheck.trim().split(',');
				for(var i=0;i<redN.length;i++){
					
					//大模块
					var dd = '#'+redN[i];
					$(dd).unbind('click');
					//红点
					var divi = '#h'+redN[i];
					//localkey
					var redtimeo = "redtime"+redN[i];
						hoval(redtimeo,divi);
						redcli(redN[i],redtimeo);	
				}
				var sid = Webapp.getCookie('sid');
				if(sid){
					$('#2,#3').unbind();
					$('#h2,#h3').remove('.hongdian');
				}
		}
			
	}

	//dianji事件
	function redcli(redN,redtimeo){
		var $dd = $('#'+ redN);
		$dd.data("a" , "#h"+redN);
		$dd.data("b" , redtimeo);

		$dd.live('click',function(){
			var $this = $(this);
			$($this.data("a")).css('display','none');
			localStorage.setItem($this.data("b"),new Date().getTime());
		});

	}
	//红点计时器
	function hoval(redtimeo,divi){
		var hb0 = false;
		var loca = localStorage.getItem(redtimeo);
		var times = 3600000;
		if(loca != null){
			var houz = parseInt((new Date().getTime()-loca)/times);
			if(houz > 48){
				$(divi).css('display','block');
			}
			else{
				$(divi).css('display','none');
			}
		}
		else{
			$(divi).css('display','block');
		}
		var dt = $(divi).css('display');
		if(dt == 'block'){
			hb0 = true;
		}
		if(hb0){
			$('#h0').css('display','block');
		}
	}
    /* page view count -> deled */
    /*function countView() {	
        var params = {
            'method': 'addAppMobileUserView',
            'visitdate': common._getTime(),
            'regcount': 0,
            'logcount': 0,
            'username': ''
        }

        Webapp.postLoadData('appMobile.do', params,
            function(data) {
            },
            function(e) {
        });      
    } 

    countView();*/
	
    // Android 下微信内置浏览器下载遮罩
    $('body').append('<div class="maskImg"><aside class="wx-tips" style="width:100%;height:100%;position:fixed;left:0;top:0;z-index:9500;background:rgba(0,0,0,.7);"><div><img src="img/quote.png"><p style="position: relative;top: -95px;">请点击右上角<br>选择在手机浏览器中打开此页面<br><span>再点击下载APP</span></p></div></aside></div>');

	function is_weixin(){
	    var ua = navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i)=="micromessenger") {
	        return true;
	    } else {
	        return false;
	    }
	}

	if(is_weixin()){
		var userAgent = navigator.userAgent;
		$('.app-link').on('click',function(){
	    	//$('body').append('<aside class="wx-tips" style="width:100%;height:100%;position:fixed;left:0;top:0;z-index:9500;background:rgba(0,0,0,.7);"><div><img src="../m.touna.cn/img/quote.png"><p style="position: relative;top: -95px; color:green;">请点击右上角<br>选择在手机浏览器中打开此页面<br><span>再点击下载APP</span></p></div></aside>');
	        //$('body').append('<aside style="width:100%;height:100%;position:fixed;left:0;top:0;z-index:9500;background:rgba(0,0,0,.7);"><div style="width:268px;height:201px;margin:60px 22px 0 0;padding:100px 12px 0 0;float:right;text-align:center;color:#fff;font:bold 16px/26px \'Helvetica\';box-sizing:border-box;background:url(http://115.29.163.231/wap/img/quote.png);background-size:contain;">请点击右上角<br>选择在手机浏览器中打开此页面<br><span>再点击下载APP</span></div></aside>');
	        if(userAgent.match(/Android|iPhone|iPad/i)) {
	        	$('.maskImg').show();
	        }
	    });
	}

	// 下载链接适配
    //$('a.app-link, a.app-link-index').attr("href", common._dectectAppLink());

    $('a.appDownloadBar').attr("href", common._dectectAppLink());

    $('.app-link').on('click', function() {
    	downloadColl();
    });
  
    // 广告跟踪调用
    /*if(getUrlParams(window.location.href, "utm_source")) {
    	var url = window.location.href;
    	adsFollow(getUrlParams(url, "utm_source"), getUrlParams(url, "utm_medium"), getUrlParams(url, "utm_term"), getUrlParams(url, "utm_content"), getUrlParams(url, "utm_campaign"), getUrlParams(url, "utm_cookie")); 
    }*/
  
  /*广告跟踪  */
  	var xl = function(e){
	return document.getElementById(e);
}
/**
 * 返回当前URL上的变量 "../a.xunlei.com/@name1=value1&name2=value2&...."
 * @param {String} n 变量名
 * @return 变量值
 */
	xl.P = function(n){		
		var hrefstr, pos, parastr, para, tempstr;
		hrefstr = window.location.href;
		pos = hrefstr.indexOf("?");
		parastr = hrefstr.substring(pos + 1);
		para = parastr.split("&");
		tempstr = "";
		for (i = 0; i < para.length; i++) {
			tempstr = para[i];
			pos = tempstr.indexOf("=");
			if (tempstr.substring(0, pos).toLowerCase() == n.toLowerCase()) {
				try{
					return decodeURIComponent(tempstr.substring(pos + 1));
				}catch(e){
					return decodeFromGb2312(tempstr.substring(pos + 1))
				}
			}
		}
		return null;	
	}


//alert(xl.P("utm_campaign"));
		if(xl.P("utm_source")){
		 rxdai.adsFollow(xl.P("utm_source"),xl.P("utm_medium"),xl.P("utm_term"),xl.P("utm_content"),xl.P("utm_campaign"),xl.P("utm_cookie"));
		}
 
	// 渠道统计调用
    if(getUrlParams(window.location.href, "channelid") || Webapp.getCookie('channelid') ) {
    	var url = window.location.href;
    	var regnum = url.indexOf("sign-up")>-1 ? 1 :  0;
    	var channelid = getUrlParams(window.location.href, "channelid") || Webapp.getCookie('channelid'); 
	    adsChannelView(channelid, regnum, 1, 0, 0, common._getTime(), 0);
	}

	// 更多理财产品滚动
	//ivtProdListSlide();
	
	// 投哪APP下载bar
	$(".appDownloadBar i").click(function() {
		$(".appDownloadBar").hide()
	});
	
	// 通用 下拉框
	$(".selectBox").click(function() {
		$("aside",this).toggle();
		$(this).toggleClass("selectBoxOpen");
	});

	$(".selectBox i").each(function() {
		$(this).click(function(evt){
			evt.stopPropagation();
			$(this).parent().parent().find("em").text($(this).text());
			$(".selectBox aside").slideUp();
			$(".selectBox").toggleClass("selectBoxOpen");
		})
	});

	// 用户体验金bar
	$(".xpRules").click(function() {
		$("article",this).toggle();
		$(this).toggleClass("xpRulesOpen");
	});
		
	// 投哪指南 内容页下拉  +  资费说明 详细内容下拉
    $(".guideLineQApage .guideLineQA li").live("click", function() {
      $(".guideLineQApage .guideLineQA li article,.expense > div article").not($("article",this)).hide();
      $(".guideLineQApage .guideLineQA li,.expense > div").not($(this)).removeClass("open");
      $("article",this).toggle();
      $(this).toggleClass("open");
    });
    
     $(".expense > div").click(function() {
      $(".guideLineQApage .guideLineQA li article,.expense > div article").not($("article",this)).hide();
      $(".guideLineQApage .guideLineQA li,.expense > div").not($(this)).removeClass("open");
      $("article",this).toggle();
      $(this).toggleClass("open");
    });
	

	
});

			

//-----------------------------------------------------短信验证码
var getPhoneCode = function(Phone_id,aftNa){
	var flag = false;
	var messerror = '';
	var	phone = $(Phone_id).val();
	if(phone == '' || phone == null) {
		messerror = "请填写手机号码";
		errPrompt(aftNa,messerror);
		return false;
	} else if(regCheck._checkPhone(phone)) {
		var params = {'param': phone};
		Webapp.postLoadData('auth_checker.do@type=phone', params,
			function(data) {
				
			},
			function(e) {
				if(e.responseText == 'y') {
					flag = true;			
				} else {
					messerror = "手机号码已存在";
					errPrompt(aftNa,messerror);
					$(Phone_id).focus();
					return false;
				}

				if(flag) {
					if($('#idCode').hasClass('flagCode')) {
						$('.idCode').css({cursor: 'pointer'}).removeAttr("disabled");
						$('#idCode').removeClass('flagCode');
					}

					var params = {
						'smsType': 'addPhone',
						'smsPhone': phone,
						'joinType': 'wap'
					};

					Webapp.postLoadData('smsApi.do', params,
						function(data) {
							smsRandom = data.smsRandom;
							
					/* 发送验证码 倒计时 */
					var totaltime = 120;

					function auto() {
						totaltime--;
						
						if (totaltime > 0) {
							$(".idCodeBox .idCode").css("background","rgb(182, 184, 185)");
							$(".idCodeBox .idCode").val( totaltime + ' 秒' ).attr('disabled','disabled').css({cursor: 'default'});
						} else {
							$(".idCodeBox .idCode").css("background","#59a4ff");
							$('#idCode').addClass('flagCode');
							$(".idCodeBox .idCode").val('重新获取验证码').removeAttr('disabled').css({cursor: 'pointer'});
							clearInterval(t);
							/*$(".idCodeBox .idCode").one("click", function(){
								idCode60();
							});*/
						};
					};

					var t = setInterval(auto, 1000);
						},
						function(e) {
						baseTool.popup(e.desc);

					});
					

				}
			}
		);
		return false;
	} else {
		baseTool.popup("请输入正确的手机号码!");
		$('#phone').focus();
		return false;
	}
	
	
}
	$(".list-toggle").click(function(){
		$(".list-toggle").not($(this)).removeClass("list-toggle-open");
		$(this).toggleClass("list-toggle-open");
	});
//-------------------------error 提示 aftername 上一个元素  errmess提示语
var errPrompt = function(aftName,errmess){
		if($('.warning').length>0){
			$('.warning').html(errmess);
		}
		else{
                  if(errmess == '亲，根据监管要求，投资前需要对您进行风险评测~'){
                        $(aftName).after("<a href='../m.touna.cn/user-assess.html' class='warning warning_a'>"+errmess+"</a>");
                  }else{
                        $(aftName).after("<aside class='warning'>"+errmess+"</aside>");
                  }
			
		}
}

//充值
$('.pubTopUp,pubWidh,#nav_depoist').click(function(){
	Webapp.postLoadData('auth.do', {'method': 'isLogin'},
        function(data) {
            if(!data.result) {
                window.location.href = 'sign-in.html';
                return;
            }
        }, 
        function(e) {
            window.location.href = 'sign-in.html';
            return;
        });
			
		Webapp.postLoadData('auth.do',{'method':'getCertifyInfo'},function(data){
				var	us = data.result.username;
				var	ps = data.result.phonestatus;
				var	mm = data.result.ppstatus;
				var	rs = data.result.realstatus;
				//alert(us);
			if(!us || us=='' || us == null){
				baseTool.popup("亲，充值前需完成用户名设置，让我们愉快地开始吧^^");
				$('.btn-blue').click(function(){
				window.location.href = "set_userName.html";
				return false;
			});
			}else if(ps != 1){
				baseTool.popup("亲，充值前需完成手机认证，让我们愉快地开始吧^^");
				$('.btn-blue').click(function(){
				window.location.href = "phone-number-check.html";
				return false;
			});	
			}else if(mm != 1){
				baseTool.popup("亲，充值前需设置交易密码，让我们愉快地开始吧^^");
				$('.btn-blue').click(function(){
				window.location.href = "trade-pw.html";
				return false;
			});			
			}else if(rs != 1){
				baseTool.popup("亲，充值前需完成实名认证，让我们愉快地开始吧^^");
				$('.btn-blue').click(function(){
				window.location.href = "name-check.html";
				return false;
			});		
			}else{
				window.location.href = "deposit.html";
			}
		},
		function(e){
			
		});
});
$('.pubInvest,#nav_invite').click(function(){
	Webapp.postLoadData('auth.do', {'method': 'isLogin'},
        function(data) {
            if(!data.result) {
                window.location.href = 'sign-in.html';
                return;
            }
        }, 
        function(e) {
            window.location.href = 'sign-in.html';
            return;
        });
		
	Webapp.postLoadData('auth.do',{'method':'getCertifyInfo'},function(data){
				var	us = data.result.username;
				var	ps = data.result.phonestatus;
				var	mm = data.result.ppstatus;
				var	rs = data.result.realstatus;
				//alert(us);
			if(!us || us=='' || us == null){
				baseTool.popup("亲，投资前需完成用户名设置，让我们愉快地开始吧^^");
				$('.btn-blue').click(function(){
				window.location.href = "set_userName.html";
				return false;
			});
			}else if(ps != 1){
				baseTool.popup("亲，投资前需完成手机认证，让我们愉快地开始吧^^");
				$('.btn-blue').click(function(){
				window.location.href = "phone-number-check.html";
				return false;
			});	
			}else if(mm != 1){
				baseTool.popup("亲，投资前需设置交易密码，让我们愉快地开始吧^^");
				$('.btn-blue').click(function(){
				window.location.href = "trade-pw.html";
				return false;
			});			
			}else if(rs != 1){
				baseTool.popup("亲，投资前需完成实名认证，让我们愉快地开始吧^^");
				$('.btn-blue').click(function(){
				window.location.href = "name-check.html";
				return false;
			});		
			}else{
				window.location.href = "hot-tender.html";
			}
		},
		function(e){
			
		});
});

//提现
$('.pubWidh').click(function(){
      Webapp.postLoadData('auth.do', {'method': 'isLogin'},
        function(data) {
            if(!data.result) {
                window.location.href = 'sign-in.html';
                return;
            }
        }, 
        function(e) {
            window.location.href = 'sign-in.html';
            return;
        });
            
      Webapp.postLoadData('auth.do',{'method':'getCertifyInfo'},function(data){
                        var   us = data.result.username;
                        var   ps = data.result.phonestatus;
                        var   mm = data.result.ppstatus;
                        var   rs = data.result.realstatus;
                        //alert(us);
                  if(!us || us=='' || us == null){
                        baseTool.popup("亲，提现前需完成用户名设置，让我们愉快地开始吧^^");
                        $('.btn-blue').click(function(){
                        window.location.href = "set_userName.html";
                        return false;
                  });
                  }else if(ps != 1){
                        baseTool.popup("亲，提现前需完成手机认证，让我们愉快地开始吧^^");
                        $('.btn-blue').click(function(){
                        window.location.href = "phone-number-check.html";
                        return false;
                  });   
                  }else if(mm != 1){
                        baseTool.popup("亲，提现前需设置交易密码，让我们愉快地开始吧^^");
                        $('.btn-blue').click(function(){
                        window.location.href = "trade-pw.html";
                        return false;
                  });               
                  }else if(rs != 1){
                        baseTool.popup("亲，提现前需完成实名认证，让我们愉快地开始吧^^");
                        $('.btn-blue').click(function(){
                        window.location.href = "name-check.html";
                        return false;
                  });         
                  }else{
                        window.location.href = "withdrawal_index.html";
                  }
            },
            function(e){
                  
            });
});

//银行相关
function getBankName(idNum){
		if(typeof idNum == "number"){
			this.idNum = idNum;
		}
		else{
			this.idNum = parseInt(idNum) || "";
		}
		
		var o = {
					301:'中国银行',
					303:'中国农业银行',
					300:'中国工商银行',
					302:'中国建设银行',
					515:'中国邮政储蓄银行',
					465:'广东发展银行',
					473:'中国光大银行',
					463:'交通银行',
					466:'招商银行',
					468:'兴业银行',
					467:'平安银行（深发展）',
					472:'中信银行',
					469:'中国民生银行',
					471:'上海浦东发展银行',
					470:'华夏银行',
					622:'北京银行',
					623:'上海银行',
					533:'宁波银行',
					624:'广州银行',
					532:'杭州银行'
				};
		if(this.idNum == '' || this.idNum == ' '){
			
			return '无记录';
		}
		else{
			
			return o[this.idNum];
		}
	
	}
//根据银行判断ID
	function getBankId(bankName){
		this.bankName = bankName;
		var o = {
				'中国银行':301,
				'中国农业银行':303,	
				'中国工商银行':300,
				'中国建设银行':302,
				'中国邮政储蓄银行':515,
				'广东发展银行':465,
				'中国光大银行':473,
				'交通银行':463,
				'招商银行':466,
				'兴业银行':468,
				'平安银行（深发展）':467,
				'中兴银行':472,
				'中国民生银行':469,
				'上海浦东发展银行':471,
				'华夏银行':470,
				'北京银行':622,
				'上海银行':623,
				'宁波银行':533,
				'广州银行':624,
				'杭州银行':532
				};
		if(this.bankName == '' || this.bankName == ' '){
			return '无记录';
		}
		else{
			return o[this.bankName];
		}
		}
//判断标名
	function checkBiao(biaoId){
		this.biaoId = biaoId;
		var o = {
			1:'旺车贷',
			2:'旺楼贷',
			3:'旺薪贷',
			4:'投投乐',
			5:'多多盈',
			6:'机构标',
			7:'供应链',
			8:'消费贷',
			9:'保保乐'
		};
		return o[this.biaoId];
	}
	//去除逗号 leixing String
	function delDou(douValue){
            var value = new String(douValue).replace(/,/g,'');			
		return parseFloat(value);
	}
		
	function showPopup(popCont,btn_content){
		$('.confirm').unbind("click");
		if($('.mask').length>0 && $('.popup').length>0){
			$(".mask,.popup").show();
		}
		else{
			$("body").append('<div class="mask"></div><div class="popup modify-phoneNum-pop"><div class = "wunai" style="text-indent:10px;padding:5px;border-radius:3px;border:0px solid #d9dde2;font-size:14px"><span>'+popCont+'</span></div><div class="btnBox"><button class="btn-noBg btn-blue">'+btn_content+'</button></div></div>');
			$(".popup").css("margin-top",-$('.popup').outerHeight() / 2);
			$(".mask,.popup").show();
		}
		
		$(".btn-blue").bind("click",function(){
			$(".mask,.popup").hide();
		});
	}

//-----逗号分隔
var fixMoneyFormat = function(_) {
    var _ = _ && "undefined" != _ && 0 != _ ? Number(_).toFixed(2) : "0.00";
    return _ = _.toString(), _ = _.split("").reverse().join("").replace(/(\d{3})/g, "$1,").split("").reverse().join(""), _.length > 0 && "," == _.charAt(0) && (_ = _.substr(1)), _ = _.replace(".,", ".")
}

 //---新手标
var check_new = function(a){
        Webapp.postLoadData('auth.do', {'method': 'isLogin','subtime':new Date().getTime},
        function(data) {
            if(!data.result) {
        	//console.log(data.result);
                $(a).show();                       
            }else{
                Webapp.postLoadData('borrow.do', {'method': 'list','status':0,'borrowType':-1,'page':0,'size':7,'subtime':new Date().getTime},
        function(data) {       
                var joined_count = data.result[0].firestInvest; 
                if(joined_count == 0){
                    $(a).show();               
                }else if(joined_count == 1){
                    $(a).hide(); 
                }                   
            },
            function(e) {
               return false; 
            });
            }
        }, 
        function(e) {
            return false;  
        }); 
    }

//---系统判定
var browser = {
        versions: function() {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };    


/**
 * 对接智能客服
 */

//获取用户id
var ZNKF_uId = '', ZNKF_uCode = '', ZNKF_uName = '',
    ZNKF_uInfo = null;
var ZNKF_userIdGet = function(){
	rxdai.asyncFalseLoadData('kefu.do', {'method':'getSUInfo'}, function(data){
		if (data && data['result']) {
			ZNKF_uId = data['result']['suid'];
			ZNKF_uCode = data['result']['ucode'];
			ZNKF_uName = data['result']['username'];
		}
	}, function(e){});
}
//初始化
$(function(){	
	
	ZNKF_userIdGet();
	//config
	var siteid = 'kf_9201'
	  , settingid = 'kf_9201_1458722248628'
	  , uMark = ZNKF_uCode
	  , uMarkName = ZNKF_uName
	  , isvip = 0
	  , userlevel = '1';
	
	//小能客服-集成脚本
	NTKF_PARAM = {
		siteid:siteid,		            //企业ID，为固定值，必填
		settingid:settingid,	//接待组ID，为固定值，必填
		uid:uMark,		                //用户ID，未登录可以为空，但不能给null，uid赋予的值显示到小能客户端上
		uname:uMarkName,		    //用户名，未登录可以为空，但不能给null，uname赋予的值显示到小能客户端上
		isvip:isvip,                          //是否为vip用户，0代表非会员，1代表会员，取值显示到小能客户端上
		userlevel:userlevel,		                //网站自定义会员级别，0-N，可根据选择判断，取值显示到小能客户端上
		erpparam: ZNKF_uId                     //erpparam为erp功能的扩展字段，可选，购买erp功能后用于erp功能集成
	} 
	var NTKF_BaseScript = $('<script type="text/javascript" src="../https@dl.ntalker.com/js/xn6/ntkfstat.js@siteid='+siteid+'" charset="utf-8"></script>');
    $('body').append(NTKF_BaseScript);
	//add event
	$('[NTKFClient="true"]').off(true).on('click', function(){
		NTKF.im_openInPageChat(settingid);
	});
});

//------------广告
// 百度统计
$(function(){
	var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "../https@hm.baidu.com/hm.js@6e2432ad400c6040c58e560a5e6129d4";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();

// google
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','../https@www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-59061301-2', 'auto');
    ga('require', 'displayfeatures');
    ga('send', 'pageview');

// 聚效
var _mvq = window._mvq || []; 
window._mvq = _mvq;
_mvq.push(['$setAccount', 'm-147319-0']);
_mvq.push(['$logConversion']);
(
function() 
{
var mvl = document.createElement('script');
mvl.type = 'text/javascript'; 
mvl.async = true;
mvl.src = ('https:' == document.location.protocol ? '../https@static-ssl.mediav.com/mvl.js' : '../static.mediav.com/mvl.js');
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(mvl, s); 
})();
});
