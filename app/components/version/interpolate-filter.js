/*jshint latedef: nofunc */

'use strict';

angular.module('chapters.version.interpolate-filter', [])

.filter('interpolate', ['version', function(version) {
	return function(text) {
		return String(text).replace(/\%VERSION\%/mg, version);
	};
}]);
