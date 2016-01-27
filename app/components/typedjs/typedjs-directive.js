(function() {

	'use strict';

	angular.module('chapters')
		.directive('typedjs', typedjsDirective);

	typedjsDirective.$inject = [];

	function typedjsDirective() {

		function link(scope, elem, attrs) {
			var options = {
				strings: scope.strings,
				typeSpeed: 2,
				contentType: "html",
				showCursor: true,
				cursorChar: "="
			};

			$(function() {
				$("#typed-output").typed(options);
			});
		}

		return {
			restrict: 'E',
			scope: {
				strings: '='
			},
			template: '<span id="typed-output"></span>',
			link: link
		};
	}

})();
