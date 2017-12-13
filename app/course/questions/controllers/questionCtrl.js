angular
.module("TaxiProApp")
.controller("questionCtrl",
function ($scope, questionFactory) {
//get all questions from questionFactory
    questionFactory.getQuestions().then((questions)=> {
        questionFactory.getAnswers().then((answers) => {
            $scope.question = questions[0]
            $scope.answers = answers.filter(answer => {
               return answer.questionID = $scope.question.question.questionID
            }) 

        })
    })
})