//全站通用基础js
$(function(){
	
	var windowheight = $(window).height();
	//矮屏左侧样式处理
	if(windowheight<750){
		$(".sidebar").addClass("sidebar--small");
	}
	//自适应屏幕最小高度设置
	$(".container").css("height",windowheight-120);
	
	
	$(window).resize(function() {
		windowheight = $(window).height();
		//矮屏左侧样式处理
		if(windowheight<750){
			$(".sidebar").addClass("sidebar--small");
		}else{
			$(".sidebar").removeClass("sidebar--small");
		}
		//自适应屏幕最小高度设置
		$(".container").css("height",windowheight-120);
	});
	
	//checkbox处理
	$(".check-label").on("click",function(event){
		if(event.target.type!="checkbox"){ //屏蔽checkbox点击两次执行问题
			if ($(this).hasClass("current")) {
				$(this).removeClass("current");
				$(this).find("input").attr("checked", false);
			} else {
				$(this).addClass("current");
				$(this).find("input").attr("checked", true);
			}
		}
	});
	
	//表格隔行换色处理
	$(".tablebox tbody tr:odd").addClass("odd");
})