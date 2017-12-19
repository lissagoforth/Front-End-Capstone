angular
    .module("TaxiProApp")
    .controller("testCtrl",
    function ($scope, testFactory) {
        // let questions = null
        // let answers = null
        // let videos = null
        $scope.welcome = true
        $scope.vid = false
        $scope.questionSet = false


        $scope.showVid = function () {
            $scope.vid = true
            $scope.welcome = false
        }

        $scope.hideVid = function () {
            $scope.vid = false
        }

        $scope.showQuestion = function () {
            $scope.questionSet = true
        }

        

        $scope.monkeyButt = {
            value: null
        }
        // get all questions and answers from testFactory
       let vidCount = 0
        videos = testFactory.VideosCache
        $scope.videos = videos[vidCount]
      
        let count = 0
        let questionGenerator = function () {
            $scope.question = testFactory.QuestionsCache[count]
            $scope.answers =  testFactory.AnswersCache.filter(answer => {
                return answer.questionID === $scope.question.questionID
            })

        }
        questionGenerator()
        $scope.nextQuestion = function () {
            count++
            questionGenerator()
            if ($scope.question.videoID !== $scope.videos) {
                vidCount ++
            } else {
                
            }
        }
    })
        // console.log($scope.monkeyButt.value)
        // testFactory.getQuestions().then((response) => {
        //     questions = response
        //     // console.log("got the questions")
        //     return questions

        // }).then(questions => {
        //     testFactory.getAnswers().then((response) => {
        //         answers = response
        //         // console.log("got the answers")
        //         return answers
        //     }).then(() => {
        //         questionGenerator()

        //     })

        // })
        // testFactory.getVideos().then((response) => {
        //     videos = response
        //     $scope.videos = videos[0]
        //     return videos
        // })
        

