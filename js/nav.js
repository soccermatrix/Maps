console.log('nav.js')

var loadNavComplete = false;
function loadNav(){
	console.log('loadNav()');
	
	//cllick functionality anywhere in the screen
	$(document).click(function(e){
		console.log('document click()');
		var target = e.target;
		//console.log('$(target).parents().parents(): ' + $(target).parents().parents().id)
		if (!$(target).is('#top_menu_options_list') && !$(target).is('#menu_icon_btn')) {
			$('#top_menu_options_list').hide();
		}
	});

	$(document).ready(function(){
		$('#footer').fadeTo('fast',1);
		if(!loadNavComplete){
			loadNavComplete = true;
			var active_dialog = false;
			
			//get dimmensions of devices's screen
			var w = $(window).width();
			var h = $(window).height();

			//show the body of the document now that all dynamic js,classes are loaded.
			$('body').css('visibility','visible');

			
			//removes previous event handlers so new ones can be reset
			//this is needed as new objects are added to the list, but existing objects
			var dialog_name;

			// Top Menu Options-------------------------------
			
			// $('#map_menu_1').on('click', function(e){
			// 	console.log('map_menu_1 click()')	
			// 	console.log($(this).is(':checked'));
			// 	$('#mapToggleCB[type="checkbox"]').click();			
			// });


			$('#mapToggleCB[type="checkbox"]').click(function(){
	            if($('#mapToggleCB[type="checkbox"]').is(":checked")){
					console.log('toggle clicked hideMarkers();')
					showMarkers();
					$('#mapToggleCB[type="checkbox"]').prop('checked',true)
					$('#map_menu_1 #label_action').text(function(){
						return $(this).text().replace('Show','Hide');
					})
	                // Checkbox is checked.
	            }
	            else if($('#mapToggleCB[type="checkbox"]').is(":not(:checked)")){
	            	console.log('toggle clicked showMarkers();')
					hideMarkers();
					$('#mapToggleCB[type="checkbox"]').prop('checked',false)
					$('#map_menu_1 #label_action').text(function(){
						return $(this).text().replace('Hide','Show');
					})
	                //Checkbox is unchecked.
	            }
	        });
			/*
			$('#state').on('click', function(e){
				console.log('state click()')
				//angular.element('#HomeCtrol').scope().setSearch(e.geo_data_key);
      			//angular.element('#HomeCtrol').scope().$apply();
				
			});
			*/

			
			// END Top Menu Options-------------------------------

			
			//check if localhost or local server

			if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
				adminMode = true;
			}


			// display window width/height in the top banner
			var winWidth = $(window).width();
			var winHeight = $(window).height();
			$('#screenRes').html(winWidth + " x " + winHeight);
			checkWindowSize();

			$(window).resize(function(e){ 
		 		checkWindowSize();
		 	});
		 	function checkWindowSize(){
		 		if($('#iframe_tools').length){
		 			resizeIframe($('#iframe_tools'));
		 		} 
		 		
				//get dimmensions of devices's screen
				winWidth = $(window).width();
				winHeight = $(window).height();
		 		$('#screenRes').html(winWidth + " x " + winHeight);
				console.log(winWidth + " x " + winHeight);

				if(winWidth < 530){
					$('.form-item-left span').hide();
					$('.form-item-left').css('margin-left','10px');

				} else {
					$('.form-item-left span').show();
					$('.form-item-left').css('margin-left','0');
				}
				if(winWidth < 400){
					$('#banner-label').hide();

				} else {
					if(!mobileMode)$('#banner-label').show();
				}
				if(winWidth < 365){
					$('.form-item-left').hide();
					$('#banner #label').hide();

				} else {
					$('.form-item-left').show();
					if(mobileMode)$('.form-item-left span').hide();
					if(mobileMode)$('.form-item-left').css('margin-left','20px');
					if(!mobileMode)$('#banner #label').show();
					$('.sub_page .form-item-left').hide();
					$('.sub_page .form-item-right').css({'float':'left','width':'50%'});
				}
		 	}

			// SCROLLING FUNCTIONALITY
			//scrolling snaping of top menu
		 	positionElements();
		 	$(window).scroll(function(e){ 
		 		positionElements()
		 	});

			 // part of scrolling functionality
			 function positionElements(){
			 	var $tm = $('#top_menu'); 
			 	var $c = $('.cards'); 
			 	var isPositionFixed = ($tm.css('position') == 'fixed');
			 	if(!mobileMode){
			 		//
				} else {
					//
				}
			}
			 // END SCROLLING FUNCTIONALITY

			// Remove functionality from objects with '.disabled' className 
			$('.disabled').off();

			//what's this for? i forgot. needs debugging.
			$("div.ui-widget-overlay").css("height", function () {
				return $(window).height();
			});

			//MOBILE ONLY FUNCTIONALITY
			if(mobileMode){
				//hide drag/drop functionality
				$('#menu_move').hide();

				
			} else {
				//
			}

			


		}//end if
		loadNavComplete = false;
	});//end document.ready
}//end loadNav
