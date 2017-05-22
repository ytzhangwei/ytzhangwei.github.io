var baseTool = {
		bankNameArr:{
		NaN:'无记录', '':'无记录',  301:'中国银行', 303:'中国农业银行', 300:'中国工商银行', 302:'中国建设银行', 515:'中国邮政储蓄银行',
		465:'广东发展银行',  473:'中国光大银行', 463:'交通银行',  466:'招商银行',  468:'兴业银行', 467:'平安银行（深发展）', 472:'中兴银行',
		469:'中国民生银行', 471:'上海浦东发展银行', 470:'华夏银行', 622:'北京银行', 623:'上海银行', 533:'宁波银行', 624:'广州银行', 532:'杭州银行'
	}
};

	//进度加载事件
	baseTool.shadeLoad = function(){
		$("body").append('<div class="shade_load" style="width:100%;height:100%;position:fixed;top:0;left:0;z-index:9999;background:rgba(0,0,0,.8) url(img/loading.gif) no-repeat 50% 50%;background-size:120px 80px;"></div>');
	}
	
	//一个按钮的弹出框
	baseTool.popup = function(popCont){
		//解除关于确定按钮的所有绑定事件
					
		$('.confirm').unbind("click");
		if($('.mask').length>0 && $('.popup').length>0){
			$(".mask,.popup").show();
			$('.wunai span').html(popCont);

		}
		else{
			$("body").append('<div class="mask"></div><div class="popup modify-phoneNum-pop"><div class = "wunai" style="text-align:center;padding:5px;border-radius:3px;border:0px solid #d9dde2;font-size:14px"><span>'+popCont+'</span></div><div class="btnBox"><button class="btn-noBg btn-blue">确定</button></div></div>');
			$(".popup").css("margin-top",-$('.popup').outerHeight() / 2);
			$(".mask,.popup").show();
		}
		
		$(".btn-blue").bind("click",function(){
			$(".mask,.popup").hide();
		});
	};

	//模仿active
	baseTool.actMo = function(classN,classS){
		 $(classN).live("mousedown",function() {
	        $(this).addClass(classS);
	     });
		$(classN).live("mouseup",function() {
	         $(this).removeClass(classS);
	     });
	}
	


	/**获取银行名称*/
	baseTool.getBankName = function(idNum){
		if(typeof idNum == "number"){
			this.idNum = idNum;
		}else{
			//alert(idNum);
			this.idNum = parseInt(idNum.trim());			
			if(isNaN(parseInt(idNum.trim()))){
				return idNum;
			}

		}
		if(typeof this.bankNameArr[this.idNum] == "undefined"){
			return "无记录";
		}else{
			return this.bankNameArr[this.idNum];
		}
	};

/*手机号码判断*/
baseTool.checkphone = function(em,em1){
	var phone = $(em).val(),
		length = new String(phone).length;
	if(phone != '' && length == 11 && regCheck._checkPhone(phone)){
	$(em1).removeClass('btn_grey').removeAttr('disabled');
	}else{
	$(em1).addClass('btn_grey').attr('disabled','disabled');	
	}
};