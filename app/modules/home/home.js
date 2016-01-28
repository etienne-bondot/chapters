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
		'Book'
	];

	function HomeCtrl($, Book) {
		$.book = new Book();
		$.book.addChapter();

		// $.texttyping = [
		// 	'Hello, this is the first sentence',
		// 	'Second sentence',
		// 	'Final sentence'
		// ];

		$.texttyping = [
			'<br><br><br><br><br><span style="text-align:center; font-weight:bold; font-size:18px">' +
			 	$.book .title + '</span><br><br><br><br><br>',
			$.book.getCurrentChapter().text
		];

		$.pageNum = 1;
	}

})();
