var app = angular.module('quizApp', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'template.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();

				if(ans == scope.options[scope.answer]) {
					scope.score++;
					scope.correctAns = true;
				} else {
					scope.correctAns = false;
				}

				scope.answerMode = false;
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
});

app.factory('quizFactory', function() {
	var questions = [
		{
			question: "_______ is the first female prime minister of England?",
			options: ["Patricia Rawlings", "Glenys Kimmmock", "Margaret Thatcher", "Angela Billingham"],
			answer: 2
		},
		{
			question: "There are _______ continents in the world?",
			options: ["Eleven", "Seven", "Ten", "Eight"],
			answer: 1
		},
		{
			question: "Twitter was launched in what year _______?",
			options: ["2003", "2006", "2004", "2005"],
			answer: 1
		},
		{
			question: "_______  is the most visited tourist attraction in the world?",
			options: ["Eiffel Tower", "Nigara Falls", "Roman Coliseum", "Las Vegas Strip"],
			answer: 3
		},
		{	
			question: "_______  is the first person to win two Nobel Laureate prizes?",
			options: ["Marie Curie", "Linus Pauling", "Frederick Sanger", "John Bardeen"],
			answer: 0
		},
		{	
			question: "The city  of _______ hosted the 1988 Olympic Games?",
			options: ["Seoul", "Berlin", "Barcelona", "Los Angeles"],
			answer: 0
		},
		{	
			question: "_______ is not a programming language?",
			options: ["Cobra", "Ada", "Kotlin", "Shery"],
			answer: 3
		},
		{	
			question: "The s in https stands for _______?",
			options: ["service", "secure", "severe", "serious"],
			answer: 1
		},
		{	
			question: "Real Madrid FC has won the UCL _______ times?",
			options: ["11", "10", "12", "13"],
			answer: 2
		},
		{	
			question: "The speed of sound is _______?",
			options: ["340.29m/s", "242.29m/s", "330.29m/s", "574.92m/s"],
			answer: 0
		}
	];

	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});