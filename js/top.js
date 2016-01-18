function scrTop(){
	setTimeout(scrollTo, 0, 0, 1);
}

jQuery.fn.rollingTxt = function(options){
	var settings = {
		min : 2,
		spd : 3000,
		dir : "up"
	}
	settings = $.extend(settings, options || {});
	if($("li",this).size()<settings.min) return false;
	
	var hgt = -($("li",this).height()+parseInt($("li",this).css("paddingTop"))+parseInt($("li",this).css("paddingBottom")));
	var o = this;
	var el;
	var rollingTime;
	var rolling = function(){
		el = $("li:first",o);
		if(settings.dir == "up"){
			$(el).animate({marginTop:hgt+"px"},{duration:500, complete:function(){$(el).css({marginTop:"0"}).parent().append($(el))}});
		}else{
			el2 = $("li:last",o);
			$(el).animate({marginTop:0},{duration:500, complete:function(){$(el2).css({marginTop:hgt+"px"}).parent().prepend($(el2))}});
		}
		
		rollingTime = setTimeout(rolling,settings.spd);
	}
	$(this).hover(function(){
		clearTimeout(rollingTime);
	},function(){
		rollingTime = setTimeout(rolling,settings.spd);
	});
	rollingTime = setTimeout(rolling,settings.spd);
}

$(window).load(function(){
	scrTop();
});