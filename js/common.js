jQuery(document).ready(function(){
	
	jQuery('.ly_fn').click(function(){
		jQuery('.ly_pass').css({display:'block'});
		jQuery('.ly_pop_bg').css({display:'block'});
	})
	
});

/* 중앙 모달.. */
jQuery.fn.sy_modalApi = function(){
	var obj = this; //
	var obj_bg = jQuery('.ly_pop_bg');						//background size
	//var int_bg = jQuery('.ly_pop_bg2');						//background size
	var wwidth = jQuery(window).outerWidth();				//window height
	var wheight = jQuery(window).outerHeight();				//window width 
	var ww_h = wwidth/2 - jQuery(obj).width() / 2;			//obj left
	var wh_h = wheight/2 - jQuery(obj).height() / 2;		//obj top

	jQuery(obj_bg).css({'width':wwidth,'height':wheight});
	/* 중앙 */
	//jQuery(obj).css({'left':ww_h,'top':wh_h});
	/* 좌우만 센터 */
	 jQuery(obj).css({'left':ww_h,'height':wheight});
	
	jQuery(obj_bg).click(function(){
		jQuery(this).css('display','none');
		jQuery(obj).css('display','none');
		
	});
	jQuery(obj).find('.clo').click(function(){
		jQuery(obj).css('display','none');
		jQuery(obj_bg).css('display','none');
		
	})
	jQuery(window).resize(function(){
		wwidth = jQuery(window).outerWidth();
		wheight = jQuery(window).outerHeight();
		ww_h = wwidth/2 - jQuery(obj).width() / 2;			//	   obj left
		wh_h = wheight/2 - jQuery(obj).height() / 2;		// obj top
		
		jQuery(obj_bg).css({'width':wwidth,'height':wheight});
		//jQuery(int_bg).css({'width':wwidth,'height':wheight});
		/* 중앙 */
		//jQuery(obj).css({'left':ww_h,'top':wh_h});
		/* 좌우만 센터 */
		 jQuery(obj).css({'left':ww_h,'height':wheight});
		
		

	});
};

/* 고정 모달.. */
jQuery.fn.comp_modalApi = function(){
	var obj = this; //
	var obj_bg = jQuery('.ly_pop_bg');						//background size
	//var int_bg = jQuery('.ly_pop_bg2');						//background size
	var wwidth = jQuery(window).outerWidth();				//window height
	var wheight = jQuery(window).outerHeight();				//window width 

	jQuery(obj_bg).css({'width':wwidth,'height':wheight});
	
	jQuery(obj_bg).click(function(){
		jQuery(this).css('display','none');
		jQuery(obj).css('display','none');
		jQuery('body').css({overflowY:'auto'});
		jQuery('#ly_wraps').css('display','none');
	});
	jQuery(obj).find('.clo').click(function(){
		jQuery(obj).css('display','none');
		jQuery(obj_bg).css('display','none');
		jQuery('body').css({overflowY:'auto'});
		jQuery('#ly_wraps').css('display','none');
	})
	jQuery(window).resize(function(){
		wwidth = jQuery(window).outerWidth();
		wheight = jQuery(window).outerHeight();
		jQuery(obj_bg).css({'width':wwidth,'height':wheight});

	});
};


//토글
jQuery.fn.qnaJs = function(){
	var obj = this;
	var $anch_obj = jQuery(obj);
	var oldActive = null;		
	$anch_obj.each(function(){
		jQuery(this).data('target', jQuery(this).next());
		jQuery(this).data('target2', jQuery(this).find('strong'));

	}).click(function(e){
		if( oldActive && oldActive != this ){
			jQuery(oldActive).data('target').hide();
			jQuery(oldActive).data('target2').removeClass('active');
		}
		jQuery(this).find('strong').toggleClass('active');
		jQuery(this).data('target').toggle();
		oldActive = this;
		return false;
	});
	
};

