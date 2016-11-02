console.log('dragExe.js')
var adminMode = false;

var active_dg;
var active_dz;
var orphan_dg;
var orphan_dz = false;

var dropZones = {};
var active_dialog;

var goodDrop;

function loadFunction(){
	console.log("loadFunction()")
	loadNav();
	console.log('adminMode: ' + adminMode)
	$(document).ready(function(){
		////console.log("Load Object Animations / Events")
		////console.log('totalEmployees: ' + totalEmployees)
		////console.log('employeesList: ' + employeesList);
		
 		//for(var a = 0; a<employeesList.length; a++){
		// 	$('#dz_' + employeesList[a]).remove();
		// }



		//console.log(employees)
		$('.cards').fadeTo('fast',1,function(){
			//var s helps fade in effect start at first item - top-bottom sequence.
			var s = 0;
			// for(var i = employeesList.length - 1; i>=0; i--){
			for(var i = 0; i<employees.length; i++){
				//console.log(employees[s].userId)
				dropZones['dz_' + employees[s].userId] = 'dg_' + employees[s].userId;
				var delay = 30 * s;
				$('#dg_' + employees[i].userId).delay( delay ).fadeTo('fast',1);
				++s
			}
		});

		//setDragging();
	});
}

function startDragging(){
	$('.main').draggable('enable');
}

function stopDragging(){
	$('.main').draggable('disable');
}

var draggingReady = false;
function setDragging(){	
	console.log('setDragging()');
	draggingReady = true;
	$('.main').draggable({

		//toggles z-index on all .main objects
		stack: ".main",
		start: function(e){
			active_dg = this.id;

			//set to false because no drop has been made
			goodDrop = false;

			if(goodDrop == false){
				$('#' + this.id).draggable(
					'option', {revert: true, revertDuration: 050}
					);
				orphan_dz = false;
			}

		},
		drag: function(e) {
			////console.log('drag drag(), this.id: ' + this.id)
		},
		stop: function(e) {
			//console.log('drag stop(), this.id: ' + this.id)
			//console.log('goodDrop: ' + goodDrop);

		}
	});


	$('.dz').droppable({
		tolerance: 'pointer', //pointer, fit, intersect, touch
		drop: function(e, ui){				
			//console.log('drop(), this.id: ' + this.id)
			
			//set to true if dropped in a dropzone
			goodDrop = true;

			//angular.element(document.getElementById('yourControllerElementID')).injector().‌​get('$rootScope');
			orphan_dg = dropZones[this.id];

			// active_dz.xy = active_dz.position();				
			// active_dg.xy = active_dg.position();
			// orphan_dz.xy = orphan_dz.position();
			
			//////console.log('snap active_dg to active_dz')
			$('#' + active_dz).prepend($('#' + active_dg));
			$('#' + active_dg).css('left',0);
			$('#' + active_dg).css('top',0);
			
			$('#' + orphan_dz).prepend($('#' + orphan_dg));
			$('#' + orphan_dg).css('left',0);
			$('#' + orphan_dg).css('top',0);

			//////console.log('update array sequence')
			dropZones[active_dz] = active_dg;
			dropZones[orphan_dz] = orphan_dg;

			////console.log('dropZones[' + active_dz + ']: ' + dropZones[active_dz])
			////console.log('dropZones[' + orphan_dz + ']: ' + dropZones[orphan_dz])
			orphan_dz = false;
		},
		over: function(e, ui){
			////console.log('drop over(), this.id: ' + this.id)
			if(!orphan_dz){
				orphan_dz = this.id
			}
			active_dz = this.id
		},
		out: function(e, ui){
			//console.log('drop out(), this.id: ' + this.id)
		},
	});
	stopDragging();
}