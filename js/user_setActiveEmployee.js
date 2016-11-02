console.log('user_setActiveEmployee.js');
angular.module('angular_setActiveEmployee_module', [])
.controller('SetActiveEmployeeCtrol', ['$scope', function($scope) {
	console.log('SetActiveEmployeeCtrol');

	$scope.$on('setActiveEmployee', function(employee,id){
		console.log('setActiveEmployee(), id: ' + id)
		var activeEmployee = {
			userId 			: employee.id,
			fullName 	: employee.fullName,
			title		: employee.title,
			sub_title	: employee.sub_title,
			skills		: employee.skills,
			count		: employee.count,
			description	: employee.description,
			quote		: employee.quote,
			available	: employee.available,
			price		: employee.price,
			avatar		: employee.avatar
		};

		//$scope.activeEmployee = activeEmployee;
		//activeEmployee = activeEmployee;
		//activeEmployeeID = activeEmployee.id;
		//console.log('activeEmployee.fullName: ' + $scope.activeEmployee.fullName)
	});	


}]);