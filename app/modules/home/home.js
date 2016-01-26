(function() {

	'use strict';

	angular.module('chapters.home', ['ngRoute'])
		.config(routeConfig)
		.controller('HomeCtrl', HomeCtrl);

	/** ROUTES **/

	routeConfig.$inject = [
		'$routeProvider'
	];

	function routeConfig($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'modules/home/home.html',
			controller: 'HomeCtrl'
		});
	}

	/** CONTROLLER **/

	HomeCtrl.$inject = [
		'$scope'
	];

	function HomeCtrl($) {

	}

})();
