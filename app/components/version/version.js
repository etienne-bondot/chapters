'use strict';

angular.module('chapters.version', [
	'chapters.version.interpolate-filter',
	'chapters.version.version-directive'
])

.value('version', '0.1');
