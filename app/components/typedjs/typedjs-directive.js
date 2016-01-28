/*jshint latedef: nofunc */
/*global $*/

(function() {

	'use strict';

	angular.module('chapters')
		.directive('typedjs', typedjsDirective);

	typedjsDirective.$inject = [];

	function typedjsDirective() {

		function link(scope, elem) {
			// treat the array of strings as a unique string
			scope.text = [scope.strings.join(' ')];

			var options = {
				strings: scope.text,
				// Optionally use an HTML element to grab strings from
				// (must wrap each string in a <p>)
				stringsElement: null,
				// typing speed
				typeSpeed: 5,
				// time before typing starts
				startDelay: 5,
				// backspacing speed
				backSpeed: 0,
				// time before backspacing
				backDelay: 500,
				// loop
				loop: false,
				// false = infinite
				loopCount: false,
				// show cursor
				showCursor: true,
				// character for cursor
				cursorChar: '|',
				// attribute to type (null == text)
				attr: null,
				// either html or text
				contentType: 'html',
				// call when done callback function
				callback: function() {},
				// starting callback function before each string
				preStringTyped: function() {
				},
				//callback for every typed string
				onStringTyped: function() {},
				// callback for reset
				resetCallback: function() {}
			};

			$(function() {
				elem.typed(options);
			});
		}

		return {
			restrict: 'E',
			scope: false,
			template: '<span id="typed-output"></span>',
			link: link
		};
	}

})();
