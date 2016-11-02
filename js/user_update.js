console.log('user_update.js');
angular.module('angular_update_module', [])
.controller('UpdateCtrol', ['$scope', '$http', function($scope, $http) {
	console.log('UpdateCtrol');

	$scope.updateActiveEmployee = function(employee) {
		console.log('\nUpdateCtrol, updateActiveEmployee()');
		//console.log(employee)
		//console.log($scope)
		activeEmployee = employee;
		//populates the input fields in the update form 
		for (var i = 0; i < fields.length; i++) {
			console.log('fields[i]: ' + fields[i][0])
			field[fields[i][0]] = $('#update_' + fields[i][0]);
			field[fields[i][0]].val(employee[fields[i][0]]);
			field[fields[i][0]].trigger('change');
		}
		field = {};

		//console.log($scope);

	}
	if (loadDataComplete == true) {
		$scope.user_update = function() {
			console.log('\nUpdateCtrol, user_update()');
			//check if this scope value needs to match global scope updated by html form.
			//once matched, there is no need to match it each time the $scope and database are updated.
			//console.log($scope.$$ChildScope)
			/*
			if(!$scope.$$ChildScope){
				console.log('$scope not equal to $scope.$parent. match them up');
				$scope = $scope.$parent;
			}
			*/
			$scope.$parent.employee.userId = activeEmployee.userId;
			console.log('$scope.$parent.employee.userId: ' + $scope.$parent.employee.userId)
			console.log('$scope.$parent.employee.fullName: ' + $scope.$parent.employee.fullName)
			console.log($scope);


			/*
			END OF PROJECT UNTIL FURTHER NOTICE OCT 19 2016
				- Continue improving Update/Delete/Insert capabilities
				- Conintue adding new frameworks
				- Add more bootstraps features.
			*/




			

			//replace single quotes characters to prevent sql conflict
			//replace this with a for loop of fields
			
			console.log('fields: ' + fields)
			// for (var i = 0; i < fields.length; i++) {
			// 	console.log(fields[i][0] + ': ' + $scope.$parentScope[ fields[i][0] ])
			// 	$scope[ fields[i][0] ] = $scope.$parentScope[ fields[i][0] ]
			// }
			//$scope.id = $scope.$parentScope.id

			//convert arrays into strings before saved as json format into SQL
			$scope.$parent.employee.sub_title = $scope.$parent.employee.sub_title.toString();
			$scope.$parent.employee.skills = $scope.$parent.employee.skills.toString();


			console.log('about to push to database:')
			console.log($scope.$parent.employee)
			//$http.post("user_update.php",{
			$http.post(httpPath + 'user_update.php', {
			//$http.post(httpPath + "user_update_manual.php",{
			//$http.post("http://www.luisespinal.com/profiles/user_update.php",{
				'id': $scope.$parent.employee.userId,
				'fullName': $scope.$parent.employee.fullName,
				'title': $scope.$parent.employee.title,
				'sub_title': $scope.$parent.employee.sub_title,
				'skills': $scope.$parent.employee.skills,
				'count': $scope.$parent.employee.count,
				'description': $scope.$parent.employee.description,
				'quote': $scope.$parent.employee.quote,
				'available': $scope.$parent.employee.available,
				'price': $scope.$parent.employee.price,
				'avatar': $scope.$parent.employee.avatar
			}, {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
			})
			.success(function(data, status, headers, config) {
				console.log("\nupdated Successfully");
				//$scope.$apply();
				//$scope.$on('someEvent', function(event,data){console.log(data);})
				//$scope.$emit('someEvent', [1, 2, 3])
				//$scope.$broadcast -- dispatches the event downwards to all child scopes,
				//$rootScope.$broadcast -- dispatches the event downwards to all child scopes,
				//$emit -- dispatches the event upwards through the scope hierarchy.
				runController = true;
				$scope.$emit('updateEmployee');
				

				//push ng-model.trigger to values in the page after SQL call is made.
				//this way, there is no need to make another call to the server to reload data.
				// for (var i = 0; i < fields.length; i++) {
				// 	console.log('#input_' + fields[i][0] + '_' + activeEmployeeID)
				// 	field[fields[i][0]] = $('#input_' + fields[i][0] + '_' + activeEmployeeID);
				// 	if(fields[i][0] == 'sub_title'){
				// 		//split json string (SQL output) into array.
				// 		console.log('sub_title value, ' + $scope[fields[i][0]]);
						
				// 		$scope[fields[i][0]] = $scope[fields[i][0]].split(',');
				// 		field[fields[i][0]].val($scope[fields[i][0]]);
				// 		//field[fields[i][0]].trigger('change');
				// 	} else {
				// 		field[fields[i][0]].val($scope[fields[i][0]]);
				// 	field[fields[i][0]].trigger('change');
				// 	}

				// }
				// field = {};

				$('#dg_' + $scope.$parent.employee.userId).animate({
					backgroundColor: "#DBFFEA"
				}, 500, function(e) {
					console.log(this)
					$(this).animate({
						backgroundColor: "#FFFFFF"
					}, 250)
				});
			})
			.error(function(data, status, headers, config) {
				console.log("error inserting");
			})
		};
	}

}])