/*jshint latedef: nofunc */

(function() {

	'use strict';

	angular.module('chapters')
		.factory('Chapter', ChapterModel);

	ChapterModel.$inject = [];

	function ChapterModel() {

		function Chapter(characters) {
			this.text = '';
			this.characters = characters;
			this.sentenceNumber = chance.natural({ min: 1, max: 100 });

			/**
			* chose a random character or null for a no character sentence.
			*/
			this.randomCharacter = function () {
				var rand = chance.natural({
					min: 0,
					max: this.characters.length
				});

				if (rand > this.characters.length - 1) {
					return null;
				}
				return this.characters[rand];
			};

			this.generateSentence = function() {
				var randomCharacter = this.randomCharacter(),
					sentence = [];

				if (randomCharacter === null) {
					// just generate a paragraph
					sentence.push(chance.paragraph());
				} else {
					// generate a sentence with NAME: SENTENCE
					sentence.push(randomCharacter + ': ');
					sentence.push(chance.sentence());
				}
				return sentence;
			};

			// building
			for (var i = 0; i < this.sentenceNumber; i++) {
				this.text += this.generateSentence();
			}
		}

		return Chapter;
	}


})();
