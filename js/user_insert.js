console.log('user_insert.js');
angular.module('angular_insert_module', [])
	.controller('InsertCtrol', ['$scope', '$http', function($scope, $http) {
		console.log('InsertCtrol');
		$scope.employee = [];
		console.log($scope);
		$scope.employee.fullName = "Default fullName";
		$scope.employee.title = "Default title";
		$scope.employee.sub_title = "Default,green";
		$scope.employee.skills = "Default,Default";
		$scope.employee.count = 25;
		$scope.employee.description = "Default description";
		$scope.employee.quote = "Default quote";
		$scope.employee.available = 1;
		$scope.employee.price = 50;
		$scope.employee.avatar = "avatar_1";

		console.log('$scope.employee.description: '  + $scope.employee.description)
		$scope.employee.description = $scope.employee.description.replace("'", "&rsquo;")
		$scope.employee.quote = $scope.employee.quote.replace("'", "&rsquo;")
		$scope.employee.sub_title = $scope.employee.sub_title.replace("'", "&rsquo;")
		$scope.employee.skills = $scope.employee.skills.replace("'", "&rsquo;")

		console.log($scope);

		for (var i = 0; i < fields.length; i++) {
			console.log('fields[i]: ' + fields[i])
			field[fields[i][0]] = $('#insert_' + fields[i][0]);
			field[fields[i][0]].val($scope.employee[fields[i][0]]);
			field[fields[i][0]].trigger('change');
		}



		$scope.user_insert = function() {
			console.log('user_insert()');

			for (var i = 0; i < fields.length; i++) {
				//console.log('fields[i]: ' + fields[i])
				field[fields[i][0]] = $('#insert_' + fields[i][0]);
				field[fields[i][0]].trigger('change');
			}

			$scope.employee.sub_title = $scope.employee.sub_title.toString();
			$scope.employee.skills = $scope.employee.skills.toString();
			console.log($scope.employee.fullName)

			//replace single quotes characters to prevent sql conflict
			$scope.employee.description = $scope.employee.description.replace("'", "&rsquo;")
			$scope.employee.quote = $scope.employee.quote.replace("'", "&rsquo;")

			//SQL server
			//$http.post(httpPath + 'user_insert_sql_server.php', {
			$http.post(httpPath + 'user_insert.php', {
					//$http.post("http://www.luisespinal.com/profiles/user_insert.php",{
					//$http.post("http://www.shiquinkira.com/profiles/user_insert.php",{
					//'headers' : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
					'fullName': $scope.employee.fullName,
					'title': $scope.employee.title,
					'sub_title': $scope.employee.sub_title,
					'skills': $scope.employee.skills,
					'count': $scope.employee.count,
					'description': $scope.employee.description,
					'quote': $scope.employee.quote,
					'available': $scope.employee.available,
					'price': $scope.employee.price,
					'avatar': $scope.employee.avatar
				}, {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
			})
			.success(function(data, status, headers, config) {
				console.log("inserted Successfully");
				//$scope.$emit('someEvent', args)
				runController = true;
				$scope.$emit('loadData', [])
				//$scope.loadData();

			})
			.error(function(data, status, headers, config) {
				console.log("error inserting");
			})
		}
	}])