angular
    .module("TaxiProApp")
    .controller("testCtrl",
    function ($scope, testFactory) {
        let questions = null
        let answers = null
        let videos = null
        $scope.monkeyButt = {
            value: null
        }
        // get all questions and answers from testFactory
        testFactory.getQuestions().then((response) => {
            questions = response
            // console.log("got the questions")
            return questions

        }).then(questions => {
            testFactory.getAnswers().then((response) => {
                answers = response
                // console.log("got the answers")
                return answers
            }).then(() => {
                questionGenerator()

            })

        })
        testFactory.getVideos().then((response) => {
            videos = response
            console.log(videos)
            $scope.videos = videos[0]
            return videos
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
            // console.log($scope.monkeyButt.value)
        }

    })