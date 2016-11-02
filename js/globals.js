//console.log('globals.js')

var fields = [
['userId','id'],
['fullName','Full Name'],
['title','Title'],
['sub_title','Sub Title'],
['skills','Skills'],
['count','Likes'],
['description','Description'],
['quote','Personal Quote'],
['available','Available for work?'],
['price','Hourly Rate'],
['avatar','Photo / Avatar']
];
////console.log('fields.length: ' + fields.length)
////console.log('fields[0]: ' + fields[0])
////console.log('fields[0][0]: ' + fields[0][0])

var field = {};

//var v = Math.random();
 // $.getScript('/js/utilities.js?v=' + v, function(){})
 $.getScript('/js/nav.js?v=' + v, function(){})
 // $.getScript('/js/dragExe.js?v=' + v, function(){});

var mobileMode;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    mobileMode = true;
} else {
    mobileMode = false;    	
}

//LOAD DYNAMIC CSS
$('<link href="/css/master.css?v=' + v + '" rel="stylesheet" type="text/css" />').appendTo('head');

$('<link href="/css/dialog_d.css?v=' + v + '" rel="stylesheet" type="text/css" />').appendTo('head');

// tasks to do if it is a Mobile Device
//window.location.replace("mobile.html"); 
//console.log('mobileMode: ' + mobileMode)
if(mobileMode){
    var link1 = document.createElement('link');
    link1.rel = 'stylesheet';
    link1.id = 'id1';
    link1.href = '/css/mobile.css?v=' + v;
    document.head.appendChild(link1);

    var link2 = document.createElement('link');
    link2.rel = 'stylesheet';
    link2.id = 'id2';
    link2.href = '/css/mobile_dialog.css?v=' + v;
    document.head.appendChild(link2);
  } else {
    var link1 = document.createElement('link');
    link1.rel = 'stylesheet';
    link1.id = 'id1';
    link1.href = '/css/desktop.css?v=' + v;
    document.head.appendChild(link1);

    var link2 = document.createElement('link');
    link2.rel = 'stylesheet';
    link2.id = 'id2';
    link2.href = '/css/desktop_dialog.css?v=' + v;
    document.head.appendChild(link2);
  }
//END LOAD DYNAMIC CSS

$(document).ready(function(){

})



/*
//LOAD EACH SCRIPT IN SEQUENCE
// var v = Math.random();
// $.getScript('js/user_delete.js?v=' + v, function(){})
// $.getScript('js/user_insert.js?v=' + v, function(){})
// $.getScript('js/user_update.js?v=' + v, function(){})



// $.getScript('js/nav.js?v=' + v, function(){})
// $.getScript('js/dragExe.js?v=' + v, function(){});

// <script src="js/controller.js"></script>
// <script src="js/app.js"></script>

var scripts   = [
	'js/user_delete.js',
	'js/user_insert.js',
	'js/user_update.js',
	'js/nav.js',
	'js/dragExe.js'
	// 'js/controller.js',
	// 'js/app.js'
	],

    //setup object to store results of AJAX requests
    responses = {};

//create function that evaluates each response in order
//$(document).ready(function(){
	function eval_scripts() {
		//console.log('eval_scripts()')
	    for (var i = 0, len = scripts.length; i < len; i++) {
	        eval(responses[scripts[i]]);
	    }
	}

	$.each(scripts, function (index, value) {
	    $.ajax({
	        url      : scripts[index],

	        //force the dataType to be `text` rather than `script`
	        dataType : 'text',
	        success  : function (textScript) {
	        	//console.log('success, ' + textScript)

	            //add the response to the `responses` object
	            responses[value] = textScript;

	            //check if the `responses` object has the same length as the `scripts` array,
	            //if so then evaluate the scripts
	            if (responses.length === scripts.length) { eval_scripts(); }
	        },
	        error    : function (jqXHR, textStatus, errorThrown) {
	         //don't forget to handle errors
	         //console.log('error')
	     	}
	    });
	});
//END LOAD EACH SCRIPT IN SEQUENCE
//})
*/






