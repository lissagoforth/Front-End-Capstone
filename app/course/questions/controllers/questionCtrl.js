angular
    .module("TaxiProApp")
    .controller("questionCtrl",
    function ($scope, questionFactory) {
        let questions = null
        let answers = null
        // get all questions and answers from questionFactory
        questionFactory.getQuestions().then((response) => {
            questions = response
            console.log("got the questions")
            return questions
            
        }).then(questions => {
            questionFactory.getAnswers().then((response) => {
                answers = response
                console.log("got the answers")
                return answers
            }).then(() => {

                questions.forEach(function (question) {
                    let count = 0
                    answers.filter(answer => {
                        return answer.questionID === question.questionID
                    })
                    $scope.nextQuestion = function () {
                        count++
                    }
                })
            })

        })
        //get all questions from questionFactory


    //     let count = 0
    //     let questionGenerator = function () {
    //             questionFactory.getQuestions().then((questions) => {
    //                 questionFactory.getAnswers().then((answers) => {
    //                     $scope.question = questions[count]
    //                     $scope.answers = answers.filter(answer => {
    //                         return answer.questionID === $scope.question.questionID
    //                     })
    //                 })
    //             })
    //         }
    // questionGenerator()
    //             $scope.nextQuestion = function () {
    //             console.log("clicked")
    //             count++
    //             questionGenerator()
    //         }


    })