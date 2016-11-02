var myApp = angular.module("myModule", []);
var active_dg_index;
var active_dz_index;
var vars = []; 
var totalEmployees;

$.getScript('js/dragExe.js', function(){
	//console.log('dragExe.js loaded()')
})


myApp.controller("myController", function ($scope, $http) {
	//console.log("controller initiated")

	$http.get('employees.js').
			success(function(employees_data, employees_status, employees_headers, employees_confg){
			//console.log('success loading json')
			//console.log('data: ' + data )
			var employees = employees_data.employees;
			//console.log(employees);
			$scope.employees = employees;
			
			totalEmployees = employees.length;
			$scope.totalEmployees = totalEmployees;

			loadFunction(); // dragExe.js
		}).
			error(function(data, status, headers, config){
			//console.log('error loading json')
		});


	$scope.setActiveEmployee = function(employee,id) {
		//console.log('setActiveEmployee, id: ' + id)
		var activeEmployee = {
			id 			: employee.id,
			name 		: employee.name,
			title		: employee.title,
			sub_title	: employee.sub_title,
			skills		: employee.skills,
			count		: employee.count,
			description	: employee.description,
			quote		: employee.quote,
			available	: employee.available,
			price		: employee.price
		}

		$scope.activeEmployee = activeEmployee;
	};

	$scope.setActiveDraggable = function(id){
		active_dg_index = id;
	}

	$scope.setActiveDroppable = function(id){
		active_dz_index = id;
		//console.log('setActiveDroppable active_dz_index: ' + active_dz_index);
	}

	$scope.set_dg_seq = function(id){
		//console.log('set_dg_seq');
		vars['dz_' + id + '_dgIndex'] = id;
		vars['dz_' + id + '_dzIndex'] = id;
	}

	$scope.setSearch = function(str){
		//console.log('setSearch, str: ' + str)
		//console.log('$scope.search: ' + $scope.search)
		$scope.search = str;

		//set the results to opacity 0, so we can show them using loadFunction();
		for(var i = 0; i<totalEmployees; i++){
			$('#dg_' + i).css('opacity',0);
		}

		loadFunction(); // dragExe.js
	}


	//load the dragging functionality.
	//this js file cannot be loaded in the $('document').ready() before the ajax/angular functionality/data are loaded.
	

});