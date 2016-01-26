'use strict';

angular.module('chapters', [
	'ngRoute',
	'chapters.home',
	'chapters.version'
])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({
		redirectTo: '/'
	});
}]);
