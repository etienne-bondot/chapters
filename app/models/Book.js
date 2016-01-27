(function() {

	'use strict';

	angular.module('chapters')
		.factory('Book', BookModel);

	BookModel.$inject = [];

	function BookModel() {

		function Book(params) {
			this.title = 'Title';
		}
		
		return Book;
	}


})();
