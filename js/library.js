// Script Library

	$('#delete_button').on('click', function(e){	
		//console.log('adminMode: ' + adminMode)
		if(adminMode){
			angular.element('#dialog_form_delete_main').scope().$apply();
			angular.element('#dialog_form_delete_main').scope().user_delete();
			hideAll();
		} else {
			$('#delete_message').css('visibility','visible');
			$('#delete_message').html('Not allowed on public version');
		}
	});


	//get url params
	//use: $.urlParam('param1');
	$.urlParam = function(name){ 
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results==null){
			return null;
		}
		else{
			return results[1] || 0;
		}
	}


	//detect top scroll offset
	$(window).scroll(function(e){ 
		var $el = $('.fixedElement'); 
		var isPositionFixed = ($el.css('position') == 'fixed');
		if ($(this).scrollTop() > 200 && !isPositionFixed){ 
			$('.fixedElement').css({'position': 'fixed', 'top': '0px'}); 
		}
		if ($(this).scrollTop() < 200 && isPositionFixed)
		{
			$('.fixedElement').css({'position': 'static', 'top': '0px'}); 
		} 
	});




//This sets a class on the <html> tag, that you can use to dim the body, and use a background image that spins.
$('html')
	.ajaxStart(function(){
		$(this).addClass('ajax')
	})
	.ajaxStop(function(){
		$(this).removeClass('ajax')
	})


// show elements only when they are visible within the scroll position 
$(document).ready(function() {
    
    /* Every time the window is scrolled ... */
    $(window).scroll( function(){
    
        /* Check the location of each desired element */
        $('.hideme').each( function(i){
            
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ){
                
                $(this).animate({'opacity':'1'},500);
                    
            }
            
        }); 
    
    });
    
});

// call a function located inside an iFrame
var $f = $("#myIFrame");
var fd = $f[0].document || $f[0].contentWindow.document; // document of iframe
fd.MyFunction();  // run function