// tab 
jQuery.fn.tabDefultApi = function(){
	var obj = this;
	var $anch_obj = jQuery('> li',obj);
	var $anch = jQuery('> li > a',obj);
	var $anch_img = jQuery('> li > a > img',obj);
	var $anch_num;
	var $type_box = obj.next().find('> div');
	var chk_num = 0;
	var over_num = 0;
	$anch.each(function(){
		jQuery(this).click(function(){
			var chk_obj = jQuery(this);
			$anch_num = chk_obj.parent().index();
			chk_num = $anch_num;
			onTabClick(jQuery(chk_obj) , $anch_num );	
		});
		jQuery(this).focus(function(){
			var chk_obj = jQuery(this);
			$anch_num = chk_obj.parent().index();			
			onTabClick(jQuery(chk_obj) , $anch_num );		
		});
		/* 보더없애는 소스 추가 
		jQuery(this).mouseenter(function(){
			var over = jQuery(this).parent().next();
			var chk_obj = jQuery(this);
			over_num = chk_obj.parent().index();
			over.find('span').addClass('active');
		});
		
		jQuery(this).mouseleave(function(){
			var over = jQuery(this).parent().next();
			var chk_obj = jQuery(this);
			if( over_num != chk_num){
				over.find('span').removeClass('active');
			}
		});*/
		function onTabClick(_obj , _numm){			
			var _this = _obj;
			var _this_img = _obj.find('img');
			var over = jQuery(_this).parent().next(); /* 보더없애는 소스 추가 */
			$anch.addClass('active')
				.not(_this)
				.removeClass('active');//클릭했을때 on class 나머지는 class 제거
			$anch.next().css('display','block')
				.end()
				.not(_this).next().css('display','none');//클릭했을때 다음에있는 object block 나머지는 none
			$anch_img.chgImg(0);
			/*if( over_num == chk_num){ 보더없애는 소스 추가 
				$anch_obj.find('a span').removeClass('active');
				over.find('span').addClass('active')
			} 보더없애는 소스 추가 */
			_this_img.chgImg(1);
			$type_box.css('display','none');
			$type_box.eq(_numm).css('display','block');	

		};
		
	});
};


// <script type="text/javascript">
// 			jQuery(document).ready(function(){
// 				jQuery('.visual_wrap').slideImages(5000,1000,false,1);
// 			})
// 		</script>
//롤링 배너
jQuery.fn.slideImages = function(pause,spd,auto,type){

	var auto = auto; // true면.. 롤링.. false면 클릭이동만 가능
	var type = type; // 1: 위아래 , 2 : 좌우
	//배너 이미지 영역
	var pause = pause; // interval
	var speed = spd; // 이동 스피드
	var currentSlide = 0; // 현재 슬라이드 위치
	var $slider = $(this).find('> .imgs'); 
	var $slideContainer = $slider.find('> li'); 
	var lenSlide = $slideContainer.length; // 배너 갯수
	if(type == 1) {
		$slideContainer.eq(0).clone(true).appendTo($slider); 
		var height = $slideContainer.height(); 
		$slider.css('height', height * (lenSlide + 1)); 
	} else if(type == 2) {
		$slideContainer.eq(0).clone(true).appendTo($slider); // 처음 배너 하나 복제..( 좌우 롤링시에만 추가..)
		var width = $slideContainer.width(); // 배너 넓이
		$slider.css('width', width * (lenSlide + 1)); // 배너 갯수 * 넓이
	}

	var isClick = false;
	//배너 버튼 생성.
	var $sliderBtns = $(this).find('> .btns');
	var $sliderBtnOnOff = $sliderBtns.find('> .onoff');
	var $sliderBtnRight = $sliderBtns.find('> .arr_r');
	var $sliderBtnLeft = $sliderBtns.find('> .arr_l');
	var $sliderBtnPlay = $sliderBtns.find('> .play span');
	var $sliderBtnStop = $sliderBtns.find('> .stop span');
	var $btnAppend = function() {
		var html=$sliderBtnOnOff.html();
		for(var i=1; i < lenSlide; i++) {
			$sliderBtnOnOff.append(html);
		}
	}
	$btnAppend(); // 버튼 생성
	var $btnOnOff = $sliderBtnOnOff.find('span');

	//banner go
	$btnOnOff.each(function(){
		$(this).click(function(){
			currentSlide = $(this).index();
			$sliderBtnStop.addClass('active');
			$sliderBtnPlay.removeClass('active');
			moving(currentSlide);
			isClick = true;
		});
	});
	//setInterval play
	$sliderBtnPlay.click(function(){
		$sliderBtnPlay.addClass('active');
		$sliderBtnStop.removeClass('active');
		isClick = false;
		start();
	});

	//setInterval stop
	$sliderBtnStop.click(function(){
		$sliderBtnStop.addClass('active');
		$sliderBtnPlay.removeClass('active');
		isClick = true;
		stop();
	});

	$sliderBtnRight.click(function(){
		if (currentSlide === lenSlide) {
			$slider.css('margin-left', 0);
			currentSlide = 0;
		}
		currentSlide++;
		moving(currentSlide);
	});

	$sliderBtnLeft.click(function(){
		if (currentSlide === 0) {
			$slider.css('margin-left', - width * lenSlide+1);
			currentSlide = lenSlide;
		}
		currentSlide--;
		moving(currentSlide);
	});

	//setInterval stop
	$slider.mouseenter(function(){
		stop();
	});

	//setInterval start
	$slider.mouseleave(function(){
		if(!isClick && lenSlide > 1) {
			start();
		}
	});

	//버튼 활성화.
	function btnActive(num) {
		if(num == lenSlide) {
			num = 0;
		}
		$btnOnOff.removeClass('active').eq(num).addClass('active');
	};

	//클릭시 롤링
	function moving(currentSlide) {
		rollingMotion(currentSlide)
		stop();
	};

	function rollingMotion(currentSlide) {
		if (type == 1) {
			$slider.stop().animate({'margin-top': - height * currentSlide}, speed, "easeOutExpo", function() {
				btnActive(currentSlide);
			});
		} else if (type == 2) {
			$slider.stop().animate({'margin-left': - width * currentSlide}, speed, "easeOutExpo", function() {
				btnActive(currentSlide);
			});
		}
	}

	//자동 롤링
	var interval;
	function start() {
		if(!auto) {
			if (type == 1) {
				interval = setInterval( function() {
					if (currentSlide === lenSlide) {
						$slider.css('margin-top', 0);
						currentSlide = 0;
					}
					currentSlide++;
					rollingMotion(currentSlide)
				}, pause);
			} else if (type == 2) {
				interval = setInterval( function() {
					if (currentSlide === lenSlide) {
						$slider.css('margin-left', 0);
						currentSlide = 0;
					}
					currentSlide++;
					rollingMotion(currentSlide)
				}, pause);
			}
		}

	};

	function stop() {
		if(!auto)
			clearInterval(interval);
	};

	if(lenSlide > 1) {
		if(!auto)
			start();
		// $sliderBtns.css('display','block');
	};
	btnActive(currentSlide);
};




