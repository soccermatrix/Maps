console.log('controller.js')
//var activeEmployeeID;
//var activeEmployee;
//var employeesList = [];
var loadDataComplete = false;
var totalRows;
var geo_data_key;
var geo_data = [];
var admin_data = [];
var max_markers_default = 1000;
var max_markers = max_markers_default;
var renderMap_completed = false;

console.log('location.hostname: ' + location.hostname)
var httpPath = 'http://profiles.luisespinal.com/';
/*
var httpPath = '';
if (location.hostname === "127.0.0.1"){
	httpPath = 'http://profiles.luisespinal.com/';
}
*/


angular.module('controller',[])
.controller('Ctrol404',['$scope', '$http', function($scope, $http){
	console.log('Ctrol404');

}])
.controller('BlogCtrol',['$scope', '$http', function($scope, $http){
	console.log('BlogCtrol');
}])


.controller('HomeCtrol',['$scope', '$http', '$interval', '$timeout', '$compile', function loadDataCtrl($scope, $http, $interval, $timeout, $compile){
//.controller('HomeCtrol',['$scope', '$resource', function loadDataCtrl($scope, $resource){
	console.log('HomeCtrol');
	console.log('runController: ' + runController);

	$scope.max_markers = max_markers;
	$scope.max_markers_default = max_markers_default;

	$scope.increaseGeoData = function(str){
		$scope.max_markers += str;
		runController = true;
		$scope.$emit('loadData', [])
	}
	$scope.decreaseGeoData = function(str){
		$scope.max_markers -= str;
		runController = true;
		$scope.$emit('loadData', [])
	}


	$scope.setSearch = function(str){
		console.log('HomeCtrol')
		console.log('setSearch()')
		console.log('str: ' + str)
		$scope.search = str;
		runController = true;

		console.log('$scope.search: ' + $scope.search)		
	}



	
	$scope.categories = [
	{
		'state' : '11',
		'ethnicity'	: '24'
	}
	]

	$scope.filter = [];
	$scope.setFilter = function(category,str){
		//console.log('HomeCtrol')
		//console.log('setFilter()')
		//console.log('category: ' + category)
		//console.log('str: ' + str)
		//console.log($scope.categories)
		//console.log($scope.categories[0][category])
		$scope.filter = [];
		for(var i=0; i<$scope.categories.length; i++){
			//console.log('loop')
			if($scope.categories[0][category]){
				//console.log('category match found')
				//console.log($scope.categories[i])
				$scope.filter = [category,$scope.categories[0][category]];

				$scope.filter.key = category
				$scope.filter.arrayId = $scope.categories[0][category]
				$scope.filter.str = str

				// if filtered by state, show all records in the geo_data
				// then reset records to default when back to all states view.
				//console.log($scope)
				$scope.max_markers = $scope.geo_data_raw_totalRows;
			}
		}
		runController = true;
		//console.log($scope.filter);
		//console.log($scope.filter.key);
		//console.log($scope.filter.arrayId);
		//console.log($scope.filter.str);
		$scope.$emit('loadData', [])

		// if !category, hide the filter message shown underneath the top menu indicator
		if(!category){
			angular.element('#filterBy').html(' ');
			// if filtered by state, show all records in the geo_data
			// then reset records to default when back to all states view.
			$scope.max_markers = $scope.max_markers_default;
		}
	}
	//$scope.setFilter('state','California');

	$scope.set_filter_label = function(msg){
		console.log('set_filter_label()');
		console.log(msg)
		angular.element('#filterBy').html(
			'<br/>' + msg + 
			' (<a href="javascript:void(0)" ng-click="setFilter()">Show National</a>)'

			)
		if(!msg){
			angular.element('#filterBy').html(' ');
		}
		$compile('#filterBy')($scope);
		//document.write('test');
	}


	
	$scope.init = function(){
		//console.log('HomeCtrol')
		//console.log('init();')
		// default value, remove lime once setSearch call is set up.
		$scope.search = null;
		//$scope.filter = 'California';
		//$scope.search = '0F4A1487-50BB-4BDA-969D-A12F460B8BC9';
		$scope.$emit('loadData', [])
		//$timeout(init, 1000,);
	}

	$scope.googleGeo;
	$scope.getGoogleGeoCode = function(lat,lng){
		console.log('HomeCtrol')
		console.log('getGoogleGeoCode();')

		var request = new XMLHttpRequest();

		var method = 'GET';
		var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&sensor=true';
		var async = true;

		console.log('open connection')
		request.open(method, url, async);

		console.log('listen for onreadystatechange')
		request.onreadystatechange = function(){
			console.log('onreadystatechange()');			
			if(request.readyState == 4 && request.status == 200){
				console.log('success request')
				googleGeo = JSON.parse(request.responseText);
				console.log(googleGeo)
				return googleGeo;
			}
		}
	}
	

	$scope.getCityName = function(lat,lng){
		console.log('HomeCtrol')
		console.log('getCityName();')
		var googleGeo_data = $scope.getGoogleGeoCode(lat,lng);
		var address = googleGeo_data.results[0];
		var cityName = address.address_components[2].long_name;
		console.log('cityName: ' + cityName);
		return cityName;
	}


	$scope.$on('loadData', function(){
		console.log('$scope.$on loadData()');
		if(runController == true){
			runController = false;
			console.log('loadData()');
			//MySQL version					
			//$http.get(httpPath + 'sql.php')
			//JSON version
			$http.get('geo_data.js')
			//$resource.(httpPath + 'sql.php')
			//$http.get(httpPath + 'sql.php')
			.success(function(data, status){
				console.log('HomeCtrol - success');
				console.log('mobileMode: ' + mobileMode)
				console.log('success loading json')
				//employees_data_string = JSON.stringify(employees_data);
				//console.log(data.geo_data[1])

				console.log('$scope.search: ' + $scope.search)

				geo_data = [];
				admin_data = [];				
				$scope.data = data.geo_data;
				$scope.geo_data = [];
				$scope.admin_data = [];
				//console.log($scope.data)
				// for(var i=0; i<$scope.data.length; i++){
					for(var i=0; i<$scope.max_markers; i++){
					//console.log($scope.data[i][1])
					// ingnore null, undefined, NaN, empty, 0, false values
					if($scope.data[i][31][1]){
						if($scope.filter.length > 0){
							//console.log('filter found')
							//console.log($scope.filter)
							//console.log($scope.filter.length)
							//console.log($scope.filter.length)
							//console.log($scope.filter.key)
							//console.log($scope.filter.arrayId)
							//console.log($scope.filter.str)
							//console.log($scope.data[i])
							//console.log($scope.data[i][$scope.filter.arrayId])
							
							// check if a filter has been set, such as state, etc
							// filters are set on click of categories.
							if($scope.data[i][$scope.filter.arrayId] == $scope.filter.str){
								//console.log('found ' + $scope.filter.str + ' in ' + $scope.filter.key)
								$scope.admin_data.push($scope.data[i]);
								$scope.geo_data.push([
									Number($scope.data[i][31][1]),
									Number($scope.data[i][31][2]),
									$scope.data[i][1]
								]);
							}


						} else {
							$scope.admin_data.push($scope.data[i]);
							$scope.geo_data.push([
								Number($scope.data[i][31][1]),
								Number($scope.data[i][31][2]),
								$scope.data[i][1]
							])
						}
					}
				}

				geo_data = $scope.geo_data;
				admin_data = $scope.admin_data;
				$scope.geo_data_totalRows = $scope.geo_data.length;
				console.log('$scope.geo_data_totalRows: ' + $scope.geo_data_totalRows)

				$scope.geo_data_raw_totalRows = 0;
				for(var e=0; e<$scope.data.length; e++){
					// ingnore null, undefined, NaN, empty, 0, false values
					if($scope.data[e][31][1]){
						$scope.geo_data_raw_totalRows += 1;
					}
				}
				console.log('$scope.geo_data_raw_totalRows: ' + $scope.geo_data_raw_totalRows)

				//make these calls after values are set.
				//zoom to state				
				if($scope.filter.length > 0) {
					if($scope.filter.key = 'state'){
						zoomToState_set = false;
						zoomToState();
						$scope.set_filter_label('State: ' + $scope.filter.str)
					}
				} else {
					if($scope.search){
						zoomReset();						
					}
				}

				
				//console.log(geo_data);
				//console.log($scope.geo_data);
				//console.log($scope.geo_data_totalRows);
				//console.log($scope.geo_data[0]);
				//console.log($scope.geo_data[0][2]);

				//console.log($scope.geo_data[0].split(',')[1]);
				

				/*
				//replace special charter codes back into readable characters
				for (var i = 0; i<$scope.totalEmployees; i++){
					for (var ii = 0; ii < fields.length; ii++) {
						console.log(fields[ii][0]);
						console.log($scope.employees[i][ fields[ii][0] ])
						$scope.employees[i][ fields[ii][0] ] = $scope.employees[i][ fields[ii][0] ]
								.replace(/&rsquo;/g, "'")
								.replace(/&gt;/g, ">")
								.replace(/&lt;/g, "<")
								.replace(/&quot;/g, '"')
								.replace(/&#33;/g, '!')
					}

					employeesList.push($scope.employees[i].userId);

					//split sub_title and color theme
					$scope.employees[i].sub_title = $scope.employees[i].sub_title.split(',');				
					for (var a = 0; a<$scope.employees[i].sub_title.length; a++){
						//trim() removes leading whitespace
						$scope.employees[i].sub_title[a] = $scope.employees[i].sub_title[a].trim();
						console.log('$scope.employees[i].sub_title[a]: ' + $scope.employees[i].sub_title[a])
					}

					//split skills
					$scope.employees[i].skills = $scope.employees[i].skills.split(',');
					for (var b = 0; b<$scope.employees[i].skills.length; b++){
						//trim() removes leading whitespace
						$scope.employees[i].skills[b] = $scope.employees[i].skills[b].trim();
						//$scope.employees[i].skills[b] = $scope.employees[i].skills[b].replace(/&rsquo;/g, "'")
						console.log('$scope.employees[i].skills[b]: ' + $scope.employees[i].skills[b])
					}
					//shuffle skills array using lodash.js
					$scope.employees[i].skills = _.shuffle($scope.employees[i].skills)
				}//end loop through each recordset
				*/

				totalRows = geo_data.length;

				if(mobileMode){
					//
				} else {
					//
				}

				/*
				if($scope.search != null){
					console.log('ATTENTION NOT NULL')
					$scope.setSearch($scope.search);
				}
				*/
				if(renderMap_completed == false) {
					renderMap_completed = true;
					renderMap();
					setMarkers();
				} else {					
					clearMarkers();
					setMarkers();
				}

				loadNav();




			})
.error(function(data, status){
	console.log('error not loaded');
	$scope.message = data || "Request failed";
	$scope.status = status;
});

		}//end if
		loadDataComplete = true;
	});//end of $on.loadData();

	//initial load
	//$scope.loadData();
	//$scope.$emit('loadData', [])
	//$scope.loadData();
}])