//console.log('utilities.js')

//get url params
//use: $.urlParam('param1');
$.urlParam = function(name){ 
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);	
	////console.log('results: ' + results)	
	if (results==null){
		return null;
	}
	else{
		////console.log('results[1]: ' + results[1])
		results[1] = decodeURIComponent(results[1])
		////console.log('results[1]: ' + results[1])
		return results[1] || 0;
	}
}

//resize dynamic iframes
function resizeIframe(obj) {
	//console.log('resizeIframe()');
    ////console.log(obj)
    ////console.log(obj[0])
    //console.log(obj[0].contentDocument.body.offsetHeight)
    obj[0].style.height = obj[0].contentDocument.body.offsetHeight + 'px';
}

// disable/enable console.log
console.log = function() {}