jQuery.fn.chgImg = function(on,options){
	jQuery(this).each(function(){
		if(this.tagName != "IMG") return;
		var imgSrc = jQuery(this).attr("src");
		var settings = {
			imgType : imgSrc.match(/gif$|jpg$|png$/),
			replaceTxt : "_on"
		}
		settings = jQuery.extend(settings, options || {});
		settings.imgType = "." + settings.imgType;
		settings.replaceTxt = settings.replaceTxt+settings.imgType;
		
		var chkOn = imgSrc.indexOf(settings.replaceTxt) != -1;
		if(on){
			if(chkOn){
				//jQuery(this).unbind("mouseout");
				return;
			}else{
				jQuery(this).attr("src",imgSrc.replace(settings.imgType,settings.replaceTxt));
			}
		}else if(chkOn){
			jQuery(this).attr("src",imgSrc.replace(settings.replaceTxt,settings.imgType));
		}
	});
}



//롤링 배너 100% 사이즈 조절 가능..
jQuery.fn.slide100Images = function(pause,spd,auto,type){

	var auto = auto; // true면.. 롤링.. false면 클릭이동만 가능
	var type = type; // 1: 위아래 , 2 : 좌우 , 3 : alpha
	//배너 이미지 영역
	var pause = pause; // interval
	var speed = spd; // 이동 스피드
	var currentSlide = 0; // 현재 슬라이드 위치
	var $this = $(this);
	var $slider = $(this).find('> .imgs'); 
	var $slideContainer = $slider.find('> li'); 
	var $this_wid = $(window).width();

	var lenSlide = $slideContainer.length; // 배너 갯수
	if(type == 1) {
		$slideContainer.eq(0).clone(true).appendTo($slider); 
		var height = $slideContainer.height(); 
		$slider.css('height', height * (lenSlide + 1)); 
	} else if(type == 2) {
		$this.css('width',$this_wid);
		$slideContainer.css('width',$this_wid);
		$slideContainer.eq(0).clone(true).appendTo($slider); // 처음 배너 하나 복제..( 좌우 롤링시에만 추가..)
		$slideContainer = $slider.find('> li'); 
		//var width = $this_wid; // 배너 넓이
		$slider.css('width', $this_wid * (lenSlide + 1)); // 배너 갯수 * 넓이
	}
	
	jQuery(window).resize(function(){
		console.log(currentSlide);
		$this_wid = jQuery(window).width();
		$this.css('width',$this_wid);
		$slideContainer.css('width',$this_wid);
		//var width = $this_wid; // 배너 넓이
		$slider.css({'width': $this_wid * (lenSlide + 1)}); // 배너 갯수 * 넓이
		$slider.stop().animate({'margin-left': - $this_wid * currentSlide}, 10, "easeOutExpo", function() {
		});
	});
	var isClick = false;
	//배너 버튼 생성.
	var $sliderBtns = $(this).find('> .btns');
	var $sliderBtnOnOff = $sliderBtns.find('> .onoff');
	var $sliderBtnRight = $sliderBtns.find('> .arr_r');
	var $sliderBtnLeft = $sliderBtns.find('> .arr_l');
	var $sliderBtnPlay = $sliderBtns.find('> .play span');
	var $sliderBtnStop = $sliderBtns.find('> .stop span');
	var $btnAppend = function() {
		var html=$sliderBtnOnOff.html();
		for(var i=1; i < lenSlide; i++) {
			$sliderBtnOnOff.append(html);
		}
	}
	$btnAppend(); // 버튼 생성
	var $btnOnOff = $sliderBtnOnOff.find('span');

	//banner go
	$btnOnOff.each(function(){
		$(this).click(function(){
			currentSlide = $(this).index();
			$sliderBtnStop.addClass('active');
			$sliderBtnPlay.removeClass('active');
			moving(currentSlide);
			isClick = true;
		});
	});
	//setInterval play
	$sliderBtnPlay.click(function(){
		$sliderBtnPlay.addClass('active');
		$sliderBtnStop.removeClass('active');
		isClick = false;
		start();
	});

	//setInterval stop
	$sliderBtnStop.click(function(){
		$sliderBtnStop.addClass('active');
		$sliderBtnPlay.removeClass('active');
		isClick = true;
		stop();
	});

	$sliderBtnRight.click(function(){
		if (currentSlide === lenSlide) {
			$slider.css('margin-left', 0);
			currentSlide = 0;
		}
		currentSlide++;
		moving(currentSlide);
		isClick = true;
	});

	$sliderBtnLeft.click(function(){
		if (currentSlide === 0) {
			$slider.css('margin-left', - $this_wid * lenSlide+1);
			currentSlide = lenSlide;
		}
		currentSlide--;
		moving(currentSlide);
		isClick = true;
	});

	//setInterval stop
	 $this.mouseenter(function(){
		stop();
	});
	
	//setInterval start
	 $this.mouseleave(function(){
		isClick = false;
		if(!isClick && lenSlide > 1) {
			start();
		}
	});

	//버튼 활성화.
	function btnActive(num) {
		if(num == lenSlide) {
			num = 0;
		}
		$btnOnOff.removeClass('active').eq(num).addClass('active');
	};

	//클릭시 롤링
	function moving(currentSlide) {
		rollingMotion(currentSlide)
		stop();
	};

	function rollingMotion(currentSlide) {
		if (type == 1) {
			btnActive(currentSlide);
			$slider.stop().animate({'margin-top': - height * currentSlide}, speed, "easeOutExpo", function() {
				
				//start();
			});
		} else if (type == 2) {
			btnActive(currentSlide);
			$slider.stop().animate({'margin-left': - $this_wid * currentSlide}, speed, "easeOutExpo", function() {
				
				//start();
			});
		}else if (type == 3) {
			btnActive(currentSlide);
			$slideContainer.stop().animate({'opacity': 0 , 'z-index':5}, speed, "easeOutExpo", function() {		
				//start();
			});
			$slideContainer.eq(currentSlide).stop().animate({'opacity': 1 , 'z-index':10}, speed, "easeOutExpo", function() {		
				//start();
			});
		}

	}

	//자동 롤링
	var interval;
	function start() {
		if(!auto) {
			if (type == 1) {
				interval = setInterval( function() {
					if (currentSlide === lenSlide) {
						$slider.css('margin-top', 0);
						currentSlide = 0;
					}
					currentSlide++;
					rollingMotion(currentSlide)
				}, pause);
			} else if (type == 2) {
				interval = setInterval( function() {
					if (currentSlide === lenSlide) {
						$slider.css('margin-left', 0);
						currentSlide = 0;
					}
					currentSlide++;
					rollingMotion(currentSlide)
				}, pause);
			} else if (type == 3) {
				interval = setInterval( function() {
					if (currentSlide === lenSlide - 1) {
						//$slider.css('margin-left', 0);
						currentSlide = -1;
						
					}
					currentSlide++;
					rollingMotion(currentSlide)
				}, pause);
			}
		}

	};

	function stop() {
		if(!auto)
			clearInterval(interval);
	};

	if(lenSlide > 1) {
		if(!auto)
			start();
		// $sliderBtns.css('display','block');
	};
	btnActive(currentSlide);
};




