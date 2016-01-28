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
			this.lastCharacter = null;
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
				var randCharacter = this.randomCharacter(),
					sentence = [];

				if (randCharacter === null) {
					// just generate a paragraph
					sentence.push('<br>' + chance.paragraph());
				} else if (randCharacter !== this.lastCharacter) {
					// generate a sentence with NAME: SENTENCE
					sentence.push('<br><span style="font-weight:bold; font-style: italic;">' +
						randCharacter + ': </span>');
					sentence.push('<span style="font-size: 9px;">' + chance.sentence() + '</span>');
				} else {
					sentence.push(' <span style="font-size: 9px;">' + chance.sentence() + '</span>');
				}

				this.lastCharacter = randCharacter;
				return sentence.join(' ');
			};

			// building
			for (var i = 0; i < this.sentenceNumber; i++) {
				this.text += this.generateSentence();
			}
		}

		return Chapter;
	}


})();
