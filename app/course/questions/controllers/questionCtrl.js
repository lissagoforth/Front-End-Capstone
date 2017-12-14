angular
    .module("TaxiProApp")
    .controller("questionCtrl",
    function ($scope, questionFactory) {
        let questions = null
        let answers = null
        $scope.monkeyButt = {
            value: null
        }
        // get all questions and answers from questionFactory
        questionFactory.getQuestions().then((response) => {
            questions = response
            // console.log("got the questions")
            return questions

        }).then(questions => {
            questionFactory.getAnswers().then((response) => {
                answers = response
                // console.log("got the answers")
                return answers
            }).then(() => {
                questionGenerator()

            })

        })
        let count = 0
        let questionGenerator = function () {
            $scope.question = questions[count]
            $scope.answers = answers.filter(answer => {
                return answer.questionID === $scope.question.questionID
            })

        }
        $scope.nextQuestion = function () {
            count++
            questionGenerator()
            console.log($scope.monkeyButt.value)
        }

    })