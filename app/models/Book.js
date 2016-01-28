/*jshint latedef: nofunc */

(function() {

	'use strict';

	angular.module('chapters')
		.factory('Book', BookModel);

	BookModel.$inject = [
		'Chapter'
	];

	function BookModel(Chapter) {

		function Book(title) {
			this.title = title || chance.sentence({ words: 5 });
			this.chapters = [];
			this.characters = [];
			this.numCharacter = chance.natural({ min: 1, max: 4 });
			this.currentChapter = 0;

			for (var i = 0; i < this.numCharacter; i++) {
				this.characters.push(chance.name());
			}
		}

		Book.prototype.addChapter = function () {
			var self = this;
			self.chapters.push(new Chapter(self.characters));
		};

		Book.prototype.getChapter = function (num) {
			var self = this;
			return self.chapters[num];
		};

		Book.prototype.getCurrentChapter = function () {
			var self = this;
			return self.chapters[self.currentChapter];
		};

		return Book;
	}


})();
