angular
    .module("TaxiProApp")
    .controller("testCtrl",
    function ($scope, testFactory, profileFactory) {
        //visibility controls
        $scope.welcome = true
        $scope.vid = false
        $scope.quizSet = false

        $scope.showVid = function () {
            $scope.vid = true
            $scope.welcome = false
        }

        $scope.hideVid = function () {
            $scope.vid = false
        }

        $scope.showQuestion = function () {
            $scope.quizSet = true
        }

        $scope.monkeyButt = {
            value: null
        }
        // get all videos, questions and answers from testFactory
        videos = testFactory.VideosCache
        questions = testFactory.QuestionsCache
        answers = testFactory.AnswersCache
        currentStudentKey = profileFactory.getCurrentStudent()
        currentStudent = profileFactory.single(currentStudentKey).then((student) => {
            $scope.student = student

        })


        $scope.videos = videos[0]
        $scope.questions = questions
        $scope.answers = answers

        

        $scope.nextQuestion = function () {
            $index ++
        }



        $scope.filterAnswer = function (answer, question) {
            console.log(question)
            console.log(answer)
          return answer.questionID === question.questionID
        }



        // let count = 0
        // let questionGenerator = function () {
        //     $scope.question = testFactory.QuestionsCache[count]
        //     $scope.answers = testFactory.AnswersCache.filter(answer => {
        //         return answer.questionID === $scope.question.questionID
        //     })

        // }
        // questionGenerator()
        //     $scope.nextQuestion = function () {
        //         count++
        //         questionGenerator()
        //         if ($scope.question.videoID !== $scope.videos) {
        //             vidCount++
        //         } else {

        //         }
        //     }
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


