/*jshint latedef: nofunc */

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
		'$scope',
		'$interval',
		'Book'
	];

	function HomeCtrl($, $interval, Book) {
		$interval(function () {
			$.glue = true;
		}, 5);

		$.book = new Book('The perk of being a wallflower.');
		$.book.addChapter();

		// $.texttyping = [
		// 	'Hello, this is the first sentence',
		// 	'Second sentence',
		// 	'Final sentence'
		// ];

		$.strings = [
			'<br><br><br><br><br><span style="text-align:center; font-weight:bold; font-size:18px">' +
			 	$.book .title + '</span><br><br><br><br><br>',
			'<span style="text-align:justify;">' + $.book.getCurrentChapter().text + '</span>'
		];

		$.pageNum = 1;
	}

})();
