'use strict';

angular.module('chapters', [
	'ngRoute',
	'chapters.home',
	'chapters.version',
	'luegg.directives'
])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({
		redirectTo: '/'
	});
}]);
