console.log('user_delete.js');
angular.module('angular_delete_module', [])
	.controller('DeleteCtrol', ['$scope', '$http', function($scope, $http) {
		console.log('DeleteCtrol');
		//is all this code for deleteActiveEmployee necessary?
		$scope.deleteActiveEmployee = function(employee) {
			console.log('DeleteCtrol, deleteActiveEmployee()');
			console.log($scope)
			activeEmployee = employee;
			

			//populates the input fields in the update form when the card menu is clicked
			for (var i = 0; i < fields.length; i++) {
				field[fields[i][0]] = $('#delete_' + fields[i][0]);
				field[fields[i][0]].val(employee[fields[i][0]]);
				field[fields[i][0]].trigger('change');

				//disable the input fields
				field[fields[i][0]].prop('disabled', true);
			}

		}
		$scope.user_delete = function() {
			console.log('user_delete()');
			console.log($scope)

			$scope.$parent.employee.userId = activeEmployee.userId;

			$http.post(httpPath + 'user_delete.php', {
					'id': $scope.$parent.employee.userId
				}, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				})
				.success(function(data, status, headers, config) {
					console.log("deleted Successfully");
					//$scope.$emit('someEvent', args)
					runController = true;
					//$scope.$emit('loadData', [])
					runController = true;
					$scope.$emit('deleteEmployee');
					//$scope.loadData();

				})
				.error(function(data, status, headers, config) {
					console.log("error deleting");
				})

		}
	}])