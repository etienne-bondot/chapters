/*jshint latedef: nofunc */

'use strict';

angular.module('chapters.version.version-directive', [])

.directive('appVersion', ['version', function(version) {
	return function(scope, elm) {
		elm.text(version);
	};
}]);
