//console.log('app.js');
runController = true;


// var myApp = angular.module("app", []);
var myApp = angular.module('app', ['ngRoute','controller'])
.config(function($routeProvider){
		$routeProvider
		.when('/index.html', {
			//templateUrl:'templates/home.html',
			controller:'HomeCtrol'
		})
		.when('/blog.html', {
			//templateUrl:'templates/blog.html',
			controller:'BlogCtrol'
		})
		.when('/add.html', {
			controller:'PostCtrol'
		})
		.otherwise({
			//templateUrl:'templates/404.html',
			controller:'Ctrol404'
		})
});