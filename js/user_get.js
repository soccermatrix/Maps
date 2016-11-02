//console.log('user_get.js');
angular.module('angular_get_module', [])
.controller('GetCtrol',['$scope', '$http', function loadDataCtrl($scope, $http){
	//console.log('GetCtrol');

	// if (loadDataComplete == true) {
		$scope.user_get = function() {
			//console.log('GetCtrol, user_get()');

			
			$scope.userId = $.urlParam('uid');

			//$http.get(httpPath + 'sql.php')
			//console.log('httpPath: ' + httpPath)
			$http.post(httpPath + 'user_get.php', {
				'id': $scope.userId
			}, {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
			})
			.success(function(employees_data, employees_status){
				console.log('GetCtrol - success');
				//console.log('mobileMode: ' + mobileMode)
				////////console.log('success loading json')
				//console.log(employees_data.employees)
				//console.log('employees: ' + employees_data.employees )
				//employees_data_string = JSON.stringify(employees_data);
				$scope.employees = employees_data.employees;
				$scope.totalEmployees = $scope.employees.length;

				//console.log('totalEmployees: ' + totalEmployees)

				//replace special charter codes back into readable characters
				for (var i = 0; i<$scope.totalEmployees; i++){
					for (var ii = 0; ii < fields.length; ii++) {
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
						////console.log('employees[i].sub_title[a]: ' + employees[i].sub_title[a])
					}

					//split skills
					$scope.employees[i].skills = $scope.employees[i].skills.split(',');
					for (var b = 0; b<$scope.employees[i].skills.length; b++){
						//trim() removes leading whitespace
						$scope.employees[i].skills[b] = $scope.employees[i].skills[b].trim();
						//employees[i].skills[b] = employees[i].skills[b].replace(/&rsquo;/g, "'")
						////console.log('employees[i].skills[b]: ' + employees[i].skills[b])
					}
					//shuffle skills array using lodash.js
					$scope.employees[i].skills = _.shuffle($scope.employees[i].skills)
				}//end loop through each recordset

				employees = $scope.employees;
				totalEmployees = employees.length;

				loadFunction();
			})
			.error(function(data, status, headers, config) {
				//console.log("error");
			})
		};
	//}

}])