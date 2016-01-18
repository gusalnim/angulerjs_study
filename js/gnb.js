jQuery(document).ready(function(){
	var $gnbDep2 = jQuery('.gnb .dep2');
	jQuery('#menu_wrap').mouseenter(function(){
		jQuery(this).stop().animate({'height': '278px'}, 500, "easeOutExpo", function() {
		});
		$gnbDep2.stop().animate({'opacity': '1'}, 500, "easeOutExpo", function() {
		});
	});
	jQuery('#menu_wrap').mouseleave(function(){
		jQuery(this).stop().animate({'height': '88px'}, 500, "easeOutExpo", function() {
		});
		$gnbDep2.stop().animate({'opacity': '0'}, 500, "easeOutExpo", function() {
		});
	});
});

//gnb
function GNB(){
	var o = jQuery(".gnb");
	var d1 = o.find(".d1");
	var d1A = o.find(".d1>a");
	var d2 = o.find(".dep2");
	var d2A = o.find(".dep2 a");
	var d1A_on = d1A.filter(".active");
	var d2_on = d2.filter(".active");
	var d2A_on = d2A.filter(".active");
	var timer;
	//처음 상태
	function reset(){
		var el_dep1 = d1A_on;
		menuOn(el_dep1,d2_on);	
		subOn(d2A_on);	

		//2뎁스 활성화시 아래 주석 풀기
		/*if(!d2A_on.parents(".dep2").eq(0).filter(":visible").length){
			menuOn(el_dep1,d2_on);	
		}
		subOn(d2A_on);*/
		
	}
	
	//1depth off
	function menuOff(){
		var curr_dep2 = d2.filter(":visible");
		var curr_dep1 = curr_dep2.prev();		
		curr_dep1.removeClass("active");
		d1A.find('img').chgImg(0);
		curr_dep2.find('a').removeClass('active');
	}
	
	//1depth on
	function menuOn(el_dep1,el_dep2){
		menuOff();
		el_dep1.addClass("active");
		el_dep1.find('img').chgImg(1);
	}
	
	//2depth on
	function subOn(el){
		d2A.removeClass('active');
		el.addClass('active');
		d1A.find('img').chgImg(0);
		el.parent().parent().prev().find('img').chgImg(1); // 투뎁스 전체보기 했을시 적용
	}
	
	//활성화 상태인지 체크
	function chkCurr(el){
		if(el.filter(":visible").length){
			return true;
		}else{
			//
			return false;
		}
	}	
	//1depth mouseover
	d1A.each(function(i){
		jQuery(this).mouseover(function(){
			clearReset();
			var el_dep1 = jQuery(this);
			var el_dep2 = d2.eq(i);
			menuOn(el_dep1,el_dep2);
			
			
		});
	});	
	//2depth mouseover
	d2A.mouseover(function(){
		clearReset();
		subOn(jQuery(this));
	});
	
	//처음 상태로 가기 취소
	function clearReset(){
		clearTimeout(timer);
	}
	
	//완전히 벗어나면 처음 상태로 가기
	o.mouseleave(function(){
		clearReset();
		timer = setTimeout(function(){
			reset();
		},200);
	});
	
	reset();
}

var current_num;
//현재 페이지에 on class
function setTopNaviCurrentDepth(){
	if(typeof getCurrentDepth != "function"){
		GNB();
		return;
	}
	var currentDepth = String(getCurrentDepth());
	var depth1 = parseInt(currentDepth.substr(0,2)-1);
	var depth2 = parseInt(currentDepth.substr(2,2)-1);
	
	if(depth1>=0){
		
		var o = jQuery(".dep1");
		var d1A = o.find(".d1>a").eq(depth1);
		var d2 = o.find(".d1").eq(depth1).find(".dep2");
		var d2A = d2.find("a").eq(depth2);
		var bor = jQuery('#new_gnb');
		var speed = 0;
		var timer;
		d1A.addClass("active");
		d1A.find('img').chgImg(1);	
		d2.addClass("active");
		d2A.addClass("active");
	}

	current_num = depth1;
	GNB();
	
}

function SNB(){
	var o = jQuery("#snb .snb:visible");
	var d2 = o.find(".dep2 li a:not(.active)");
	var d2_curr = o.find(".dep2 li a.active");
	function def(){
		d2_curr.removeClass("active").find("img").chgImg(0);
	}
	function reset(){
		d2_curr.addClass("active").find("img").chgImg(1);
	}
	d2.hover(function(){
		def();
		jQuery(this).addClass("active").find("img").chgImg(1);
	},function(){
		jQuery(this).removeClass("active").find("img").chgImg(0);
		reset();
	});
	reset();
}

//현재 페이지에 on class
function setLeftNaviCurrentDepth(){
	if(typeof getCurrentDepth != "function"){
		return;
	}
	var currentDepth = String(getCurrentDepth());
	var depth1 = parseInt(currentDepth.substr(0,2))-1;
	var depth2 = parseInt(currentDepth.substr(2,2))-1;
	if(depth1>=0){
		var o = jQuery("#snb .snb").eq(depth1);
		var d2 = o.find(".dep2");
		d2 = d2.find("li").eq(depth2).find('a');
		o.show();
		d2.addClass("active");
		SNB();
	}
}



jQuery(window).load(function(){
	setTopNaviCurrentDepth();
	setLeftNaviCurrentDepth();

	
});