// 끝이 있는 배너
jQuery.fn.slideEnd = function(spd , length){

	var oTopt = -970;
	var oTop = 0;
	var oBtm = 970;

	//배너 이미지 영역
	var $slider = $(this).find('.imgs'); 
	var $slideContainer = $slider.find('> li'); 
	var width = $slideContainer.width();
	var length = length;
	var speed = spd; // 이동 스피드
	var currentSlide = 0; // 현재 슬라이드 위치
	var newSlide = 0; // 현재 슬라이드 위치
	var oldSlide = 0;
	var isClick = false;
	//배너 버튼 생성.
	var $sliderBtns = $(this).find('.btns');
	var $sliderBtnsCont = $sliderBtns.find('li');
	var btnswidth = $sliderBtnsCont.width();
	//버튼 롤링 화살표버튼
	var $arrsliderBtns = $(this).find('.arrbtn');
	var $arrsliderBtnsCont = $arrsliderBtns.find('> li');
	var $arrsliderBtnRight = $arrsliderBtns.find('.arrr');
	var $arrsliderBtnLeft = $arrsliderBtns.find('.arrl');
	var lenSlide = $sliderBtnsCont.length; // 배너 갯수
	$sliderBtns.css('width', btnswidth * (lenSlide + 1)); 


	$sliderBtnsCont.each(function(){
		$(this).click(function(){
			// oldSlide = currentSlide;
			newSlide = $(this).index();
			$sliderBtnsCont.find('img').chgImg(0);
			$(this).find('img').chgImg(1);
			//$sliderBtnStop.addClass('active');
			//$sliderBtnPlay.removeClass('active');
			mainmoving(newSlide);
			// isClick = true;
		});
	});

	function mainmoving(newSlide) {
		if(newSlide > oldSlide) {
			$slideContainer.eq(oldSlide).siblings().css({'left': oBtm});
			$slideContainer.eq(oldSlide).stop().animate({'left':oTopt }, 1000, "easeOutExpo");
			$slideContainer.eq(newSlide).stop().animate({'left':oTop }, 1000, "easeOutExpo");
		} else {
			$slideContainer.eq(oldSlide).siblings().css({'left': oTopt});
			$slideContainer.eq(oldSlide).stop().animate({'left':oBtm }, 1000, "easeOutExpo");
			$slideContainer.eq(newSlide).stop().animate({'left':oTop }, 1000, "easeOutExpo");
		}
		oldSlide = newSlide
		// stop();
	};


	$arrsliderBtnRight.click(function(){
		if ( currentSlide + 1 === lenSlide - length) 
			$arrsliderBtnRight.css('display','none');
		
		//$sliderBtnRight.css('display','block');
		$arrsliderBtnLeft.css('display','block');
		currentSlide++;
		moving(currentSlide);
	});

	$arrsliderBtnLeft.click(function(){
		if (currentSlide === 1) 
			$arrsliderBtnLeft.css('display','none');
		
		//$sliderBtnLeft.css('display','block');
		$arrsliderBtnRight.css('display','block');
		
		currentSlide--;
		moving(currentSlide);
	});


	//클릭시 롤링
	function moving(currentSlide) {
		rollingMotion(currentSlide)
		stop();
	};

	function rollingMotion(currentSlide) {
		$sliderBtns.stop().animate({'margin-left': - btnswidth * currentSlide}, speed, "easeOutExpo", function() {
		});
	}

};